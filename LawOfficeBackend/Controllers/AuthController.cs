using LawOfficeBackend.DTOs;
using LawOfficeBackend.Models;
using LawOfficeBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LawOfficeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            if (loginRequest == null)
                return BadRequest(new { message = "Invalid request" });

            try
            {
                var token = await _authService.Login(loginRequest);
                if (token == null)
                    return Unauthorized(new { message = "Invalid username or password" });

                return Ok(new
                {
                    accessToken = token.AccessToken,
                    refreshToken = token.RefreshToken
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


       
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenApiModel tokenApiModel)
        {
            if (tokenApiModel == null)
                return BadRequest(new { message = "Invalid request" });

            try
            {
                var token = await _authService.RefreshToken(tokenApiModel);
                return token == null
                    ? Unauthorized(new { message = "Invalid or expired token" })
                    : Ok(token);
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }



        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? throw new UnauthorizedAccessException("Invalid user claims"));

                await _authService.RevokeToken(userId);
                return Ok(new { message = "Logged out successfully" });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}