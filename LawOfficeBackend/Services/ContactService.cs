// Services/ContactService.cs
using LawOfficeBackend.Data;
using LawOfficeBackend.DTOs;
using LawOfficeBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
                Message = contactDto.Message,
                CreatedAt = DateTime.UtcNow.AddHours(4),
                IsRead = false
            };

            _context.Contacts.Add(contact);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<ContactWithIdDto>> GetAllMessagesAsync()
        {
            return await _context.Contacts
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new ContactWithIdDto
                {
                    Id = c.Id,
                    FullName = c.FullName,
                    Email = c.Email,
                    PhoneNumber = c.PhoneNumber,
                    Subject = c.Subject,
                    Message = c.Message,
                    CreatedAt = c.CreatedAt,
                    IsRead = c.IsRead
                })
                .ToListAsync();
        }


    }
}