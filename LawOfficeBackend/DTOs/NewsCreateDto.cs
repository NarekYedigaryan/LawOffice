using System.ComponentModel.DataAnnotations;

namespace LawOfficeBackend.DTOs
{
    public class NewsCreateDto
    {
        [Required]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "Title must be between 5 and 30 characters.")]
        public string Title { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 50 characters.")]
        public string Description { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 50, ErrorMessage = "Content must be between 50 and 1000 characters.")]
        public string Content { get; set; }

        [Required]
        public string ImageUrl { get; set; }
    }
}