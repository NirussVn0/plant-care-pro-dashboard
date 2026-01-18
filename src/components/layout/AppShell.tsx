"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/landing/LandingPage";
import { useAuth } from "@/contexts/AuthContext";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Main application shell that handles authenticated vs landing view.
 */
export default function AppShell({ children }: AppShellProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
