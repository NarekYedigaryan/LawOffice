using LawOfficeBackend.DTOs;
using LawOfficeBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LawOfficeBackend.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IContactService _contactService;

        public MessagesController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMessages()
        {
            var messages = await _contactService.GetAllMessagesAsync();
            return Ok(messages);
        }   


    }
}