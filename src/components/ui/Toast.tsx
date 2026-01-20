"use client";

import { useEffect, useState, useCallback } from "react";
import { MdCheckCircle, MdError, MdInfo, MdClose } from "react-icons/md";
import { clsx } from "clsx";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({ id, message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClose = useCallback(() => {
    setIsRemoving(true);
    setIsVisible(false);
    // Wait for exit animation
    setTimeout(() => {
      onClose(id);
    }, 300);
  }, [id, onClose]);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const icons = {
    success: <MdCheckCircle className="text-xl text-green-500" />,
    error: <MdError className="text-xl text-red-500" />,
    info: <MdInfo className="text-xl text-blue-500" />,
  };

  const bgColors = {
    success: "bg-white dark:bg-[#2d3a3a] border-green-200 dark:border-green-900",
    error: "bg-white dark:bg-[#2d3a3a] border-red-200 dark:border-red-900",
    info: "bg-white dark:bg-[#2d3a3a] border-blue-200 dark:border-blue-900",
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all duration-300 transform",
        bgColors[type],
        isVisible && !isRemoving ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
      )}
      role="alert"
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="text-sm font-medium text-text-main dark:text-text-inverse pr-2">{message}</p>
      <button
        onClick={handleClose}
        className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-muted"
        aria-label="Close"
      >
        <MdClose />
      </button>
    </div>
  );
}
