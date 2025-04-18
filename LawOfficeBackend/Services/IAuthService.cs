using LawOfficeBackend.DTOs;
using LawOfficeBackend.Models;
using System.Threading.Tasks;

namespace LawOfficeBackend.Services
{
    public interface IAuthService
    {
        Task<TokenApiModel> Login(LoginRequestDto loginRequest);
        Task<TokenApiModel> RefreshToken(TokenApiModel tokenApiModel);
        Task RevokeToken(int userId);
    }
}