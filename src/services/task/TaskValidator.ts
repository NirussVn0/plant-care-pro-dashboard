import { TaskType } from "@/models/Task";

export const VALID_TASK_TYPES: TaskType[] = ["WATER", "MIST", "FERTILIZE", "PRUNE", "REPOTTING"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidTaskData(data: any): boolean {
  if (!data || typeof data !== "object") return false;

  // Required fields
  if (typeof data.plantId !== "string" || !data.plantId.trim()) return false;

  // Validate TaskType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!VALID_TASK_TYPES.includes(data.type as any)) return false;

  // Date validation
  const date = new Date(data.date);
  if (isNaN(date.getTime())) return false;

  // Optional fields validation
  // Security: Limit note length to prevent storage abuse
  if (data.note !== undefined && (typeof data.note !== "string" || data.note.length > 500)) {
    return false;
  }

  // Validate Priority if present
  if (data.priority !== undefined && !["LOW", "MEDIUM", "HIGH"].includes(data.priority)) {
    return false;
  }

  // Validate Completed status if present
  if (data.completed !== undefined && typeof data.completed !== "boolean") {
    return false;
  }

  return true;
}
