"use client";

import { MdCalendarMonth, MdLocalFireDepartment, MdWaterDrop } from "react-icons/md";

/**
 * Statistics cards component for the Care Logs page.
 * Displays monthly activity count, streak days, and most frequent action.
 */
export default function CareStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bento-card p-5 rounded-xl border border-[#e6f4f2] dark:border-[#354545] flex items-center gap-5 relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <MdCalendarMonth className="text-6xl" />
        </div>
        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <MdCalendarMonth size={24} />
        </div>
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Total Actions (Month)</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-text-main dark:text-text-inverse">42</p>
            <span className="text-xs font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">+8 vs last</span>
          </div>
        </div>
      </div>

      <div className="bento-card p-5 rounded-xl border border-[#e6f4f2] dark:border-[#354545] flex items-center gap-5 relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <MdLocalFireDepartment className="text-6xl" />
        </div>
        <div className="size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
          <MdLocalFireDepartment size={24} />
        </div>
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Consistency Streak</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-text-main dark:text-text-inverse">12</p>
            <span className="text-sm font-bold text-primary">Days</span>
          </div>
        </div>
      </div>

      <div className="bento-card p-5 rounded-xl border border-[#e6f4f2] dark:border-[#354545] flex items-center gap-5 relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <MdWaterDrop className="text-6xl" />
        </div>
        <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
          <MdWaterDrop size={24} />
        </div>
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Most Frequent</p>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-extrabold text-text-main dark:text-text-inverse">Watering</p>
          </div>
          <p className="text-[10px] text-primary">65% of all actions</p>
        </div>
      </div>
    </div>
  );
}
