"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, BookOpen, Music } from "lucide-react";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onCategoryClick?: (category: string) => void;
}

function getYoutubeEmbedUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
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

// URL種別に応じたラベル・アイコンを返す
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

export function ProjectModal({ project, onClose, onCategoryClick }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const categories = Array.isArray(project.category)
    ? project.category
    : [project.category];

  // linkMovie優先、次にlink（動画の場合）
  const linkMovie = (project as any).linkMovie;
  const videoUrl =
    (linkMovie && isVideoLink(linkMovie) ? linkMovie : null) ||
    (isVideoLink(project.link) ? project.link : null);

  // YouTube embed or Google Drive embed
  const embedUrl = videoUrl
    ? isYoutubeLink(videoUrl)
      ? getYoutubeEmbedUrl(videoUrl)
      : isGoogleDriveLink(videoUrl)
      ? getGoogleDriveEmbedUrl(videoUrl)
      : null
    : null;

  // 画像URL
  const imageUrl = (project as any).imageUrl || project.thumbnail;

  // リンク一覧を収集
  const linkDoc = (project as any).linkDoc;
  const links: string[] = [];
  // 動画でないlinkを追加
  if (project.link && !isVideoLink(project.link)) {
    links.push(project.link);
  }
  // linkMovieが別URLの場合も追加（動画でない場合のみ）
  if (linkMovie && linkMovie !== project.link && !isVideoLink(linkMovie) && !links.includes(linkMovie)) {
    links.push(linkMovie);
  }
  // linkDoc（ドキュメント・記事リンク）を追加
  if (linkDoc && !links.includes(linkDoc)) {
    links.push(linkDoc);
  }
  // 動画URLはvideoUrlとして別途ボタン表示（1つだけ）
  // embedUrlがある場合はiframe内で再生できるので外部リンクボタンは不要

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content — スクロール可能、高さ制限なし */}
        <motion.div
          className="relative z-10 w-full max-w-4xl bg-[#111] rounded-2xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>

          {/* Media — 動画embed or フル画像（高さ制限なし） */}
          {embedUrl ? (
            <div className="relative w-full aspect-video bg-black rounded-t-2xl overflow-hidden">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : imageUrl ? (
            <div className="relative w-full rounded-t-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={project.title}
                className="w-full h-auto block"
              />
            </div>
          ) : null}

          {/* Links — 画像直下に配置（リンクがある場合のみ） */}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-3 px-6 py-4 border-b border-white/5">
              {links.map((url) => {
                const { label, icon } = getLinkInfo(url);
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium transition-colors shadow-lg shadow-[#3b82f6]/20"
                  >
                    {icon}
                    {label}
                  </a>
                );
              })}
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryClick?.(cat)}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {project.title}
            </h2>

            <p className="text-white/70 leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Meta info: Date / Tools / Charge / Scale */}
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


          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
