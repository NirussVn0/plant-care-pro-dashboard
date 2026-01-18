export type ActionType = 'Watering' | 'Fertilizing' | 'Pruning' | 'Repotting' | 'Misting' | 'Cleaning' | 'Other';

export interface CareLog {
  id: string;
  plantId: string;
  plantName: string; // Denormalized for display convenience
  plantLocation?: string;
  plantImage?: string; // Specific image for the log, or fallback to plant image
  date: Date;
  action: ActionType;
  note?: string;
  images?: string[]; // Photos taken during care
}
