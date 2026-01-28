import { Plant, PlantCategory, PlantDifficulty } from "@/models/Plant";

/**
 * Interface for Plant Service operations.
 * Defines contract for plant data access and management.
 */
export interface IPlantService {
  getAllPlants(): Promise<Plant[]>;
  getPlantById(id: string): Promise<Plant | undefined>;
  getPlantsByRoom(room: string): Promise<Plant[]>;
  getRooms(): Promise<string[]>;
  getCategories(): Promise<PlantCategory[]>;
  getDifficulties(): Promise<PlantDifficulty[]>;
  searchPlants(query: string, categories: PlantCategory[], difficulty: PlantDifficulty | null): Promise<Plant[]>;
}

/**
 * Service class for managing plant data.
 * Implements IPlantService interface with mock data storage.
 */
export class PlantService implements IPlantService {
  private readonly baseUrl = "http://localhost:3000/plants";

  async getAllPlants(): Promise<Plant[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error("Failed to fetch plants");
    return res.json();
  }

  async getPlantById(id: string): Promise<Plant | undefined> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) return undefined;
    return res.json();
  }

  async getPlantsByRoom(room: string): Promise<Plant[]> {
    const plants = await this.getAllPlants();
    if (room === "All Rooms") {
      return plants;
    }
    return plants.filter((plant) => plant.room === room);
  }

  async getRooms(): Promise<string[]> {
    const plants = await this.getAllPlants();
    const uniqueRooms = new Set(plants.map((plant) => plant.room));
    return ["All Rooms", ...Array.from(uniqueRooms)];
  }

  async getCategories(): Promise<PlantCategory[]> {
    // These could be fetched from backend config entirely, but hardcoded is fine for now
    return ["Succulents", "Tropical", "Ferns", "Cacti", "Flowering"];
  }

  async getDifficulties(): Promise<PlantDifficulty[]> {
    return ["Easy", "Intermediate", "Expert"];
  }

  async searchPlants(
    query: string,
    categories: PlantCategory[],
    difficulty: PlantDifficulty | null
  ): Promise<Plant[]> {
    let result = await this.getAllPlants();

    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(
        (plant) =>
          plant.name.toLowerCase().includes(lowerQuery) ||
          plant.scientificName.toLowerCase().includes(lowerQuery)
      );
    }

    if (categories.length > 0) {
      result = result.filter((plant) => categories.includes(plant.category));
    }

    if (difficulty) {
      result = result.filter((plant) => plant.difficulty === difficulty);
    }

    return result;
  }
}
