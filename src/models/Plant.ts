export type LightLevel = 'LOW' | 'MED' | 'HIGH';
export type WaterLevel = 'LOW' | 'MED' | 'HIGH';
export type HumidityLevel = 'LOW' | 'MED' | 'HIGH';

export interface PlantNeeds {
  light: LightLevel;
  water: WaterLevel;
  humidity: HumidityLevel;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  room: string;
  images: string[];
  location: string; // e.g., 'Living Room', 'Bedroom'
  needs: PlantNeeds;
  health: number; // 0-100
  lastWatered?: Date;
  nextWatering?: Date;
  tags?: string[];
}
