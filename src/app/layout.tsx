import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import AppShell from "@/components/layout/AppShell";
import ToastContainer from "@/components/ui/ToastContainer";
import { GlobalSearchProvider } from "@/contexts/GlobalSearchContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlantCarePro",
  description: "Manage your personal plant collection with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={clsx(
          "antialiased min-h-screen flex flex-col",
          inter.className
        )}
      >
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <GlobalSearchProvider>
                <AppShell>{children}</AppShell>
                <ToastContainer />
              </GlobalSearchProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
