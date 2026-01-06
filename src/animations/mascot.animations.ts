// mascot.animations.ts - Mascot-specific GSAP animations
import gsap from 'gsap';

export const mascotAnimations = {
  // Idle floating animation
  idle(element: HTMLElement): gsap.core.Tween {
    return gsap.to(element, {
      y: 10,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  },

  // Breathing animation
  breathe(element: HTMLElement): gsap.core.Tween {
    return gsap.to(element, {
      scale: 1.02,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  },

  // Happy bounce
  happyBounce(element: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(element, {
      y: -20,
      scaleY: 1.1,
      scaleX: 0.95,
      duration: 0.15,
      ease: 'power2.out',
    });

    tl.to(element, {
      y: 0,
      scaleY: 0.95,
      scaleX: 1.05,
      duration: 0.1,
      ease: 'power2.in',
    });

    tl.to(element, {
      scaleY: 1,
      scaleX: 1,
      duration: 0.2,
      ease: 'elastic.out(1, 0.5)',
    });

    return tl;
  },

  // Excited shake
  excitedShake(element: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(element, {
      x: -5,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
    });

    tl.to(element, {
      x: 0,
      duration: 0.1,
    });

    return tl;
  },

  // Sleepy droop
  sleepyDroop(element: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(element, {
      y: 20,
      rotation: 5,
      duration: 1,
      ease: 'power2.inOut',
    });

    return tl;
  },

  // Wake up
  wakeUp(element: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(element, {
      y: -10,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out',
    });

    tl.to(element, {
      y: 0,
      duration: 0.2,
      ease: 'bounce.out',
    });

    return tl;
  },

  // Eye blink
  blink(leftEye: HTMLElement, rightEye: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to([leftEye, rightEye], {
      scaleY: 0.1,
      duration: 0.05,
    });

    tl.to([leftEye, rightEye], {
      scaleY: 1,
      duration: 0.1,
      ease: 'power2.out',
    });

    return tl;
  },

  // Belly giggle
  bellyGiggle(element: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(element, {
      scale: 1.15,
      duration: 0.1,
      ease: 'power2.out',
    });

    tl.to(element, {
      scale: 0.95,
      duration: 0.1,
    });

    tl.to(element, {
      scale: 1.05,
      duration: 0.1,
    });

    tl.to(element, {
      scale: 1,
      duration: 0.15,
      ease: 'elastic.out(1, 0.5)',
    });

    return tl;
  },

  // Wave animation
  wave(element: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(element, {
      rotation: 15,
      duration: 0.15,
    });

    tl.to(element, {
      rotation: -10,
      duration: 0.15,
    });

    tl.to(element, {
      rotation: 10,
      duration: 0.15,
    });

    tl.to(element, {
      rotation: 0,
      duration: 0.2,
      ease: 'elastic.out(1, 0.5)',
    });

    return tl;
  },
};
