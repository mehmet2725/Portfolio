using MehmetSonmez.Portfolio.Service.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace MehmetSonmez.Portfolio.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GithubController : ControllerBase
{
    private readonly GithubService _githubService;

    public GithubController(GithubService githubService)
    {
        _githubService = githubService;
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetRepos(string username)
    {
        var data = await _githubService.GetRepositoriesAsync(username);
        return Ok(data);
    }
}