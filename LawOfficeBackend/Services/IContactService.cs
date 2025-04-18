// Services/IContactService.cs
using LawOfficeBackend.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LawOfficeBackend.Services
{
    public interface IContactService
    {
        Task<bool> SubmitContactFormAsync(ContactDto contactDto);
        Task<List<ContactWithIdDto>> GetAllMessagesAsync();
    }
}