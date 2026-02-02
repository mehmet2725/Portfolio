// components/Sidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, Briefcase, BookOpen, Mail, Menu, X, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils"; // Eğer lib/utils yoksa class birleştirme için basit bir yöntem kullanırız, aşağıda açıklayacağım.

const menuItems = [
  { name: "Anasayfa", icon: Home, path: "/" },
  { name: "Hakkımda", icon: User, path: "/about" }, // Bu sayfaları sonra oluşturacağız
  { name: "Projeler", icon: Briefcase, path: "/projects" },
  { name: "Blog", icon: BookOpen, path: "/blog" },
  { name: "İletişim", icon: Mail, path: "/contact" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* MOBİL MENÜ BUTONU (Sadece küçük ekranda görünür) */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-cyan-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : 0 }} // Mobilde aç/kapa mantığını CSS ile de destekleyeceğiz
        className={`fixed left-0 top-0 h-full bg-[#0f172a] border-r border-slate-800 text-white w-64 z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* PROFİL KISMI */}
          <div className="flex flex-col items-center mb-10 mt-4">
            <div className="w-24 h-24 rounded-full border-4 border-cyan-500 overflow-hidden mb-4 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <img src="https://github.com/mehmet2725.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-white">Mehmet Sönmez</h2>
            <p className="text-xs text-slate-400">Full Stack Developer</p>
          </div>

          {/* NAVİGASYON LİNKLERİ */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)} // Mobilde linke tıklayınca menü kapansın
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                    ? "bg-cyan-600/20 text-cyan-400 border border-cyan-600/50"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  <item.icon size={20} className={isActive ? "text-cyan-400" : "group-hover:text-cyan-400 transition-colors"} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* SOSYAL MEDYA (FOOTER) */}
          <div className="pt-6 border-t border-slate-800 flex justify-center gap-4">
            <a
              href="https://github.com/mehmet2725"
              target="_blank"                  // <-- YENİ SEKME KOMUTU
              rel="noopener noreferrer"        // <-- GÜVENLİK İÇİN
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mehmet-s%C3%B6nmez35/" // BURASI SENİN LİNKİN
              target="_blank"                  // <-- YENİ SEKME KOMUTU
              rel="noopener noreferrer"        // <-- GÜVENLİK İÇİN
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </motion.aside>

      {/* MOBİLDE ARKA PLANI KARARTMA (Overlay) */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
        />
      )}
    </>
  );
}