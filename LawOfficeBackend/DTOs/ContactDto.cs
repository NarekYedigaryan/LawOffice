using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
namespace LawOfficeBackend.DTOs
{
    public class ContactDto
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z\u0561-\u0587\s]{7,20}$", ErrorMessage = "Full name must be 7 to 20 Armenian or English letters.")]
        public string FullName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^0\d{8}$", ErrorMessage = "Phone number must start with 0 and be exactly 9 digits.")]
        public string PhoneNumber { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 7, ErrorMessage = "Subject must be between 5 and 40 letters.")]
        public string Subject { get; set; }

        [Required]
        [RegularExpression(@"^(\b\w+\b[\s\r\n]*){15,100}$", ErrorMessage = "Message must be between 15 and 100 words.")]
        public string Message { get; set; }

    }
}