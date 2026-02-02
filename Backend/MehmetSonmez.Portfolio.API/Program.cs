using MehmetSonmez.Portfolio.Data.Contexts;
using MehmetSonmez.Portfolio.Service.Abstract;
using MehmetSonmez.Portfolio.Service.Concrete;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. SERVİSLERİ EKLE
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache(); // Cache servisi

// CORS (Çok Önemli: En geniş izin)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Veritabanı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Servisler
builder.Services.AddHttpClient<GithubService>();
builder.Services.AddHttpClient<MediumService>();
// ProjectManager servisi varsa buraya ekle:
// builder.Services.AddScoped<IProjectService, ProjectManager>();

var app = builder.Build();

// 2. UYGULAMA AKIŞI (Middleware Sıralaması Kritiktir)

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS Yönlendirmesini KAPATTIK (Lokalde sorun çıkarmaması için)
// app.UseHttpsRedirection(); 

// CORS'u Devreye Sok (Authorization'dan ÖNCE olmalı)
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();