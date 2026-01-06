# Mascot Behavior Documentation

## Design

The mascot is a fluffy, Baymax-inspired character with:

- **Soft white body**: Sphere with fur particles
- **Expressive eyes**: Black connected dots that track cursor
- **Interactive belly**: Touch zone for giggles
- **Speech bubbles**: Contextual messages

## States

### State Machine

```typescript
enum MascotState {
  IDLE = 'idle',
  CURIOUS = 'curious',
  HAPPY = 'happy',
  EXCITED = 'excited',
  SLEEPY = 'sleepy',
  TALKING = 'talking',
}
```

### State Behaviors

| State | Animation | Sound | Trigger |
|-------|-----------|-------|---------|
| IDLE | Slow float, breathing | idle-breath | Default |
| CURIOUS | Eyes widen, lean forward | blip | Hover near |
| HAPPY | Bounce, smile | giggle-soft | Click/interact |
| EXCITED | Rapid bounce, sparkles | giggle-big | CTA hover |
| SLEEPY | Droop, slow blink | sleepy | 60s inactivity |
| TALKING | Eyes animate | - | Speech active |

## Eye Tracking

Eyes follow the cursor with constraints:

```typescript
// Max rotation angles
eyeMaxRotation: { x: 0.1, y: 0.15 }

// Smooth interpolation
lookAt(x, y) {
  targetX = clamp(x * 0.08, -maxX, maxX);
  targetY = clamp(y * 0.04, -maxY, maxY);
  currentX += (targetX - currentX) * 0.1;
}
```

### Blinking

Random blinks every 3-6 seconds:

```typescript
blink() {
  scaleY = 0.1;  // Close
  wait(100ms);
  scaleY = 1.0;  // Open
}
```

## Belly Interaction

### Hover

```typescript
onBellyHover() {
  playSound('giggle-soft');
  animateScale(1.1, 0.3s);
  triggerRipple();
}
```

### Click

```typescript
onBellyClick() {
  playSound('giggle-big');
  bounceAnimation();
  particleBurst();
  setState(HAPPY);
}
```

## Speech System

### Showing Messages

```typescript
mascot.speak("Hello! Welcome to my portfolio.");
```

### Typewriter Effect

- 30ms per character
- Audio blip per character (optional)
- Auto-dismiss after 4 seconds

### Context-Aware Messages

| Trigger | Message |
|---------|---------|
| First visit | "Hi there! I'm your guide." |
| Skills section | "These are the things I'm good at!" |
| Long idle | "Still there? *yawn*" |
| Contact form | "Don't be shy, say hello!" |

## Fur System

500+ particles create fluffy appearance:

```typescript
// Particles distributed on sphere surface
for (i = 0; i < 500; i++) {
  theta = random() * PI * 2;
  phi = acos(2 * random() - 1);
  radius = 1.2 + random() * 0.15;
  
  position = spherical(radius, theta, phi);
}

// Animation
updateFur(time) {
  position += sin(time + i) * 0.001;
}
```

## Integration

### With Audio

```typescript
// Mascot reacts to bass
visualSync.onFrequencyUpdate((data) => {
  const bass = getBassLevel(data);
  mascot.scale = 1 + bass * 0.05;
});
```

### With State Store

```typescript
// State changes reflected in store
mascotStore.setMood('happy');
mascotStore.addToDialogue("Yay!");
```

## Author

Matrix Agent
