using System.Xml.Linq;
using MehmetSonmez.Portfolio.Core.Dtos;
using System.Text.RegularExpressions;
using MehmetSonmez.Portfolio.Core.DTOs;

namespace MehmetSonmez.Portfolio.Service.Concrete;

public class MediumService
{
    private readonly HttpClient _httpClient;

    public MediumService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<MediumPostDto>> GetPostsAsync(string username)
    {
        // Kullanıcı adının başında @ yoksa biz ekliyoruz
        var rssUrl = $"https://medium.com/feed/@{username}";
        var posts = new List<MediumPostDto>();

        try
        {
            // RSS verisini çek
            var rssContent = await _httpClient.GetStringAsync(rssUrl);
            
            // XML'i parse et
            var xDoc = XDocument.Parse(rssContent);
            
            // Medium içeriği için özel namespace
            XNamespace contentNs = "http://purl.org/rss/1.0/modules/content/";

            foreach (var item in xDoc.Descendants("item"))
            {
                var content = item.Element(contentNs + "encoded")?.Value ?? "";
                
                // 1. İçerikten ilk resmi bul (Regex ile)
                var imgMatch = Regex.Match(content, "<img.+?src=[\"'](.+?)[\"'].*?>", RegexOptions.IgnoreCase);
                // Eğer resim bulamazsa varsayılan bir görsel kullan
                var thumbnail = imgMatch.Success ? imgMatch.Groups[1].Value : "https://miro.medium.com/v2/resize:fit:1400/1*c_fi_7 ToE 4maT0.png";

                // 2. Özet çıkarmak için HTML etiketlerini temizle
                var plainText = Regex.Replace(content, "<.*?>", string.Empty);
                var summary = plainText.Length > 120 ? plainText.Substring(0, 120) + "..." : plainText;

                posts.Add(new MediumPostDto
                {
                    Title = item.Element("title")?.Value,
                    Link = item.Element("link")?.Value,
                    PubDate = item.Element("pubDate")?.Value,
                    Categories = item.Elements("category").Select(x => x.Value).ToList(),
                    Thumbnail = thumbnail,
                    Summary = summary
                });
            }
        }
        catch (Exception ex)
        {
            // Hata olursa konsola yaz ama boş liste dön ki site çökmesin
            Console.WriteLine($"Medium RSS Hatası: {ex.Message}");
        }

        return posts;
    }
}