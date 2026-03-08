"use client";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-white/50 mb-10 text-sm">
          お仕事のご依頼・ご相談はお気軽にどうぞ。
        </p>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-sm font-medium text-white/60 tracking-widest uppercase mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/chihirodesign3d/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <span className="text-sm group-hover:underline">LinkedIn</span>
                <span className="text-xs text-white/30">→ linkedin.com/in/chihirodesign3d</span>
              </a>
              <a
                href="https://note.com/chihirodesign"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <span className="text-sm group-hover:underline">note</span>
                <span className="text-xs text-white/30">→ note.com/chihirodesign</span>
              </a>
              <a
                href="https://www.instagram.com/chihiro.design.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <span className="text-sm group-hover:underline">Instagram</span>
                <span className="text-xs text-white/30">→ @chihiro.design.ai</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
