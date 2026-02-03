import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, 
  },
  // output: "export" BURADAN SİLİNDİ (Vercel için gerek yok)
};

export default nextConfig;