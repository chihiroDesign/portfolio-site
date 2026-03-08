"use client";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types";

interface MasonryGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function MasonryGrid({ projects, onProjectClick }: MasonryGridProps) {
  return (
    <div
      style={{
        columnCount: 3,
        columnGap: '16px',
        width: '100%',
      }}
      className="masonry-grid"
    >
      <style>{`
        @media (max-width: 639px) {
          .masonry-grid { column-count: 1 !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .masonry-grid { column-count: 2 !important; }
        }
        @media (min-width: 1024px) and (max-width: 1399px) {
          .masonry-grid { column-count: 3 !important; }
        }
        @media (min-width: 1400px) {
          .masonry-grid { column-count: 4 !important; }
        }
        .masonry-item {
          break-inside: avoid;
          display: block;
          margin-bottom: 16px;
        }
      `}</style>
      {projects.map((project) => (
        <div key={project.id} className="masonry-item">
          <ProjectCard
            project={project}
            onClick={onProjectClick}
          />
        </div>
      ))}
    </div>
  );
}
