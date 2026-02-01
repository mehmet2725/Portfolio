using MehmetSonmez.Portfolio.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace MehmetSonmez.Portfolio.Data.Contexts;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {}

    public DbSet<Project> Projects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>().Property(p => p.Title).IsRequired().HasMaxLength(200);
        
        base.OnModelCreating(modelBuilder);
    }
}
