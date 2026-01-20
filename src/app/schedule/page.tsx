"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import CalendarGrid from "@/components/schedule/CalendarGrid";
import DayDetails from "@/components/schedule/DayDetails";
import ServiceFactory from "@/services/ServiceFactory";
import { Task } from "@/models/Task";
import { animationService } from "@/services/animation/AnimationService";
import { MdAdd } from "react-icons/md";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ServiceFactory.getTaskService().getAllTasks().then(setAllTasks);
  }, []);

  // Entrance animations
  useEffect(() => {
    if (headerRef.current) {
      animationService.fadeInUp(headerRef.current, { delay: 0, duration: 600 });
    }
    if (calendarRef.current) {
      animationService.fadeInLeft(calendarRef.current, { delay: 200, duration: 700 });
    }
    if (detailsRef.current) {
      animationService.fadeInRight(detailsRef.current, { delay: 400, duration: 700 });
    }
  }, []);

  const handleCompleteTask = useCallback(async (taskId: string) => {
    const updatedTask = await ServiceFactory.getTaskService().toggleTaskComplete(taskId);
    if (updatedTask) {
      setAllTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: updatedTask.completed } : task
        )
      );
    }
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
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 opacity-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Schedule & Tasks</h1>
          <p className="text-primary">Plan, track, and nurture your green sanctuary.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-[#005f52] transition-colors shadow-lg shadow-primary/20"
        >
          <MdAdd className="text-lg" /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[calc(100vh-200px)]">
        <div ref={calendarRef} className="lg:col-span-8 h-full opacity-0">
          <CalendarGrid
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            taskDates={taskDates}
          />
        </div>
        <div ref={detailsRef} className="lg:col-span-4 h-full opacity-0">
          <DayDetails
            selectedDate={selectedDate}
            tasks={selectedDateTasks}
            onCompleteTask={handleCompleteTask}
            onClose={() => console.log("Close")}
          />
        </div>
      </div>

      {/* AddTaskModal placeholder - to be implemented */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white dark:bg-[#2a3434] rounded-2xl p-6 w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <p className="text-primary mb-4">Task creation form coming soon!</p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-[#005f52] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
