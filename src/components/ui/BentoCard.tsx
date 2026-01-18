"use client";

import { clsx } from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import { fadeInUp } from "@/lib/animations";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  headerAction?: ReactNode;
  delay?: number;
}

export default function BentoCard({ children, className, title, headerAction, delay = 0 }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
        fadeInUp(cardRef.current, delay);
    }
  }, [delay]);

  return (
    <div ref={cardRef} className={clsx("bento-card p-6 flex flex-col opacity-0", className)}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between mb-6">
          {title && <h3 className="font-bold text-lg font-display">{title}</h3>}
          {headerAction}
        </div>
      )}
      {children}
    </div>
  );
}
