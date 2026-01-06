# Architecture Overview

## Project Structure

```
interactive-portfolio/
├── src/                    # Source code
│   ├── app/               # Application bootstrap
│   ├── assets/            # Static assets and constants
│   ├── components/        # Reusable components
│   ├── sections/          # Page sections
│   ├── av/                # Audio-Visual system
│   ├── animations/        # GSAP animations
│   ├── hooks/             # Custom hooks
│   ├── services/          # External services
│   ├── store/             # State management
│   ├── styles/            # CSS and themes
│   ├── utils/             # Utility functions
│   └── prompts/           # AI prompt templates
├── public/                # Static files
├── supabase/              # Backend configuration
├── scripts/               # Build scripts
└── docs/                  # Documentation
```

## Core Systems

### 1. Application Layer (`src/app/`)

- **main.ts**: Bootstrap application, initialize all systems
- **router.ts**: Hash-based SPA routing
- **app.config.ts**: Global configuration

### 2. Component Architecture

Components follow a class-based pattern:

```typescript
class Component {
  render(): string      // Returns HTML string
  init(): void          // Post-render initialization
  destroy(): void       // Cleanup
}
```

### 3. Mascot System (`src/components/mascot/`)

The fluffy mascot is the centerpiece:

- **Mascot.ts**: Main Three.js scene controller
- **MascotEyes.ts**: Eye tracking and blinking
- **MascotBelly.ts**: Touch interaction zone
- **MascotSpeech.ts**: Tooltip speech bubbles
- **MascotStates.ts**: Emotional state machine

### 4. Audio-Visual System (`src/av/`)

Handles synchronized audio and visuals:

- **audio.manager.ts**: Howler.js wrapper
- **sound.map.ts**: Sound file registry
- **visual.sync.ts**: Web Audio API analyzer
- **av.config.ts**: AV settings

### 5. State Management (`src/store/`)

Zustand stores for reactive state:

- **mascot.store.ts**: Mascot emotions, dialogue
- **ui.store.ts**: Menu, loading, modals
- **sound.store.ts**: Volume, mute, frequency data

## Data Flow

```
User Interaction
      ↓
Event Handler
      ↓
├─→ State Update (Zustand)
│         ↓
│   Component Re-render
│         
├─→ Sound Trigger (AudioManager)
│         ↓
│   Visual Sync (Particles)
│         
└─→ Analytics (AnalyticsService)
          ↓
    Supabase Insert
```

## Performance Considerations

1. **Lazy Loading**: Three.js and GSAP loaded on demand
2. **Object Pooling**: Particles reused, not recreated
3. **RAF Throttling**: Animations limited to 60fps
4. **Intersection Observer**: Sections animate when visible
5. **Reduced Motion**: Respects user preferences

## Author

Matrix Agent
