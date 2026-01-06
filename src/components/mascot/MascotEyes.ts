// MascotEyes.ts - Eye tracking and blinking system
import * as THREE from 'three';
import { MASCOT } from '@/assets/constants';

export class MascotEyes {

  private leftPupil: THREE.Mesh | null = null;
  private rightPupil: THREE.Mesh | null = null;
  private targetX: number = 0;
  private targetY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;
  private blinkInterval: number = 0;

  create(): THREE.Group {
    const eyeGroup = new THREE.Group();

    // Eye whites with connecting line (Baymax style)
    const eyeShape = new THREE.Shape();
    eyeShape.moveTo(-0.35, 0);
    eyeShape.quadraticCurveTo(-0.35, 0.12, -0.23, 0.12);
    eyeShape.lineTo(0.23, 0.12);
    eyeShape.quadraticCurveTo(0.35, 0.12, 0.35, 0);
    eyeShape.quadraticCurveTo(0.35, -0.12, 0.23, -0.12);
    eyeShape.lineTo(-0.23, -0.12);
    eyeShape.quadraticCurveTo(-0.35, -0.12, -0.35, 0);

    const eyeGeometry = new THREE.ShapeGeometry(eyeShape);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x0b0b0b });
    const eyeBase = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeGroup.add(eyeBase);

    // Left pupil
    const pupilGeometry = new THREE.CircleGeometry(0.06, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x0b0b0b });

    this.leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    this.leftPupil.position.set(-0.15, 0, 0.01);
    eyeGroup.add(this.leftPupil);

    // Right pupil
    this.rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    this.rightPupil.position.set(0.15, 0, 0.01);
    eyeGroup.add(this.rightPupil);

    // Start blink timer
    this.startBlinking();

    return eyeGroup;
  }

  lookAt(x: number, y: number): void {
    this.targetX = x * 0.08; // Limit movement range
    this.targetY = y * 0.04;
    this.updatePupils();
  }

  private updatePupils(): void {
    // Smooth interpolation
    this.currentX += (this.targetX - this.currentX) * MASCOT.EYE_FOLLOW_SPEED;
    this.currentY += (this.targetY - this.currentY) * MASCOT.EYE_FOLLOW_SPEED;

    if (this.leftPupil && this.rightPupil) {
      this.leftPupil.position.x = -0.15 + this.currentX;
      this.leftPupil.position.y = this.currentY;
      this.rightPupil.position.x = 0.15 + this.currentX;
      this.rightPupil.position.y = this.currentY;
    }

    requestAnimationFrame(() => this.updatePupils());
  }

  private startBlinking(): void {
    this.blinkInterval = window.setInterval(() => {
      this.blink();
    }, MASCOT.BLINK_INTERVAL);
  }

  private blink(): void {
    if (this.leftPupil && this.rightPupil) {
      // Quick scale down then up for blink effect
      const originalScale = this.leftPupil.scale.y;
      this.leftPupil.scale.y = 0.1;
      this.rightPupil.scale.y = 0.1;

      setTimeout(() => {
        if (this.leftPupil && this.rightPupil) {
          this.leftPupil.scale.y = originalScale;
          this.rightPupil.scale.y = originalScale;
        }
      }, 100);
    }
  }

  widen(): void {
    if (this.leftPupil && this.rightPupil) {
      this.leftPupil.scale.set(1.3, 1.3, 1);
      this.rightPupil.scale.set(1.3, 1.3, 1);
    }
  }

  squint(): void {
    if (this.leftPupil && this.rightPupil) {
      this.leftPupil.scale.set(1, 0.5, 1);
      this.rightPupil.scale.set(1, 0.5, 1);
    }
  }

  reset(): void {
    if (this.leftPupil && this.rightPupil) {
      this.leftPupil.scale.set(1, 1, 1);
      this.rightPupil.scale.set(1, 1, 1);
    }
  }

  destroy(): void {
    clearInterval(this.blinkInterval);
  }
}
