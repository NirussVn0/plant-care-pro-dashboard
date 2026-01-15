import Card from "@/components/ui/Card";
import { FaArrowUp } from "react-icons/fa";

export default function GrowthTrends() {
  const DATA = [
    { label: "MON", height: 40 },
    { label: "TUE", height: 65 },
    { label: "WED", height: 45 },
    { label: "THU", height: 75 },
    { label: "FRI", height: 95, active: true },
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-brand-dark mb-4">
          Growth Trends
        </h2>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-brand-primary">
            <FaArrowUp />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">
              New Leaves This Week
            </p>
            <p className="text-3xl font-bold text-brand-dark">14</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end gap-2 h-32">
          {DATA.map((item) => (
            <div
              key={item.label}
              className="w-full flex flex-col justify-end gap-2 group cursor-pointer"
            >
              <div
                className={`w-full rounded-t-sm transition-all duration-500 ${
                  item.active
                    ? "bg-brand-dark"
                    : "bg-brand-light group-hover:bg-brand-primary/50"
                }`}
                style={{ height: `${item.height}%` }}
              ></div>
              <span className="text-[10px] text-center font-bold text-text-muted">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
