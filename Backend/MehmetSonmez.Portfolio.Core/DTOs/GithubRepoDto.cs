using System;

namespace MehmetSonmez.Portfolio.Core.Dtos;

public class GithubRepoDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string HtmlUrl { get; set; } = string.Empty; // Projenin linki
    public string Language { get; set; } = string.Empty;
    public int StargazersCount { get; set; } // Yıldız sayısı
    public DateTime UpdatedAt { get; set; }
}
