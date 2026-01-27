export type LightLevel = "LOW" | "MED" | "HIGH";
export type WaterLevel = "LOW" | "MED" | "HIGH";
export type HumidityLevel = "LOW" | "MED" | "HIGH";
export type PlantCategory = "Succulents" | "Tropical" | "Ferns" | "Cacti" | "Flowering";
export type PlantDifficulty = "Easy" | "Intermediate" | "Expert";

export interface PlantNeeds {
  light: LightLevel;
  water: WaterLevel;
  humidity: HumidityLevel;
}

/**
 * Plant interface standardized for backend compatibility.
 */
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  room: string;
  images: string[];
  location: string;
  needs: PlantNeeds;
  health: number;
  category: PlantCategory;
  difficulty: PlantDifficulty;
  petFriendly: boolean;
  lastWatered?: Date;
  nextWatering?: Date;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
