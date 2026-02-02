using System.Net.Http.Json;
using MehmetSonmez.Portfolio.Core.Dtos;

namespace MehmetSonmez.Portfolio.Service.Concrete;

public class GithubService
{
    private readonly HttpClient _httpClient;

    public GithubService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        // User-Agent zorunludur GitHub API için
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "MehmetSonmezPortfolio");
    }

    public async Task<List<GithubRepoDto>> GetRepositoriesAsync(string username)
    {
        // En son güncellenen 6 projeyi çekelim
        var url = $"https://api.github.com/users/mehmet2725/repos?sort=updated&per_page=6";
        
        try 
        {
            var repos = await _httpClient.GetFromJsonAsync<List<GithubRepoDto>>(url);
            return repos ?? new List<GithubRepoDto>();
        }
        catch (Exception ex)
        {
            // Hata olursa boş liste dön, loglama eklenebilir.
            Console.WriteLine($"GitHub Hatası: {ex.Message}");
            return new List<GithubRepoDto>();
        }
    }
}