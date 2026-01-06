// generate-prompts.ts
// Script to generate AI prompt chains from the codebase structure

import * as fs from 'fs';
import * as path from 'path';

interface PromptConfig {
  name: string;
  description: string;
  files: string[];
  template: string;
}

const promptConfigs: PromptConfig[] = [
  {
    name: 'mascot-component',
    description: 'Generate mascot-related components',
    files: [
      'src/components/mascot/Mascot.ts',
      'src/components/mascot/MascotEyes.ts',
      'src/components/mascot/MascotBelly.ts',
    ],
    template: `Create a {{component}} component for the mascot system that:
- Follows the established mascot design (fluffy Baymax-inspired)
- Uses Three.js for 3D rendering
- Implements GSAP animations
- Responds to user interactions
- Plays appropriate sounds via AudioManager`,
  },
  {
    name: 'av-system',
    description: 'Generate audio-visual components',
    files: [
      'src/av/audio.manager.ts',
      'src/av/visual.sync.ts',
    ],
    template: `Implement {{feature}} for the AV system that:
- Uses Howler.js for audio playback
- Integrates with Web Audio API for analysis
- Connects to particle system for visual feedback
- Respects user preferences (reduced motion)
- Maintains 60fps performance`,
  },
  {
    name: 'section-component',
    description: 'Generate section components',
    files: [
      'src/sections/Landing/Landing.ts',
      'src/sections/Skills/SkillPlayground.ts',
    ],
    template: `Create the {{section}} section that:
- Extends the Section base class
- Implements scroll-triggered animations
- Integrates with the mascot for contextual responses
- Follows the beige/aqua/red color scheme
- Is fully accessible and responsive`,
  },
];

function generatePromptFile(config: PromptConfig): string {
  const header = `# ${config.name}\n\n${config.description}\n\n`;
  const template = `## Template\n\n\`\`\`\n${config.template}\n\`\`\`\n\n`;
  const files = `## Related Files\n\n${config.files.map(f => `- ${f}`).join('\n')}\n`;
  
  return header + template + files;
}

function main(): void {
  const outputDir = 'prompts/generated';
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const config of promptConfigs) {
    const content = generatePromptFile(config);
    const outputPath = path.join(outputDir, `${config.name}.md`);
    fs.writeFileSync(outputPath, content);
    console.log(`Generated: ${outputPath}`);
  }
  
  // Generate index file
  const indexContent = `# Generated Prompts\n\n${promptConfigs.map(c => `- [${c.name}](./${c.name}.md): ${c.description}`).join('\n')}`;
  fs.writeFileSync(path.join(outputDir, 'index.md'), indexContent);
  
  console.log('\nPrompt generation complete!');
}

main();
