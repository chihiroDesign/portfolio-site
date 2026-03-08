"use client";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types";

interface MasonryGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function MasonryGrid({ projects, onProjectClick }: MasonryGridProps) {
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else if (width < 1400) setColumns(3);
      else setColumns(4);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 横方向に順番に並べるため、インデックス % columns でカラムを決定
  // 例: 4カラムなら 0→col0, 1→col1, 2→col2, 3→col3, 4→col0, ...
  const columnArrays: Project[][] = Array.from({ length: columns }, () => []);
  projects.forEach((project, index) => {
    columnArrays[index % columns].push(project);
  });

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: '16px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {columnArrays.map((col, colIndex) => (
        <div
          key={colIndex}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            minWidth: 0,
          }}
        >
          {col.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onProjectClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
