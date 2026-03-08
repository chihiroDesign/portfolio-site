"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";
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

function isVideoLink(url?: string): boolean {
  if (!url) return false;
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("drive.google.com") ||
    url.includes("vimeo.com")
  );
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

  // Determine video URL
  const videoUrl = (project as any).linkMovie || (isVideoLink(project.videoUrl) ? project.videoUrl : null) || (isVideoLink(project.thumbnail) ? project.thumbnail : null);
  const embedUrl = videoUrl ? getYoutubeEmbedUrl(videoUrl) : null;

  // Determine image
  const imageUrl = project.thumbnail && !isVideoLink(project.thumbnail) ? project.thumbnail : (project as any).imageUrl;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#111] rounded-2xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>

          {/* Media */}
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
              <img
                src={imageUrl}
                alt={project.title}
                className="w-full h-auto object-cover max-h-[60vh]"
              />
            </div>
          ) : null}

          {/* Content */}
          <div className="p-6 md:p-8">
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

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {(project as any).link && (
                <a
                  href={(project as any).link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  <ExternalLink size={14} />
                  View Project
                </a>
              )}
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  <Play size={14} />
                  Watch Video
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
