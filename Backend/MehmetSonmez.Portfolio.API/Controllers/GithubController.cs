using MehmetSonmez.Portfolio.Service.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory; // Cache

namespace MehmetSonmez.Portfolio.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GithubController : ControllerBase
{
    private readonly GithubService _githubService;
    private readonly IMemoryCache _memoryCache; // Cache servisi

    public GithubController(GithubService githubService, IMemoryCache memoryCache)
    {
        _githubService = githubService;
        _memoryCache = memoryCache;
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetRepos(string username)
    {
        // Cache anahtarı: Her kullanıcı için ayrı tutuyoruz
        string cacheKey = $"GithubRepos_{username}";

        if (!_memoryCache.TryGetValue(cacheKey, out var data))
        {
            // Hafızada yoksa GitHub'dan çek
            data = await _githubService.GetRepositoriesAsync(username);

            // Hafızaya at (1 saat)
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(1));

            _memoryCache.Set(cacheKey, data, cacheEntryOptions);
        }

        return Ok(data);
    }
}