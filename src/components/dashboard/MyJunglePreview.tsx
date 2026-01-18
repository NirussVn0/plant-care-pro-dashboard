"use client";

import { useEffect, useState } from "react";
import { MdGridView, MdList, MdMoreHoriz, MdSunny, MdWaterDrop } from "react-icons/md";
import ServiceFactory from "@/services/ServiceFactory";
import { Plant } from "@/models/Plant";

/**
 * Dashboard component showing a preview of user's plant collection.
 * Displays top 2 plants with health status and care indicators.
 */
export default function MyJunglePreview() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const allPlants = await ServiceFactory.getPlantService().getAllPlants();
        setPlants(allPlants.slice(0, 2));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const getNeedsPercentage = (level: string): string => {
    const percentages: Record<string, string> = {
      HIGH: "90%",
      MED: "60%",
      LOW: "30%",
    };
    return percentages[level] || "50%";
  };

  const getHealthLabel = (health: number): string => {
    return health > 80 ? "Healthy" : "Needs Care";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg font-display text-text-main dark:text-text-inverse">
          My Jungle
        </h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white dark:bg-[#2d3a3a] border border-[#e6f4f2] dark:border-[#354545] text-text-muted hover:text-primary transition-colors">
            <MdGridView size={18} />
          </button>
          <button className="p-2 rounded-lg bg-white dark:bg-[#2d3a3a] border border-[#e6f4f2] dark:border-[#354545] text-text-muted hover:text-primary transition-colors">
            <MdList size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          [1, 2].map((i) => (
            <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))
        ) : (
          plants.map((plant) => (
            <div key={plant.id} className="bento-card group overflow-hidden">
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${plant.images[0]})` }}
              >
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary">
                  {getHealthLabel(plant.health)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-base leading-none font-display">{plant.name}</h4>
                    <p className="text-xs text-text-muted mt-1 italic">{plant.scientificName}</p>
                  </div>
                  <button className="text-primary/40 hover:text-primary transition-colors">
                    <MdMoreHoriz size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted uppercase tracking-tighter">
                      <MdSunny className="text-xs text-sun-yellow" /> Light
                    </div>
                    <div className="h-1 w-full bg-[#e6f4f2] dark:bg-[#354545] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sun-yellow rounded-full"
                        style={{ width: getNeedsPercentage(plant.needs.light) }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted uppercase tracking-tighter">
                      <MdWaterDrop className="text-xs text-blue-400" /> Humidity
                    </div>
                    <div className="h-1 w-full bg-[#e6f4f2] dark:bg-[#354545] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-full"
                        style={{ width: getNeedsPercentage(plant.needs.humidity) }}
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold rounded-lg uppercase tracking-wide">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
