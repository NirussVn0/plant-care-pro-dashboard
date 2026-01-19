"use client";

import { Plant } from "@/models/Plant";
import { MdAddCircle, MdFavoriteBorder, MdSunny, MdWaterDrop, MdAir } from "react-icons/md";
import Image from "next/image";

interface EncyclopediaCardProps {
  plant: Plant;
}

/**
 * Card component for displaying plant information in the Encyclopedia.
 * Shows plant details, difficulty level, and care requirements.
 */
export default function EncyclopediaCard({ plant }: EncyclopediaCardProps) {
  const getDifficultyLevel = (health: number): string => {
    return health > 80 ? "Easy" : "Expert";
  };

  return (
    <div className="bento-card rounded-xl overflow-hidden border border-[#e6f4f2] dark:border-[#354545] group hover:shadow-lg transition-all duration-300">
      <div className="h-56 relative">
        <Image
          src={plant.images[0]}
          alt={plant.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary uppercase tracking-wide">
          Tropical
        </div>
        <button className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-primary transition-all opacity-0 group-hover:opacity-100">
          <MdFavoriteBorder className="text-lg" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{plant.name}</h4>
            <p className="text-xs text-primary italic mt-0.5">{plant.scientificName}</p>
          </div>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold uppercase rounded-md">
            {getDifficultyLevel(plant.health)}
          </span>
        </div>
        <p className="text-sm text-text-main/70 dark:text-text-inverse/70 line-clamp-2 mt-3 mb-4">
          A beautiful addition to any space. Requires consistent care and attention to thrive.
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#e6f4f2] dark:border-[#354545]">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1 group/icon" title="Light Needs">
              <MdSunny className="text-primary text-lg group-hover/icon:text-sun-yellow transition-colors" />
              <span className="text-[9px] font-bold text-primary uppercase">{plant.needs.light}</span>
            </div>
            <div className="flex flex-col items-center gap-1 group/icon" title="Water Needs">
              <MdWaterDrop className="text-primary text-lg group-hover/icon:text-blue-400 transition-colors" />
              <span className="text-[9px] font-bold text-primary uppercase">{plant.needs.water}</span>
            </div>
            <div className="flex flex-col items-center gap-1 group/icon" title="Humidity Needs">
              <MdAir className="text-primary text-lg group-hover/icon:text-blue-300 transition-colors" />
              <span className="text-[9px] font-bold text-primary uppercase">{plant.needs.humidity}</span>
            </div>
          </div>
          <button className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors">
            <MdAddCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
