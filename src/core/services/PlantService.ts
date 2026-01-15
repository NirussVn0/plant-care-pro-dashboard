
import { Plant, PlantProps } from "../domain/Plant";
import { IPlantRepository } from "../repositories/IPlantRepository";

export class PlantService {
  constructor(private repo: IPlantRepository) {}

  async getAllPlants(): Promise<Plant[]> {
    return this.repo.findAll();
  }

  async registerPlant(props: PlantProps): Promise<Plant> {
    const newPlant = Plant.create(props);
    await this.repo.save(newPlant);
    return newPlant;
  }

  async waterPlant(plantId: string): Promise<void> {
    const plant = await this.repo.findById(plantId);
    if (!plant) throw new Error("Plant not found");
    
    plant.water();
    await this.repo.save(plant);
  }

  async removePlant(plantId: string): Promise<void> {
    await this.repo.delete(plantId);
  }
}
