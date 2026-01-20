import anime from "animejs";

/**
 * Animation configuration options.
 */
export interface AnimationOptions {
  delay?: number;
  duration?: number;
  easing?: string;
  stagger?: number;
}

/**
 * Animation service interface following SOLID principles.
 * Provides a clean API for common animation patterns using anime.js.
 */
export interface IAnimationService {
  fadeInUp(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  fadeInLeft(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  fadeInRight(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  staggerFadeIn(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  float(target: string | Element, options?: AnimationOptions): anime.AnimeInstance;
  pulse(target: string | Element, options?: AnimationOptions): anime.AnimeInstance;
  scaleIn(targets: string | Element | Element[], options?: AnimationOptions): anime.AnimeInstance;
  counterAnimation(target: string | Element, endValue: number, options?: AnimationOptions): anime.AnimeInstance;
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
 * AnimationService - Singleton service for managing anime.js animations.
 * Follows Single Responsibility Principle by encapsulating all animation logic.
 */
class AnimationService implements IAnimationService {
  private static instance: AnimationService;

  private constructor() {}

  static getInstance(): AnimationService {
    if (!AnimationService.instance) {
      AnimationService.instance = new AnimationService();
    }
    return AnimationService.instance;
  }

  /**
   * Fade in with upward movement.
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
   * Great for testimonials and side content.
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
   * Each element animates with a delay after the previous.
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
   * Continuous floating animation.
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
   * Subtle pulse animation.
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
   * Perfect for statistics and metrics display.
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
}

export const animationService = AnimationService.getInstance();
export default AnimationService;
