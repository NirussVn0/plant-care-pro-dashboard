import { TaskType } from "@/models/Task";

export const VALID_TASK_TYPES: TaskType[] = [
  "WATER",
  "MIST",
  "FERTILIZE",
  "PRUNE",
  "REPOTTING",
];

export const VALID_PRIORITIES = ["LOW", "MEDIUM", "HIGH"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidTaskData(data: any): boolean {
  if (!data || typeof data !== "object") return false;

  // Required fields
  if (typeof data.plantId !== "string" || data.plantId.trim() === "") return false;

  if (!VALID_TASK_TYPES.includes(data.type)) return false;

  // Date validation (allow string or Date object)
  const date = new Date(data.date);
  if (isNaN(date.getTime())) return false;

  // Optional fields types
  if (data.completed !== undefined && typeof data.completed !== "boolean") return false;

  if (data.plantName !== undefined && typeof data.plantName !== "string") return false;
  if (data.plantName && data.plantName.length > 100) return false;

  if (data.note !== undefined && typeof data.note !== "string") return false;
  if (data.note && data.note.length > 500) return false;

  if (data.priority !== undefined && !VALID_PRIORITIES.includes(data.priority)) return false;

  return true;
}
