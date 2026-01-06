// SkillPlayground.ts - Interactive skill orbs section
import { Section } from '@components/layout/Section';

import { skillsLogic } from './skills.logic';

interface Skill {
  name: string;
  level: number;
  years: number;
  category: string;
  logoUrl: string;
}

const skills: Skill[] = [
  { name: 'JavaScript', level: 90, years: 5, category: 'Frontend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', level: 85, years: 3, category: 'Frontend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', level: 88, years: 4, category: 'Frontend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Three.js', level: 75, years: 2, category: 'Graphics', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'Node.js', level: 82, years: 4, category: 'Backend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', level: 78, years: 3, category: 'Backend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PostgreSQL', level: 80, years: 4, category: 'Database', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'GSAP', level: 85, years: 3, category: 'Animation', logoUrl: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg' }, // Fallback for GSAP or external
];

export class SkillPlayground extends Section {


  constructor() {
    super({
      id: 'skills',
      title: 'Skill Playground',
      subtitle: 'Hover and click to explore my abilities',
    });
  }

  render(): string {
    // Pyramid Layout Logic
    // Row 1: 1 orb
    // Row 2: 2 orbs
    // Row 3: 3 orbs
    // Row 4: 2 orbs (remainder)

    const rows = [
      skills.slice(0, 1), // Top
      skills.slice(1, 3), // Middle
      skills.slice(3, 6), // Bottom
      skills.slice(6, 8)  // Base
    ];

    const orbsHtml = rows.map((row, rowIndex) => `
      <div class="flex justify-center gap-8 md:gap-12 w-full">
        ${row.map((skill, i) => `
          <div class="skill-orb-wrapper relative flex-shrink-0" data-skill="${skill.name}" style="--delay: ${(rowIndex * 2 + i) * 0.1}s">
             <div class="skill-orb bg-white shadow-lg rounded-full w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl relative z-10 p-4" data-cursor-hover>
              <img src="${skill.logoUrl}" alt="${skill.name}" loading="lazy" width="64" height="64" class="w-12 h-12 md:w-16 md:h-16 object-contain mb-2 pointer-events-none" />
              <span class="text-xs md:text-sm font-medium text-dark">${skill.name}</span>
            </div>
            <div class="skill-rings absolute inset-0 pointer-events-none -z-0 scale-150 opacity-0 hover:opacity-100 transition-opacity">
               ${this.renderRings(skill.level)}
            </div>
          </div>
        `).join('')}
      </div>
    `).join('<div class="h-8"></div>'); // Spacer between rows

    const content = `
      <div class="skill-playground flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-12">
        ${orbsHtml}
      </div>
      
      <!-- Skill Detail Modal -->
      <div id="skill-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 id="skill-modal-title" class="text-2xl font-bold"></h3>
            <button id="skill-modal-close" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center" data-cursor-hover>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div id="skill-modal-content"></div>
        </div>
      </div>
    `;

    return this.wrapContent(content);
  }

  private renderRings(level: number): string {
    const ringCount = Math.floor(level / 25) + 1;
    return Array.from({ length: ringCount })
      .map(
        (_, i) => `
        <div class="absolute inset-0 border-2 border-accent-aqua/20 rounded-full animate-pulse" style="transform: scale(${1.2 + i * 0.15}); animation-delay: ${i * 0.2}s;"></div>
      `
      )
      .join('');
  }

  override init(): void {
    super.init();
    skillsLogic.init();

    // Initialize skill orb interactions
    document.querySelectorAll('.skill-orb').forEach((orb) => {
      orb.addEventListener('click', () => {
        const skillName = orb.closest('.skill-orb-wrapper')?.getAttribute('data-skill');
        const skill = skills.find((s) => s.name === skillName);
        if (skill) this.showSkillModal(skill);
      });
    });
  }

  private showSkillModal(skill: Skill): void {
    const modal = document.getElementById('skill-modal');
    const title = document.getElementById('skill-modal-title');
    const content = document.getElementById('skill-modal-content');
    const closeBtn = document.getElementById('skill-modal-close');

    if (!modal || !title || !content) return;

    title.textContent = skill.name;
    content.innerHTML = `
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-500">Proficiency</p>
          <div class="w-full h-2 bg-gray-200 rounded-full mt-1">
            <div class="h-full bg-accent-aqua rounded-full" style="width: ${skill.level}%"></div>
          </div>
          <p class="text-right text-sm font-medium mt-1">${skill.level}%</p>
        </div>
        <div class="flex justify-between">
          <div>
            <p class="text-sm text-gray-500">Experience</p>
            <p class="font-semibold">${skill.years} years</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Category</p>
            <p class="font-semibold">${skill.category}</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');

    closeBtn?.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
}
