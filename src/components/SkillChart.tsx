'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

// スキル項目：CHIHIROの強みを横断的に表現。値はすべて高水準でアピール
const skillData = [
  { name: 'AI Generation', value: 95 },
  { name: 'Creative Direction', value: 90 },
  { name: 'Visual Design', value: 88 },
  { name: 'Video / Motion', value: 82 },
  { name: 'IP / Character Dev', value: 85 },
  { name: '3D / AR', value: 75 },
  { name: 'UX / Strategy', value: 78 },
];

// --- Animated horizontal bar ---
function SkillBar({ name, value, delay }: { name: string; value: number; delay: number }) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setWidth(value), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-white/60 tracking-wide">{name}</span>
        <span
          className="text-xs font-mono text-[#818cf8] tabular-nums transition-all duration-1000"
          style={{ opacity: width > 0 ? 1 : 0 }}
        >
          {width}%
        </span>
      </div>
      <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #3b82f6 0%, #818cf8 60%, #a78bfa 100%)',
            boxShadow: '0 0 8px 1px rgba(99,102,241,0.6)',
          }}
        />
        {width > 0 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-lg transition-all duration-1000 ease-out"
            style={{
              left: `calc(${width}% - 5px)`,
              boxShadow: '0 0 6px 2px rgba(129,140,248,0.8)',
            }}
          />
        )}
      </div>
    </div>
  );
}

// --- Radar chart ---
function SkillRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const labels = skillData.map((s) => s.name);
    const values = skillData.map((s) => s.value);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: 'rgba(99,102,241,0.18)',
            borderColor: 'rgba(129,140,248,0.85)',
            borderWidth: 1.5,
            pointBackgroundColor: '#818cf8',
            pointBorderColor: '#fff',
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        animation: {
          duration: 1400,
          easing: 'easeOutQuart',
        },
        scales: {
          r: {
            min: 60,   // 最小値を60に設定 → 全スキルが高水準に見える
            max: 100,
            ticks: {
              display: false,
              stepSize: 10,
            },
            grid: {
              color: 'rgba(255,255,255,0.08)',
            },
            angleLines: {
              color: 'rgba(255,255,255,0.08)',
            },
            pointLabels: {
              color: 'rgba(255,255,255,0.5)',
              font: { size: 10, family: 'inherit' },
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15,15,25,0.9)',
            borderColor: 'rgba(129,140,248,0.4)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.6)',
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.raw}%`,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [visible]);

  return (
    <div ref={containerRef} className="flex justify-center">
      <canvas ref={canvasRef} style={{ maxWidth: '300px', maxHeight: '300px' }} />
    </div>
  );
}

export function SkillChartSection() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      {/* Radar */}
      <SkillRadar />

      {/* Divider */}
      <div className="border-t border-white/10 my-6" />

      {/* Bars */}
      <div className="space-y-5">
        {skillData.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} value={skill.value} delay={i * 80} />
        ))}
      </div>
    </div>
  );
}
