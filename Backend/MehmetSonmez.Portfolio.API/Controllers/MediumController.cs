using MehmetSonmez.Portfolio.Service.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory; // Cache kütüphanesi

namespace MehmetSonmez.Portfolio.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MediumController : ControllerBase
{
    private readonly MediumService _mediumService;
    private readonly IConfiguration _configuration;
    private readonly IMemoryCache _memoryCache; // Cache servisi

    public MediumController(MediumService mediumService, IConfiguration configuration, IMemoryCache memoryCache)
    {
        _mediumService = mediumService;
        _configuration = configuration;
        _memoryCache = memoryCache;
    }

    [HttpGet]
    public async Task<IActionResult> GetPosts()
    {
        // 1. Cache anahtarımız (Hafızadaki etiket)
        string cacheKey = "MediumPosts";

        // 2. Hafızada var mı diye bak?
        if (!_memoryCache.TryGetValue(cacheKey, out var posts))
        {
            // 3. Yoksa git Medium'dan çek
            var username = _configuration["MediumSettings:Username"] ?? "smehmet.exe";
            posts = await _mediumService.GetPostsAsync(username);

            // 4. Hafızaya kaydet (1 saatliğine)
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(1));

            _memoryCache.Set(cacheKey, posts, cacheEntryOptions);
        }

        // 5. Veriyi döndür
        return Ok(posts);
    }
}