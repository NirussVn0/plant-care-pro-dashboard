import BentoCard from "@/components/ui/BentoCard";
import { MdTrendingUp } from "react-icons/md";

export default function GrowthTrends() {
  const DATA = [
    { label: "MON", height: 40 },
    { label: "TUE", height: 65 },
    { label: "WED", height: 45 },
    { label: "THU", height: 75 },
    { label: "FRI", height: 95, active: true },
  ];

  return (
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
          <p className="text-[10px] font-bold text-text-muted uppercase mb-3">
            Recent Progress
          </p>
          <div className="flex items-end gap-1.5 h-16">
            {DATA.map((item, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-t-sm transition-all duration-500 bg-primary ${
                  item.active ? "" : "opacity-20"
                }`}
                style={{ height: `${item.height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-[8px] mt-1 text-text-muted font-bold uppercase">
            <span>Mon</span>
            <span>Fri</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
