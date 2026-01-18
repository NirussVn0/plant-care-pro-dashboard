import { Plant, PlantNeeds } from "@/models/Plant"; // Import from models

export interface IPlantService {
  getAllPlants(): Promise<Plant[]>;
  getPlantById(id: string): Promise<Plant | undefined>;
  getPlantsByRoom(room: string): Promise<Plant[]>;
  getRooms(): Promise<string[]>;
}

export class PlantService implements IPlantService {
  private readonly PLANTS: Plant[] = [
    {
      id: "1",
      name: "Monstera Deliciosa",
      scientificName: "Swiss Cheese Plant",
      room: "Living Room",
      images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"],
      health: 85,
      needs: { water: "MED", light: "HIGH", fertilizer: "LOW", humidity: "HIGH" },
      lastWatered: new Date("2023-05-10"),
    },
    {
      id: "2",
      name: "Fiddle Leaf Fig",
      scientificName: "Ficus Lyrata",
      room: "Bedroom",
      images: ["https://images.unsplash.com/photo-1597055181300-e30ba1540d6e?auto=format&fit=crop&q=80&w=800"],
      health: 92,
      needs: { water: "HIGH", light: "HIGH", fertilizer: "MED", humidity: "MED" },
      lastWatered: new Date("2023-05-12"),
    },
    {
      id: "3",
      name: "Snake Plant",
      scientificName: "Sansevieria Trifasciata",
      room: "Balcony",
      images: ["https://images.unsplash.com/photo-1599598425947-d352425c2768?auto=format&fit=crop&q=80&w=800"],
      health: 98,
      needs: { water: "LOW", light: "LOW", fertilizer: "LOW", humidity: "LOW" },
      lastWatered: new Date("2023-05-01"),
    },
    {
      id: "4",
      name: "Neon Pothos",
      scientificName: "Epipremnum Aureum",
      room: "Kitchen",
      images: ["https://images.unsplash.com/photo-1620603772274-a74a107ef4f8?w=800&auto=format&fit=crop&q=60"],
      health: 95,
      needs: { water: "MED", light: "MED", fertilizer: "MED", humidity: "HIGH" },
      lastWatered: new Date("2023-05-14"),
    },
    {
      id: "5",
      name: "Rubber Plant",
      scientificName: "Ficus Elastica",
      room: "Office",
      images: ["https://images.unsplash.com/photo-1592658253488-842245b0a390?w=800&auto=format&fit=crop&q=60"],
      health: 88,
      needs: { water: "MED", light: "MED", fertilizer: "MED", humidity: "MED" },
      lastWatered: new Date("2023-05-11"),
    },
  ];

  async getAllPlants(): Promise<Plant[]> {
    return Promise.resolve(this.PLANTS);
  }

  async getPlantById(id: string): Promise<Plant | undefined> {
    return Promise.resolve(this.PLANTS.find((p) => p.id === id));
  }

  async getPlantsByRoom(room: string): Promise<Plant[]> {
    if (room === "All Rooms") return this.getAllPlants();
    return Promise.resolve(this.PLANTS.filter((p) => p.room === room));
  }

  async getRooms(): Promise<string[]> {
    const rooms = new Set(this.PLANTS.map((p) => p.room));
    return Promise.resolve(["All Rooms", ...Array.from(rooms)]);
  }
}
