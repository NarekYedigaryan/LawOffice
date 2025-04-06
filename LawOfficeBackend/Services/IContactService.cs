// Services/IContactService.cs
using LawOfficeBackend.DTOs;
using System.Threading.Tasks;

namespace LawOfficeBackend.Services
{
    public interface IContactService
    {
        Task<bool> SubmitContactFormAsync(ContactDto contactDto);
    }
}