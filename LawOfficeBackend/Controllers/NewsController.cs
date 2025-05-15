using LawOfficeBackend.Data;
using LawOfficeBackend.DTOs;
using LawOfficeBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LawOfficeBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class NewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public NewsController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> CreateNews([FromBody] NewsCreateDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid news data.");
            }

            var username = _httpContextAccessor.HttpContext?.User?.Identity?.Name;

            var news = new News
            {
                Title = dto.Title,
                Description = dto.Description,
                Content = dto.Content,
                ImageUrl = dto.ImageUrl,
                CreatedBy = username,
                IsActive = true,
                Date = DateTime.Now // Ensure date is set when creating
            };

            _context.News.Add(news);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "News created successfully",
                news = new
                {
                    news.Id,
                    news.Title,
                    news.Description,
                    news.Content,
                    news.ImageUrl,
                    Date = news.Date.ToString("yyyy-MM-dd"), // Format here
                    news.CreatedBy
                }
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNews()
        {
            var newsList = await _context.News
                .Where(n => n.IsActive)
                .OrderByDescending(n => n.Date)
                .Select(n => new // Add projection to format date
                {
                    n.Id,
                    n.Title,
                    n.Description,
                    n.Content,
                    n.ImageUrl,
                    Date = n.Date.ToString("yyyy-MM-dd"),
                    n.CreatedBy
                })
                .ToListAsync();

            return Ok(newsList);
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveNews()
        {
            var newsList = await _context.News
                .Where(n => n.IsActive)
                .OrderByDescending(n => n.Date)
                .Select(n => new // Add projection to format date
                {
                    n.Id,
                    n.Title,
                    n.Description,
                    n.Content,
                    n.ImageUrl,
                    Date = n.Date.ToString("yyyy-MM-dd"),
                    n.CreatedBy
                })
                .ToListAsync();

            return Ok(newsList);
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestNews()
        {
            var newsList = await _context.News
                .Where(n => n.IsActive)
                .OrderByDescending(n => n.Date)
                .Take(3)
                .Select(n => new
                {
                    n.Id,
                    n.Title,
                    n.Description,
                    n.Content,
                    n.ImageUrl,
                    Date = n.Date.ToString("yyyy-MM-dd") // Changed from "dd MMMM, yyyy"
                })
                .ToListAsync();

            return Ok(newsList);
        }
    }
}