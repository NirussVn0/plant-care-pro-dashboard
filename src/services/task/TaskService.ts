import { Task } from "@/models/Task";

export interface ITaskService {
  getDailyTasks(): Promise<Task[]>;
  getTasksByDate(date: Date): Promise<Task[]>;
}

export class TaskService implements ITaskService {
  private readonly TASKS: Task[] = [
    {
      id: "1",
      plantId: "1",
      type: "WATER",
      date: new Date(), // Today
      completed: false,
    },
    {
        id: "2",
        plantId: "2",
        type: "FERTILIZE",
        date: new Date(),
        completed: false,
    },
    {
        id: "3",
        plantId: "4",
        type: "MIST",
        date: new Date(),
        completed: true,
    },
    // Mock data for May 24 (or specific date logic)
    {
        id: "4",
        plantId: "1",
        type: "WATER",
        date: new Date("2024-05-24"),
        completed: false,
        note: "Needs approx 500ml"
    },
    {
        id: "5",
        plantId: "5", // Calathea
        type: "MIST",
        date: new Date("2024-05-24"),
        completed: false,
        note: "Humidity is low (45%)"
    },
    {
        id: "6",
        plantId: "2", // Fiddle Leaf
        type: "FERTILIZE",
        date: new Date("2024-05-24"),
        completed: false,
        note: "Monthly fertilization"
    }
  ];

  async getDailyTasks(): Promise<Task[]> {
    // Return tasks for today
    const today = new Date();
    return this.getTasksByDate(today);
  }

  async getTasksByDate(date: Date): Promise<Task[]> {
    const target = date.toISOString().split('T')[0];
    const todayStr = new Date().toISOString().split('T')[0];

    // For demo purposes, checking strictly for the mock values or fallback to today
    if (target === '2024-05-24') {
        return Promise.resolve(this.TASKS.filter(t => t.date.toISOString().startsWith('2024-05-24')));
    }
    
    return Promise.resolve(this.TASKS.filter(t => {
        // If query is today, return tasks for today (regardless of exact time)
        if (target === todayStr) {
            const tDate = new Date(t.date).toISOString().split('T')[0];
            return tDate === todayStr;
        }
        return false;
    }));
  }
}
