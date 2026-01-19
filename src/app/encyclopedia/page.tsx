"use client";

import { useEffect, useState } from "react";
import EncyclopediaFilters from "@/components/encyclopedia/EncyclopediaFilters";
import EncyclopediaCard from "@/components/encyclopedia/EncyclopediaCard";
import ServiceFactory from "@/services/ServiceFactory";
import { Plant } from "@/models/Plant";
import { MdSearch } from "react-icons/md";

export default function EncyclopediaPage() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    // For now, reuse regular plant service. In real app, might fetch "all species".
    ServiceFactory.getPlantService().getAllPlants().then(setPlants);
  }, []);

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
                placeholder="Search by name, scientific name, or type..."
                type="text"
              />
              <MdSearch className="absolute left-3 top-3.5 text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-primary uppercase tracking-wider mr-2">
            Popular:
          </span>
          {[
            "Low Light",
            "Pet Friendly",
            "Air Purifying",
            "Beginner Friendly",
            "Drought Tolerant",
          ].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 bg-white dark:bg-[#2a3434] border border-[#e6f4f2] dark:border-[#354545] rounded-full text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <EncyclopediaFilters />

        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <EncyclopediaCard key={plant.id} plant={plant} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            {/* Pagination Mock */}
            <nav className="flex items-center gap-2">
                <button className="size-10 flex items-center justify-center rounded-lg border border-[#e6f4f2] dark:border-[#354545] hover:bg-primary hover:text-white transition-colors disabled:opacity-50">
                    Prev
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-[#e6f4f2] dark:border-[#354545] hover:bg-primary hover:text-white transition-colors font-medium">2</button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-[#e6f4f2] dark:border-[#354545] hover:bg-primary hover:text-white transition-colors disabled:opacity-50">
                    Next
                </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
