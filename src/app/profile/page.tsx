'use client';

import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const skillData = [
  { name: 'AI Artist', value: 80 },
  { name: '3D Design', value: 25 },
  { name: 'Motion Design', value: 20 },
  { name: 'Graphic Design', value: 20 },
  { name: 'UI/UX Design', value: 10 },
  { name: 'Marketing', value: 8 },
  { name: 'Design Strategist', value: 7 },
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

// アニメーション付き棒グラフ
function SkillBar({ name, value }: { name: string; value: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/60">{name}</span>
        <span className="text-[#3b82f6]">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3b82f6] rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero — 背景画像 + 顔写真 */}
      <section className="relative pt-28 pb-16 flex flex-col items-center text-center px-6 overflow-hidden">
        {/* 背景画像 */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/chihiroDesign_keyImage.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.18,
          }}
        />
        <div className="relative z-10 flex flex-col items-center">
          {/* 顔写真 */}
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-2 ring-white/20 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ProfileImage.png"
              alt="CHIHIRO"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-1">CHIHIRO</h1>
          <p className="text-sm text-white/40 tracking-widest uppercase mb-6">AI Visual Artist</p>

          {/* ボタン */}
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href="https://www.chihiro.design/"
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
            <a
              href="https://note.com/chihirodesign"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              note
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pb-20">

        {/* About */}
        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-3">About</h2>
          <div className="text-sm text-white/70 leading-relaxed space-y-4">
            <p>私が目指すものは、ただ綺麗なだけのデザインではありません。思わず誰かに話したくなるような、心が躍る、見たことのない「楽しみ」そのものです。その楽しみを届けるためなら、私はどんな手段でも使います。AIも、デザインも、3Dも、映像も、すべてはそのためのパワフルな道具です。</p>
            <p>プロジェクトの目的を一緒に考え、最適な体験を設計し、世の中に届けるまで。私は常に「どうすればもっと面白くなるか？」「どうすればもっと心が揺さぶられるか？」を問い続けます。</p>
            <p>テクノロジーとクリエイティブの力で、あなたと一緒に、まだ誰も見たことのない楽しみを創り出せることを楽しみにしています。</p>
          </div>
        </section>

        {/* Skill Chart */}
        <section className="mb-10">
          <h2 className="text-xs text-white/30 tracking-widest uppercase mb-4">Skill Chart</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            {skillData.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} value={skill.value} />
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
      </main>

      <Footer />
    </div>
  );
}
