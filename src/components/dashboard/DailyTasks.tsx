"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MdWaterDrop, MdCheck } from "react-icons/md";
import BentoCard from "@/components/ui/BentoCard";
import ServiceFactory from "@/services/ServiceFactory";
import { Task } from "@/models/Task";
import { animationService } from "@/services/animation/AnimationService";

const ANIMATION_KEY = "dashboard-daily-tasks";

export default function DailyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const tasksListRef = useRef<HTMLDivElement>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const dailyTasks = await ServiceFactory.getTaskService().getDailyTasks();
      setTasks(dailyTasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Entrance animation with TTL tracking
  useEffect(() => {
    if (loading) return;

    const alreadyPlayed = animationService.hasPlayed(ANIMATION_KEY);

    if (cardRef.current) {
      if (alreadyPlayed) {
        animationService.showImmediately(cardRef.current);
      } else {
        animationService.fadeInUp(cardRef.current, { delay: 100, duration: 600 });
      }
    }

    if (tasksListRef.current) {
      const children = tasksListRef.current.children as unknown as Element[];
      if (alreadyPlayed) {
        animationService.showImmediately(children);
      } else {
        animationService.staggerFadeIn(children, { stagger: 80, delay: 300 });
        animationService.markPlayed(ANIMATION_KEY);
      }
    }
  }, [loading]);

  const handleToggleTask = useCallback(async (taskId: string) => {
    const updatedTask = await ServiceFactory.getTaskService().toggleTaskComplete(taskId);
    if (updatedTask) {
      setTasks((prev) =>
        prev
          .map((task) => (task.id === taskId ? { ...task, completed: updatedTask.completed } : task))
          .sort((a, b) => Number(a.completed) - Number(b.completed))
      );
    }
  }, []);

  const handleCompleteAll = useCallback(async () => {
    const incompleteTasks = tasks.filter((t) => !t.completed);
    for (const task of incompleteTasks) {
      await ServiceFactory.getTaskService().toggleTaskComplete(task.id);
    }
    fetchTasks();
  }, [tasks, fetchTasks]);

  const getTaskIcon = (type: string) => {
    const iconStyles: Record<string, string> = {
      WATER: "text-primary",
      MIST: "text-blue-400",
      FERTILIZE: "text-sun-yellow",
    };
    return <MdWaterDrop className={iconStyles[type] || "text-primary"} />;
  };

  const getTimeLabel = (task: Task): string => {
    const labels: Record<string, string> = {
      WATER: "Due: Now",
      MIST: "Due: 10:00 AM",
      FERTILIZE: "Scheduled",
    };
    return labels[task.type] || "Scheduled";
  };

  const formatTaskType = (type: string): string => {
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  return (
    <div ref={cardRef} className="opacity-0 h-full">
      <BentoCard
        title="Daily Tasks"
        headerAction={
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
            {tasks.filter((t) => !t.completed).length} Remaining
          </span>
        }
        className="h-full"
      >
        <div ref={tasksListRef} className="space-y-1 overflow-y-auto pr-1 custom-scrollbar flex-1">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 opacity-0">
            Morning Routine
          </div>

          {loading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg" />
              ))}
            </div>
          ) : (
            tasks.map((task) => (
              <label
                key={task.id}
                className={`flex items-center gap-3 p-3 hover:bg-background-light dark:hover:bg-background-dark/50 rounded-lg cursor-pointer group transition-all opacity-0 ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className={`flex items-center justify-center size-5 rounded-lg border-2 transition-all ${
                    task.completed
                      ? "bg-primary border-primary text-white"
                      : "border-primary hover:bg-primary/10"
                  }`}
                >
                  {task.completed && <MdCheck size={14} />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${task.completed ? "line-through text-text-muted" : ""}`}>
                    {formatTaskType(task.type)}: {task.plantName || "Plant"}
                  </p>
                  <p className="text-[10px] text-text-muted">{getTimeLabel(task)}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  {getTaskIcon(task.type)}
                </div>
              </label>
            ))
          )}
        </div>

        <button
          onClick={handleCompleteAll}
          disabled={tasks.every((t) => t.completed)}
          className="w-full mt-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete All
        </button>
      </BentoCard>
    </div>
  );
}
