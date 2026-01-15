
export enum TaskType {
    WATER = 'WATER',
    MIST = 'MIST',
    FERTILIZE = 'FERTILIZE'
}

export interface Task {
    id: string;
    plantId: string;
    plantName: string;
    type: TaskType;
    dueDate: Date;
    completed: boolean;
}
