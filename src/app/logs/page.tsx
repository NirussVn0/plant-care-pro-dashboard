"use client";

import { useEffect, useState } from "react";
import CareStats from "@/components/logs/CareStats";
import ServiceFactory from "@/services/ServiceFactory";
import { CareLog } from "@/models/CareLog";
import { format } from "date-fns";
import { MdEdit, MdSearch, MdExpandMore, MdCalendarToday, MdArrowBack, MdAddCircle, MdWaterDrop, MdLocalFlorist, MdEco } from "react-icons/md";
import Link from "next/link";

/**
 * Care Logs page displaying historical plant care activities.
 * Shows timeline of care actions with search and filtering.
 */
export default function LogsPage() {
  const [logs, setLogs] = useState<CareLog[]>([]);

  useEffect(() => {
    ServiceFactory.getCareLogService().getLogs().then(setLogs);
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Watering":
        return <MdWaterDrop size={14} />;
      case "Fertilizing":
        return <MdEco size={14} />;
      case "Pruning":
      case "Repotting":
        return <MdLocalFlorist size={14} />;
      case "Misting":
        return <MdWaterDrop size={14} />;
      default:
        return <MdLocalFlorist size={14} />;
    }
  };

  const getActionColor = (action: string): string => {
    const colors: Record<string, string> = {
      Watering: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 border-blue-200 dark:border-blue-800",
      Fertilizing: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200 border-amber-200 dark:border-amber-800",
      Pruning: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200 border-rose-200 dark:border-rose-800",
      Repotting: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800",
    };
    return colors[action] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <Link className="text-primary text-sm hover:text-[#005f52] flex items-center gap-1" href="/">
            <MdArrowBack className="text-sm" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">Care History Log</h1>
          <p className="text-primary">Track every action to keep your jungle thriving.</p>
        </div>
        <button className="bg-primary hover:bg-[#005f52] text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm shadow-primary/20">
          <MdAddCircle className="text-lg" /> Log Activity
        </button>
      </div>

      <CareStats />

      <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center bg-white dark:bg-[#2a3434] p-4 rounded-xl shadow-sm border border-[#e6f4f2] dark:border-[#354545]">
        <div className="relative w-full lg:w-96 group">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-[#005f52] transition-colors" />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f4f3f1] dark:bg-[#222a2a] border-none focus:ring-2 focus:ring-primary text-sm transition-all placeholder:text-primary/70 focus:outline-none"
            placeholder="Search logs by plant, action, or note..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
          <div className="relative min-w-[140px]">
            <select className="w-full appearance-none bg-[#f4f3f1] dark:bg-[#222a2a] border-none rounded-lg text-xs font-bold uppercase tracking-wide text-primary py-2.5 pl-4 pr-10 focus:ring-primary cursor-pointer hover:bg-[#e6f4f2] dark:hover:bg-[#354545] transition-colors focus:outline-none">
              <option>All Plants</option>
            </select>
            <MdExpandMore className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-lg pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#f4f3f1] dark:bg-[#222a2a] rounded-lg text-xs font-bold uppercase tracking-wide text-primary hover:bg-[#e6f4f2] dark:hover:bg-[#354545] transition-colors whitespace-nowrap">
            <MdCalendarToday className="text-lg" />
            <span>Date Range</span>
          </button>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-[#e6f4f2] dark:bg-[#354545] px-3 py-1 rounded-full">
              Recent Logs
            </h3>
            <div className="h-[1px] flex-1 bg-[#e6f4f2] dark:border-[#354545]" />
          </div>

          <div className="space-y-6">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bento-card rounded-2xl border border-white dark:border-[#354545] overflow-hidden p-6 flex flex-col md:flex-row gap-6 relative transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="absolute top-6 right-6">
                  <button className="p-2 rounded-lg hover:bg-[#e6f4f2] dark:hover:bg-[#354545] text-primary transition-colors">
                    <MdEdit className="text-lg" />
                  </button>
                </div>
                <div className="flex flex-col items-center md:items-start md:w-32 shrink-0">
                  <span className="text-sm font-bold text-primary mb-1">{format(log.date, "MMM dd")}</span>
                  <span className="text-2xl font-black text-[#007969]">{format(log.date, "yyyy")}</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row gap-6">
                  <div
                    className="size-20 rounded-2xl bg-cover bg-center border-4 border-white dark:border-[#354545] shadow-sm shrink-0 mx-auto sm:mx-0"
                    style={{ backgroundImage: `url(${log.plantImage})` }}
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h4 className="text-xl font-bold text-text-main dark:text-text-inverse">{log.plantName}</h4>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)} {log.action}
                      </span>
                    </div>
                    <p className="text-xs text-primary italic mb-4">{log.plantLocation}</p>
                    <div className="bg-[#fcfbf9] dark:bg-[#2d3a3a] p-4 rounded-xl border border-[#e6f4f2] dark:border-[#354545]">
                      <p className="text-sm leading-relaxed text-text-main dark:text-text-inverse">{log.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
