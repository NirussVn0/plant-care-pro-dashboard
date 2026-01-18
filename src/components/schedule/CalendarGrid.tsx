"use client";

import { clsx } from "clsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({ selectedDate, onSelectDate }: CalendarProps) {
  // Mock calendar gen for May 2024 as per design
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 3; // Wednesday start for May 2024 (approx)

  return (
    <div className="bento-card rounded-xl border border-white dark:border-[#354545] overflow-hidden">
      <div className="p-6 border-b border-[#e6f4f2] dark:border-[#354545] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold font-display">May 2024</h2>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-[#e6f4f2] dark:hover:bg-[#354545] rounded transition-colors text-primary">
                <MdChevronLeft size={24}/>
            </button>
            <button className="p-1 hover:bg-[#e6f4f2] dark:hover:bg-[#354545] rounded transition-colors text-primary">
                <MdChevronRight size={24}/>
            </button>
          </div>
        </div>
        <button className="px-4 py-1.5 border border-[#e6f4f2] dark:border-[#354545] text-primary hover:bg-[#e6f4f2] dark:hover:bg-[#354545] rounded-lg text-sm font-bold transition-colors">
          Today
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 mb-4 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-xs font-bold text-primary uppercase tracking-wider py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 lg:gap-4">
            {/* Empty slots */}
            {Array.from({length: startOffset}).map((_, i) => (
                 <div key={`empty-${i}`} className="min-h-[100px] rounded-lg p-2 bg-background-light/30 dark:bg-background-dark/30"></div>
            ))}

            {days.map(day => {
                const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === 4; // Mock check
                return (
                    <div 
                        key={day}
                        onClick={() => onSelectDate(new Date(2024, 4, day))}
                        className={clsx(
                            "min-h-[100px] rounded-lg p-2 relative cursor-pointer transition-all group border",
                            isSelected 
                                ? "border-2 border-primary bg-primary/5 dark:bg-primary/20 shadow-md transform scale-[1.02]" 
                                : "border-[#e6f4f2] dark:border-[#354545] hover:border-primary bg-white dark:bg-[#2a3434]"
                        )}
                    >
                        <span className={clsx("font-bold text-sm", isSelected ? "text-primary" : "text-text-main/60 dark:text-text-inverse/60 group-hover:text-primary")}>
                            {day}
                        </span>
                        
                        {/* Mock dots for demo */}
                        {day % 3 === 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap content-start">
                                <div className="size-2 rounded-full bg-blue-400 shadow-sm"></div>
                            </div>
                        )}
                        {day === 24 && (
                             <div className="flex gap-1.5 mt-2 flex-wrap content-start">
                                <div className="size-2.5 rounded-full bg-blue-400 shadow-sm ring-2 ring-white dark:ring-[#2d3a3a]"></div>
                                <div className="size-2.5 rounded-full bg-orange-400 shadow-sm ring-2 ring-white dark:ring-[#2d3a3a]"></div>
                                <div className="size-2.5 rounded-full bg-green-400 shadow-sm ring-2 ring-white dark:ring-[#2d3a3a]"></div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}
