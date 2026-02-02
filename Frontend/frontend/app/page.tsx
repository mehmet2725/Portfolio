"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal, Layout, Database, BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-6xl mx-auto px-4">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        {/* Etiket - İş Durumu */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/30 border border-green-500/30 text-green-400 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Open for Work (Junior Full Stack)
        </div>

        {/* Ana Başlık */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          Merhaba, Ben <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Mehmet.</span>
          <br />
          <span className="text-slate-400 text-4xl md:text-6xl">Jr. Full Stack Developer</span>
        </h1>

        {/* Alt Açıklama - CV Özeti */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Amasya Üniversitesi Bilgisayar Programcılığı mezunu ve Acunmedya Akademi Full-Stack eğitimi almış bir geliştiriciyim. 
          <span className="text-cyan-400 mx-1">.NET</span> ve <span className="text-purple-400 mx-1">React/Next.js</span> teknolojileriyle modern web çözümleri üretiyorum.
        </p>

        {/* Butonlar */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-900/20"
          >
            Projelerimi İncele
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/blog" 
            className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen size={20} className="text-yellow-400" />
            Medium Yazılarım
          </Link>
        </div>
      </motion.div>

      {/* Alt Kartlar (Yetenek Özeti) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
      >
        {/* Backend */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
          <Terminal className="text-cyan-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Backend (.NET)</h3>
          <p className="text-slate-400">C#, Clean Architecture ve SQL veritabanı yönetimi ile sağlam API altyapıları.</p>
        </div>

        {/* Frontend */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
          <Layout className="text-purple-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Frontend (React)</h3>
          <p className="text-slate-400">Next.js, Tailwind CSS ve Modern JavaScript ile responsive arayüzler.</p>
        </div>

        {/* Full Stack */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-green-500/30 transition-colors">
          <Database className="text-green-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Veri & Entegrasyon</h3>
          <p className="text-slate-400">MSSQL, MySQL ve REST API entegrasyonları ile uçtan uca proje geliştirme.</p>
        </div>
      </motion.div>

    </div>
  );
}