// Controllers/ContactsController.cs
using LawOfficeBackend.DTOs;
using LawOfficeBackend.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace LawOfficeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ContactDto contactDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        title = "Validation Error",
                        errors = ModelState.Values.SelectMany(v => v.Errors)
                    });
                }

                var result = await _contactService.SubmitContactFormAsync(contactDto);

                if (result)
                {
                    return Ok(new { message = "Thank you! Your message has been sent." });
                }

                return StatusCode(500, new { title = "Error", message = "Failed to save contact form." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { title = "Error", message = ex.Message });
            }
        }
    }
}