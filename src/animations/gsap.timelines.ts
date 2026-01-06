// gsap.timelines.ts - GSAP timeline factories
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const timelines = {
  // Page load animation
  pageLoad(): gsap.core.Timeline {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from('header', {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    return tl;
  },

  // Section reveal animation
  sectionReveal(sectionId: string): gsap.core.Timeline {
    const section = document.getElementById(sectionId);
    if (!section) return gsap.timeline();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(section.querySelectorAll('.animate-in'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return tl;
  },

  // Card hover animation
  cardHover(element: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      y: -10,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });

    return tl;
  },

  // Modal open animation
  modalOpen(modalElement: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.fromTo(
      modalElement.parentElement,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    tl.fromTo(
      modalElement,
      { scale: 0.9, y: 30, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
      '-=0.2'
    );

    return tl;
  },

  // Modal close animation
  modalClose(modalElement: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(modalElement, {
      scale: 0.9,
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });

    tl.to(
      modalElement.parentElement,
      { opacity: 0, duration: 0.2 },
      '-=0.1'
    );

    return tl;
  },

  // Stagger animation for lists
  staggerIn(elements: NodeList | HTMLElement[], delay: number = 0): gsap.core.Timeline {
    const tl = gsap.timeline({ delay });

    tl.from(elements, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return tl;
  },

  // Parallax scroll effect
  parallax(element: HTMLElement, speed: number = 0.5): void {
    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  },
};
