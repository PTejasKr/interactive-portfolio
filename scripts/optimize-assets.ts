// optimize-assets.ts
// Script to optimize images, audio, and other assets

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface AssetConfig {
  type: 'image' | 'audio' | 'model';
  extensions: string[];
  directory: string;
  optimizeCommand?: string;
}

const assetConfigs: AssetConfig[] = [
  {
    type: 'image',
    extensions: ['.png', '.jpg', '.jpeg', '.webp'],
    directory: 'public/textures',
  },
  {
    type: 'audio',
    extensions: ['.wav', '.mp3'],
    directory: 'public/audio',
  },
  {
    type: 'model',
    extensions: ['.glb', '.gltf'],
    directory: 'public/models',
  },
];

function getFilesRecursively(dir: string, extensions: string[]): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getFilesRecursively(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function analyzeAssets(): void {
  console.log('Asset Analysis Report\n');
  console.log('='.repeat(50));
  
  let totalSize = 0;
  
  for (const config of assetConfigs) {
    const files = getFilesRecursively(config.directory, config.extensions);
    let typeSize = 0;
    
    console.log(`\n${config.type.toUpperCase()} (${config.directory})`);
    console.log('-'.repeat(40));
    
    for (const file of files) {
      const stat = fs.statSync(file);
      typeSize += stat.size;
      console.log(`  ${path.basename(file)}: ${formatBytes(stat.size)}`);
    }
    
    console.log(`  Total: ${formatBytes(typeSize)} (${files.length} files)`);
    totalSize += typeSize;
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`Total asset size: ${formatBytes(totalSize)}`);
}

function generatePlaceholders(): void {
  console.log('\nGenerating placeholder assets...\n');
  
  const placeholders = [
    { path: 'public/audio/ui/hover.wav', size: 1024 },
    { path: 'public/audio/ui/click.wav', size: 1024 },
    { path: 'public/audio/ui/transition.wav', size: 2048 },
    { path: 'public/audio/mascot/giggle-soft.wav', size: 4096 },
    { path: 'public/audio/mascot/giggle-big.wav', size: 8192 },
    { path: 'public/audio/mascot/idle-breath.wav', size: 16384 },
    { path: 'public/audio/mascot/sleepy.wav', size: 4096 },
    { path: 'public/audio/ambient/background-loop.mp3', size: 102400 },
  ];
  
  for (const placeholder of placeholders) {
    const dir = path.dirname(placeholder.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (!fs.existsSync(placeholder.path)) {
      // Create empty placeholder file
      fs.writeFileSync(placeholder.path, Buffer.alloc(0));
      console.log(`Created placeholder: ${placeholder.path}`);
    }
  }
}

function main(): void {
  const args = process.argv.slice(2);
  
  if (args.includes('--analyze')) {
    analyzeAssets();
  } else if (args.includes('--placeholders')) {
    generatePlaceholders();
  } else {
    console.log('Asset Optimization Script');
    console.log('Usage:');
    console.log('  --analyze      Analyze asset sizes');
    console.log('  --placeholders Generate placeholder files');
  }
}

main();
