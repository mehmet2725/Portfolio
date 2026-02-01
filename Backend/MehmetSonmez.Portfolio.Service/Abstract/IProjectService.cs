using MehmetSonmez.Portfolio.Core.Entities;

namespace MehmetSonmez.Portfolio.Service.Abstract;

public interface IProjectService
{
    // Tüm projeleri getir
    Task<List<Project>> GetAllProjectsAsync();

    // ID'ye göre tek proje getir
    Task<Project> GetProjectByIdAsync(int id);

    // Yeni proje ekle
    Task AddProjectAsync(Project project);

    // Projeyi güncelle
    Task UpdateProjectAsync(Project project);

    // Projeyi sil
    Task DeleteProjectAsync(int id);
}
