"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import ServiceFactory from "@/services/ServiceFactory";
import { Task, TaskType } from "@/models/Task";
import { formatLocalDate } from "@/services/task/TaskService";

/**
 * Input interface for adding a new task
 */
export interface AddTaskInput {
  plantId: string;
  plantName: string;
  type: TaskType;
  date: Date;
}

/**
 * Return type for useSchedule hook
 */
export interface UseScheduleReturn {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  allTasks: Task[];
  selectedDateTasks: Task[];
  taskDates: Set<string>;
  showAddModal: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  handleCompleteTask: (taskId: string) => Promise<void>;
  handleAddTask: (input: AddTaskInput) => Promise<void>;
}

/**
 * Custom hook encapsulating schedule page business logic.
 * Follows SRP by separating state management from UI rendering.
 */
export function useSchedule(): UseScheduleReturn {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch tasks on mount
  useEffect(() => {
    ServiceFactory.getTaskService().getAllTasks().then(setAllTasks);
  }, []);

  // Derive task dates for calendar highlighting
  const taskDates = useMemo(() => {
    const dates = new Set<string>();
    allTasks.forEach((task) => dates.add(formatLocalDate(task.date)));
    return dates;
  }, [allTasks]);

  // Filter and sort tasks for selected date
  const selectedDateTasks = useMemo(() => {
    const dateStr = formatLocalDate(selectedDate);
    return allTasks
      .filter((task) => formatLocalDate(task.date) === dateStr)
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  }, [selectedDate, allTasks]);

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

  const handleAddTask = useCallback(async (input: AddTaskInput) => {
    const createdTask = await ServiceFactory.getTaskService().addTask({
      plantId: input.plantId,
      plantName: input.plantName,
      type: input.type,
      date: input.date,
      completed: false,
      priority: "MEDIUM",
    });
    setAllTasks((prev) => [...prev, createdTask]);
    setShowAddModal(false);
  }, []);

  const openAddModal = useCallback(() => setShowAddModal(true), []);
  const closeAddModal = useCallback(() => setShowAddModal(false), []);

  return {
    selectedDate,
    setSelectedDate,
    allTasks,
    selectedDateTasks,
    taskDates,
    showAddModal,
    openAddModal,
    closeAddModal,
    handleCompleteTask,
    handleAddTask,
  };
}

export default useSchedule;
