"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, Code, ExternalLink } from "lucide-react";

interface Repo {
  name: string;
  description: string;
  htmlUrl: string;
  language: string;
  stargazersCount: number;
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost:5184/api/github/mehmet2725") 
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Veri çekilemedi:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
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
          <div className="text-cyan-400 animate-pulse">GitHub verileri yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.htmlUrl}
                target="_blank"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#1e293b]/50 border border-slate-700 hover:border-cyan-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-800 rounded-lg text-cyan-400 group-hover:text-white group-hover:bg-cyan-600 transition-colors">
                    <Github size={24} />
                  </div>
                  <ExternalLink size={16} className="text-slate-500 group-hover:text-cyan-400" />
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                  {repo.name}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                  {repo.description || "Açıklama bulunmuyor ama kodları harika!"}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto">
                   <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      {repo.language || "Code"}
                   </div>
                   <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <Star size={14} className="text-yellow-500" />
                      {repo.stargazersCount}
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