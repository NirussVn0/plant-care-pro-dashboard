import BentoCard from "@/components/ui/BentoCard";
import { MdCalendarToday } from "react-icons/md";

export default function NutrientSchedule() {
  return (
    <BentoCard className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg font-display">Nutrient Schedule</h3>
        <MdCalendarToday className="text-text-muted text-xl" />
      </div>

      <div className="space-y-4">
        {/* Mock Schedule Items */}
        <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:bottom-0 before:w-0.5 before:bg-[#e6f4f2] dark:before:bg-[#354545]">
          <div className="absolute left-[-3px] top-1 size-2 rounded-full bg-accent-warm"></div>
          <p className="text-xs font-bold text-accent-warm">Tomorrow</p>
          <p className="text-sm font-semibold">Cactus Feed</p>
          <p className="text-[10px] text-text-muted">
            Low nitrogen mix recommended
          </p>
        </div>
        <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:bottom-0 before:w-0.5 before:bg-[#e6f4f2] dark:before:bg-[#354545]">
          <div className="absolute left-[-3px] top-1 size-2 rounded-full bg-primary"></div>
          <p className="text-xs font-bold text-text-muted">May 24</p>
          <p className="text-sm font-semibold">Tropical Blend</p>
          <p className="text-[10px] text-text-muted">
            Monstera & Philodendron
          </p>
        </div>
      </div>

      <button className="w-full mt-6 py-2 border border-dashed border-text-muted text-text-muted hover:bg-background-light dark:hover:bg-background-dark transition-all text-xs font-bold rounded-lg flex items-center justify-center gap-2">
        Add Log
      </button>
    </BentoCard>
  );
}
