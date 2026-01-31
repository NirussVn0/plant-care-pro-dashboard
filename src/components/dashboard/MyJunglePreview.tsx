"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MdGridView, MdList, MdMoreHoriz, MdSunny, MdWaterDrop, MdRefresh, MdErrorOutline } from "react-icons/md";
import ServiceFactory from "@/services/ServiceFactory";
import { Plant } from "@/models/Plant";
import { animationService } from "@/services/animation/AnimationService";
import { useToast } from "@/contexts/ToastContext";

const ANIMATION_KEY = "dashboard-jungle-preview";

export default function MyJunglePreview() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const fetchPlants = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const allPlants = await ServiceFactory.getPlantService().getAllPlants();
      setPlants(allPlants.slice(0, 2));
    } catch (error) {
      console.error(error);
      setError(true);
      showToast("Failed to load your jungle. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  // Entrance animations with session tracking
  useEffect(() => {
    if (loading) return;

    const alreadyPlayed = animationService.hasPlayed(ANIMATION_KEY);

    if (containerRef.current) {
      if (alreadyPlayed) {
        animationService.showImmediately(containerRef.current);
      } else {
        animationService.fadeInUp(containerRef.current, { delay: 200, duration: 600 });
      }
    }

    if (cardsRef.current) {
      const children = cardsRef.current.children as unknown as Element[];
      if (alreadyPlayed) {
        animationService.showImmediately(children);
      } else {
        animationService.staggerFadeIn(children, { stagger: 150, delay: 400 });
        animationService.markPlayed(ANIMATION_KEY);
      }
    }
  }, [loading]);

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
    <div ref={containerRef} className="space-y-6 opacity-0">
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

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          [1, 2].map((i) => (
            <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))
        ) : error ? (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 min-h-[200px]">
            <div className="text-red-500 mb-2">
              <MdErrorOutline size={32} />
            </div>
            <p className="text-sm text-text-muted mb-4 font-medium">Failed to load your jungle</p>
            <button
              onClick={fetchPlants}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs font-bold text-text-main dark:text-text-inverse"
            >
              <MdRefresh size={16} /> Try Again
            </button>
          </div>
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

                {/* Quick Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all text-xs font-bold rounded-lg flex items-center justify-center gap-1">
                    <MdWaterDrop /> Water
                  </button>
                  <button className="flex-1 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all text-xs font-bold rounded-lg flex items-center justify-center gap-1">
                    <MdSunny /> Fertilize
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
