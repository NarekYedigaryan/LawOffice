// Data/ApplicationDbContext.cs
using LawOfficeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LawOfficeBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Contact>()
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            modelBuilder.Entity<Contact>()
                .Property(c => c.IsRead)
                .HasDefaultValue(false);
        }
    }
}