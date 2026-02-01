using MehmetSonmez.Portfolio.Core.Entities;
using MehmetSonmez.Portfolio.Service.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace MehmetSonmez.Portfolio.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    // Servis katmanını buraya çağırıyoruz (Dependency Injection)
    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _projectService.GetAllProjectsAsync();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null) return NotFound();
        return Ok(project);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Project project)
    {
        await _projectService.AddProjectAsync(project);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }
}
