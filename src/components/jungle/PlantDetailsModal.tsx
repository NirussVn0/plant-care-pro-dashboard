"use client";

import { Plant } from "@/models/Plant";
import { MdClose, MdSunny, MdWaterDrop, MdOpacity, MdPets, MdCalendarToday, MdLocalFlorist } from "react-icons/md";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animationService } from "@/services/animation/AnimationService";

interface PlantDetailsModalProps {
  plant: Plant;
  onClose: () => void;
}

export default function PlantDetailsModal({ plant, onClose }: PlantDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      animationService.scaleIn(contentRef.current, { duration: 300 });
    }
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const getNeedsLabel = (level: string): string => {
    const labels: Record<string, string> = { HIGH: "High", MED: "Medium", LOW: "Low" };
    return labels[level] || level;
  };

  const getNeedsColor = (level: string): string => {
    const colors: Record<string, string> = {
      HIGH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      MED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      LOW: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    };
    return colors[level] || "bg-gray-100 text-gray-700";
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="bg-white dark:bg-[#2a3434] rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header Image */}
        <div className="relative h-64 md:h-80">
          <Image
            src={plant.images[0]}
            alt={plant.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full backdrop-blur-md transition-all"
          >
            <MdClose className="text-xl" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full mb-2">
              {plant.room}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{plant.name}</h2>
            <p className="text-white/80 italic">{plant.scientificName}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-[#f4f3f1] dark:bg-[#222a2a] rounded-xl">
              <MdLocalFlorist className="text-2xl text-primary mx-auto mb-1" />
              <p className="text-xs text-text-muted">Health</p>
              <p className="font-bold text-primary">{plant.health}%</p>
            </div>
            <div className="text-center p-3 bg-[#f4f3f1] dark:bg-[#222a2a] rounded-xl">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${getNeedsColor(plant.difficulty)}`}>
                {plant.difficulty}
              </span>
              <p className="text-xs text-text-muted mt-1">Difficulty</p>
            </div>
            <div className="text-center p-3 bg-[#f4f3f1] dark:bg-[#222a2a] rounded-xl">
              <MdPets className={`text-2xl mx-auto mb-1 ${plant.petFriendly ? "text-green-500" : "text-red-500"}`} />
              <p className="text-xs text-text-muted">{plant.petFriendly ? "Pet Safe" : "Toxic"}</p>
            </div>
            <div className="text-center p-3 bg-[#f4f3f1] dark:bg-[#222a2a] rounded-xl">
              <MdCalendarToday className="text-2xl text-primary mx-auto mb-1" />
              <p className="text-xs text-text-muted">Category</p>
              <p className="font-bold text-xs text-primary">{plant.category}</p>
            </div>
          </div>

          {/* Care Requirements */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-text-main dark:text-text-inverse">Care Requirements</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <MdSunny className="text-2xl text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Sunlight</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getNeedsColor(plant.needs.light)}`}>
                      {getNeedsLabel(plant.needs.light)}
                    </span>
                  </div>
                  <div className="h-2 bg-[#e6f4f2] dark:bg-[#354545] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: plant.needs.light === "HIGH" ? "90%" : plant.needs.light === "MED" ? "60%" : "30%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <MdWaterDrop className="text-2xl text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Water</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getNeedsColor(plant.needs.water)}`}>
                      {getNeedsLabel(plant.needs.water)}
                    </span>
                  </div>
                  <div className="h-2 bg-[#e6f4f2] dark:bg-[#354545] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full transition-all"
                      style={{ width: plant.needs.water === "HIGH" ? "90%" : plant.needs.water === "MED" ? "60%" : "30%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <MdOpacity className="text-2xl text-teal-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Humidity</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getNeedsColor(plant.needs.humidity)}`}>
                      {getNeedsLabel(plant.needs.humidity)}
                    </span>
                  </div>
                  <div className="h-2 bg-[#e6f4f2] dark:bg-[#354545] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-400 rounded-full transition-all"
                      style={{ width: plant.needs.humidity === "HIGH" ? "90%" : plant.needs.humidity === "MED" ? "60%" : "30%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#005f52] transition-colors flex items-center justify-center gap-2">
              <MdWaterDrop /> Water Now
            </button>
            <button className="flex-1 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors">
              Edit Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
