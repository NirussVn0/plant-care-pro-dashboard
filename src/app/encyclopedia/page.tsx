"use client";

import { useEffect, useState, useMemo } from "react";
import EncyclopediaFilters from "@/components/encyclopedia/EncyclopediaFilters";
import EncyclopediaCard from "@/components/encyclopedia/EncyclopediaCard";
import ServiceFactory from "@/services/ServiceFactory";
import { Plant, PlantCategory, PlantDifficulty } from "@/models/Plant";
import { MdSearch } from "react-icons/md";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/contexts/ToastContext";

export default function EncyclopediaPage() {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedCategories, setSelectedCategories] = useState<PlantCategory[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<PlantDifficulty | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    ServiceFactory.getPlantService()
      .getAllPlants()
      .then(setAllPlants)
      .catch((err) => {
        console.error("Failed to fetch plants:", err);
        showToast("Failed to load plants. Please try again.", "error");
      });
  }, [showToast]);

  const filteredPlants = useMemo(() => {
    let result = allPlants;

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (plant) =>
          plant.name.toLowerCase().includes(query) ||
          plant.scientificName.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((plant) => selectedCategories.includes(plant.category));
    }

    if (selectedDifficulty) {
      result = result.filter((plant) => plant.difficulty === selectedDifficulty);
    }

    return result;
  }, [allPlants, debouncedSearchQuery, selectedCategories, selectedDifficulty]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedDifficulty(null);
  };

  return (
    <div className="min-h-full">
      <div className="flex flex-col gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <EncyclopediaFilters
          selectedCategories={selectedCategories}
          selectedDifficulty={selectedDifficulty}
          onCategoryChange={setSelectedCategories}
          onDifficultyChange={setSelectedDifficulty}
          onReset={handleReset}
        />

        <div className="lg:col-span-9">
          {filteredPlants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">No plants found matching your criteria.</p>
              <button
                onClick={handleReset}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPlants.map((plant) => (
                <EncyclopediaCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <p className="text-sm text-text-muted">
              Showing {filteredPlants.length} of {allPlants.length} plants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
