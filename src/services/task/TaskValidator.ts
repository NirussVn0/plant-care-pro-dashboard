import { TaskType } from "@/models/Task";

export const VALID_TASK_TYPES: TaskType[] = [
  "WATER",
  "MIST",
  "FERTILIZE",
  "PRUNE",
  "REPOTTING",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidTaskData(data: any): boolean {
  if (!data || typeof data !== "object") return false;

  // Validate required fields
  if (typeof data.id !== "string") return false;
  if (typeof data.plantId !== "string") return false;
  if (typeof data.completed !== "boolean") return false;
  if (!VALID_TASK_TYPES.includes(data.type as TaskType)) return false;

  // Validate note length limit (DoS prevention)
  if (data.note !== undefined) {
    if (typeof data.note !== "string") return false;
    if (data.note.length > 500) return false;
  }

  return true;
}
