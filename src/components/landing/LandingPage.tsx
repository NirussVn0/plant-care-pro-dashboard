"use client";

import { useState } from "react";
import { IoLeaf } from "react-icons/io5";
import { MdArrowForward, MdCheck } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";

const FEATURES = [
  "Track all your plants in one place",
  "Smart watering reminders",
  "Care history logging",
  "Plant encyclopedia",
  "Beautiful dark mode",
];

/**
 * Landing page component shown to non-authenticated users.
 * Provides demo login functionality.
 */
export default function LandingPage() {
  const [name, setName] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f4f2] via-white to-[#f4f3f1] dark:from-[#1a2626] dark:via-[#222a2a] dark:to-[#1a2626] flex flex-col">
      <header className="w-full px-6 lg:px-20 py-4">
        <div className="flex items-center gap-2 text-primary">
          <IoLeaf size={32} />
          <h1 className="text-xl font-bold font-display">PlantCare Pro</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-text-main dark:text-text-inverse leading-tight">
                Your Personal
                <span className="text-primary block">Plant Care Assistant</span>
              </h2>
              <p className="text-lg text-text-muted max-w-md">
                Keep your indoor jungle thriving with smart reminders, care tracking, and expert tips.
              </p>
            </div>

            <ul className="space-y-3">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-text-main dark:text-text-inverse">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <MdCheck className="text-primary text-sm" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-[#2d3a3a] rounded-2xl p-8 shadow-xl border border-[#e6f4f2] dark:border-[#354545]">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-main dark:text-text-inverse mb-2">Get Started</h3>
              <p className="text-sm text-text-muted">Enter your name to start managing your plants</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 rounded-xl border border-[#e6f4f2] dark:border-[#354545] bg-[#fcfbf9] dark:bg-[#222a2a] focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main dark:text-text-inverse placeholder:text-text-muted/50"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-3 px-6 bg-primary hover:bg-[#005f52] disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
              >
                <span>Start Growing</span>
                <MdArrowForward className="text-lg" />
              </button>
            </form>

            <p className="text-center text-xs text-text-muted mt-6">
              Demo mode • No account required
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full px-6 lg:px-20 py-6 border-t border-[#e6f4f2] dark:border-[#354545]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <p>© 2026 NirussVn0. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="https://github.com/NirussVn0" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
