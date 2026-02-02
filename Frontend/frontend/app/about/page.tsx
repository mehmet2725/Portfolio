"use client";

import { motion } from "framer-motion";
import { 
  MapPin, Mail, Download, Server, 
  Terminal, Briefcase, GraduationCap, 
  Code2, Layout, Database 
} from "lucide-react";

// Animasyon ayarları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* --- SOL KOLON (PROFİL KARTI) --- */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-6 sticky top-6 backdrop-blur-sm">
            
            {/* Profil Resmi - GitHub'dan Çekiliyor */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 border-2 border-slate-700 group">
              <img 
                src="https://github.com/mehmet2725.png" 
                alt="Mehmet Sönmez"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-1">Mehmet Sönmez</h2>
            <p className="text-cyan-400 text-center font-medium mb-6">Full Stack Developer</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                  <MapPin size={18} />
                </div>
                <span>Şahinbey / Gaziantep</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400">
                  <Mail size={18} />
                </div>
                <span className="text-sm">mehmetsonmez5879@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-green-400">
                  <GraduationCap size={18} />
                </div>
                <span className="text-sm">Acunmedya Akademi Mezunu</span>
              </div>
            </div>

            <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20 group">
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              CV İndir
            </button>
          </div>
        </motion.div>

        {/* --- SAĞ KOLON (İÇERİK) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Biyografi */}
          <motion.div variants={itemVariants} className="bg-[#1e293b]/30 border border-slate-800 p-8 rounded-2xl">
             <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Terminal className="text-cyan-400" />
                Kimim Ben?
             </h3>
             <p className="text-slate-400 leading-relaxed text-lg">
                Modern web teknolojilerine tutkulu, Full Stack bir yazılım geliştiriciyim. 
                <span className="text-cyan-400 font-medium mx-1">.NET</span> ekosistemi ve 
                <span className="text-purple-400 font-medium mx-1">React/Next.js</span> ile 
                ölçeklenebilir projeler geliştiriyorum. Karmaşık problemleri basit, temiz kod mimarileriyle çözmeyi severim.
             </p>
          </motion.div>

          {/* Yetenekler Grid (CV + Modern Stack) */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Code2 className="text-cyan-400" />
                Teknik Yetenekler
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Backend Skill */}
                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 group-hover:bg-cyan-900/30">
                            <Server size={20} />
                        </div>
                        <h4 className="font-bold text-slate-200">Backend & Database</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['C#', '.NET Core', 'MSSQL', 'MySQL', 'Clean Architecture'].map(tag => (
                            <span key={tag} className="text-xs font-mono bg-slate-800 text-cyan-200 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Frontend Skill */}
                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-purple-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-slate-800 rounded-lg text-purple-400 group-hover:bg-purple-900/30">
                            <Layout size={20} />
                        </div>
                        <h4 className="font-bold text-slate-200">Frontend Development</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'].map(tag => (
                            <span key={tag} className="text-xs font-mono bg-slate-800 text-purple-200 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
          </motion.div>

          {/* Eğitim / Deneyim Timeline (CV Verileri) */}
          <motion.div variants={itemVariants}>
             <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="text-cyan-400" />
                Deneyim & Eğitim
             </h3>
             <div className="space-y-8 border-l-2 border-slate-800 ml-3 pl-8">
                
                {/* Acunmedya */}
                <div className="relative">
                   <span className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <h4 className="text-lg font-bold text-white">Full-Stack Bootcamp</h4>
                      <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded w-fit mt-1 sm:mt-0">Nisan - Aralık 2025</span>
                   </div>
                   <div className="text-purple-300 text-sm font-medium mb-2">Acunmedya Akademi</div>
                   <p className="text-slate-400 text-sm">
                      Kapsamlı Full-Stack yazılım eğitimi. Modern web teknolojileri, veritabanı mimarisi ve proje geliştirme süreçleri üzerine yoğunlaştım.
                   </p>
                </div>

                {/* İş Deneyimi */}
                <div className="relative">
                   <span className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <h4 className="text-lg font-bold text-white">IT & Lab Assistant</h4>
                      <span className="text-xs bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded w-fit mt-1 sm:mt-0">Nisan - Haziran 2025</span>
                   </div>
                   <div className="text-cyan-300 text-sm font-medium mb-2">İŞKUR Gençlik Programı</div>
                   <p className="text-slate-400 text-sm">
                      Bilgisayar laboratuvarlarının donanım ve yazılım bakımı, ağ sorunlarının giderilmesi ve teknik destek sağlanması görevlerini üstlendim.
                   </p>
                </div>

                {/* Üniversite */}
                <div className="relative">
                   <span className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-slate-600 border-2 border-slate-900"></span>
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <h4 className="text-lg font-bold text-white">Bilgisayar Programcılığı</h4>
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded w-fit mt-1 sm:mt-0">2023 - 2025</span>
                   </div>
                   <div className="text-slate-300 text-sm font-medium mb-2">Amasya Üniversitesi</div>
                   <p className="text-slate-400 text-sm">
                      Yazılım temelleri, algoritma mantığı ve veritabanı yönetimi üzerine ön lisans eğitimi.
                   </p>
                </div>

             </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}