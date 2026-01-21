"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MdSearch, MdMenu, MdDarkMode, MdLightMode, MdSettings, MdLogout, MdPerson } from "react-icons/md";
import { IoLeaf } from "react-icons/io5";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalSearch } from "@/contexts/GlobalSearchContext";
import NotificationsDropdown from "@/components/layout/NotificationsDropdown";

const NAV_LINKS = [
  { name: "Dashboard", href: "/" },
  { name: "My Jungle", href: "/jungle" },
  { name: "Schedule", href: "/schedule" },
  { name: "Encyclopedia", href: "/encyclopedia" },
  { name: "Care Logs", href: "/logs" },
];

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { openSearch } = useGlobalSearch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
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
          <div 
            onClick={() => openSearch()}
            className="hidden sm:flex items-center bg-white dark:bg-[#2d3a3a] rounded-lg px-3 py-1.5 border border-[#e6f4f2] dark:border-[#354545] cursor-pointer hover:border-primary transition-colors"
          >
            <MdSearch className="text-primary text-lg" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-text-muted w-40 ml-2 focus:outline-none pointer-events-none"
              placeholder="Search plants... (Ctrl+K)"
              type="text"
              readOnly
            />
          </div>



          <NotificationsDropdown />

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="size-9 rounded-full bg-cover bg-center border-2 border-primary cursor-pointer hover:opacity-90 transition-opacity focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden"
              style={{
                backgroundImage: user?.avatar ? `url("${user.avatar}")` : undefined,
                backgroundColor: !user?.avatar ? "#007969" : undefined,
              }}
              aria-label="User menu"
            >
              {!user?.avatar && (
                <span className="text-white font-bold text-sm flex items-center justify-center h-full">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2d3a3a] rounded-xl shadow-xl border border-[#e6f4f2] dark:border-[#354545] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[#e6f4f2] dark:border-[#354545]">
                  <p className="font-bold text-sm">{user?.name || "Guest"}</p>
                  <p className="text-xs text-text-muted">Plant Enthusiast</p>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#e6f4f2] dark:hover:bg-[#354545] flex items-center gap-3 transition-colors">
                    <MdPerson size={18} className="text-primary" />
                    <span>Profile</span>
                  </button>
                  <Link href="/settings" className="w-full px-4 py-2 text-left text-sm hover:bg-[#e6f4f2] dark:hover:bg-[#354545] flex items-center gap-3 transition-colors text-text-main dark:text-text-inverse">
                    <MdSettings size={18} className="text-primary" />
                    <span>Settings</span>
                  </Link>
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
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
                  >
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
