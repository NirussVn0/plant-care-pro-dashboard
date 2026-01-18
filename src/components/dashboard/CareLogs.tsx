import BentoCard from "@/components/ui/BentoCard";
import { MdEditNote } from "react-icons/md";

export default function CareLogs() {
  const LOGS = [
    { plant: "Snake Plant", date: "Mar 12, 2023", growth: '+2.4"', growthLabel: true },
    { plant: "Pothos (Neon)", date: "Jan 05, 2024", growth: '+4.1"', growthLabel: true },
  ];

  return (
    <BentoCard className="!p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e6f4f2] dark:border-[#354545]">
            <h4 className="font-bold text-sm uppercase tracking-wider text-text-muted">Care Logs</h4>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] font-bold text-text-muted uppercase border-b border-[#e6f4f2] dark:border-[#354545]">
                        <th className="px-6 py-3">Plant Name</th>
                        <th className="px-6 py-3 text-center">Last Repotted</th>
                        <th className="px-6 py-3 text-center">Growth Rate</th>
                        <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {LOGS.map((log, i) => (
                        <tr key={i} className="border-b border-[#e6f4f2]/50 dark:border-[#354545]/50 hover:bg-primary/5 transition-colors">
                            <td className="px-6 py-4 font-semibold text-text-main dark:text-text-inverse">{log.plant}</td>
                            <td className="px-6 py-4 text-center text-xs text-text-muted">{log.date}</td>
                            <td className="px-6 py-4 text-center">
                                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full font-bold">{log.growth}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <MdEditNote className="text-primary cursor-pointer text-lg inline-block" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </BentoCard>
  );
}
