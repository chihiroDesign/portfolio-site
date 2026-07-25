"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Play, BookOpen, Music, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import projectsData from "@/data/projects.json";
import { Project } from "@/types";

function getYoutubeEmbedUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

function getGoogleDriveEmbedUrl(url: string): string | null {
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return null;
}

function isYoutubeLink(url?: string): boolean {
  if (!url) return false;
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function isGoogleDriveLink(url?: string): boolean {
  if (!url) return false;
  return url.includes("drive.google.com");
}

function isVideoLink(url?: string): boolean {
  return isYoutubeLink(url) || isGoogleDriveLink(url) || (!!url && url.includes("vimeo.com"));
}

function getLinkInfo(url: string): { label: string; icon: React.ReactNode } {
  if (url.includes("note.com")) {
    return { label: "記事を読む", icon: <BookOpen size={14} /> };
  }
  if (url.includes("alphapolis") || url.includes("ehon")) {
    return { label: "絵本を見る", icon: <BookOpen size={14} /> };
  }
  if (url.includes("linkco.re")) {
    return { label: "音楽を聴く", icon: <Music size={14} /> };
  }
  if (url.includes("x.com") || url.includes("twitter.com")) {
    return {
      label: "Xで見る",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    };
  }
  if (url.includes("tiktok.com")) {
    return { label: "TikTokで見る", icon: <ExternalLink size={14} /> };
  }
  if (url.includes("pinterest.com")) {
    return { label: "Pinterestで見る", icon: <ExternalLink size={14} /> };
  }
  if (isYoutubeLink(url) || isGoogleDriveLink(url)) {
    return { label: "動画を見る", icon: <Play size={14} /> };
  }
  if (url.includes("instagram.com")) {
    return { label: "Instagramで見る", icon: <ExternalLink size={14} /> };
  }
  return { label: "詳細を見る", icon: <ExternalLink size={14} /> };
}

export default function WorkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const project = (projectsData as Project[]).find((p) => p.id === id);

  useEffect(() => {
    if (!project) {
      router.replace("/");
    }
  }, [project, router]);

  if (!project) return null;

  const categories = Array.isArray(project.category)
    ? project.category
    : [project.category];

  const linkMovie = (project as any).linkMovie;
  const videoUrl =
    (linkMovie && isVideoLink(linkMovie) ? linkMovie : null) ||
    (isVideoLink(project.link) ? project.link : null);

  const embedUrl = videoUrl
    ? isYoutubeLink(videoUrl)
      ? getYoutubeEmbedUrl(videoUrl)
      : isGoogleDriveLink(videoUrl)
      ? getGoogleDriveEmbedUrl(videoUrl)
      : null
    : null;

  const imageUrl = (project as any).imageUrl || project.thumbnail;
  const audioUrl = (project as any).audioUrl;
  const linkDocLabel = (project as any).linkDocLabel;

  const linkDoc = (project as any).linkDoc;
  const extraLinks: { label: string; url: string }[] = (project as any).extraLinks || [];
  const links: string[] = [];
  if (project.link && !isVideoLink(project.link)) {
    links.push(project.link);
  }
  if (linkMovie && linkMovie !== project.link && !isVideoLink(linkMovie) && !links.includes(linkMovie)) {
    links.push(linkMovie);
  }
  if (linkDoc && !links.includes(linkDoc)) {
    links.push(linkDoc);
  }

  const handleCategoryClick = (cat: string) => {
    router.push(`/?category=${encodeURIComponent(cat)}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-28 pb-20">
        {/* Back button */}
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft size={16} />
          戻る
        </motion.button>

        <motion.div
          className="bg-[#111] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Media */}
          {embedUrl ? (
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : audioUrl ? (
            <AudioPlayer src={audioUrl} poster={imageUrl} alt={project.title} />
          ) : imageUrl ? (
            <div className="relative w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={project.title}
                className="w-full h-auto block"
              />
            </div>
          ) : null}

          {/* Links */}
          {(links.length > 0 || extraLinks.length > 0) && (
            <div className="flex flex-wrap gap-3 px-6 py-4 border-b border-white/5">
              {links.map((url) => {
                const info = getLinkInfo(url);
                const label = url === linkDoc && linkDocLabel ? linkDocLabel : info.label;
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium transition-colors shadow-lg shadow-[#3b82f6]/20"
                  >
                    {info.icon}
                    {label}
                  </a>
                );
              })}
              {extraLinks.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium transition-colors shadow-lg shadow-[#3b82f6]/20"
                >
                  <Music size={14} />
                  {l.label}
                </a>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {project.title}
            </h1>

            <p className="text-white/70 leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Meta info */}
            {(() => {
              const date = (project as any).date;
              const tools = (project as any).tools;
              const charge = (project as any).charge;
              const scale = (project as any).developmentScale;
              const hasMeta = date || (tools && tools.length > 0) || charge || scale;
              if (!hasMeta) return null;
              return (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-6 text-sm">
                  {date && (
                    <div>
                      <dt className="text-white/30 text-xs tracking-widest uppercase mb-0.5">Date</dt>
                      <dd className="text-white/70">{date}</dd>
                    </div>
                  )}
                  {scale && (
                    <div>
                      <dt className="text-white/30 text-xs tracking-widest uppercase mb-0.5">Scale</dt>
                      <dd className="text-white/70">{scale}</dd>
                    </div>
                  )}
                  {charge && (
                    <div className="sm:col-span-2">
                      <dt className="text-white/30 text-xs tracking-widest uppercase mb-0.5">担当</dt>
                      <dd className="text-white/70">{charge}</dd>
                    </div>
                  )}
                  {tools && tools.length > 0 && (
                    <div className="sm:col-span-2">
                      <dt className="text-white/30 text-xs tracking-widest uppercase mb-0.5">Tools</dt>
                      <dd className="flex flex-wrap gap-1.5 mt-1">
                        {tools.map((t: string) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">{t}</span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              );
            })()}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded bg-white/5 text-white/40 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share URL */}
            <ShareSection id={project.id} />
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

function AudioPlayer({ src, poster, alt }: { src: string; poster?: string; alt: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayClick = () => {
    const a = audioRef.current;
    if (!a) return;
    a.play().catch(() => {
      /* autoplay blocked etc. — user can use controls bar */
    });
  };

  return (
    <div className="relative w-full bg-black overflow-hidden">
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={alt} className="w-full h-auto block" />
      )}
      {!playing && (
        <button
          type="button"
          onClick={handlePlayClick}
          aria-label="再生"
          className="absolute inset-0 flex items-center justify-center group"
        >
          <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-black/80 shadow-xl">
            <Play size={40} className="text-white ml-1" fill="white" />
          </span>
        </button>
      )}
      <audio
        ref={audioRef}
        src={src}
        controls
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="w-full block bg-black"
      />
    </div>
  );
}

function ShareSection({ id }: { id: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/works/${id}`);
  }, [id]);

  return (
    <div className="mt-8 pt-6 border-t border-white/10">
      <p className="text-xs text-white/30 mb-2 tracking-widest uppercase">Share</p>
      <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
        <span className="text-xs text-white/50 flex-1 truncate">
          {url || `https://www.chihiro.design/works/${id}`}
        </span>
        <CopyButton id={id} />
      </div>
    </div>
  );
}

function CopyButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/works/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors whitespace-nowrap"
    >
      {copied ? "コピーしました！" : "URLをコピー"}
    </button>
  );
}
