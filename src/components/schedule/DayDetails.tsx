"use client";

import { Task } from "@/models/Task";
import { format } from "date-fns";
import { MdCheckCircle, MdWaterDrop, MdSunny, MdSpa, MdEco } from "react-icons/md";
import ServiceFactory from "@/services/ServiceFactory";
import { useEffect, useState } from "react";
import { Plant } from "@/models/Plant";

interface DayDetailsProps {
  selectedDate: Date;
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onClose: () => void;
}

/**
 * Side panel component showing task details for a selected date.
 * Displays tasks with plant info and quick action buttons.
 */
export default function DayDetails({ selectedDate, tasks, onCompleteTask, onClose }: DayDetailsProps) {
  const [plantDetails, setPlantDetails] = useState<Record<string, Plant>>({});

  useEffect(() => {
    const fetchPlants = async () => {
      const details: Record<string, Plant> = {};
      for (const task of tasks) {
        if (!details[task.plantId]) {
          const plant = await ServiceFactory.getPlantService().getPlantById(task.plantId);
          if (plant) details[task.plantId] = plant;
        }
      }
      setPlantDetails(details);
    };
    fetchPlants();
  }, [tasks]);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "WATER":
        return (
          <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-900/20">
            <MdWaterDrop className="text-blue-400 text-3xl" />
          </div>
        );
      case "MIST":
        return (
          <div className="p-1 rounded-md bg-green-50 dark:bg-green-900/20">
            <MdWaterDrop className="text-green-400 text-3xl" />
          </div>
        );
      case "FERTILIZE":
        return (
          <div className="p-1 rounded-md bg-orange-50 dark:bg-orange-900/20">
            <MdEco className="text-orange-400 text-3xl" />
          </div>
        );
      default:
        return <MdSpa />;
    }
  };

  return (
    <div className="w-full lg:w-96 bg-white dark:bg-[#2a3434] border-l border-[#e6f4f2] dark:border-[#354545] flex flex-col h-full lg:h-[calc(100vh-65px)] sticky top-[65px] transition-transform duration-300 transform lg:translate-x-0">
      <div className="p-6 border-b border-[#e6f4f2] dark:border-[#354545] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-main dark:text-text-inverse">{format(selectedDate, "EEEE")}</h2>
          <p className="text-sm text-primary font-medium">{format(selectedDate, "MMMM do, yyyy")}</p>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-primary">
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-primary/50">
            <MdSpa className="text-4xl mx-auto mb-2 opacity-50" />
            <p>No tasks scheduled for this day.</p>
          </div>
        ) : (
          tasks.map((task) => {
            const plant = plantDetails[task.plantId];
            return (
              <div key={task.id} className="flex gap-4 group">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-0.5 h-full bg-[#e6f4f2] dark:bg-[#354545] group-last:bg-transparent" />
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-[#fcfbf9] dark:bg-[#222a2a] p-4 rounded-xl border border-[#e6f4f2] dark:border-[#354545] hover:border-primary transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        {getTaskIcon(task.type)}
                        <div>
                          <h4 className="font-bold text-text-main dark:text-text-inverse">{plant?.name || "Loading..."}</h4>
                          <p className="text-xs text-primary font-bold uppercase tracking-wider">{task.type}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onCompleteTask(task.id)}
                        className={`p-1 rounded-full border-2 transition-all ${task.completed ? "bg-primary border-primary text-white" : "border-[#e6f4f2] dark:border-[#354545] text-transparent hover:border-primary"}`}
                      >
                        <MdCheckCircle className="text-xl" />
                      </button>
                    </div>

                    {plant && (
                      <div className="text-xs text-text-main/70 dark:text-text-inverse/70 flex gap-3 mt-2">
                        <span className="flex items-center gap-1">
                          <MdSunny size={12} /> {plant.needs.light}
                        </span>
                        <span className="flex items-center gap-1">
                          <MdWaterDrop size={12} /> {plant.needs.water}
                        </span>
                      </div>
                    )}

                    {task.note && <div className="mt-3 text-xs italic text-primary bg-primary/5 p-2 rounded-lg">&quot;{task.note}&quot;</div>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-[#e6f4f2] dark:border-[#354545] bg-[#fcfbf9] dark:bg-[#222a2a]">
        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Quick Actions</h4>
        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-lg border border-[#e6f4f2] dark:border-[#354545] bg-white dark:bg-[#2a3434] text-xs font-bold hover:bg-primary hover:text-white transition-colors flex flex-col items-center gap-1">
            <MdWaterDrop className="text-lg" /> Water All
          </button>
          <button className="flex-1 py-2 rounded-lg border border-[#e6f4f2] dark:border-[#354545] bg-white dark:bg-[#2a3434] text-xs font-bold hover:bg-primary hover:text-white transition-colors flex flex-col items-center gap-1">
            <MdWaterDrop className="text-lg" /> Mist All
          </button>
          <button className="flex-1 py-2 rounded-lg border border-[#e6f4f2] dark:border-[#354545] bg-white dark:bg-[#2a3434] text-xs font-bold hover:bg-primary hover:text-white transition-colors flex flex-col items-center gap-1">
            <MdEco className="text-lg" /> Feed All
          </button>
        </div>
      </div>
    </div>
  );
}
