"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import CalendarGrid from "@/components/schedule/CalendarGrid";
import DayDetails from "@/components/schedule/DayDetails";
import ServiceFactory from "@/services/ServiceFactory";
import { Task } from "@/models/Task";
import { animationService } from "@/services/animation/AnimationService";
import { formatLocalDate } from "@/services/task/TaskService";
import { MdAdd } from "react-icons/md";
import AddTaskModal from "@/components/schedule/AddTaskModal";

const ANIMATION_KEY = "schedule-page";

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

  // Entrance animations with session tracking
  useEffect(() => {
    const alreadyPlayed = animationService.hasPlayed(ANIMATION_KEY);

    if (headerRef.current) {
      if (alreadyPlayed) {
        animationService.showImmediately(headerRef.current);
      } else {
        animationService.fadeInUp(headerRef.current, { delay: 0, duration: 600 });
      }
    }
    if (calendarRef.current) {
      if (alreadyPlayed) {
        animationService.showImmediately(calendarRef.current);
      } else {
        animationService.fadeInLeft(calendarRef.current, { delay: 200, duration: 700 });
      }
    }
    if (detailsRef.current) {
      if (alreadyPlayed) {
        animationService.showImmediately(detailsRef.current);
      } else {
        animationService.fadeInRight(detailsRef.current, { delay: 400, duration: 700 });
      }
    }

    if (!alreadyPlayed) {
      animationService.markPlayed(ANIMATION_KEY);
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

  // Use formatLocalDate for proper timezone handling
  const taskDates = useMemo(() => {
    const dates = new Set<string>();
    allTasks.forEach((task) => {
      dates.add(formatLocalDate(task.date));
    });
    return dates;
  }, [allTasks]);

  // Sort tasks: incomplete first, completed last
  const selectedDateTasks = useMemo(() => {
    const dateStr = formatLocalDate(selectedDate);
    const tasks = allTasks.filter((task) => formatLocalDate(task.date) === dateStr);
    return tasks.sort((a, b) => Number(a.completed) - Number(b.completed));
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

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAddTask={async (newTask) => {
            const createdTask = await ServiceFactory.getTaskService().addTask({
              plantId: newTask.plantId,
              plantName: newTask.plantName,
              type: newTask.type,
              date: newTask.date,
              completed: false,
              priority: "MEDIUM",
            });
            setAllTasks((prev) => [...prev, createdTask]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
