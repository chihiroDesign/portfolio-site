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

  // Distribute projects into columns
  const columnArrays: Project[][] = Array.from({ length: columns }, () => []);
  projects.forEach((project, index) => {
    columnArrays[index % columns].push(project);
  });

  return (
    <div
      ref={containerRef}
      className="flex gap-4"
      style={{ alignItems: "flex-start" }}
    >
      {columnArrays.map((col, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col gap-4">
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
