// skills.logic.ts - Skill playground interaction logic
import gsap from 'gsap';

export const skillsLogic = {
  init(): void {
    this.animateOrbsOnScroll();
    this.setupFloatingAnimation();
  },

  animateOrbsOnScroll(): void {
    const orbs = document.querySelectorAll('.skill-orb-wrapper');

    orbs.forEach((orb, index) => {
      gsap.from(orb, {
        scrollTrigger: {
          trigger: orb,
          start: 'top 85%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)',
      });
    });
  },

  setupFloatingAnimation(): void {
    const orbs = document.querySelectorAll('.skill-orb');

    orbs.forEach((orb, index) => {
      // Random floating animation
      gsap.to(orb, {
        y: 'random(-10, 10)',
        x: 'random(-5, 5)',
        duration: 'random(2, 4)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
      });
    });
  },

  filterByCategory(category: string): void {
    const orbs = document.querySelectorAll('.skill-orb-wrapper');

    orbs.forEach((orb) => {
      // const skillName = orb.getAttribute('data-skill');
      // Filter logic would check skill category
      if (category === 'all') {
        gsap.to(orb, { opacity: 1, scale: 1, duration: 0.3 });
      } else {
        // Would need skill data access here
        gsap.to(orb, { opacity: 0.3, scale: 0.8, duration: 0.3 });
      }
    });
  },
};
