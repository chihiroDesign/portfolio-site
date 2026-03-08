"use client";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onCategoryChange("All")}
        className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all ${
          activeCategory === "All"
            ? "bg-white text-black"
            : "text-white/50 hover:text-white border border-white/10 hover:border-white/30"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all ${
            activeCategory === category
              ? "bg-white text-black"
              : "text-white/50 hover:text-white border border-white/10 hover:border-white/30"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
