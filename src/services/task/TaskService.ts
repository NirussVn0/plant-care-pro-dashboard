import { Task } from "@/models/Task";

export interface ITaskService {
  getDailyTasks(): Promise<Task[]>;
  getUpcomingTasks(): Promise<Task[]>;
  completeTask(id: string): Promise<boolean>;
}

export class TaskService implements ITaskService {
  private tasks: Task[] = [
    {
      id: '1',
      type: 'WATER',
      plantId: '1',
      plantName: 'Monstera Deliciosa',
      dueDate: new Date(), // Today
      completed: false
    },
    {
      id: '2',
      type: 'MIST',
      plantId: '2',
      plantName: 'Calathea Ornata', // Changed from design to match typical data
      dueDate: new Date(),
      completed: false,
      priority: 'MEDIUM'
    },
    {
        id: '3',
        type: 'FERTILIZE',
        plantId: '1',
        plantName: 'Ferns',
        dueDate: new Date(),
        completed: false,
        priority: 'LOW'
    }
  ];

  async getDailyTasks(): Promise<Task[]> {
    return new Promise((resolve) => 
      setTimeout(() => resolve(this.tasks.filter(t => !t.completed)), 400)
    );
  }

  async getUpcomingTasks(): Promise<Task[]> {
      // Mock upcoming tasks
       return new Promise((resolve) => 
      setTimeout(() => resolve([]), 400)
    );
  }

  async completeTask(id: string): Promise<boolean> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      task.completedDate = new Date();
      return true;
    }
    return false;
  }
}
