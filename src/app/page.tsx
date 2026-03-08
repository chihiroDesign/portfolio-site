"use client";

import { useState, useMemo } from "react";
import { MasonryGrid } from "@/components/ui/MasonryGrid";
import { ProjectModal } from "@/components/ProjectModal";
import { FilterBar } from "@/components/FilterBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import projectsData from "@/data/projects.json";
import { Project } from "@/types";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Define the preferred order of categories
  const categoryOrder = [
    "AI Work",
    "3D WORKS",
    "2D WORKS",
    "Video Edit",
    "UI/UX",
    "Promotion",
    "Picture Book",
    "Manga",
    "Original",
  ];

  // Dynamically generate categories based on actual data
  const categories = useMemo(() => {
    const existingCategories = new Set<string>();
    projectsData.forEach((p) => {
      if (Array.isArray(p.category)) {
        p.category.forEach((c) => existingCategories.add(c));
      } else if (p.category) {
        existingCategories.add(p.category);
      }
    });

    // Filter the order list to only include existing ones
    const availableCategories = categoryOrder.filter((cat) =>
      existingCategories.has(cat)
    );

    // Add any categories not in the order list
    existingCategories.forEach((cat) => {
      if (!availableCategories.includes(cat)) {
        availableCategories.push(cat);
      }
    });

    return availableCategories;
  }, []);

  // Sort projects by order field (ascending = newest first)
  const sortedProjects = useMemo(() => {
    return [...(projectsData as Project[])].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });
  }, []);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return sortedProjects;
    return sortedProjects.filter((p) => {
      if (Array.isArray(p.category)) {
        return p.category.includes(activeCategory);
      }
      return p.category === activeCategory;
    });
  }, [activeCategory, sortedProjects]);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-none italic">
          Feel it before you see it.
        </h1>
      </section>

      {/* Filter Bar */}
      <section id="projects" className="sticky top-16 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-6 py-2">
        <div className="max-w-[1600px] mx-auto overflow-x-auto">
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <MasonryGrid
          projects={filteredProjects}
          onProjectClick={setSelectedProject}
        />
      </section>


      <Footer />

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onCategoryClick={(cat) => {
          setActiveCategory(cat);
          setSelectedProject(null);
          setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      />
    </main>
  );
}
