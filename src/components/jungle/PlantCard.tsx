"use client";

import { Plant } from "@/models/Plant";
import { MdEdit, MdSunny, MdWaterDrop } from "react-icons/md";
import { fadeInUp } from "@/lib/animations";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface PlantCardProps {
  plant: Plant;
  staggerIndex?: number;
}

/**
 * Card component for displaying individual plant information.
 * Shows plant image, name, room, and care status indicators.
 */
export default function PlantCard({ plant, staggerIndex = 0 }: PlantCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      fadeInUp(cardRef.current, staggerIndex * 100);
    }
  }, [staggerIndex]);

  const getNeedsPercentage = (level: string): string => {
    const percentages: Record<string, string> = {
      HIGH: "90%",
      MED: "60%",
      LOW: "30%",
    };
    return percentages[level] || "50%";
  };

  return (
    <article
      ref={cardRef}
      className="bento-card rounded-2xl overflow-hidden border border-[#e6f4f2] dark:border-[#354545] group hover:shadow-xl transition-all duration-300 flex flex-col opacity-0"
    >
      <div className="h-64 relative overflow-hidden">
        <Image
          src={plant.images[0]}
          alt={plant.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm z-10">
          {plant.room}
        </div>
        <button className="absolute bottom-3 right-3 p-2 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-10">
          <MdEdit className="text-sm" />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-text-main dark:text-text-inverse leading-tight">
            {plant.name}
          </h3>
          <p className="text-xs text-primary italic font-medium">{plant.scientificName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-primary uppercase tracking-tighter">
              <div className="flex items-center gap-1">
                <MdSunny className="text-xs text-sun-yellow" /> Sunlight
              </div>
              <span>{plant.needs.light}</span>
            </div>
            <div className="h-1.5 w-full bg-[#e6f4f2] dark:bg-[#354545] rounded-full overflow-hidden">
              <div
                className="h-full bg-sun-yellow rounded-full"
                style={{ width: getNeedsPercentage(plant.needs.light) }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-primary uppercase tracking-tighter">
              <div className="flex items-center gap-1">
                <MdWaterDrop className="text-xs text-blue-400" /> Hydration
              </div>
              <span>Good</span>
            </div>
            <div className="h-1.5 w-full bg-[#e6f4f2] dark:bg-[#354545] rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${plant.health}%` }} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
