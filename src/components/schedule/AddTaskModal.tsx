"use client";

import { useState, useEffect } from "react";
import { MdClose, MdCalendarToday, MdLocalFlorist, MdWaterDrop, MdEco, MdContentCut } from "react-icons/md";
import { createPortal } from "react-dom";
import ServiceFactory from "@/services/ServiceFactory";
import { Plant } from "@/models/Plant";
import { TaskType } from "@/models/Task";

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: { plantId: string; plantName: string; type: TaskType; date: Date }) => void;
}

export default function AddTaskModal({ onClose, onAddTask }: AddTaskModalProps) {
  const [mounted, setMounted] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState("");
  const [taskType, setTaskType] = useState<TaskType>("WATER");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    // Fetch plants for dropdown
    ServiceFactory.getPlantService().getAllPlants().then((data) => {
      setPlants(data);
      if (data.length > 0) setSelectedPlantId(data[0].id);
    });
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlantId) return;
    
    const plant = plants.find(p => p.id === selectedPlantId);
    
    onAddTask({
      plantId: selectedPlantId,
      plantName: plant?.name || "Unknown Plant",
      type: taskType,
      date: new Date(date),
    });
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#2a3434] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-[#e6f4f2] dark:border-[#354545]">
          <h2 className="text-lg font-bold text-text-main dark:text-text-inverse">Add New Task</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Plant Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Select Plant</label>
            <div className="relative">
              <MdLocalFlorist className="absolute left-3 top-3 text-primary" />
              <select
                value={selectedPlantId}
                onChange={(e) => setSelectedPlantId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#f4f3f1] dark:bg-[#222a2a] rounded-lg border-none focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
              >
                {plants.map((plant) => (
                  <option key={plant.id} value={plant.id}>
                    {plant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Task Type */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Task Type</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTaskType("WATER")}
                className={`p-3 rounded-xl flex flex-col items-center gap-1 border-2 transition-all ${
                  taskType === "WATER"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                    : "border-transparent bg-[#f4f3f1] dark:bg-[#222a2a] text-text-muted hover:bg-[#e6f4f2] dark:hover:bg-[#354545]"
                }`}
              >
                <MdWaterDrop size={24} />
                <span className="text-xs font-bold">Water</span>
              </button>
              <button
                type="button"
                onClick={() => setTaskType("FERTILIZE")}
                className={`p-3 rounded-xl flex flex-col items-center gap-1 border-2 transition-all ${
                  taskType === "FERTILIZE"
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                    : "border-transparent bg-[#f4f3f1] dark:bg-[#222a2a] text-text-muted hover:bg-[#e6f4f2] dark:hover:bg-[#354545]"
                }`}
              >
                <MdEco size={24} />
                <span className="text-xs font-bold">Fertilize</span>
              </button>
              <button
                type="button"
                onClick={() => setTaskType("MIST")}
                className={`p-3 rounded-xl flex flex-col items-center gap-1 border-2 transition-all ${
                  taskType === "MIST"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-600"
                    : "border-transparent bg-[#f4f3f1] dark:bg-[#222a2a] text-text-muted hover:bg-[#e6f4f2] dark:hover:bg-[#354545]"
                }`}
              >
                <MdContentCut size={24} />
                <span className="text-xs font-bold">Mist</span>
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Due Date</label>
            <div className="relative">
              <MdCalendarToday className="absolute left-3 top-3 text-primary" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#f4f3f1] dark:bg-[#222a2a] rounded-lg border-none focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#005f52] transition-colors mt-4 shadow-lg shadow-primary/20"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
