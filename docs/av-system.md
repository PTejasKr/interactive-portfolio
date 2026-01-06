# Audio-Visual System Documentation

## Overview

The AV system creates a synchronized experience where sounds trigger visual reactions and visuals can be accompanied by audio feedback.

## Audio Manager

### Initialization

```typescript
import { audioManager } from '@/av/audio.manager';

await audioManager.init();
```

### Playing Sounds

```typescript
// Play a sound by key
audioManager.play('giggle-soft');

// Stop a sound
audioManager.stop('idle-breath');

// Control ambient loop
audioManager.playAmbient();
audioManager.stopAmbient();
```

### Volume Control

```typescript
audioManager.setVolume(0.5);  // 0-1
audioManager.mute();
audioManager.unmute();
audioManager.toggleMute();
```

## Sound Map

All sounds are defined in `sound.map.ts`:

| Key | File | Volume | Category |
|-----|------|--------|----------|
| hover | /audio/ui/hover.wav | 0.2 | UI |
| click | /audio/ui/click.wav | 0.3 | UI |
| giggle-soft | /audio/mascot/giggle-soft.wav | 0.4 | Mascot |
| giggle-big | /audio/mascot/giggle-big.wav | 0.5 | Mascot |
| idle-breath | /audio/mascot/idle-breath.wav | 0.2 | Mascot |

## Visual Sync

### Frequency Analysis

```typescript
import { visualSync } from '@/av/visual.sync';

visualSync.init(audioElement);

// Subscribe to frequency updates
visualSync.onFrequencyUpdate((data) => {
  // data is array of 0-255 values
});

// Get specific frequency ranges
const bass = visualSync.getBassLevel();   // 0-1
const mid = visualSync.getMidLevel();     // 0-1
const high = visualSync.getHighLevel();   // 0-1

// Beat detection
if (visualSync.detectBeat(0.7)) {
  // Trigger visual effect
}
```

### Particle Reactivity

Particles respond to audio:

```typescript
// In ParticleField or SoundReactiveParticles
const amplitude = visualSync.getBassLevel();
this.setReactivity(amplitude);
```

## Configuration

All AV settings are in `av.config.ts`:

```typescript
{
  defaultVolume: 0.3,
  maxVolume: 0.6,
  ambientVolume: 0.15,
  beatThreshold: 0.7,
  fftSize: 256,
}
```

## User Preferences

The system respects:

- `prefers-reduced-motion`: Disables audio visualization
- Mute state: Persisted in localStorage
- Volume level: Remembered between sessions

## Performance

- FFT size 256 for fast analysis
- Throttled updates at 60fps
- Maximum 10 callbacks per frame
- Lazy sound loading

## Author

Matrix Agent
