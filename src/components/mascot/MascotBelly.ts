// MascotBelly.ts - Belly interaction zone with hover/click effects
import * as THREE from 'three';
import gsap from 'gsap';
import { useSoundStore } from '@store/sound.store';

export class MascotBelly {
  private mesh: THREE.Mesh | null = null;
  private rippleMaterial: THREE.ShaderMaterial | null = null;

  create(): THREE.Mesh {
    const geometry = new THREE.CircleGeometry(0.4, 32);
    
    // Custom shader for ripple effect
    this.rippleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRipple: { value: 0 },
        uColor: { value: new THREE.Color(0x4fd1c5) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uRipple;
        uniform vec3 uColor;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5);
          float dist = distance(vUv, center);
          float ripple = sin(dist * 20.0 - uTime * 5.0) * uRipple;
          float alpha = (1.0 - dist) * 0.3 * (1.0 + ripple);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geometry, this.rippleMaterial);
    this.mesh.name = 'belly';
    
    return this.mesh;
  }

  bounce(): void {
    if (!this.mesh) return;

    // Play giggle sound
    const soundStore = useSoundStore.getState();
    soundStore.playSound('giggle');

    // Bounce animation
    gsap.to(this.mesh.scale, {
      x: 1.2,
      y: 1.2,
      duration: 0.15,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
    });

    // Trigger ripple
    this.triggerRipple();
  }

  private triggerRipple(): void {
    if (!this.rippleMaterial) return;

    gsap.to(this.rippleMaterial.uniforms.uRipple, {
      value: 1,
      duration: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(this.rippleMaterial!.uniforms.uRipple, {
          value: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });
  }

  update(time: number): void {
    if (this.rippleMaterial) {
      this.rippleMaterial.uniforms.uTime.value = time;
    }
  }

  hover(): void {
    if (!this.mesh) return;
    gsap.to(this.mesh.scale, {
      x: 1.1,
      y: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  unhover(): void {
    if (!this.mesh) return;
    gsap.to(this.mesh.scale, {
      x: 1,
      y: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
}
