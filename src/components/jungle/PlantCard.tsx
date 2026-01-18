"use client";

import { Plant } from "@/models/Plant";
import { MdEdit, MdSunny, MdWaterDrop } from "react-icons/md";
import { fadeInUp } from "@/lib/animations";
import { useEffect, useRef } from "react";

interface PlantCardProps {
  plant: Plant;
  staggerIndex?: number;
}

export default function PlantCard({ plant, staggerIndex = 0 }: PlantCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
        fadeInUp(cardRef.current, staggerIndex * 100);
    }
  }, [staggerIndex]);

  return (
    <article
      ref={cardRef}
      className="bento-card rounded-2xl overflow-hidden border border-[#e6f4f2] dark:border-[#354545] group hover:shadow-xl transition-all duration-300 flex flex-col opacity-0"
    >
      <div
        className="h-64 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${plant.images[0]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm">
          {plant.room}
        </div>
        <button className="absolute bottom-3 right-3 p-2 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <MdEdit className="text-sm" />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-text-main dark:text-text-inverse leading-tight">
            {plant.name}
          </h3>
          <p className="text-xs text-primary italic font-medium">
            {plant.scientificName}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          {/* Sunlight */}
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
                style={{
                  width:
                    plant.needs.light === "HIGH"
                      ? "90%"
                      : plant.needs.light === "MED"
                        ? "60%"
                        : "30%",
                }}
              ></div>
            </div>
          </div>

          {/* Hydration */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-primary uppercase tracking-tighter">
              <div className="flex items-center gap-1">
                <MdWaterDrop className="text-xs text-blue-400" /> Hydration
              </div>
              <span>Good</span> 
            </div>
            <div className="h-1.5 w-full bg-[#e6f4f2] dark:bg-[#354545] rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full"
                style={{ width: `${plant.health}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
