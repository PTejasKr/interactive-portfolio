// TimelineTunnel.ts - Experience timeline section
import { Section } from '@components/layout/Section';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    period: '2023 - Present',
    description: 'Leading frontend architecture and building immersive web experiences with modern technologies.',
    technologies: ['React', 'TypeScript', 'Three.js', 'GSAP'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Startup Inc',
    period: '2021 - 2023',
    description: 'Developed and maintained multiple web applications, APIs, and database systems.',
    technologies: ['Node.js', 'PostgreSQL', 'Vue.js', 'AWS'],
  },
  {
    title: 'Junior Developer',
    company: 'Agency XYZ',
    period: '2019 - 2021',
    description: 'Built responsive websites and interactive features for various clients.',
    technologies: ['JavaScript', 'HTML/CSS', 'WordPress', 'jQuery'],
  },
];

export class TimelineTunnel extends Section {
  constructor() {
    super({
      id: 'experience',
      title: 'Experience Timeline',
      subtitle: 'My professional journey',
    });
  }

  render(): string {
    const timelineItems = experiences
      .map(
        (exp, i) => `
        <div class="timeline-item relative flex gap-8 pb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:flex-row">
          <!-- Timeline line and dot -->
          <div class="timeline-connector absolute left-1/2 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 md:translate-x-0"></div>
          <div class="timeline-dot absolute left-1/2 md:left-8 top-2 w-4 h-4 bg-accent-aqua rounded-full -translate-x-1/2 md:translate-x-0 z-10 ring-4 ring-beige"></div>
          
          <!-- Content -->
          <div class="timeline-content ml-0 md:ml-20 glass-card rounded-2xl p-6 flex-1 max-w-xl">
            <span class="text-accent-aqua font-mono text-sm font-bold">${exp.period}</span>
            <h3 class="text-xl font-bold mt-1">${exp.title}</h3>
            <p class="text-gray-700 font-medium">${exp.company}</p>
            <p class="text-gray-800 mt-3 leading-relaxed">${exp.description}</p>
            <div class="flex flex-wrap gap-2 mt-4">
              ${exp.technologies.map((tech) => `<span class="px-2 py-1 text-xs bg-gray-100 rounded-full">${tech}</span>`).join('')}
            </div>
          </div>
        </div>
      `
      )
      .join('');

    const content = `
      <div class="timeline-container relative max-w-3xl mx-auto">
        ${timelineItems}
      </div>
    `;

    return this.wrapContent(content);
  }

  override init(): void {
    super.init();
    this.animateTimeline();
  }

  private animateTimeline(): void {
    const items = document.querySelectorAll('.timeline-item');

    items.forEach((item, i) => {
      const content = item.querySelector('.timeline-content');
      const dot = item.querySelector('.timeline-dot');

      gsap.from(content, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(dot, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
        scale: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'back.out(1.7)',
      });
    });

    // Animate the connector line
    const connectors = document.querySelectorAll('.timeline-connector');
    connectors.forEach((connector) => {
      gsap.from(connector, {
        scrollTrigger: {
          trigger: connector,
          start: 'top 90%',
          end: 'bottom 50%',
          scrub: true,
        },
        scaleY: 0,
        transformOrigin: 'top',
      });
    });
  }
}
