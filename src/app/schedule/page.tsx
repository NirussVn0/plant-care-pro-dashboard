"use client";

import { useRef } from "react";
import { MdAdd } from "react-icons/md";
import CalendarGrid from "@/components/schedule/CalendarGrid";
import DayDetails from "@/components/schedule/DayDetails";
import AddTaskModal from "@/components/schedule/AddTaskModal";
import useSchedule from "@/hooks/useSchedule";
import useScrollAnimation from "@/hooks/useScrollAnimation";

// Constants
const ANIMATION_KEYS = {
  header: "schedule-header",
  calendar: "schedule-calendar",
  details: "schedule-details",
} as const;

const ANIMATION_CONFIG = {
  header: { type: "fadeInUp" as const, delay: 0, duration: 600 },
  calendar: { type: "fadeInLeft" as const, delay: 150, duration: 650 },
  details: { type: "fadeInRight" as const, delay: 300, duration: 650 },
} as const;

/**
 * Schedule page component.
 * Follows SRP: UI rendering only, business logic delegated to useSchedule hook.
 */
export default function SchedulePage() {
  const {
    selectedDate,
    setSelectedDate,
    selectedDateTasks,
    taskDates,
    showAddModal,
    openAddModal,
    closeAddModal,
    handleCompleteTask,
    handleAddTask,
  } = useSchedule();

  // Animation refs
  const { ref: headerRef } = useScrollAnimation<HTMLDivElement>({
    ...ANIMATION_CONFIG.header,
    key: ANIMATION_KEYS.header,
  });

  const { ref: calendarRef } = useScrollAnimation<HTMLDivElement>({
    ...ANIMATION_CONFIG.calendar,
    key: ANIMATION_KEYS.calendar,
  });

  const { ref: detailsRef } = useScrollAnimation<HTMLDivElement>({
    ...ANIMATION_CONFIG.details,
    key: ANIMATION_KEYS.details,
  });

  return (
    <div className="min-h-full">
      {/* Header Section */}
      <header ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 opacity-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Schedule &amp; Tasks</h1>
          <p className="text-primary">Plan, track, and nurture your green sanctuary.</p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-[#005f52] transition-colors shadow-lg shadow-primary/20"
        >
          <MdAdd className="text-lg" />
          Add Task
        </button>
      </header>

      {/* Main Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[calc(100vh-200px)]">
        <section ref={calendarRef} className="lg:col-span-8 h-full opacity-0">
          <CalendarGrid
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            taskDates={taskDates}
          />
        </section>

        <aside ref={detailsRef} className="lg:col-span-4 h-full opacity-0">
          <DayDetails
            selectedDate={selectedDate}
            tasks={selectedDateTasks}
            onCompleteTask={handleCompleteTask}
          />
        </aside>
      </main>

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal
          onClose={closeAddModal}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
}
