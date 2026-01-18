import { CareLog } from "@/models/CareLog";

/**
 * Interface for Care Log Service operations.
 * Defines contract for care history tracking and management.
 */
export interface ICareLogService {
  getLogs(): Promise<CareLog[]>;
  getLogsByPlant(plantId: string): Promise<CareLog[]>;
  addLog(log: Omit<CareLog, "id">): Promise<CareLog>;
}

/**
 * Service class for managing plant care history logs.
 * Tracks watering, fertilizing, pruning, and other care activities.
 */
export class CareLogService implements ICareLogService {
  private readonly logs: CareLog[] = [
    {
      id: "1",
      plantId: "1",
      plantName: "Monstera Deliciosa",
      plantLocation: "Bedroom Window",
      date: new Date("2023-10-24"),
      action: "Watering",
      note: "Soil was dry to 2 inches depth. Used filtered water.",
      plantImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNJKg-3H56iNtInD4iiaZBFr9_RUFKSos8PeiEzgjJWKy90nxTdcTTDgyOTFZNuqVrLiyV-1GZTO3C-ZgniGOY_opG2aUgCA1a6dYhA8BlkgyhuKBw8gDLSCxxr5ZtOffmrXETjA0JZ7jZoHqxWfLTkUOO8muxJwMkgo8X6PjRMdLu4lzQcXpNZ2-U0-uUFWBNMAWbkFoXbRYPx1iduyB0EVUOS46xORYB3tj6bPtiLaNlConlFcL6ruavAi0dNmcechdX0GaJxw",
    },
    {
      id: "2",
      plantId: "2",
      plantName: "Fiddle Leaf Fig",
      plantLocation: "Living Room Corner",
      date: new Date("2023-10-22"),
      action: "Fertilizing",
      note: "Used liquid fertilizer diluted to 50% strength.",
      plantImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnWUg7jEi4OKj5fbF-p8UsEErLclvQh565whIzfhPobdZlVdH9ecYVAabHvKUPetnuQAZBb1HcTm4V9GG2-3bCxwY11oaXgqzttGJyGdVjQB9holdIqm4pKqW1LVASQ0vypuh_O1KEYftpNQ_G2l9xBBnThxDnHjyO12Rrx7thA8vvxzs-kh3895JUdSSEAsBW0sZizv5hXzSDYwlRoA1R-ei3znuw_QRpr2tZq6QyzisZ9STQCZETOKYiHojXcZrDdIMX4RkmAg",
    },
    {
      id: "3",
      plantId: "3",
      plantName: "Snake Plant",
      plantLocation: "Hallway",
      date: new Date("2023-10-18"),
      action: "Pruning",
      note: "Removed two yellowing leaves near the base.",
      plantImage: "https://images.unsplash.com/photo-1599598425947-d352425c2768?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "4",
      plantId: "1",
      plantName: "Monstera Deliciosa",
      plantLocation: "Bedroom Window",
      date: new Date("2023-10-15"),
      action: "Repotting",
      note: 'Upgraded to 12" terracotta pot. Used chunky mix.',
      plantImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNJKg-3H56iNtInD4iiaZBFr9_RUFKSos8PeiEzgjJWKy90nxTdcTTDgyOTFZNuqVrLiyV-1GZTO3C-ZgniGOY_opG2aUgCA1a6dYhA8BlkgyhuKBw8gDLSCxxr5ZtOffmrXETjA0JZ7jZoHqxWfLTkUOO8muxJwMkgo8X6PjRMdLu4lzQcXpNZ2-U0-uUFWBNMAWbkFoXbRYPx1iduyB0EVUOS46xORYB3tj6bPtiLaNlConlFcL6ruavAi0dNmcechdX0GaJxw",
    },
  ];

  async getLogs(): Promise<CareLog[]> {
    return Promise.resolve(this.logs);
  }

  async getLogsByPlant(plantId: string): Promise<CareLog[]> {
    return Promise.resolve(this.logs.filter((log) => log.plantId === plantId));
  }

  async addLog(log: Omit<CareLog, "id">): Promise<CareLog> {
    const newLog: CareLog = { ...log, id: crypto.randomUUID() };
    return Promise.resolve(newLog);
  }
}
