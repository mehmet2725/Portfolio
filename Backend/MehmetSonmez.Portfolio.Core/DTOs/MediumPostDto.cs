using System;

namespace MehmetSonmez.Portfolio.Core.DTOs;

public class MediumPostDto
{
    public string Title { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public string PubDate { get; set; } = string.Empty;
    public string Thumbnail { get; set; } = string.Empty; // Yazının ilk resmini buraya alacağız
    public string Summary { get; set; } = string.Empty;   // Kısa özet
    public List<string> Categories { get; set; } = new(); // Etiketler
}
