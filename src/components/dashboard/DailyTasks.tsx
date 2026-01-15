import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import Card from "@/components/ui/Card";
import { IoCheckmark, IoWaterOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";

const TASKS = [
  {
    id: 1,
    type: "Watering",
    plant: "Monstera",
    due: "Due: Now",
    icon: IoWaterOutline,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    type: "Misting",
    plant: "Calathea",
    due: "Due: 10:00 AM",
    icon: WiHumidity,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
  {
    id: 3,
    type: "Fertilizing",
    plant: "Ferns",
    due: "Scheduled",
    icon: IoCheckmark, // Generic placeholder
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
];

export default function DailyTasks() {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-brand-dark">Daily Tasks</h2>
          <p className="text-sm text-text-muted font-medium text-brand-primary">
            Morning Routine
          </p>
        </div>
        <span className="bg-brand-light text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
          12 Total
        </span>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        {TASKS.map((task) => (
          <div key={task.id} className="flex items-start gap-4 group">
            {/* Check Circle */}
            <button className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-brand-primary/30 group-hover:border-brand-primary transition-colors flex items-center justify-center mt-1">
              {/* Click to fill logic would go here */}
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-text-main">
                  {task.type}:
                </span>
                <span className="text-sm text-text-main font-bold">
                  {task.plant}
                </span>
              </div>
              <span className="text-xs text-text-muted block">{task.due}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <button className="w-full py-3 bg-brand-dark text-white rounded-xl font-semibold hover:bg-brand-primary transition-colors shadow-sm active:transform active:scale-95 duration-200">
          Complete All
        </button>
      </div>
    </Card>
  );
}
