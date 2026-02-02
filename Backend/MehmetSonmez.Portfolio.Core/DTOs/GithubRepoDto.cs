using System.Text.Json.Serialization; // <-- BU SATIR ÇOK ÖNEMLİ

namespace MehmetSonmez.Portfolio.Core.Dtos;

public class GithubRepoDto
{
    // GitHub 'name' gönderir, C# otomatik eşleştirir
    public string Name { get; set; }

    // GitHub 'description' gönderir
    public string Description { get; set; }

    // KRİTİK NOKTA: GitHub 'html_url' gönderir.
    // Biz burada 'JsonPropertyName' ile eşleştirme yapıyoruz.
    [JsonPropertyName("html_url")] 
    public string HtmlUrl { get; set; }

    public string Language { get; set; }

    // Aynı şekilde yıldız sayısı için de ayar yapıyoruz
    [JsonPropertyName("stargazers_count")]
    public int StargazersCount { get; set; }
}