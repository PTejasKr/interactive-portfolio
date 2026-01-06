// SoundToggle.ts - Cinematic Glow Toggle Button
import { audioManager } from '@/av/audio.manager';
import gsap from 'gsap';

export class SoundToggle {
    private button: HTMLElement;
    private isMuted: boolean = true;

    constructor() {
        this.button = document.createElement('button');
        this.setupButton();
        this.attachListeners();
    }

    private setupButton(): void {
        this.button.className = `
      relative group flex items-center justify-center p-3 rounded-full 
      bg-white/5 border border-white/10 backdrop-blur-md
      transition-all duration-300 ease-out
      hover:scale-110 hover:border-accent-primary/50
      shadow-[0_0_15px_rgba(215,204,200,0.1)]
      hover:shadow-[0_0_25px_rgba(141,110,99,0.4)]
    `;
        this.button.setAttribute('aria-label', 'Toggle Sound');
        this.button.setAttribute('data-cursor-hover', '');

        // Inner "Bulb"
        const bulb = document.createElement('div');
        bulb.className = `
      w-3 h-3 rounded-full bg-gray-400 
      transition-all duration-300
      shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]
      group-hover:bg-gray-300
    `;
        bulb.id = 'sound-bulb';

        // Icon wrapper
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-bold text-accent-primary';
        // iconWrapper.innerText = 'SOUND'; // Optional text

        this.button.appendChild(bulb);
        this.button.appendChild(iconWrapper); // Add if you want text on hover

        this.updateState();
    }

    private attachListeners(): void {
        this.button.addEventListener('click', () => {
            this.isMuted = !this.isMuted;
            audioManager.toggleMute();
            this.updateState();

            // Click ripple/pulse effect
            gsap.fromTo(this.button,
                { scale: 0.95 },
                { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 }
            );
        });
    }

    private updateState(): void {
        const bulb = this.button.querySelector('#sound-bulb') as HTMLElement;

        if (!this.isMuted) {
            // ON State - Cinematic Glow
            gsap.to(bulb, {
                backgroundColor: '#8D6E63', // Premium Brown
                boxShadow: '0 0 10px #8D6E63, 0 0 20px #8D6E63',
                duration: 0.3
            });
            this.button.classList.add('border-accent-primary/50');
        } else {
            // OFF State - Dim
            gsap.to(bulb, {
                backgroundColor: '#9E9E9E',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                duration: 0.3
            });
            this.button.classList.remove('border-accent-primary/50');
        }
    }

    public mount(container: HTMLElement): void {
        container.appendChild(this.button);
    }
}
