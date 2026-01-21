"use client";

import { useState, useRef, useEffect } from "react";
import { MdNotifications, MdCheckCircle, MdCalendarToday } from "react-icons/md";
import { Task } from "@/models/Task";
import ServiceFactory from "@/services/ServiceFactory";
import { formatLocalDate } from "@/services/task/TaskService";
import Link from "next/link";

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        // Fetch pending tasks (incomplete)
        // For now, let's just get everything and filter manually for demo
        // Ideally backend would have /tasks/pending endpoint
        const allTasks = await ServiceFactory.getTaskService().getAllTasks();
        const pending = allTasks.filter(t => !t.completed);
        
        // Sort by date (oldest first - overdue?)
        pending.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        // Limit to 5 for dropdown
        setNotifications(pending);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();

    // Poll every minute? Or just on mount.
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const todayStr = formatLocalDate(new Date());

  const getNotificationText = (task: Task) => {
    const taskDateStr = formatLocalDate(task.date);
    if (taskDateStr < todayStr) return "Overdue Task";
    if (taskDateStr === todayStr) return "Due Today";
    return "Upcoming";
  };

  const getStatusColor = (task: Task) => {
    const taskDateStr = formatLocalDate(task.date);
    if (taskDateStr < todayStr) return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    if (taskDateStr === todayStr) return "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary";
    return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-white dark:bg-[#2d3a3a] text-primary hover:bg-[#d6ebe9] dark:hover:bg-[#354545] transition-colors shadow-sm"
      >
        <MdNotifications size={20} />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1.5 size-2 bg-red-500 rounded-full border border-white dark:border-[#2d3a3a]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#2d3a3a] rounded-xl shadow-xl border border-[#e6f4f2] dark:border-[#354545] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-[#e6f4f2] dark:border-[#354545] flex justify-between items-center">
            <h3 className="font-bold text-sm">Notifications</h3>
            {notifications.length > 0 && (
              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-bold">
                {notifications.length}
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-xs text-text-muted">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-text-muted">
                <MdCheckCircle className="mx-auto text-2xl mb-2 text-green-500 opacity-50" />
                <p className="text-sm">All caught up!</p>
              </div>
            ) : (
              <div className="py-2">
                {notifications.slice(0, 5).map((task) => (
                  <Link
                    key={task.id}
                    href="/schedule"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 hover:bg-[#e6f4f2] dark:hover:bg-[#354545] transition-colors border-b border-[#e6f4f2] dark:border-[#354545] last:border-0"
                  >
                    <div className="flex gap-3">
                      <div className={`mt-0.5 p-1.5 rounded h-fit ${getStatusColor(task)}`}>
                        <MdCalendarToday size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-main dark:text-text-inverse mb-0.5">
                          {task.type} - {getNotificationText(task)}
                        </p>
                        <p className="text-xs text-text-muted">
                          {task.note || "No details provided"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-[#e6f4f2] dark:border-[#354545] p-2 bg-[#fcfbf9] dark:bg-[#2a3434] rounded-b-xl">
            <Link
              href="/schedule"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 text-xs font-bold text-primary hover:underline"
            >
              View Schedule
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
