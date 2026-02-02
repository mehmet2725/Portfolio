"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    thumbnail: string;
    summary: string;
    categories: string[];
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    // API URL ayarı
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5184/api";

    useEffect(() => {
        // Önce loading'i true yap
        setLoading(true);

        fetch(`${API_URL}/medium`)
            .then(async (res) => {
                // HATA YAKALAMA BLOĞU
                if (!res.ok) {
                    // Eğer sunucu 200 (Başarılı) dönmezse hatayı fırlat
                    throw new Error(`Sunucu Hatası: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Medium verisi çekilemedi:", err);
                // Hatayı ekranda göstermek istersen state'e atabilirsin ama şimdilik konsol yeterli
                setLoading(false);
            });
    }, [API_URL]);

    // Tarihi Türkçe formatına çevirme
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        } catch {
            return dateString;
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <BookOpen className="text-yellow-400" size={32} />
                    Blog Yazılarım
                </h1>
                <p className="text-slate-400 mb-10">
                    Medium üzerindeki yazılarım ve teknoloji notlarım.
                </p>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
                        <p className="text-yellow-400 animate-pulse">Yazılar Medium'dan çekiliyor...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="p-6 bg-slate-800/50 rounded-xl text-slate-400 text-center border border-slate-700">
                        Henüz hiç yazı bulunamadı veya bağlantıda bir sorun var.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.a
                                key={index}
                                href={post.link}
                                target="_blank"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col bg-[#1e293b]/50 border border-slate-700 hover:border-yellow-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] h-full"
                            >
                                {/* Resim Alanı */}
                                <div className="relative h-48 overflow-hidden bg-slate-800">
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-yellow-400 text-xs px-2 py-1 rounded flex items-center gap-1">
                                        <Calendar size={12} />
                                        {formatDate(post.pubDate)}
                                    </div>
                                </div>

                                {/* İçerik */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                                        {post.summary}
                                    </p>

                                    {/* Etiketler (İlk 3 tanesi) */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.categories.slice(0, 3).map(cat => (
                                            <span key={cat} className="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center text-yellow-500 text-sm font-medium gap-1 mt-auto group-hover:gap-2 transition-all">
                                        Devamını Oku <ArrowRight size={16} />
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