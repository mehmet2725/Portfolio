using MehmetSonmez.Portfolio.Data.Contexts; // AppDbContext'i bulması için
using Microsoft.EntityFrameworkCore;         // UseSqlServer için
using MehmetSonmez.Portfolio.Service.Abstract;
using MehmetSonmez.Portfolio.Service.Concrete;

var builder = WebApplication.CreateBuilder(args);

// --------------------------------------------------------
// 1. SERVİSLERİN EKLENDİĞİ BÖLÜM (DI Container)
// --------------------------------------------------------

// Controller'ları sisteme ekle
builder.Services.AddControllers();

// CORS Politikası: Sadece Frontend'e izin ver
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Frontend adresin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Swagger / OpenAPI (API'yi test etmek için dokümantasyon)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Veritabanı Bağlantısı (DbContext)
// ConnectionString'i appsettings.json'dan okur.
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), sqlOptions => 
    {
        // Migration'ların "MehmetSonmez.Portfolio.Data" projesinde tutulacağını belirtiyoruz.
        // Bunu demezsek hata alırız çünkü API projesinde migration klasörü yok.
        sqlOptions.MigrationsAssembly("MehmetSonmez.Portfolio.Data");
    });
});


// Servisleri Bağla (Dependency Injection)
builder.Services.AddScoped<IProjectService, ProjectManager>();

var app = builder.Build();

// --------------------------------------------------------
// 2. MIDDLEWARE (UYGULAMA AKIŞI) BÖLÜMÜ
// --------------------------------------------------------

// Geliştirme ortamındaysak Swagger'ı aç
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowNextJS");

app.UseAuthorization();

app.MapControllers();

app.Run();