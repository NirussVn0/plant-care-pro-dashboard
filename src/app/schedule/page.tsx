"use client";

import { useEffect, useState } from "react";
import CalendarGrid from "@/components/schedule/CalendarGrid";
import DayDetails from "@/components/schedule/DayDetails";
import ServiceFactory from "@/services/ServiceFactory";
import { Task } from "@/models/Task";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-05-24")); // Default mock date
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    ServiceFactory.getTaskService().getTasksByDate(selectedDate).then(setTasks);
  }, [selectedDate]);

  return (
    <div className="min-h-full">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Schedule & Tasks</h1>
                <p className="text-primary">Plan, track, and nurture your green sanctuary.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[calc(100vh-200px)]">
            <div className="lg:col-span-8 h-full">
                <CalendarGrid selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            </div>
            <div className="lg:col-span-4 h-full">
                <DayDetails 
                  selectedDate={selectedDate} 
                  tasks={tasks} 
                  onCompleteTask={(id) => console.log("Complete task:", id)}
                  onClose={() => console.log("Close")}
                />
            </div>
         </div>
    </div>
  );
}
