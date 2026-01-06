# AI Prompt Chain System

## Purpose

This project is designed for AI-assisted development. Every component, animation, and feature can be generated, modified, or extended using structured prompts.

## Prompt Categories

### 1. System Prompt

Sets the context for all interactions:

```
You are a senior frontend + creative technologist building an 
interactive mascot-based portfolio using Vite, TypeScript, 
Three.js, GSAP, and Supabase.
```

### 2. Component Prompts

For generating new components:

```
Generate a [COMPONENT_TYPE] that:
- Follows the established design system
- Uses Three.js for 3D elements
- Implements GSAP animations
- Integrates with the mascot system
- Plays appropriate sounds
```

### 3. Feature Prompts

For adding new features:

```
Add [FEATURE] to the portfolio that:
- Extends existing functionality
- Maintains performance standards
- Is accessible and responsive
- Follows the color scheme
```

### 4. Refactor Prompts

For improving existing code:

```
Refactor [MODULE] to:
- Improve performance
- Reduce bundle size
- Enhance accessibility
- Add missing types
```

## Prompt Chain Workflow

### Step 1: Define Context

```
Context: Interactive portfolio with fluffy mascot
Tech Stack: Vite, TypeScript, Three.js, GSAP, Supabase
Design: Beige background, Aqua accents, Red CTAs
```

### Step 2: Specify Component

```
Component: New skill orb variant
Requirements:
- Physics-based movement
- Hover expansion
- Click modal with sound
- Particle emission
```

### Step 3: Generate Code

AI generates complete, typed code following project patterns.

### Step 4: Integrate

Code is placed in appropriate directory with imports added.

## Example Chains

### Adding a New Mascot Emotion

```
1. "Add 'confused' emotion to mascot"
2. "Generate eye animation for confusion (spiral pupils)"
3. "Create confused sound effect trigger"
4. "Add confused state to MascotStates.ts"
5. "Update mascot.store.ts with new mood type"
```

### Adding a New Section

```
1. "Create Testimonials section"
2. "Generate testimonial card component"
3. "Add scroll animation triggers"
4. "Integrate mascot response for section"
5. "Add navigation link to header"
```

### Optimizing Performance

```
1. "Analyze bundle size"
2. "Identify heavy dependencies"
3. "Implement code splitting"
4. "Add lazy loading"
5. "Profile and verify improvements"
```

## Prompt Files

Located in `src/prompts/`:

| File | Purpose |
|------|---------|
| system.prompt.txt | Global context |
| mascot.prompts.txt | Mascot features |
| av.prompts.txt | Audio-visual system |
| github.prompts.txt | GitHub integration |
| supabase.prompts.txt | Backend features |
| refactor.prompts.txt | Code improvements |

## Best Practices

1. **Be Specific**: Include all requirements upfront
2. **Reference Existing Code**: Point to related files
3. **Maintain Consistency**: Follow established patterns
4. **Test Incrementally**: Verify each step
5. **Document Changes**: Update relevant docs

## Author

Matrix Agent
