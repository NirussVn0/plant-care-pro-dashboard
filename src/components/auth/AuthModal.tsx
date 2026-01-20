"use client";

import { useState } from "react";
import { IoLeaf, IoClose } from "react-icons/io5";
import { MdVisibility, MdVisibilityOff, MdArrowForward } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";

// Security constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "signup") => void;
}

/**
 * Authentication modal for login and signup.
 */
export default function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    // Enforce strong password policy for new accounts
    if (mode === "signup") {
      if (!PASSWORD_REGEX.test(password)) {
        setError("Password must be at least 8 characters and include uppercase, lowercase, and a number");
        return;
      }
    } else {
      // Basic length check for login
      if (password.length < 1) {
        setError("Please enter your password");
        return;
      }
    }

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name");
      return;
    }

    login(email.trim(), password);
    onClose();
  };

  const handleDemoLogin = () => {
    login("demo@plantcare.pro", "demo123");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#2d3a3a] rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-main dark:hover:text-text-inverse transition-colors"
        >
          <IoClose size={24} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-2 text-primary mb-6">
            <IoLeaf size={28} />
            <span className="text-lg font-bold">PlantCare Pro</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-main dark:text-text-inverse mb-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-sm text-text-muted">
              {mode === "login"
                ? "Sign in to manage your plants"
                : "Join 10,000+ plant parents today"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-primary uppercase tracking-wider mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-xl border border-[#e6f4f2] dark:border-[#354545] bg-[#fcfbf9] dark:bg-[#222a2a] focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main dark:text-text-inverse placeholder:text-text-muted/50"
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-primary uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl border border-[#e6f4f2] dark:border-[#354545] bg-[#fcfbf9] dark:bg-[#222a2a] focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main dark:text-text-inverse placeholder:text-text-muted/50"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-primary uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  maxLength={128}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#e6f4f2] dark:border-[#354545] bg-[#fcfbf9] dark:bg-[#222a2a] focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main dark:text-text-inverse placeholder:text-text-muted/50"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
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
              <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
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

          <p className="text-center text-sm text-text-muted mt-6">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => onSwitchMode("signup")}
                  className="text-primary font-bold hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => onSwitchMode("login")}
                  className="text-primary font-bold hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
