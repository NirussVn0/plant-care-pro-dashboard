import { Task } from "@/models/Task";

/**
 * Interface for Task Service operations.
 * Defines contract for task scheduling and retrieval.
 */
export interface ITaskService {
  getDailyTasks(): Promise<Task[]>;
  getTasksByDate(date: Date): Promise<Task[]>;
  getAllTasks(): Promise<Task[]>;
  getTaskDates(): Promise<string[]>;
}

/**
 * Service class for managing plant care tasks.
 * Handles task scheduling, filtering by date, and completion tracking.
 */
export class TaskService implements ITaskService {
  private readonly tasks: Task[] = [
    { id: "1", plantId: "1", type: "WATER", date: new Date(), completed: false },
    { id: "2", plantId: "2", type: "FERTILIZE", date: new Date(), completed: false },
    { id: "3", plantId: "4", type: "MIST", date: new Date(), completed: true },
    { id: "4", plantId: "1", type: "WATER", date: new Date("2026-01-21"), completed: false, note: "Needs approx 500ml" },
    { id: "5", plantId: "5", type: "MIST", date: new Date("2026-01-21"), completed: false, note: "Humidity is low (45%)" },
    { id: "6", plantId: "2", type: "FERTILIZE", date: new Date("2026-01-21"), completed: false, note: "Monthly fertilization" },
    { id: "7", plantId: "3", type: "WATER", date: new Date("2026-01-03"), completed: true },
    { id: "8", plantId: "6", type: "MIST", date: new Date("2026-01-06"), completed: false },
    { id: "9", plantId: "7", type: "WATER", date: new Date("2026-01-09"), completed: false },
    { id: "10", plantId: "8", type: "FERTILIZE", date: new Date("2026-01-12"), completed: false },
    { id: "11", plantId: "1", type: "WATER", date: new Date("2026-01-15"), completed: false },
    { id: "12", plantId: "2", type: "MIST", date: new Date("2026-01-18"), completed: false },
    { id: "13", plantId: "4", type: "WATER", date: new Date("2026-01-24"), completed: false },
    { id: "14", plantId: "5", type: "FERTILIZE", date: new Date("2026-01-27"), completed: false },
    { id: "15", plantId: "6", type: "WATER", date: new Date("2026-01-30"), completed: false },
  ];

  async getDailyTasks(): Promise<Task[]> {
    return this.getTasksByDate(new Date());
  }

  async getTasksByDate(date: Date): Promise<Task[]> {
    const targetDateStr = this.formatDateString(date);
    return Promise.resolve(
      this.tasks.filter((task) => this.formatDateString(task.date) === targetDateStr)
    );
  }

  async getAllTasks(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  async getTaskDates(): Promise<string[]> {
    const dates = new Set(this.tasks.map((task) => this.formatDateString(task.date)));
    return Promise.resolve(Array.from(dates));
  }

  /**
   * Formats a Date object to YYYY-MM-DD string for comparison.
   */
  private formatDateString(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}
