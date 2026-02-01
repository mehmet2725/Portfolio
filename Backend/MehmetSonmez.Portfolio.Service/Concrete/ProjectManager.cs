using MehmetSonmez.Portfolio.Core.Entities;
using MehmetSonmez.Portfolio.Data.Contexts;
using MehmetSonmez.Portfolio.Service.Abstract;
using Microsoft.EntityFrameworkCore;

namespace MehmetSonmez.Portfolio.Service.Concrete;

public class ProjectManager : IProjectService
{
    private readonly AppDbContext _context;

    // Constructor Injection: Veritabanı bağlamını buraya enjekte ediyoruz.
    public ProjectManager(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddProjectAsync(Project project)
    {
        await _context.Projects.AddAsync(project);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProjectAsync(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project != null)
        {
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<Project>> GetAllProjectsAsync()
    {
        // Tarihe göre yeniden eskiye sıralı getirsin
        return await _context.Projects.OrderByDescending(x => x.CreatedDate).ToListAsync();
    }

    public async Task<Project> GetProjectByIdAsync(int id)
    {
        return await _context.Projects.FindAsync(id);
    }

    public async Task UpdateProjectAsync(Project project)
    {
        _context.Projects.Update(project);
        await _context.SaveChangesAsync();
    }
}
