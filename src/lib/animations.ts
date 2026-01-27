import anime from "animejs";

/**
 * Used for entrance animations on cards and elements.
 */
export const fadeInUp = (targets: string | HTMLElement | HTMLElement[], delay: number = 0) => {
  anime({
    targets,
    translateY: [20, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 800,
    delay,
  });
};

/**
 * Each element animates sequentially with configurable initial delay.
 */
export const staggerFadeIn = (targets: string | HTMLElement | NodeList, delay: number = 0) => {
  anime({
    targets,
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(100, { start: delay }),
    easing: "easeOutExpo",
  });
};
