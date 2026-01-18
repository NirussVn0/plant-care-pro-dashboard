"use client";

import LandingPage from "@/components/landing/LandingPage";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Auth guard wrapper that shows landing page if not authenticated.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <>{children}</>;
}
