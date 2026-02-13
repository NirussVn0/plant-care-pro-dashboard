import { Task } from "@/models/Task";
import { isValidTaskData } from "./TaskValidator";

/**
 * Mock data store for tasks.
 * Centralized location for all demo/mock data.
 * This simulates API responses until backend is ready.
 */
const MOCK_TASKS: Task[] = [
  // Today's tasks (using relative dates)
  { id: "1", plantId: "1", type: "WATER", date: getRelativeDate(0), completed: false, note: "Morning watering" },
  { id: "2", plantId: "2", type: "FERTILIZE", date: getRelativeDate(0), completed: false },
  { id: "3", plantId: "4", type: "MIST", date: getRelativeDate(0), completed: true },
  
  // Tomorrow's tasks
  { id: "4", plantId: "1", type: "WATER", date: getRelativeDate(1), completed: false, note: "Needs approx 500ml" },
  { id: "5", plantId: "5", type: "MIST", date: getRelativeDate(1), completed: false, note: "Humidity is low (45%)" },
  { id: "6", plantId: "2", type: "FERTILIZE", date: getRelativeDate(1), completed: false, note: "Monthly fertilization" },
  
  // Future tasks (relative days from now)
  { id: "7", plantId: "3", type: "WATER", date: getRelativeDate(3), completed: false },
  { id: "8", plantId: "6", type: "MIST", date: getRelativeDate(5), completed: false },
  { id: "9", plantId: "7", type: "WATER", date: getRelativeDate(7), completed: false },
  { id: "10", plantId: "8", type: "FERTILIZE", date: getRelativeDate(10), completed: false },
  { id: "11", plantId: "1", type: "WATER", date: getRelativeDate(14), completed: false },
  { id: "12", plantId: "2", type: "MIST", date: getRelativeDate(18), completed: false },
];

function getRelativeDate(daysFromNow: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0); // Reset to midnight local time
  date.setDate(date.getDate() + daysFromNow);
  return date;
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Interface for Task Service operations.
 * Defines contract for task scheduling and retrieval.
 */
export interface ITaskService {
  getDailyTasks(): Promise<Task[]>;
  getTasksByDate(date: Date): Promise<Task[]>;
  getAllTasks(): Promise<Task[]>;
  getTaskDates(): Promise<Set<string>>;
  toggleTaskComplete(taskId: string): Promise<Task | undefined>;
  addTask(task: Omit<Task, "id">): Promise<Task>;
}


export class TaskService implements ITaskService {
  private tasks: Task[] = [];
  private readonly STORAGE_KEY = "plantcare_tasks";

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    // Start with mock data
    this.tasks = [...MOCK_TASKS];
    
    if (typeof window === "undefined") return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          parsed.forEach((t: any) => {
            // Sanitize: truncate long notes to avoid data loss on legacy items
            if (typeof t.note === "string" && t.note.length > 500) {
              t.note = t.note.substring(0, 500);
            }

            // Security check: validate data structure before processing
            if (!isValidTaskData(t)) return;

            // Restore date (JSON parsing loses Date objects)
            const savedTask = { ...t, date: new Date(t.date) } as Task;

            const mockTask = this.tasks.find((mt) => mt.id === savedTask.id);
            if (mockTask) {
              mockTask.completed = savedTask.completed;
            } else {
              // User-added task
              this.tasks.push(savedTask);
            }
          });
        }
      }
    } catch (err) {
      console.error("Failed to load tasks from storage", err);
    }
  }

  private saveToStorage(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (err) {
      console.error("Failed to save tasks to storage", err);
    }
  }

  private async simulateApiCall<T>(data: T, delayMs = 100): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
  }

  async getDailyTasks(): Promise<Task[]> {
    return this.getTasksByDate(new Date());
  }

  async getTasksByDate(date: Date): Promise<Task[]> {
    const targetDateStr = formatLocalDate(date);
    const tasks = this.tasks.filter((task) => formatLocalDate(task.date) === targetDateStr);
    // Sort: incomplete first, then completed
    tasks.sort((a, b) => Number(a.completed) - Number(b.completed));
    return this.simulateApiCall(tasks);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.simulateApiCall([...this.tasks]);
  }

  async getTaskDates(): Promise<Set<string>> {
    const dates = new Set(this.tasks.map((task) => formatLocalDate(task.date)));
    return this.simulateApiCall(dates);
  }

  async toggleTaskComplete(taskId: string): Promise<Task | undefined> {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveToStorage();
    }
    return this.simulateApiCall(task ? { ...task } : undefined);
  }

  async addTask(taskData: Omit<Task, "id">): Promise<Task> {
    const newTask: Task = {
      ...taskData,
      id: String(Date.now()), // Use timestamp for unique ID
    };
    this.tasks.push(newTask);
    this.saveToStorage();
    return this.simulateApiCall(newTask);
  }
}

export { formatLocalDate };
