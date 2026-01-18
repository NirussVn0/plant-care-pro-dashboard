export interface User {
  id: string;
  name: string;
  avatar: string;
  level: string; // e.g., 'Master Gardener'
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  totalPlants: number;
}
