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
}

/**
 * Service class for managing plant data.
 * Implements IPlantService interface with mock data storage.
 */
export class PlantService implements IPlantService {
  private readonly plants: Plant[] = [
    {
      id: "1",
      name: "Monstera Deliciosa",
      scientificName: "Swiss Cheese Plant",
      room: "Living Room",
      location: "Living Room",
      images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"],
      health: 85,
      needs: { water: "MED", light: "HIGH", humidity: "HIGH" },
      category: "Tropical",
      difficulty: "Intermediate",
      petFriendly: false,
      lastWatered: new Date("2023-05-10"),
    },
    {
      id: "2",
      name: "Fiddle Leaf Fig",
      scientificName: "Ficus Lyrata",
      room: "Bedroom",
      location: "Bedroom",
      images: ["https://images.unsplash.com/photo-1597055181300-e30ba1540d6e?auto=format&fit=crop&q=80&w=800"],
      health: 92,
      needs: { water: "HIGH", light: "HIGH", humidity: "MED" },
      category: "Tropical",
      difficulty: "Expert",
      petFriendly: false,
      lastWatered: new Date("2023-05-12"),
    },
    {
      id: "3",
      name: "Snake Plant",
      scientificName: "Sansevieria Trifasciata",
      room: "Balcony",
      location: "Balcony",
      images: ["https://images.unsplash.com/photo-1599598425947-d352425c2768?auto=format&fit=crop&q=80&w=800"],
      health: 98,
      needs: { water: "LOW", light: "LOW", humidity: "LOW" },
      category: "Succulents",
      difficulty: "Easy",
      petFriendly: false,
      lastWatered: new Date("2023-05-01"),
    },
    {
      id: "4",
      name: "Neon Pothos",
      scientificName: "Epipremnum Aureum",
      room: "Kitchen",
      location: "Kitchen",
      images: ["https://images.unsplash.com/photo-1620603772274-a74a107ef4f8?w=800&auto=format&fit=crop&q=60"],
      health: 95,
      needs: { water: "MED", light: "MED", humidity: "HIGH" },
      category: "Tropical",
      difficulty: "Easy",
      petFriendly: false,
      lastWatered: new Date("2023-05-14"),
    },
    {
      id: "5",
      name: "Rubber Plant",
      scientificName: "Ficus Elastica",
      room: "Office",
      location: "Office",
      images: ["https://images.unsplash.com/photo-1592658253488-842245b0a390?w=800&auto=format&fit=crop&q=60"],
      health: 88,
      needs: { water: "MED", light: "MED", humidity: "MED" },
      category: "Tropical",
      difficulty: "Intermediate",
      petFriendly: false,
      lastWatered: new Date("2023-05-11"),
    },
    {
      id: "6",
      name: "Boston Fern",
      scientificName: "Nephrolepis Exaltata",
      room: "Bathroom",
      location: "Bathroom",
      images: ["https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&auto=format&fit=crop&q=60"],
      health: 80,
      needs: { water: "HIGH", light: "MED", humidity: "HIGH" },
      category: "Ferns",
      difficulty: "Intermediate",
      petFriendly: true,
      lastWatered: new Date("2023-05-13"),
    },
    {
      id: "7",
      name: "Echeveria",
      scientificName: "Echeveria Elegans",
      room: "Living Room",
      location: "Living Room",
      images: ["https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&auto=format&fit=crop&q=60"],
      health: 95,
      needs: { water: "LOW", light: "HIGH", humidity: "LOW" },
      category: "Succulents",
      difficulty: "Easy",
      petFriendly: true,
      lastWatered: new Date("2023-05-05"),
    },
    {
      id: "8",
      name: "Peace Lily",
      scientificName: "Spathiphyllum",
      room: "Bedroom",
      location: "Bedroom",
      images: ["https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&auto=format&fit=crop&q=60"],
      health: 90,
      needs: { water: "MED", light: "LOW", humidity: "HIGH" },
      category: "Flowering",
      difficulty: "Easy",
      petFriendly: false,
      lastWatered: new Date("2023-05-12"),
    },
  ];

  async getAllPlants(): Promise<Plant[]> {
    return Promise.resolve(this.plants);
  }

  async getPlantById(id: string): Promise<Plant | undefined> {
    return Promise.resolve(this.plants.find((plant) => plant.id === id));
  }

  async getPlantsByRoom(room: string): Promise<Plant[]> {
    if (room === "All Rooms") {
      return this.getAllPlants();
    }
    return Promise.resolve(this.plants.filter((plant) => plant.room === room));
  }

  async getRooms(): Promise<string[]> {
    const uniqueRooms = new Set(this.plants.map((plant) => plant.room));
    return Promise.resolve(["All Rooms", ...Array.from(uniqueRooms)]);
  }

  async getCategories(): Promise<PlantCategory[]> {
    return Promise.resolve(["Succulents", "Tropical", "Ferns", "Cacti", "Flowering"]);
  }

  async getDifficulties(): Promise<PlantDifficulty[]> {
    return Promise.resolve(["Easy", "Intermediate", "Expert"]);
  }
}
