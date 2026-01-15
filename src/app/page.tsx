import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DailyTasks from "@/components/dashboard/DailyTasks";
import MyJunglePreview from "@/components/dashboard/MyJunglePreview";
import GrowthTrends from "@/components/dashboard/GrowthTrends";

export default function Home() {
  return (
    <div className="min-h-full">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Daily Tasks (Sidebar-like) */}
        <div className="lg:col-span-3">
          <DailyTasks />
        </div>

        {/* Center/Right Area */}
        <div className="lg:col-span-9 space-y-8">
          {/* Row 1: Jungle & Trends */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <MyJunglePreview />
            </div>
            <div className="md:col-span-1">
              <GrowthTrends />
            </div>
          </div>

          {/* Row 2: Nutrient Schedule placeholder or other widgets */}
          {/* Can expand here later */}
        </div>
      </div>
    </div>
  );
}
