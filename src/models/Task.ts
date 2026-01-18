export type TaskType = 'WATER' | 'MIST' | 'FERTILIZE' | 'PRUNE' | 'REPOTTING';

export interface Task {
  id: string;
  type: TaskType;
  plantId: string;
  plantName: string;
  dueDate: Date;
  completed: boolean;
  completedDate?: Date;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}
