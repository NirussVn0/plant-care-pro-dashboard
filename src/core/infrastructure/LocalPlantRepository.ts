
import { Plant, PlantProps } from "../domain/Plant";
import { IPlantRepository } from "../repositories/IPlantRepository";

export class LocalPlantRepository implements IPlantRepository {
  private readonly STORAGE_KEY = 'MAIN_PLANT_DB_V1';

  private getPlantsFromStorage(): PlantProps[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private savePlantsToStorage(plants: PlantProps[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(plants));
  }

  async findById(id: string): Promise<Plant | null> {
    const plants = this.getPlantsFromStorage();
    const found = plants.find(p => {
       // We need to store ID in props or handle it. 
       // The Entity base class generates ID but it's not in props by default in my previous code?
       // Let's assume we re-hydrate properly. 
       // For simplicity, we might need to cast or adjust BaseClasses.
       return (p as any).id === id || (p as any)._id === id;
    });
    // In a real app we would map this back to an Entity carefully.
    // Here we will re-create the entity.
    return found ? Plant.create(found, (found as any)._id) : null;
  }

  async findAll(): Promise<Plant[]> {
    const rawPlants = this.getPlantsFromStorage();
    return rawPlants.map((p: any) => Plant.create(p, p._id));
  }

  async save(plant: Plant): Promise<void> {
    const plants = this.getPlantsFromStorage();
    // Use a serialization method on Entity if it existed, or access props directly + ID.
    // Accessing private/protected members is tricky.
    // For this demo, we will expand the logic.
    // In Entity.ts, props is protected. We need a getter or serialization method.
    // I will add a toJSON/toDTO method to BaseClasses later OR assume usage here.
    
    // Hack: accessing props via casting/getter for now or assuming we fix Entity.
    const plantData = {
      ...plant['props'], 
      _id: plant.id 
    };

    const index = plants.findIndex((p: any) => p._id === plant.id);
    if (index >= 0) {
        plants[index] = plantData;
    } else {
        plants.push(plantData);
    }
    this.savePlantsToStorage(plants);
  }

  async delete(id: string): Promise<void> {
    let plants = this.getPlantsFromStorage();
    plants = plants.filter((p: any) => p._id !== id);
    this.savePlantsToStorage(plants);
  }

  async findByLocation(location: string): Promise<Plant[]> {
    const all = await this.findAll();
    return all.filter(p => p.location === location);
  }
}
