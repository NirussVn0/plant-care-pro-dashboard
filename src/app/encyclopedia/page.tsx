"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import EncyclopediaFilters from "@/components/encyclopedia/EncyclopediaFilters";
import EncyclopediaCard from "@/components/encyclopedia/EncyclopediaCard";
import ServiceFactory from "@/services/ServiceFactory";
import { Plant, PlantCategory, PlantDifficulty } from "@/models/Plant";
import { MdSearch } from "react-icons/md";
import { animationService } from "@/services/animation/AnimationService";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/contexts/ToastContext";

const ANIMATION_KEY = "encyclopedia-page";

export default function EncyclopediaPage() {
  const [plants, setPlants] = useState<Plant[]>(); // Use undefined to check loading state
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedCategories, setSelectedCategories] = useState<PlantCategory[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<PlantDifficulty | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  // Fetch plants with filtering via Service (OOP)
  useEffect(() => {
    // Fade out old results
    if (cardsRef.current) {
      animationService.fadeOut(cardsRef.current.children as unknown as HTMLElement[], { duration: 200 });
    }

    const fetchPlants = async () => {
      try {
        const results = await ServiceFactory.getPlantService().searchPlants(
          debouncedSearchQuery,
          selectedCategories,
          selectedDifficulty
        );
        
        // Small delay to allow fade out to complete naturally
        setTimeout(() => {
          setPlants(results);
        }, 200);
      } catch (err) {
        console.error("Failed to fetch plants:", err);
        showToast("Failed to load plants. Please try again.", "error");
      }
    };

    fetchPlants();
  }, [debouncedSearchQuery, selectedCategories, selectedDifficulty, showToast]);

  // Handle Entrance Animations
  useEffect(() => {
    const alreadyPlayed = animationService.hasPlayed(ANIMATION_KEY);
    if (headerRef.current && !alreadyPlayed) {
      animationService.fadeInUp(headerRef.current, { delay: 0, duration: 600 });
      animationService.markPlayed(ANIMATION_KEY);
    } else if (headerRef.current) {
      animationService.showImmediately(headerRef.current);
    }
  }, []);

  // Handle Card Stagger Animation when data changes
  useEffect(() => {
    if (plants && cardsRef.current) {
      animationService.staggerFadeIn(cardsRef.current.children as unknown as HTMLElement[], { 
        stagger: 50, 
        delay: 0,
        duration: 400 
      });
    }
  }, [plants]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedDifficulty(null);
  };

  return (
    <div className="min-h-full">
      <div ref={headerRef} className="flex flex-col gap-6 mb-8 opacity-0">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              Plant Encyclopedia
            </h1>
            <p className="text-primary">
              Explore our comprehensive database of indoor and outdoor plants.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <div className="relative w-full lg:w-96">
              <input
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#2a3434] border border-[#e6f4f2] dark:border-[#354545] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                placeholder="Search by name or scientific name..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MdSearch className="absolute left-3 top-3.5 text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-primary uppercase tracking-wider mr-2">
            Quick Filters:
          </span>
          {["Easy", "Pet Friendly", "Tropical", "Succulents"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                if (tag === "Easy") setSelectedDifficulty("Easy");
                else if (tag === "Tropical") setSelectedCategories(["Tropical"]);
                else if (tag === "Succulents") setSelectedCategories(["Succulents"]);
              }}
              className="px-3 py-1.5 bg-white dark:bg-[#2a3434] border border-[#e6f4f2] dark:border-[#354545] rounded-full text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[600px]">
        <EncyclopediaFilters
          selectedCategories={selectedCategories}
          selectedDifficulty={selectedDifficulty}
          onCategoryChange={setSelectedCategories}
          onDifficultyChange={setSelectedDifficulty}
          onReset={handleReset}
        />

        <div className="lg:col-span-9">
          {!plants ? (
             // Loading skeleton or empty state while fetching
             <div className="flex justify-center py-20">
                <div className="animate-pulse text-primary font-bold">Loading flora...</div>
             </div>
          ) : plants.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-text-muted text-lg">No plants found matching your criteria.</p>
              <button
                onClick={handleReset}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {plants.map((plant) => (
                <div key={plant.id} className="opacity-0">
                  <EncyclopediaCard plant={plant} />
                </div>
              ))}
            </div>
          )}

          {plants && plants.length > 0 && (
            <div className="mt-12 flex justify-center">
              <p className="text-sm text-text-muted">
                Showing {plants.length} plants
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
