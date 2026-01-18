"use client";

import { MdCheck } from "react-icons/md";

const CATEGORIES = ["Succulents", "Tropical", "Ferns", "Cacti", "Flowering"];

const DIFFICULTY_LEVELS = [
  { label: "Easy", color: "bg-green-400" },
  { label: "Intermediate", color: "bg-yellow-400" },
  { label: "Expert", color: "bg-red-400" },
];

/**
 * Sidebar filter component for the Encyclopedia page.
 * Provides category, difficulty, and light needs filtering options.
 */
export default function EncyclopediaFilters() {
  return (
    <aside className="lg:col-span-3 space-y-6">
      <div className="bento-card rounded-xl p-6 border border-white dark:border-[#354545]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Filters</h3>
          <button className="text-xs font-bold text-primary hover:text-[#005f52]">Reset All</button>
        </div>

        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Categories</h4>
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="appearance-none h-5 w-5 border-2 border-[#e6f4f2] dark:border-[#354545] rounded checked:bg-primary checked:border-primary transition-all cursor-pointer peer"
                />
                <MdCheck className="absolute left-0 text-white text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
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
                className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#e6f4f2] dark:hover:bg-[#354545] transition-colors flex items-center justify-between group"
              >
                <span className="font-medium text-text-main dark:text-text-inverse">{level.label}</span>
                <span className={`size-2 rounded-full ${level.color}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Light Needs</h4>
          <input
            className="w-full h-2 bg-[#e6f4f2] dark:bg-[#354545] rounded-lg appearance-none cursor-pointer accent-primary"
            type="range"
            min="0"
            max="100"
            defaultValue="50"
          />
          <div className="flex justify-between text-[10px] text-primary font-bold uppercase mt-1">
            <span>Low</span>
            <span>Bright</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
