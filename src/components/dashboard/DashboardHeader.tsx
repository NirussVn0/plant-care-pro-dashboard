"use client";

import { useRef, useEffect } from "react";
import { animationService } from "@/services/animation/AnimationService";

export default function DashboardHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      animationService.fadeInUp(headerRef.current, { delay: 0, duration: 600 });
    }
  }, []);

  return (
    <div ref={headerRef} className="flex flex-col gap-2 mb-8 opacity-0">
      <h1 className="text-3xl font-extrabold tracking-tight font-display">Greenhouse Overview</h1>
      <p className="text-text-muted font-medium">Welcome back! You have 5 plants needing attention today.</p>
    </div>
  );
}
