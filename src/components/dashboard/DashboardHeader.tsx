export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight font-display">Greenhouse Overview</h1>
      <p className="text-text-muted font-medium">Welcome back! You have 5 plants needing attention today.</p>
    </div>
  );
}
