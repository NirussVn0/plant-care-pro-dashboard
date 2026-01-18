import { Task } from "@/models/Task";

/**
 * Interface for Task Service operations.
 * Defines contract for task scheduling and retrieval.
 */
export interface ITaskService {
  getDailyTasks(): Promise<Task[]>;
  getTasksByDate(date: Date): Promise<Task[]>;
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
    { id: "4", plantId: "1", type: "WATER", date: new Date("2024-05-24"), completed: false, note: "Needs approx 500ml" },
    { id: "5", plantId: "5", type: "MIST", date: new Date("2024-05-24"), completed: false, note: "Humidity is low (45%)" },
    { id: "6", plantId: "2", type: "FERTILIZE", date: new Date("2024-05-24"), completed: false, note: "Monthly fertilization" },
  ];

  async getDailyTasks(): Promise<Task[]> {
    return this.getTasksByDate(new Date());
  }

  async getTasksByDate(date: Date): Promise<Task[]> {
    const targetDateStr = this.formatDateString(date);
    const todayStr = this.formatDateString(new Date());

    if (targetDateStr === "2024-05-24") {
      return Promise.resolve(this.tasks.filter((task) => 
        this.formatDateString(task.date) === "2024-05-24"
      ));
    }

    if (targetDateStr === todayStr) {
      return Promise.resolve(this.tasks.filter((task) => 
        this.formatDateString(task.date) === todayStr
      ));
    }

    return Promise.resolve([]);
  }

  /**
   * Formats a Date object to YYYY-MM-DD string for comparison.
   */
  private formatDateString(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}
