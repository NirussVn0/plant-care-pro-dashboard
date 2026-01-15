
import { Plant } from "../domain/Plant";

export interface IPlantRepository {
  findById(id: string): Promise<Plant | null>;
  findAll(): Promise<Plant[]>;
  save(plant: Plant): Promise<void>;
  delete(id: string): Promise<void>;
  findByLocation(location: string): Promise<Plant[]>;
}
