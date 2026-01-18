"use client";

import { clsx } from "clsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

/**
 * Calendar grid component for the Schedule page.
 * Displays monthly view with date selection and task indicators.
 */
export default function CalendarGrid({ selectedDate, onSelectDate }: CalendarProps) {
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    onSelectDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    onSelectDate(newDate);
  };

  const handleToday = () => {
    onSelectDate(new Date());
  };

  const isDateSelected = (day: number): boolean => {
    return selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth;
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const hasTaskIndicators = (day: number): boolean => {
    return day % 3 === 0;
  };

  return (
    <div className="bento-card rounded-xl border border-white dark:border-[#354545] overflow-hidden">
      <div className="p-6 border-b border-[#e6f4f2] dark:border-[#354545] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold font-display">{monthNames[currentMonth]} {currentYear}</h2>
          <div className="flex gap-1">
            <button 
              onClick={handlePrevMonth}
              className="p-1 hover:bg-[#e6f4f2] dark:hover:bg-[#354545] rounded transition-colors text-primary"
            >
              <MdChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-1 hover:bg-[#e6f4f2] dark:hover:bg-[#354545] rounded transition-colors text-primary"
            >
              <MdChevronRight size={24} />
            </button>
          </div>
        </div>
        <button 
          onClick={handleToday}
          className="px-4 py-1.5 border border-[#e6f4f2] dark:border-[#354545] text-primary hover:bg-[#e6f4f2] dark:hover:bg-[#354545] rounded-lg text-sm font-bold transition-colors"
        >
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
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] rounded-lg p-2 bg-background-light/30 dark:bg-background-dark/30" />
          ))}

          {days.map((day) => {
            const isSelected = isDateSelected(day);
            const isTodayDate = isToday(day);
            return (
              <div
                key={day}
                onClick={() => onSelectDate(new Date(currentYear, currentMonth, day))}
                className={clsx(
                  "min-h-[100px] rounded-lg p-2 relative cursor-pointer transition-all group border",
                  isSelected
                    ? "border-2 border-primary bg-primary/5 dark:bg-primary/20 shadow-md transform scale-[1.02]"
                    : isTodayDate
                      ? "border-2 border-primary/50 bg-primary/10 dark:bg-primary/10"
                      : "border-[#e6f4f2] dark:border-[#354545] hover:border-primary bg-white dark:bg-[#2a3434]"
                )}
              >
                <span className={clsx(
                  "font-bold text-sm",
                  isSelected ? "text-primary" : isTodayDate ? "text-primary" : "text-text-main/60 dark:text-text-inverse/60 group-hover:text-primary"
                )}>
                  {day}
                </span>

                {hasTaskIndicators(day) && (
                  <div className="flex gap-1 mt-2 flex-wrap content-start">
                    <div className="size-2 rounded-full bg-blue-400 shadow-sm" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
