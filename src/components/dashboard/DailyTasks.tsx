"use client";

import { useEffect, useState } from "react";
import { MdWaterDrop, MdTerrain } from "react-icons/md"; // Misting alternative -> Terrain/Water
import { GiFertilizerBag } from "react-icons/gi";
import clsx from "clsx";
import BentoCard from "@/components/ui/BentoCard";
import ServiceFactory from "@/services/ServiceFactory";
import { Task } from "@/models/Task";

export default function DailyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const dailyTasks = await ServiceFactory.getTaskService().getDailyTasks();
        setTasks(dailyTasks);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "WATER": return <MdWaterDrop className="text-primary" />;
      case "MIST": return <MdWaterDrop className="text-blue-400" />;
      case "FERTILIZE": return <GiFertilizerBag className="text-sun-yellow" />;
      default: return <MdWaterDrop className="text-primary" />;
    }
  };

  const getTimeLabel = (task: Task) => {
      // Logic for time display based on mock data or real dates
      // For now hardcoding based on design intent
      if (task.type === 'WATER') return "Due: Now";
      if (task.type === 'MIST') return "Due: 10:00 AM";
      return "Scheduled";
  };

  return (
    <BentoCard 
      title="Daily Tasks" 
      headerAction={<span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">{tasks.length} Total</span>}
      className="h-full"
    >
      <div className="space-y-1 overflow-y-auto pr-1 custom-scrollbar flex-1">
        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Morning Routine</div>
        
        {loading ? (
             <div className="animate-pulse space-y-3">
                 {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>)}
             </div>
        ) : (
             tasks.map((task) => (
                <label key={task.id} className="flex items-center gap-3 p-3 hover:bg-background-light dark:hover:bg-background-dark/50 rounded-lg cursor-pointer group transition-all">
                  <input 
                    className="appearance-none rounded-lg border-2 border-primary checked:bg-primary checked:border-primary size-5 transition-colors cursor-pointer relative" 
                    type="checkbox"
                  />
                  {/* Custom Check Icon imitation done via CSS/Appearance or standard checkbox styling from Tailwind Forms plugin if enabled. 
                      Since we don't have forms plugin explicitly configured in globals yet, standard checkbox might look raw. 
                      Adding 'appearance-none' requires manual styling. Let's assume default for now or add simple styles.
                   */}
                  
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{task.type.charAt(0) + task.type.slice(1).toLowerCase()}: {task.plantName}</p>
                    <p className="text-[10px] text-text-muted">{getTimeLabel(task)}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {getTaskIcon(task.type)}
                  </div>
                </label>
            ))
        )}
        
        {/* Placeholder for Afternoon section if needed */}
        {/* <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 mt-4">Afternoon</div> */}
      </div>

      <button className="w-full mt-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-secondary transition-colors">
        Complete All
      </button>
    </BentoCard>
  );
}
