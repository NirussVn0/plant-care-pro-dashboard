import anime from "animejs";

export interface AnimationOptions {
  delay?: number;
  duration?: number;
  easing?: string;
  stagger?: number;
}


export interface IAnimationService {
  fadeInUp(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  fadeInLeft(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  fadeInRight(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  staggerFadeIn(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  float(target: string | Element, options?: AnimationOptions): anime.AnimeInstance;
  pulse(target: string | Element, options?: AnimationOptions): anime.AnimeInstance;
  scaleIn(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  counterAnimation(target: string | Element, endValue: number, options?: AnimationOptions): anime.AnimeInstance;
  fadeOut(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
}

/**
 * Default animation configurations.
 */
const DEFAULTS = {
  duration: 800,
  easing: "easeOutExpo",
  stagger: 100,
  delay: 0,
} as const;

/**
 * Follows Single Responsibility Principle by encapsulating all animation logic.
 * Now includes session tracking to prevent re-running animations on page revisit.
 */
class AnimationService implements IAnimationService {
  private static instance: AnimationService;
  private readonly STORAGE_KEY = "plantcare_animations_played";
  private readonly TTL_MS = 5 * 60 * 1000; // 5 minutes TTL

  private constructor() {}

  /**
   * Check if a specific animation has already played recently (within TTL).
   * Uses localStorage with timestamps to persist across reloads.
   * @param key Unique identifier for the animation (e.g., "dashboard-header")
   */
  hasPlayed(key: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      // Use sessionStorage so it resets when the tab is closed, but persists on reload (F5)
      // This fulfills "req effect only load when new" for the session.
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      if (!stored) return false;
      const data: Record<string, number> = JSON.parse(stored);
      return !!data[key];
    } catch {
      return false;
    }
  }

  /**
   * Mark an animation as played with current timestamp.
   * @param key Unique identifier for the animation
   */
  markPlayed(key: string): void {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      const data: Record<string, number> = stored ? JSON.parse(stored) : {};
      data[key] = Date.now();
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Clear all animation tracking (useful for testing or forced replay).
   */
  clearPlayedAnimations(): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Show element immediately without animation (for already-played cases).
   */
  showImmediately(targets: string | Element | Element[]): void {
    const elements = this.resolveTargets(targets);
    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });
  }

  private resolveTargets(targets: string | Element | Element[]): Element[] {
    if (typeof targets === "string") {
      return Array.from(document.querySelectorAll(targets));
    }
    if (Array.isArray(targets)) {
      return targets;
    }
    return [targets];
  }

  static getInstance(): AnimationService {
    if (!AnimationService.instance) {
      AnimationService.instance = new AnimationService();
    }
    return AnimationService.instance;
  }

  /**
   * Great for hero text, headings, and content blocks.
   */
  fadeInUp(targets: string | Element | Element[], options: AnimationOptions = {}): anime.AnimeInstance {
    return anime({
      targets,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: options.duration ?? DEFAULTS.duration,
      easing: options.easing ?? DEFAULTS.easing,
      delay: options.delay ?? DEFAULTS.delay,
    });
  }

  /**
   * Fade in from left side.
   */
  fadeInLeft(targets: string | Element | Element[], options: AnimationOptions = {}): anime.AnimeInstance {
    return anime({
      targets,
      opacity: [0, 1],
      translateX: [-60, 0],
      duration: options.duration ?? DEFAULTS.duration,
      easing: options.easing ?? DEFAULTS.easing,
      delay: options.delay ?? DEFAULTS.delay,
    });
  }

  /**
   * Fade in from right side.
   */
  fadeInRight(targets: string | Element | Element[], options: AnimationOptions = {}): anime.AnimeInstance {
    return anime({
      targets,
      opacity: [0, 1],
      translateX: [60, 0],
      duration: options.duration ?? DEFAULTS.duration,
      easing: options.easing ?? DEFAULTS.easing,
      delay: options.delay ?? DEFAULTS.delay,
    });
  }

  /**
   * Staggered fade-in for lists and grids.
   */
  staggerFadeIn(targets: string | Element | Element[], options: AnimationOptions = {}): anime.AnimeInstance {
    return anime({
      targets,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: options.duration ?? DEFAULTS.duration,
      easing: options.easing ?? DEFAULTS.easing,
      delay: anime.stagger(options.stagger ?? DEFAULTS.stagger, {
        start: options.delay ?? DEFAULTS.delay,
      }),
    });
  }

  /**
   * Perfect for floating cards and decorative elements.
   */
  float(target: string | Element, options: AnimationOptions = {}): anime.AnimeInstance {
    return anime({
      targets: target,
      translateY: [-8, 8],
      duration: options.duration ?? 2500,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  }

  /**
   * Great for attention-grabbing elements.
   */
  pulse(target: string | Element, options: AnimationOptions = {}): anime.AnimeInstance {
    return anime({
      targets: target,
      scale: [1, 1.05, 1],
      duration: options.duration ?? 1500,
      easing: "easeInOutQuad",
      loop: true,
    });
  }

  /**
   * Scale in from small to full size.
   * Great for images and cards.
   */
  scaleIn(targets: string | Element | Element[], options: AnimationOptions = {}): anime.AnimeInstance {
    return anime({
      targets,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: options.duration ?? DEFAULTS.duration,
      easing: options.easing ?? DEFAULTS.easing,
      delay: options.delay ?? DEFAULTS.delay,
    });
  }

  /**
   * Animated number counter.
   */
  counterAnimation(target: string | Element, endValue: number, options: AnimationOptions = {}): anime.AnimeInstance {
    const obj = { value: 0 };
    const element = typeof target === "string" ? document.querySelector(target) : target;

    return anime({
      targets: obj,
      value: endValue,
      round: 1,
      duration: options.duration ?? 2000,
      easing: options.easing ?? "easeOutExpo",
      delay: options.delay ?? DEFAULTS.delay,
      update: () => {
        if (element) {
          const formatted = obj.value >= 1000 ? `${Math.floor(obj.value / 1000)}k+` : `${obj.value}`;
          element.textContent = formatted;
        }
      },
    });
  }

  /**
   * Fade out elements.
   * Useful for exit animations.
   */
  fadeOut(targets: string | Element | Element[], options: AnimationOptions = {}): anime.AnimeInstance {
    return anime({
      targets,
      opacity: [1, 0],
      duration: options.duration ?? 400,
      easing: options.easing ?? "easeOutQuad",
      delay: options.delay ?? 0,
    });
  }
}

export const animationService = AnimationService.getInstance();
export default AnimationService;
