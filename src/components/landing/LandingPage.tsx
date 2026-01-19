"use client";

import { useState } from "react";
import { IoLeaf } from "react-icons/io5";
import { MdArrowForward, MdCheck, MdVisibility, MdVisibilityOff } from "react-icons/md";
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
 * Provides email/password login with demo mode.
 */
export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    login(email.trim(), password);
  };

  const handleDemoLogin = () => {
    setEmail("demo@plantcare.pro");
    setPassword("demo123");
    setTimeout(() => {
      login("demo@plantcare.pro", "demo123");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f4f2] via-white to-[#f4f3f1] dark:from-[#1a2626] dark:via-[#222a2a] dark:to-[#1a2626] flex flex-col">
      <header className="w-full px-6 lg:px-20 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <IoLeaf size={32} />
          <h1 className="text-xl font-bold font-display">PlantCare Pro</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDemoLogin}
            className="hidden md:block text-sm font-bold hover:text-primary transition-colors"
          >
            Try Demo
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#2d3a3a] border border-[#e6f4f2] dark:border-[#354545] shadow-sm">
              <span className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">#1 Plant Care App</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-text-main dark:text-text-inverse leading-tight">
                Keep your
                <span className="text-primary block">indoor jungle</span>
                thriving.
              </h2>
              <p className="text-lg text-text-muted max-w-md">
                The all-in-one dashboard for modern plant parents. Schedule watering, track growth, and get expert care guides.
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

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="size-10 rounded-full border-2 border-white dark:border-[#222a2a] bg-purple-200 flex items-center justify-center text-purple-700 text-xs font-bold">MJ</div>
                <div className="size-10 rounded-full border-2 border-white dark:border-[#222a2a] bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">DK</div>
                <div className="size-10 rounded-full border-2 border-white dark:border-[#222a2a] bg-pink-200 flex items-center justify-center text-pink-700 text-xs font-bold">SL</div>
                <div className="size-10 rounded-full border-2 border-white dark:border-[#222a2a] bg-primary text-white flex items-center justify-center text-xs font-bold">+10k</div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-400 text-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-xs font-bold text-primary">Loved by 10,000+ gardeners</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#2d3a3a] rounded-2xl p-8 shadow-xl border border-[#e6f4f2] dark:border-[#354545]">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-main dark:text-text-inverse mb-2">Welcome Back</h3>
              <p className="text-sm text-text-muted">Sign in to manage your plants</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#e6f4f2] dark:border-[#354545] bg-[#fcfbf9] dark:bg-[#222a2a] focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main dark:text-text-inverse placeholder:text-text-muted/50"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[#e6f4f2] dark:border-[#354545] bg-[#fcfbf9] dark:bg-[#222a2a] focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main dark:text-text-inverse placeholder:text-text-muted/50"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                  >
                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-primary hover:bg-[#005f52] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
              >
                <span>Sign In</span>
                <MdArrowForward className="text-lg" />
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e6f4f2] dark:border-[#354545]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#2d3a3a] px-2 text-text-muted">or</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="w-full py-3 px-6 bg-[#f4f3f1] dark:bg-[#222a2a] hover:bg-[#e6f4f2] dark:hover:bg-[#354545] text-text-main dark:text-text-inverse font-bold rounded-xl flex items-center justify-center gap-2 transition-all border border-[#e6f4f2] dark:border-[#354545]"
            >
              <span>Try Demo Mode</span>
            </button>

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
