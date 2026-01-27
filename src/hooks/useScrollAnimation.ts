"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { animationService, AnimationOptions } from "@/services/animation/AnimationService";

type AnimationType = "fadeInUp" | "fadeInLeft" | "fadeInRight" | "staggerFadeIn" | "scaleIn";

interface UseScrollAnimationOptions extends AnimationOptions {
  type?: AnimationType;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver.
 * Combines React refs with anime.js for performant scroll animations.
 * 
 * @example
 * const { ref, isVisible } = useScrollAnimation({ type: "fadeInUp", delay: 200 });
 * return <div ref={ref} style={{ opacity: 0 }}>Content</div>;
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    type = "fadeInUp",
    threshold = 0.1,
    triggerOnce = true,
    delay,
    duration,
    easing,
    stagger,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  // Memoize animation options to prevent unstable dependency
  const animationOptions = useMemo<AnimationOptions>(() => ({
    delay,
    duration,
    easing,
    stagger,
  }), [delay, duration, easing, stagger]);

  const animate = useCallback((element: T) => {
    switch (type) {
      case "fadeInUp":
        animationService.fadeInUp(element, animationOptions);
        break;
      case "fadeInLeft":
        animationService.fadeInLeft(element, animationOptions);
        break;
      case "fadeInRight":
        animationService.fadeInRight(element, animationOptions);
        break;
      case "staggerFadeIn":
        animationService.staggerFadeIn(element.children as unknown as Element[], animationOptions);
        break;
      case "scaleIn":
        animationService.scaleIn(element, animationOptions);
        break;
    }
  }, [type, animationOptions]);


  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasAnimated.current) return;
            
            setIsVisible(true);
            hasAnimated.current = true;
            animate(element as T);

            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animate, threshold, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Hook for animating multiple children with stagger effect on scroll.
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  options: Omit<UseScrollAnimationOptions, "type"> = {}
) {
  return useScrollAnimation<T>({ ...options, type: "staggerFadeIn" });
}

export default useScrollAnimation;
