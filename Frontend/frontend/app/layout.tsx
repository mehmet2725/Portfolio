// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; // Yeni oluşturduğumuz bileşen

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mehmet Sönmez | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#020617] text-slate-200`}>
        <div className="flex min-h-screen">
          {/* SOL TARAFTA SIDEBAR */}
          <Sidebar />

          {/* SAĞ TARAFTA İÇERİK ALANI */}
          {/* md:ml-64 diyerek masaüstünde içeriği sidebar kadar sağa itiyoruz */}
          <main className="flex-1 md:ml-64 p-8 transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}