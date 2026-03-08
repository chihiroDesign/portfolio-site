'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SkillChartSection } from '@/components/SkillChart';



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
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <section className="relative pt-32 pb-20 flex flex-col items-center text-center px-6 overflow-hidden">
        {/* 背景画像（Projectsと同様） */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/chihiroDesign_keyImage.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.25,
          }}
        />
        {/* 下方向へ黒くなるグラデーション */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, #0a0a0a 100%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* 顔写真：inlineスタイルで確実に円内に収める */}
          <div
            style={{
              width: '128px',
              height: '128px',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              marginBottom: '24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
              outline: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ProfileImage.jpg"
              alt="CHIHIRO"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                display: 'block',
              }}
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-1">CHIHIRO</h1>
          <p className="text-sm text-white/40 tracking-widest uppercase mb-6">AI Visual Artist</p>

          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#3b82f6] hover:bg-[#2563eb] px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[#3b82f6]/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              Portfolio
            </a>
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
              </svg>
              CV
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-6 pb-20">

        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-3">About</h2>
          <div className="text-sm text-white/70 leading-relaxed space-y-4">
            <p><span className="text-white font-semibold">ココロユサブルな体験を、あらゆる表現で。</span></p>
            <p>私が創り出すのは、単なるデザインや映像ではありません。それは、人の心を揺さぶり、思わず誰かに伝えたくなるような「見たことのない楽しみ」です。</p>
            <p>AI、3D、UI/UX、映像――。私はこれらの技術を自在に組み合わせ、プロジェクトの目的に応じて最適なクリエイティブを設計します。しかし、それらはあくまで手段。私の本当の目的は、あなたのビジネスやプロジェクトに「ココロユサブル」な価値を加え、確実な成果へと繋げることです。</p>
            <p>企画から実装、そしてその先の運用まで。全体を俦瞰し、一貫した体験を設計することで、まだ誰も見たことのない楽しみを、あなたと共に創り上げます。</p>          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-4">Skill Chart</h2>
          <SkillChartSection />
        </section>

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
      </main>

      <Footer />
    </div>
  );
}
