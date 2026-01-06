// ui.animations.ts - UI element animations
import gsap from 'gsap';

export const uiAnimations = {
  // Button press effect
  buttonPress(element: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(element, {
      scale: 0.95,
      duration: 0.1,
    });

    tl.to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'elastic.out(1, 0.5)',
    });

    return tl;
  },

  // Fade in up
  fadeInUp(element: HTMLElement, delay: number = 0): gsap.core.Tween {
    return gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay,
      ease: 'power3.out',
    });
  },

  // Fade out down
  fadeOutDown(element: HTMLElement): gsap.core.Tween {
    return gsap.to(element, {
      y: 30,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
    });
  },

  // Scale in
  scaleIn(element: HTMLElement): gsap.core.Tween {
    return gsap.from(element, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });
  },

  // Slide in from left
  slideInLeft(element: HTMLElement): gsap.core.Tween {
    return gsap.from(element, {
      x: -100,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  },

  // Slide in from right
  slideInRight(element: HTMLElement): gsap.core.Tween {
    return gsap.from(element, {
      x: 100,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  },

  // Ripple effect
  ripple(x: number, y: number, container: HTMLElement): void {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 10px;
      height: 10px;
      background: rgba(79, 209, 197, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `;

    container.appendChild(ripple);

    gsap.to(ripple, {
      width: 200,
      height: 200,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  },

  // Tooltip show
  tooltipShow(element: HTMLElement): gsap.core.Tween {
    return gsap.from(element, {
      y: 10,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  },

  // Tooltip hide
  tooltipHide(element: HTMLElement): gsap.core.Tween {
    return gsap.to(element, {
      y: 10,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.in',
    });
  },

  // Menu toggle
  menuOpen(menuElement: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(menuElement, {
      height: 'auto',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    tl.from(
      menuElement.children,
      {
        y: -10,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
      },
      '-=0.1'
    );

    return tl;
  },

  menuClose(menuElement: HTMLElement): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(menuElement.children, {
      y: -10,
      opacity: 0,
      duration: 0.15,
      stagger: 0.03,
    });

    tl.to(menuElement, {
      height: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    });

    return tl;
  },
};
