"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, Code, ExternalLink, AlertCircle } from "lucide-react";

// Backend'den gelen yeni formata (snake_case) göre güncelledik
interface Repo {
  name: string;
  description: string;
  html_url: string;        // <-- DÜZELTME: htmlUrl yerine html_url
  language: string;
  stargazers_count: number; // <-- DÜZELTME: stargazersCount yerine stargazers_count
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Backend URL (Env yoksa localhost)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5184/api";

  useEffect(() => {
    fetch(`${API_URL}/github/mehmet2725`)
      .then((res) => {
        if (!res.ok) throw new Error("API Yanıt vermedi");
        return res.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Veri çekilemedi:", err);
        setError("Github verileri şu an yüklenemiyor.");
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Code className="text-cyan-400" size={32} />
          Projelerim
        </h1>
        <p className="text-slate-400 mb-10">
          GitHub üzerindeki açık kaynak kodlu çalışmalarım ve katkılarım.
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
             <p className="text-cyan-400 animate-pulse">GitHub verileri yükleniyor...</p>
          </div>
        ) : error ? (
           <div className="p-6 border border-red-500/50 bg-red-500/10 rounded-xl text-red-200 flex items-center gap-3">
              <AlertCircle size={24} />
              {error}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.html_url} // <-- DÜZELTME: html_url kullanıyoruz
                target="_blank"
                rel="noopener noreferrer" // Güvenlik ve performans için
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                // "group" class'ı hover efektleri için önemli
                className="group relative bg-[#1e293b]/50 border border-slate-700 hover:border-cyan-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col h-full cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-800 rounded-lg text-cyan-400 group-hover:text-white group-hover:bg-cyan-600 transition-colors">
                    <Github size={24} />
                  </div>
                  <ExternalLink size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                  {repo.name}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                  {repo.description || "Bu proje için henüz detaylı bir açıklama girilmedi."}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto">
                   <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      {repo.language || "Code"}
                   </div>
                   <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <Star size={14} className="text-yellow-500" />
                      {repo.stargazers_count} {/* <-- DÜZELTME */}
                   </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}