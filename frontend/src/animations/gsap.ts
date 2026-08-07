import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateFadeUp = (selector: string, stagger: number = 0) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
      },
    }
  );
};

export const animateScale = (selector: string) => {
  gsap.fromTo(
    selector,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
      },
    }
  );
};
