using System;

namespace MehmetSonmez.Portfolio.Core.Entities;

public class Project : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string GitHubUrl { get; set; } = string.Empty;
    public string LiveUrl { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
}
