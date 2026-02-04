"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, MapPin, Send, Github, Linkedin,
  MessageSquare, Terminal, User, FileText, Phone
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- BACKEND YOK, DERT YOK ---
    // Bu kod kullanıcının mail uygulamasını açar
    const mailToLink = `mailto:info@mehmetsonmez.tr?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent("Gönderen: " + formState.name + "\nEmail: " + formState.email + "\n\nMesaj:\n" + formState.message)}`;
    
    // Yeni sekmede maili aç
    window.location.href = mailToLink;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >

        {/* --- SOL KOLON (BİLGİLER) --- */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <MessageSquare className="text-cyan-400" size={32} />
              İletişime Geç
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Projeleriniz veya tanışmak için bana ulaşabilirsiniz. 
              Mail butonuna bastığınızda varsayılan posta uygulamanız açılacaktır.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Kartı */}
            <a href="mailto:info@mehmetsonmez.tr" className="flex items-center gap-4 p-4 bg-[#1e293b]/50 border border-slate-700 rounded-xl hover:border-cyan-500/50 transition-colors group cursor-pointer">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-slate-200 font-semibold">Email</h3>
                <p className="text-slate-400 text-sm truncate">info@mehmetsonmez.tr</p>
              </div>
            </a>

            {/* Telefon ve Lokasyon Kartları (Aynı Kalıyor) */}
             <div className="flex items-center gap-4 p-4 bg-[#1e293b]/50 border border-slate-700 rounded-xl hover:border-green-500/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-slate-200 font-semibold">Telefon</h3>
                <p className="text-slate-400 text-sm">+90 551 950 22 82</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#1e293b]/50 border border-slate-700 rounded-xl hover:border-purple-500/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-slate-200 font-semibold">Konum</h3>
                <p className="text-slate-400 text-sm">Şahinbey, Gaziantep</p>
              </div>
            </div>
          </div>

           {/* Sosyal Medya Linkleri (Aynı) */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Terminal size={18} className="text-yellow-400" />
              Sosyal Medya
            </h3>
            <div className="flex gap-4">
              <a href="https://github.com/mehmet2725" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mehmet-s%C3%B6nmez35/" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* --- SAĞ KOLON (FORM) --- */}
        <div className="bg-[#1e293b]/30 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Ad Soyad</label>
                <input type="text" name="name" required value={formState.name} onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 transition-all" placeholder="İsim Soyisim" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input type="email" name="email" required value={formState.email} onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 transition-all" placeholder="ornek@mail.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Konu</label>
              <input type="text" name="subject" required value={formState.subject} onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 transition-all" placeholder="Konu Başlığı" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Mesajınız</label>
              <textarea name="message" required rows={5} value={formState.message} onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 transition-all resize-none" placeholder="Mesajınızı Giriniz "></textarea>
            </div>

            <button type="submit"
              className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg transition-all active:scale-95">
              <Send size={18} />
              Mail Uygulamasıyla Gönder
            </button>
            
          </form>
        </div>

      </motion.div>
    </div>
  );
}