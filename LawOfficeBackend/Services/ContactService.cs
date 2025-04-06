// Services/ContactService.cs
using LawOfficeBackend.Data;
using LawOfficeBackend.DTOs;
using LawOfficeBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace LawOfficeBackend.Services
{
    public class ContactService : IContactService
    {
        private readonly ApplicationDbContext _context;

        public ContactService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SubmitContactFormAsync(ContactDto contactDto)
        {
            var contact = new Contact
            {
                FullName = contactDto.FullName,
                Email = contactDto.Email,
                PhoneNumber = contactDto.PhoneNumber,
                Subject = contactDto.Subject,
                Message = contactDto.Message
            };

            _context.Contacts.Add(contact);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}