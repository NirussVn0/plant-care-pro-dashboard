
import { IPlantRepository } from "../repositories/IPlantRepository";
import { Task, TaskType } from "../domain/Task";

export class TaskService {
    constructor(private plantRepo: IPlantRepository) {}

    async getDailyTasks(): Promise<Task[]> {
        const plants = await this.plantRepo.findAll();
        const tasks: Task[] = [];

        plants.forEach(plant => {
            if (plant.isWateringDue()) {
                tasks.push({
                    id: `task-${plant.id}-${Date.now()}`, // Simple ID gen
                    plantId: plant.id,
                    plantName: plant.name,
                    type: TaskType.WATER,
                    dueDate: new Date(),
                    completed: false
                });
            }
            // Add other logic for Misting/Fertilizing if props exist
        });

        return tasks;
    }

    async completeTask(taskId: string, plantId: string): Promise<void> {
        // Logic to update plant state
        const plant = await this.plantRepo.findById(plantId);
        if (plant) {
            plant.water();
            await this.plantRepo.save(plant);
        }
    }
}
