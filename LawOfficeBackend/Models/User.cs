public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!; // Mark as non-null
    public string Email { get; set; } = null!;    // Mark as non-null
    public string PasswordHash { get; set; } = null!; // Mark as non-null
    public string Role { get; set; } = "Admin";
    public bool IsActive { get; set; } = true;
    public int? CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLogin { get; set; }      // Nullable
    public string? RefreshToken { get; set; }     // Nullable
    public DateTime? RefreshTokenExpiryTime { get; set; } // Nullable
}