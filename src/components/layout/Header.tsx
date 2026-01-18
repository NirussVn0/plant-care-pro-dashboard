"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MdSearch, MdNotifications, MdMenu, MdDarkMode, MdLightMode, MdSettings, MdLogout, MdPerson } from "react-icons/md";
import { IoLeaf } from "react-icons/io5";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { name: "Dashboard", href: "/" },
  { name: "My Jungle", href: "/jungle" },
  { name: "Schedule", href: "/schedule" },
  { name: "Encyclopedia", href: "/encyclopedia" },
  { name: "Care Logs", href: "/logs" },
];

/**
 * Application header component with navigation, search, and user controls.
 * Includes user dropdown with theme toggle.
 */
export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeToggle = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white dark:border-[#354545] bg-opacity-80 backdrop-blur-md bg-background-light dark:bg-background-dark px-6 lg:px-20 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between gap-8 text-text-main dark:text-text-inverse">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
            <div className="size-8">
              <IoLeaf size={32} />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight font-display">PlantCare Pro</h2>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-muted hover:text-primary transition-colors font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-white dark:bg-[#2d3a3a] rounded-lg px-3 py-1.5 border border-[#e6f4f2] dark:border-[#354545]">
            <MdSearch className="text-primary text-lg" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-text-muted w-40 ml-2 focus:outline-none"
              placeholder="Search plants..."
              type="text"
            />
          </div>

          <button className="p-2 rounded-lg bg-white dark:bg-[#2d3a3a] text-primary hover:bg-[#d6ebe9] dark:hover:bg-[#354545] transition-colors shadow-sm">
            <MdNotifications size={20} />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="size-9 rounded-full bg-cover bg-center border-2 border-primary cursor-pointer hover:opacity-90 transition-opacity focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4L-yeUJzasM-KnmHpRaGOy4Q0P6W1DT_fcBCYMI9VHN5JwqkgvIC1iIDeTi10qij1hTQSCBtghVVq5gdUQbTVQGaIGNbMhwQFFENUUDdf0_33CoO0HSQ_ZDqjOFUpFEqR-10Jroz1pIw6wVySVHaCNY9TXc2S-vUJwgOnA_hpHFbXpxnDFve4_NymV5jhbKa4ngCnE4S3x9sOy6HUhz9Fj6uRNdqj8_xgtAQ-Dgjcfg64jFQOvUX-Vgm04VBriTnh66Q0mOeJAQ")',
              }}
              aria-label="User menu"
            />

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2d3a3a] rounded-xl shadow-xl border border-[#e6f4f2] dark:border-[#354545] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[#e6f4f2] dark:border-[#354545]">
                  <p className="font-bold text-sm">Sage</p>
                  <p className="text-xs text-text-muted">Master Gardener</p>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#e6f4f2] dark:hover:bg-[#354545] flex items-center gap-3 transition-colors">
                    <MdPerson size={18} className="text-primary" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#e6f4f2] dark:hover:bg-[#354545] flex items-center gap-3 transition-colors">
                    <MdSettings size={18} className="text-primary" />
                    <span>Settings</span>
                  </button>
                </div>

                <div className="border-t border-[#e6f4f2] dark:border-[#354545] py-2">
                  <div className="px-4 py-2">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Theme</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                          theme === "light"
                            ? "bg-primary text-white"
                            : "bg-[#f4f3f1] dark:bg-[#222a2a] hover:bg-[#e6f4f2] dark:hover:bg-[#354545]"
                        }`}
                      >
                        <MdLightMode size={16} /> Light
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                          theme === "dark"
                            ? "bg-primary text-white"
                            : "bg-[#f4f3f1] dark:bg-[#222a2a] hover:bg-[#e6f4f2] dark:hover:bg-[#354545]"
                        }`}
                      >
                        <MdDarkMode size={16} /> Dark
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#e6f4f2] dark:border-[#354545] py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors">
                    <MdLogout size={18} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="md:hidden p-2 text-primary">
            <MdMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
