using LawOfficeBackend.Data;
using LawOfficeBackend.DTOs;
using LawOfficeBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace LawOfficeBackend.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthService> _logger;

        public AuthService(ApplicationDbContext context, IConfiguration configuration, ILogger<AuthService> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }


        public async Task<TokenApiModel> Login(LoginRequestDto loginRequest)
        {
            if (loginRequest == null)
            {
                throw new ArgumentNullException(nameof(loginRequest));
            }

            try
            {
                _logger.LogInformation("Login attempt for user: {Username}", loginRequest.Username);

                var user = await _context.Users
                    .AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

                if (user == null)
                {
                    _logger.LogWarning("User not found: {Username}", loginRequest.Username);
                    return null;
                }

                if (string.IsNullOrEmpty(user.PasswordHash))
                {
                    _logger.LogWarning("Password hash not set for user: {Username}", loginRequest.Username);
                    throw new InvalidOperationException("User password hash is not set");
                }

                if (!VerifyPassword(loginRequest.Password, user.PasswordHash))
                {
                    _logger.LogWarning("Password mismatch for user: {Username}", loginRequest.Username);
                    return null;
                }

                if (!user.IsActive)
                {
                    _logger.LogWarning("User account is deactivated: {Username}", loginRequest.Username);
                    throw new InvalidOperationException("User account is deactivated");
                }

                var accessToken = GenerateAccessToken(user);
                var refreshToken = GenerateRefreshToken();

                user.LastLogin = DateTime.UtcNow;
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

                _logger.LogInformation("Tokens generated successfully for user: {Username}", loginRequest.Username);

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return new TokenApiModel
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Authentication failed for user: {Username}", loginRequest.Username);
                throw new Exception("Authentication failed", ex);
            }
        }


        public async Task<TokenApiModel> RefreshToken(TokenApiModel tokenApiModel)
        {
            if (tokenApiModel == null)
                throw new ArgumentNullException(nameof(tokenApiModel));

            var principal = GetPrincipalFromExpiredToken(tokenApiModel.AccessToken);
            var username = principal?.Identity?.Name;

            if (string.IsNullOrEmpty(username))
                throw new SecurityTokenException("Invalid token claims");

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null ||
                user.RefreshToken != tokenApiModel.RefreshToken ||
                user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            try
            {
                var newAccessToken = GenerateAccessToken(user);
                var newRefreshToken = GenerateRefreshToken();

                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
                await _context.SaveChangesAsync();

                return new TokenApiModel
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                };
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to refresh token", ex);
            }
        }


        public async Task RevokeToken(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;
                await _context.SaveChangesAsync();
            }
        }

        private string GenerateAccessToken(User user)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(
                    _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Secret not configured")
                );

                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
                    Expires = DateTime.UtcNow.AddMinutes(15),
                    Issuer = issuer,         // ✅ ADD THIS
                    Audience = audience,     // ✅ AND THIS
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                throw new Exception("Token generation failed", ex);
            }
        }


        private static string GenerateRefreshToken()
        {
            using var rng = RandomNumberGenerator.Create();
            var randomNumber = new byte[32];
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.ASCII.GetBytes(_configuration["JWT:Secret"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        public static string HashPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password cannot be empty");

            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private static bool VerifyPassword(string password, string storedHash)
        {
            if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(storedHash))
                return false;

            return HashPassword(password) == storedHash;
        }
    }
}