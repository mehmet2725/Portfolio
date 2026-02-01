import Link from "next/link";

// Veri Tipleri
interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string;
  githubUrl?: string;
}

// Backend'den Veri Çekme (Server Side)
async function getProjects() {
  try {
    // SENİN PORTUN: 5184
    const res = await fetch('http://localhost:5184/api/Projects', { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return [];
    
    return res.json();
  } catch (error) {
    console.error("API Hatası:", error);
    return [];
  }
}

export default async function Home() {
  const projects: Project[] = await getProjects();

  return (
    <main className="min-h-screen p-4 md:p-10 max-w-7xl mx-auto font-sans">
      {/* HEADER ALANI */}
      <header className="mb-12 pt-10">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Mehmet Sönmez.
        </h1>
        <p className="text-xl text-gray-400 mt-4 max-w-2xl border-l-4 border-purple-500 pl-4">
          .NET 10 & Next.js Full-Stack Developer. Klasik çözümlerden sıkılanlar için modern mimariler inşa ediyorum.
        </p>
      </header>

      {/* BENTO GRID BAŞLIYOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        
        {/* KUTU 1: HAKKIMDA (Büyük Kutu) */}
        <div className="row-span-2 col-span-1 md:col-span-2 bg-gray-900/80 border border-gray-800 rounded-3xl p-8 hover:border-purple-500/50 transition-all flex flex-col justify-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <h2 className="text-3xl font-bold mb-4 text-white z-10">Mimari Tutkusu</h2>
            <p className="text-gray-400 text-lg z-10">
                Sadece kod yazmıyorum; Clean Architecture, DDD ve Microservices prensipleriyle sürdürülebilir sistemler tasarlıyorum.
            </p>
        </div>

        {/* KUTU 2: GITHUB */}
        <Link href="https://github.com/mehmetsnmz" target="_blank" className="bg-black border border-gray-800 rounded-3xl p-6 flex flex-col justify-between hover:bg-gray-900 transition-colors group cursor-pointer">
            <div className="text-4xl">🐱‍👤</div>
            <div>
                <h3 className="text-gray-200 font-bold group-hover:text-purple-400 transition-colors">GitHub</h3>
                <p className="text-sm text-gray-500">Projelerimi İncele &rarr;</p>
            </div>
        </Link>

        {/* KUTU 3: LINKEDIN */}
        <Link href="https://linkedin.com/in/mehmetsnmz" target="_blank" className="bg-[#0077b5] rounded-3xl p-6 flex flex-col justify-between text-white hover:opacity-90 transition-opacity cursor-pointer">
            <div className="text-4xl">💼</div>
            <div>
                <h3 className="font-bold">LinkedIn</h3>
                <p className="text-sm text-blue-100">Bağlantı Kuralım &rarr;</p>
            </div>
        </Link>

        {/* KUTU 4: DİNAMİK PROJELER (Backend'den Gelenler) */}
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="row-span-1 col-span-1 md:col-span-2 bg-gray-900 border border-gray-700 rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform hover:border-purple-500/30">
              <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded-lg border border-purple-700/50">
                      {project.techStack ? project.techStack.split(',')[0] : 'C#'}
                  </span>
              </div>
              <div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>
                  <div className="text-xs text-gray-500 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                      {project.techStack}
                  </div>
              </div>
            </div>
          ))
        ) : (
           /* Veri gelmezse gösterilecek boş kutu */
           <div className="col-span-2 border border-dashed border-gray-700 rounded-3xl p-6 flex items-center justify-center text-gray-500">
              Henüz proje eklenmedi veya Backend kapalı.
           </div>
        )}

        {/* KUTU 5: MEDIUM (Sarı Kutu) */}
        <div className="row-span-1 col-span-1 bg-yellow-900/10 border border-yellow-700/30 rounded-3xl p-6 flex flex-col justify-between">
            <div className="text-yellow-500 text-4xl">✍️</div>
            <div>
                <h3 className="text-yellow-500 font-bold text-xl">Medium</h3>
                <p className="text-xs text-yellow-700/70 mt-1">Entegrasyon Bekleniyor...</p>
            </div>
        </div>

      </div>
    </main>
  );
}