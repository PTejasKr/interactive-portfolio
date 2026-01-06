// cursor.effects.ts - Cursor click and interaction effects

export const cursorEffects = {
  ripple(x: number, y: number): void {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 10px;
      height: 10px;
      background: rgba(79, 209, 197, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9997;
      transform: translate(-50%, -50%);
      animation: ripple-expand 0.6s ease-out forwards;
    `;

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  },

  magnetize(element: HTMLElement, cursorX: number, cursorY: number): void {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (cursorX - centerX) * 0.2;
    const deltaY = (cursorY - centerY) * 0.2;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  },

  unmagnetize(element: HTMLElement): void {
    element.style.transform = 'translate(0, 0)';
  },

  trail(x: number, y: number): void {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: rgba(79, 209, 197, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9996;
      animation: particle-fade 0.5s ease-out forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 500);
  },
};

// Add keyframe animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-expand {
    to {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }

  @keyframes particle-fade {
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
  }
`;
document.head.appendChild(style);
