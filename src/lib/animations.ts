import anime from 'animejs';

export const fadeInUp = (targets: string | HTMLElement | HTMLElement[], delay: number = 0) => {
  anime({
    targets,
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 800,
    delay,
  });
};

export const staggerFadeIn = (targets: string | HTMLElement | NodeList, delay: number = 0) => {
    anime({
        targets,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: delay}),
        easing: 'easeOutExpo',
    });
}
