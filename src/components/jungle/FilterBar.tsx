"use client";

import { useEffect, useState } from "react";
import { MdFilterAlt, MdSearch, MdExpandMore, MdAddCircle } from "react-icons/md";
import ServiceFactory from "@/services/ServiceFactory";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterRoom: (room: string) => void;
}

export default function FilterBar({ onSearch, onFilterRoom }: FilterBarProps) {
  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    ServiceFactory.getPlantService().getRooms().then(setRooms);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div className="relative group w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="text-primary/60 text-xl" />
          </div>
          <input
            onChange={(e) => onSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-[#e6f4f2] dark:border-[#354545] rounded-xl leading-5 bg-white dark:bg-[#2d3a3a] placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
            placeholder="Search collection..."
            type="text"
          />
        </div>

        <div className="relative w-full sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdFilterAlt className="text-primary/60 text-lg" />
          </div>
          <select
            onChange={(e) => onFilterRoom(e.target.value)}
            className="block w-full pl-10 pr-10 py-2.5 border border-[#e6f4f2] dark:border-[#354545] rounded-xl leading-5 bg-white dark:bg-[#2d3a3a] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
          >
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <MdExpandMore className="text-primary/60 text-lg" />
          </div>
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 bg-primary hover:bg-[#005f52] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 w-full md:w-auto">
        <MdAddCircle className="text-xl" />
        <span>Add New Plant</span>
      </button>
    </div>
  );
}
