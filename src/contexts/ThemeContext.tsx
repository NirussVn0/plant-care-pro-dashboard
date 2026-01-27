"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect, useMemo } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access theme context.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component for light/dark mode management.
 * Persists theme preference to localStorage with SSR-safe hydration.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [systemPreference, setSystemPreference] = useState<"light" | "dark">("light");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setThemeState(stored);
    }
    setSystemPreference(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );
  }, []);

  const resolvedTheme = useMemo((): "light" | "dark" => {
    if (!mounted) return "light";
    return theme === "system" ? systemPreference : theme;
  }, [theme, mounted, systemPreference]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
