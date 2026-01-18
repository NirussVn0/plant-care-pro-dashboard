import BentoCard from "@/components/ui/BentoCard";
import { MdTrendingUp, MdCalendarToday } from "react-icons/md"; // Calendar for the second widget if we merge or just for growth icon

export default function GrowthTrends() {
  const DATA = [
    { label: "MON", height: 40 },
    { label: "TUE", height: 65 },
    { label: "WED", height: 45 },
    { label: "THU", height: 75 },
    { label: "FRI", height: 95, active: true },
  ];

  return (
    <div className="space-y-6">
        <BentoCard className="flex flex-col">
            <h3 className="font-bold text-lg mb-6 font-display">Growth Trends</h3>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <MdTrendingUp size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-bold">New Leaves This Week</p>
                        <p className="text-2xl font-extrabold text-primary">14</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-[#e6f4f2] dark:border-[#354545]">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-3">Recent Progress</p>
                    <div className="flex items-end gap-1.5 h-16">
                        {DATA.map((item, idx) => (
                            <div key={idx} className={`flex-1 rounded-t-sm transition-all duration-500 bg-primary ${item.active ? '' : 'opacity-20'}`} style={{ height: `${item.height}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[8px] mt-1 text-text-muted font-bold uppercase">
                        <span>Mon</span>
                        <span>Fri</span>
                    </div>
                </div>
            </div>
        </BentoCard>

        {/* Nutrient Schedule Widget - Since it was in the same column in design */}
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
                    <p className="text-[10px] text-text-muted">Low nitrogen mix recommended</p>
                </div>
                 <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:bottom-0 before:w-0.5 before:bg-[#e6f4f2] dark:before:bg-[#354545]">
                    <div className="absolute left-[-3px] top-1 size-2 rounded-full bg-primary"></div>
                    <p className="text-xs font-bold text-text-muted">May 24</p>
                    <p className="text-sm font-semibold">Tropical Blend</p>
                    <p className="text-[10px] text-text-muted">Monstera & Philodendron</p>
                </div>
             </div>
             
             <button className="w-full mt-6 py-2 border border-dashed border-text-muted text-text-muted hover:bg-background-light dark:hover:bg-background-dark transition-all text-xs font-bold rounded-lg flex items-center justify-center gap-2">
                 Add Log
             </button>
        </BentoCard>
    </div>
  );
}
