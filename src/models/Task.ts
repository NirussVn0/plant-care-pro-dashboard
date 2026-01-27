export type TaskType = 'WATER' | 'MIST' | 'FERTILIZE' | 'PRUNE' | 'REPOTTING';

export interface Task {
  id: string;
  type: TaskType;
  plantId: string;
  plantName?: string;
  date: Date;
  completed: boolean;
  completedDate?: Date;
  note?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}
