using System.Net.Http.Json;
using MehmetSonmez.Portfolio.Core.Dtos; // Namespace'in Dtos olduğundan emin ol (küçük/büyük harf)
using Microsoft.Extensions.Configuration; // Eklendi

namespace MehmetSonmez.Portfolio.Service.Concrete;

public class GithubService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration; // Eklendi

    public GithubService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "MehmetSonmezPortfolio");
    }

    public async Task<List<GithubRepoDto>> GetRepositoriesAsync(string usernameFromController) 
    {
        // Not: Controller'dan parametre olarak da gelebilir, 
        // ancak biz varsayılanı appsettings'den alalım eğer boş gelirse.
        
        var configUsername = _configuration["GithubSettings:Username"];
        var targetUser = !string.IsNullOrEmpty(usernameFromController) ? usernameFromController : configUsername;
        var baseUrl = _configuration["GithubSettings:ApiUrl"];

        // En son güncellenen 6 projeyi çekelim
        var url = $"{baseUrl}{targetUser}/repos?sort=updated&per_page=6";
        
        try 
        {
            var repos = await _httpClient.GetFromJsonAsync<List<GithubRepoDto>>(url);
            return repos ?? new List<GithubRepoDto>();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"GitHub Hatası: {ex.Message}");
            return new List<GithubRepoDto>();
        }
    }
}