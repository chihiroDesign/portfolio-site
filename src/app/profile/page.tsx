'use client';

import { useState } from 'react';
import Link from 'next/link';

const skillData = [
  { name: 'AI Artist', value: 80 },
  { name: '3D Design', value: 25 },
  { name: 'Motion Design', value: 20 },
  { name: 'Graphic Design', value: 20 },
  { name: 'UI/UX Design', value: 10 },
  { name: 'Marketing', value: 8 },
  { name: 'Design Strategist', value: 7 },
];

const socialLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/chihirodesign3d/', icon: 'linkedin' },
  { label: 'note', url: 'https://note.com/chihirodesign', icon: 'note' },
  { label: 'Instagram', url: 'https://www.instagram.com/chihiro.design.ai/', icon: 'instagram' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@chihiro.design.ai', icon: 'tiktok' },
  { label: 'YouTube', url: 'https://www.youtube.com/@chihiroDesignAI', icon: 'youtube' },
];

const awards = [
  { year: '2025', title: 'AICU 月例漫画コンテスト ノンジャンル／art部門 受賞「POPPY GUMMY BEARS」' },
  { year: '2023', title: '生成AIアート アジアIPコンテスト2023 最優秀賞' },
  { year: '2022', title: 'Avatar Award 2022 優秀賞' },
  { year: '2021', title: 'Avatar Award 2021 入賞' },
  { year: '2021', title: '原宿ファッションスナップ2100 アバター部門 3位' },
];

const tools = [
  'DALL-E', 'Stable Diffusion', 'Veo3', 'Runway', 'Heygen', 'Kling',
  'Blender', 'After Effects', 'Premiere Pro', 'Photoshop', 'Illustrator', 'Figma',
  'Manus AI', 'ChatGPT', 'Gemini',
];

export default function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-sm">千</span>
            </div>
            <span className="text-sm font-medium tracking-wide hidden sm:block">chihiro Design PORTFOLIO</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors tracking-wide">Projects</Link>
            <Link href="/profile" className="text-sm text-white transition-colors tracking-wide">Profile</Link>
            <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors tracking-wide">Contact</Link>
          </div>
          <button className="md:hidden text-white/60" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm text-white/60">Projects</Link>
            <Link href="/profile" className="text-sm text-white">Profile</Link>
            <Link href="/contact" className="text-sm text-white/60">Contact</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-5 ring-2 ring-white/10">
            <img src="/images/chihiro-profile.jpg" alt="CHIHIRO" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">CHIHIRO</h1>
          <p className="text-sm text-white/40 tracking-widest uppercase mb-6">AI Visual Artist</p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              href="/#artist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              Portfolio
            </Link>
            <a
              href="https://drive.google.com/drive/folders/1wZ0XvBDIDCwPqJsFz2nVypgc4hmN0IPD?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#3b82f6] hover:bg-[#2563eb] px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[#3b82f6]/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              CV
            </a>
          </div>
        </div>

        {/* About */}
        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-3">About</h2>
          <div className="text-sm text-white/70 leading-relaxed space-y-3">
            <p>AI × 全体設計で、成果に直結する体験をデザインする。画像・動画・3D・AR・UI/UXを横断し、要件定義から制作、運用・プロモーションまでを一気通貫でリードします。</p>
            <p>全体像を設計し、実務に落とし込み、確実に成果へつなげることを得意としています。</p>
          </div>
        </section>

        {/* Skill Chart */}
        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-4">Skill Chart</h2>
          <div className="space-y-3">
            {skillData.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">{skill.name}</span>
                  <span className="text-white/30">{skill.value}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3b82f6] rounded-full"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-4">Tools & Skills</h2>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-4">Awards</h2>
          <div className="space-y-3">
            {awards.map((award, i) => (
              <div key={i} className="flex gap-4 text-sm">
                <span className="text-white/30 shrink-0 w-10">{award.year}</span>
                <span className="text-white/70">{award.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-4">Links</h2>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
