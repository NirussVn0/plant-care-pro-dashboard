"use client";

import { useEffect, useState } from "react";
import FilterBar from "@/components/jungle/FilterBar";
import PlantCard from "@/components/jungle/PlantCard";
import ServiceFactory from "@/services/ServiceFactory";
import { Plant } from "@/models/Plant";
import { MdAdd } from "react-icons/md";

export default function MyJunglePage() {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [query, setQuery] = useState("");
  const [filterRoom, setFilterRoom] = useState("All Rooms");

  useEffect(() => {
    ServiceFactory.getPlantService().getAllPlants().then((data) => {
      setAllPlants(data);
      setFilteredPlants(data);
    });
  }, []);

  useEffect(() => {
    let result = allPlants;

    if (filterRoom !== "All Rooms") {
      result = result.filter((p) => p.room === filterRoom);
    }

    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.scientificName.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredPlants(result);
  }, [query, filterRoom, allPlants]);

  return (
    <div className="min-h-full">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">My Jungle</h1>
        <p className="text-primary">Manage and track your personal plant collection.</p>
      </div>

      <FilterBar onSearch={setQuery} onFilterRoom={setFilterRoom} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlants.map((plant, index) => (
          <PlantCard key={plant.id} plant={plant} staggerIndex={index} />
        ))}

        {/* Add New Plant Card (Placeholder) */}
        <article className="bento-card rounded-2xl overflow-hidden border-2 border-dashed border-[#e6f4f2] dark:border-[#354545] group hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-8 cursor-pointer min-h-[350px]">
          <div className="size-16 rounded-full bg-[#e6f4f2] dark:bg-[#2d3a3a] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
            <MdAdd className="text-3xl" />
          </div>
          <h3 className="font-bold text-lg text-text-main dark:text-text-inverse mb-2">Grow Your Jungle</h3>
          <p className="text-sm text-primary text-center">
            Add a new plant to your collection to start tracking its progress.
          </p>
        </article>
      </div>
    </div>
  );
}
