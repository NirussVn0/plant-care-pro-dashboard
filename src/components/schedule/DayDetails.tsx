"use client";

import { Task } from "@/models/Task";
import { format } from "date-fns";
import { MdCheckCircle, MdWaterDrop, MdSunny, MdSpa, MdWbTwilight, MdNightsStay } from "react-icons/md";
import { BiSprayCan } from "react-icons/bi"; // For Mist
import { GiFertilizerBag } from "react-icons/gi"; // For Fertilize
import ServiceFactory from "@/services/ServiceFactory";
import { useEffect, useState } from "react";
import { Plant } from "@/models/Plant";

interface DayDetailsProps {
  date: Date;
  tasks: Task[];
}

export default function DayDetails({ date, tasks }: DayDetailsProps) {
  const [plants, setPlants] = useState<Record<string, Plant>>({});

  useEffect(() => {
    // Fetch plant details for tasks
    const loadPlantDetails = async () => {
        const plantService = ServiceFactory.getPlantService();
        const plantMap: Record<string, Plant> = {};
        for(const t of tasks) {
            if(!plantMap[t.plantId]) {
                const p = await plantService.getPlantById(t.plantId);
                if(p) plantMap[t.plantId] = p;
            }
        }
        setPlants(plantMap);
    };
    loadPlantDetails();
  }, [tasks]);

  const getIcon = (type: string) => {
    switch(type) {
        case 'WATER': return <MdWaterDrop className="text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-1 rounded-md text-3xl box-content" />;
        case 'MIST': return <BiSprayCan className="text-green-400 bg-green-50 dark:bg-green-900/20 p-1 rounded-md text-3xl box-content" />;
        case 'FERTILIZE': return <GiFertilizerBag className="text-orange-400 bg-orange-50 dark:bg-orange-900/20 p-1 rounded-md text-3xl box-content" />;
        default: return <MdSpa />;
    }
  };

  return (
    <div className="bento-card rounded-xl border border-white dark:border-[#354545] overflow-hidden flex flex-col h-full sticky top-24">
      <div className="p-6 border-b border-[#e6f4f2] dark:border-[#354545] bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-primary uppercase tracking-wider">Selected Day</p>
            <span className="text-xs bg-white dark:bg-[#354545] border border-[#e6f4f2] dark:border-[#2d3a3a] px-2 py-1 rounded text-primary font-bold shadow-sm">
                {tasks.length} Tasks Pending
            </span>
        </div>
        <h3 className="text-3xl font-extrabold font-display">{format(date, "MMM dd")}</h3>
        <p className="text-sm text-primary font-semibold">{format(date, "EEEE")}</p>
      </div>

      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
         {/* Morning Section (All tasks for demo) */}
         <div className="relative">
            <div className="flex items-center gap-2 mb-4">
                <MdSunny className="text-sun-yellow" size={20} />
                <h4 className="text-sm font-bold text-primary uppercase tracking-wide">Tasks</h4>
            </div>
            
            <div className="space-y-4">
                {tasks.length === 0 && <p className="text-xs text-text-muted italic ml-8">No tasks scheduled.</p>}
                
                {tasks.map(task => {
                    const plant = plants[task.plantId];
                    return (
                        <div key={task.id} className="p-4 rounded-xl bg-white dark:bg-[#2a3434] border border-[#e6f4f2] dark:border-[#354545] shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3">
                                    <div className="pt-0.5">
                                        <input className="rounded border-gray-300 text-primary focus:ring-primary size-5 cursor-pointer" type="checkbox" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                                            {plant ? plant.name : 'Unknown Plant'}
                                        </h5>
                                        <p className="text-xs text-primary mt-0.5">{task.note || 'Regular care'}</p>
                                    </div>
                                </div>
                                {getIcon(task.type)}
                            </div>
                            <button className="w-full mt-2 py-2 bg-[#f4fcfb] dark:bg-[#354545] text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold rounded-lg flex items-center justify-center gap-2">
                                <MdCheckCircle className="text-sm" /> Quick Care
                            </button>
                        </div>
                    );
                })}
            </div>
         </div>
      </div>
    </div>
  );
}
