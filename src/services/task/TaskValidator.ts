import { TaskType, Task } from "../../models/Task";

// NOTE: These must be kept in sync with TaskType in src/models/Task.ts
const VALID_TASK_TYPES: TaskType[] = ["WATER", "MIST", "FERTILIZE", "PRUNE", "REPOTTING"];
const VALID_PRIORITIES: NonNullable<Task['priority']>[] = ["LOW", "MEDIUM", "HIGH"];

/**
 * Validates if the given data conforms to the Task structure (DTO).
 * Note: Dates are expected to be strings or numbers (timestamps) from JSON.
 * This function ensures the object has the correct shape before processing.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidTaskData(data: any): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  // Required fields check
  // 'id' is required
  if (typeof data.id !== "string") return false;

  // 'plantId' is required
  if (typeof data.plantId !== "string") return false;

  // 'type' is required and must be valid
  if (typeof data.type !== "string" || !VALID_TASK_TYPES.includes(data.type as TaskType)) return false;

  // 'date' is required (string or number from JSON)
  if (typeof data.date !== "string" && typeof data.date !== "number") {
      // Also allow Date object in case it's already instantiated
      if (!(data.date instanceof Date)) return false;
  }

  // 'completed' is required
  if (typeof data.completed !== "boolean") return false;

  // Optional fields validation

  // 'plantName'
  if (data.plantName !== undefined && typeof data.plantName !== "string") return false;

  // 'note' - Security check: Limit length to prevent huge payloads/DoS
  if (data.note !== undefined) {
    if (typeof data.note !== "string") return false;
    if (data.note.length > 500) return false;
  }

  // 'priority'
  if (data.priority !== undefined) {
    if (typeof data.priority !== "string") return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!VALID_PRIORITIES.includes(data.priority as any)) return false;
  }

  // 'completedDate'
  if (data.completedDate !== undefined) {
    if (typeof data.completedDate !== "string" && typeof data.completedDate !== "number" && !(data.completedDate instanceof Date)) return false;
  }

  return true;
}
