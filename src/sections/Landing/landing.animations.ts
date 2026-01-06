// landing.animations.ts - Landing page GSAP animations
import gsap from 'gsap';

export const landingAnimations = {
  init(): void {
    const tl = gsap.timeline({ delay: 0.5 });

    // Title reveal with glitch effect
    tl.from('.title-line', {
      y: 100,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
    });

    // Subtitle fade in
    tl.from(
      '.landing-subtitle',
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // CTA buttons slide up
    tl.from(
      '.landing-cta a',
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    // Scroll indicator fade in
    tl.from(
      '.scroll-indicator',
      {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.2'
    );
  },

  glitchText(element: HTMLElement): void {
    const text = element.textContent || '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    let iterations = 0;
    const interval = setInterval(() => {
      element.textContent = text
        .split('')
        .map((_char, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  },
};
