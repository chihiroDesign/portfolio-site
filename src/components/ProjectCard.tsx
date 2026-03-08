"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
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

function getYoutubeVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Placeholder IDs that are not real YouTube video IDs
const PLACEHOLDER_IDS = [
  "placeholder", "placeholder2", "placeholder3", "placeholder4",
  "quiz", "sakana", "shibuya", "chill", "kenpon", "venombloom",
  "korea-cosme", "unicorn", "vtuber-edit"
];

function isRealYoutubeId(id: string): boolean {
  // Real YouTube IDs are exactly 11 chars of alphanumeric + _ + -
  return /^[a-zA-Z0-9_-]{11}$/.test(id) && !PLACEHOLDER_IDS.includes(id);
}

function getBestImageSrc(project: Project): string | null {
  // 1. If link is a real YouTube URL, use its thumbnail
  if (project.link && isVideoLink(project.link)) {
    const videoId = getYoutubeVideoId(project.link);
    if (videoId && isRealYoutubeId(videoId)) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  }

  // 2. If imageUrl is already a valid YouTube thumbnail
  if (project.imageUrl) {
    const ytMatch = project.imageUrl.match(/img\.youtube\.com\/vi\/([^/]+)\//);
    if (ytMatch) {
      const videoId = ytMatch[1];
      if (isRealYoutubeId(videoId)) {
        return project.imageUrl;
      }
    }
    // Return non-placeholder imageUrl (both http:// and local /images/ paths)
    if (
      !project.imageUrl.includes("placeholder") &&
      !project.imageUrl.includes("via.placeholder")
    ) {
      return project.imageUrl;
    }
  }

  return null;
}

// Generate a deterministic "random" height for cards without images
// based on project id, so it stays consistent across renders
function getPlaceholderHeight(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) & 0xffffffff;
  }
  // Range: 160px ~ 320px
  return 160 + (Math.abs(hash) % 160);
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const imageSrc = getBestImageSrc(project);
  const hasVideo = isVideoLink(project.link) || isVideoLink(project.linkMovie);
  const placeholderHeight = getPlaceholderHeight(project.id);

  // Fallback: try hqdefault if maxresdefault fails
  const handleImgError = () => {
    if (!useFallback && imageSrc && imageSrc.includes("maxresdefault")) {
      setUseFallback(true);
    } else {
      setImgError(true);
    }
  };

  const finalSrc = useFallback && imageSrc
    ? imageSrc.replace("maxresdefault.jpg", "hqdefault.jpg")
    : imageSrc;

  const showImage = finalSrc && !imgError;

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      className="group relative overflow-hidden rounded-xl bg-[#111] border border-white/10 cursor-pointer"
      onClick={() => onClick(project)}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Thumbnail area */}
      <div className="relative w-full">
        {showImage ? (
          // Real image — let it define its own height naturally
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={finalSrc}
            alt={project.title}
            className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImgError}
            loading="lazy"
          />
        ) : (
          // No image — use a deterministic height so columns look varied
          <div
            className="w-full bg-[#1a1a1a] flex flex-col items-center justify-center gap-2"
            style={{ height: `${placeholderHeight}px` }}
          >
            <ImageIcon className="w-10 h-10 text-white/20" />
            <span className="text-[10px] text-white/20 text-center px-4 line-clamp-2">
              {project.title}
            </span>
          </div>
        )}

        {/* Video play icon overlay */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full border border-white/20 group-hover:bg-black/70 transition-colors">
              <Play className="w-7 h-7 text-white fill-white" />
            </div>
          </div>
        )}

        {/* Hover overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <motion.h3
            layoutId={`title-${project.id}`}
            className="text-sm font-bold text-white mb-1 line-clamp-2"
          >
            {project.title}
          </motion.h3>
          <p className="text-xs text-gray-300 line-clamp-2 mb-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {(Array.isArray(project.category) ? project.category : [project.category]).slice(0, 3).map((cat) => (
              <span key={cat} className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/70 border border-white/10">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom info strip (always visible) */}
      <div className="px-3 py-2 border-t border-white/5">
        <p className="text-xs font-medium text-white/80 truncate">{project.title}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {(Array.isArray(project.category) ? project.category : [project.category]).slice(0, 3).map((cat) => (
            <span key={cat} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50 border border-white/10">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
