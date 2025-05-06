namespace LawOfficeBackend.Models
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow.AddHours(4);
        public bool IsActive { get; set; } = true;
        public string? CreatedBy { get; set; }
    }

}
