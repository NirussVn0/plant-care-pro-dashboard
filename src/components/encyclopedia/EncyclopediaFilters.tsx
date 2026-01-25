"use client";

import { MdCheck } from "react-icons/md";
import { PlantCategory, PlantDifficulty } from "@/models/Plant";

const CATEGORIES: PlantCategory[] = ["Succulents", "Tropical", "Ferns", "Cacti", "Flowering"];

const DIFFICULTY_LEVELS: { label: PlantDifficulty; color: string }[] = [
  { label: "Easy", color: "bg-green-400" },
  { label: "Intermediate", color: "bg-yellow-400" },
  { label: "Expert", color: "bg-red-400" },
];

interface EncyclopediaFiltersProps {
  selectedCategories: PlantCategory[];
  selectedDifficulty: PlantDifficulty | null;
  onCategoryChange: (categories: PlantCategory[]) => void;
  onDifficultyChange: (difficulty: PlantDifficulty | null) => void;
  onReset: () => void;
}

export default function EncyclopediaFilters({
  selectedCategories,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
  onReset,
}: EncyclopediaFiltersProps) {
  const toggleCategory = (category: PlantCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <aside className="lg:col-span-3 space-y-6">
      <div className="bento-card rounded-xl p-6 border border-white dark:border-[#354545]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Filters</h3>
          <button
            onClick={onReset}
            className="text-xs font-bold text-primary hover:text-[#005f52] transition-colors"
          >
            Reset All
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Categories</h4>
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="appearance-none h-5 w-5 border-2 border-[#e6f4f2] dark:border-[#354545] rounded checked:bg-primary checked:border-primary transition-all cursor-pointer peer"
                />
                <MdCheck className="absolute left-0.5 text-white text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">{category}</span>
            </label>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Difficulty Level</h4>
          <div className="flex flex-col gap-2">
            {DIFFICULTY_LEVELS.map((level) => (
              <button
                key={level.label}
                onClick={() => onDifficultyChange(selectedDifficulty === level.label ? null : level.label)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                  selectedDifficulty === level.label
                    ? "bg-primary text-white"
                    : "hover:bg-[#e6f4f2] dark:hover:bg-[#354545]"
                }`}
              >
                <span className="font-medium">{level.label}</span>
                <span className={`size-2.5 rounded-full ${level.color}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Pet Friendly</h4>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                className="appearance-none h-5 w-5 border-2 border-[#e6f4f2] dark:border-[#354545] rounded checked:bg-primary checked:border-primary transition-all cursor-pointer peer"
              />
              <MdCheck className="absolute left-0.5 text-white text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">Show only pet-friendly</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
