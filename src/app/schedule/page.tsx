"use client";

import { useEffect, useState, useMemo } from "react";
import CalendarGrid from "@/components/schedule/CalendarGrid";
import DayDetails from "@/components/schedule/DayDetails";
import ServiceFactory from "@/services/ServiceFactory";
import { Task } from "@/models/Task";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    ServiceFactory.getTaskService().getAllTasks().then(setAllTasks);
  }, []);

  const taskDates = useMemo(() => {
    const dates = new Set<string>();
    allTasks.forEach((task) => {
      dates.add(task.date.toISOString().split("T")[0]);
    });
    return dates;
  }, [allTasks]);

  const selectedDateTasks = useMemo(() => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    return allTasks.filter((task) => task.date.toISOString().split("T")[0] === dateStr);
  }, [selectedDate, allTasks]);

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
          <CalendarGrid
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            taskDates={taskDates}
          />
        </div>
        <div className="lg:col-span-4 h-full">
          <DayDetails
            selectedDate={selectedDate}
            tasks={selectedDateTasks}
            onCompleteTask={(id) => console.log("Complete task:", id)}
            onClose={() => console.log("Close")}
          />
        </div>
      </div>
    </div>
  );
}
