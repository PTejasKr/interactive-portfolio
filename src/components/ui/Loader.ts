// Loader.ts - Custom loading screen with +_::= animation
import gsap from 'gsap';

export class Loader {
    private container: HTMLElement;
    private textElement: HTMLElement;
    private timeline: gsap.core.Timeline | null = null;
    private onComplete: () => void;

    constructor(onComplete: () => void) {
        this.onComplete = onComplete;
        this.container = document.createElement('div');
        this.textElement = document.createElement('div');
        this.setupLoader();
    }

    private setupLoader(): void {
        this.container.className = 'fixed inset-0 z-50 flex items-center justify-center bg-bg-primary';
        this.container.id = 'app-loader';

        // Style text
        this.textElement.className = 'font-mono text-4xl md:text-6xl font-bold text-accent-aqua tracking-widest';
        this.textElement.style.textShadow = '0 0 20px rgba(0, 188, 212, 0.5)';
        this.textElement.textContent = '+';

        this.container.appendChild(this.textElement);
        document.body.appendChild(this.container);
    }

    start(): void {
        const chars = ['+', '-', ':', ':', '='];
        let index = 0;

        this.timeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.1,
            onRepeat: () => {
                index = (index + 1) % chars.length;
                this.textElement.textContent = chars[index];

                // Glitch effect on change
                gsap.fromTo(this.textElement,
                    { skewX: 10, opacity: 0.8 },
                    { skewX: 0, opacity: 1, duration: 0.1, ease: 'power4.out' }
                );
            }
        });

        // Pulse animation
        this.timeline.to(this.textElement, {
            scale: 1.1,
            duration: 0.2,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: 1
        });

        // Force simulation of "loading" for at least 2 seconds (or until assets loaded)
        // In a real app, you'd hook this to your AssetManager
        setTimeout(() => {
            this.finish();
        }, 2500);
    }

    private finish(): void {
        if (this.timeline) this.timeline.kill();
        this.textElement.textContent = '=';

        // Bloom effect before exit
        gsap.to(this.textElement, {
            scale: 1.5,
            textShadow: '0 0 50px rgba(0, 188, 212, 0.8)',
            duration: 0.4,
            ease: 'back.out(2)',
            onComplete: () => {
                // Exit animation
                gsap.to(this.container, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        this.container.remove();
                        this.onComplete();
                    }
                });
            }
        });
    }
}
