export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-2">
        Greenhouse Overview
      </h1>
      <p className="text-text-muted">
        Welcome back! You have{" "}
        <span className="text-brand-primary font-medium">5 plants</span> needing
        attention today.
      </p>
    </div>
  );
}
