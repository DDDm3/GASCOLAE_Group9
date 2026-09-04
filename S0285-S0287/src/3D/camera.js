/**
 * src/3d/camera.js
 * Camera Controller & Choreography for S0285-S0287 3D Narrative
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const CAMERA_PRESETS = {
  A: { pos: new THREE.Vector3(0, 45, 75), target: new THREE.Vector3(0, 0, 0) },
  B: { pos: new THREE.Vector3(15, 30, 50), target: new THREE.Vector3(0, 5, 0) },
  C: { pos: new THREE.Vector3(-20, 20, 35), target: new THREE.Vector3(-5, 8, 0) },
  D: { pos: new THREE.Vector3(0, 35, 60), target: new THREE.Vector3(0, 2, 0) },
  E: { pos: new THREE.Vector3(0, 60, 45), target: new THREE.Vector3(0, 0, 0) }
};

export class CameraRig {
  constructor(domElement, options = {}) {
    this.domElement = domElement;
    this.options = Object.assign({
      fov: 45,
      near: 0.1,
      far: 1000,
      reducedMotion: false
    }, options);

    const aspect = domElement.clientWidth / (domElement.clientHeight || 1);
    this.camera = new THREE.PerspectiveCamera(this.options.fov, aspect, this.options.near, this.options.far);

    // Initial pose (State A)
    const initial = CAMERA_PRESETS.A;
    this.camera.position.copy(initial.pos);
    this.currentTarget = initial.target.clone();
    this.camera.lookAt(this.currentTarget);

    // OrbitControls for interactive inspection
    this.controls = new OrbitControls(this.camera, this.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 15;
    this.controls.maxDistance = 120;
    this.controls.minPolarAngle = 0.1;
    this.controls.maxPolarAngle = Math.PI / 2.3; // Prevent viewing underground
    this.controls.target.copy(this.currentTarget);
    this.controls.enabled = false;

    // Transition state
    this.isTransitioning = false;
    this.startPos = new THREE.Vector3();
    this.endPos = new THREE.Vector3();
    this.startTarget = new THREE.Vector3();
    this.endTarget = new THREE.Vector3();
    this.transitionTime = 0;
    this.transitionDuration = 0.8;
  }

  setReducedMotion(enabled) {
    this.options.reducedMotion = !!enabled;
  }

  setOrbitEnabled(enabled) {
    this.controls.enabled = !!enabled;
  }

  transitionToState(stateKey, duration = 0.8) {
    const preset = CAMERA_PRESETS[stateKey];
    if (!preset) return;

    if (this.options.reducedMotion || duration <= 0) {
      this.camera.position.copy(preset.pos);
      this.currentTarget.copy(preset.target);
      this.controls.target.copy(preset.target);
      this.camera.lookAt(this.currentTarget);
      this.isTransitioning = false;
      return;
    }

    this.startPos.copy(this.camera.position);
    this.endPos.copy(preset.pos);
    this.startTarget.copy(this.controls.target);
    this.endTarget.copy(preset.target);
    this.transitionTime = 0;
    this.transitionDuration = Math.max(0.1, duration);
    this.isTransitioning = true;
    this.controls.enabled = false;
  }

  interpolateBetween(stateKey1, stateKey2, t) {
    const p1 = CAMERA_PRESETS[stateKey1];
    const p2 = CAMERA_PRESETS[stateKey2];
    if (!p1 || !p2) return;

    const clampedT = Math.max(0, Math.min(1, t));
    this.camera.position.lerpVectors(p1.pos, p2.pos, clampedT);
    this.currentTarget.lerpVectors(p1.target, p2.target, clampedT);
    this.controls.target.copy(this.currentTarget);
    this.camera.lookAt(this.currentTarget);
  }

  update(deltaTime) {
    if (this.isTransitioning) {
      this.transitionTime += deltaTime;
      const alpha = Math.min(1, this.transitionTime / this.transitionDuration);
      const ease = alpha < 0.5 ? 4 * alpha * alpha * alpha : 1 - Math.pow(-2 * alpha + 2, 3) / 2;

      this.camera.position.lerpVectors(this.startPos, this.endPos, ease);
      this.currentTarget.lerpVectors(this.startTarget, this.endTarget, ease);
      this.controls.target.copy(this.currentTarget);
      this.camera.lookAt(this.currentTarget);

      if (alpha >= 1) {
        this.isTransitioning = false;
      }
    } else if (this.controls.enabled) {
      this.controls.update();
    }
  }

  resize(width, height) {
    if (!height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.controls.dispose();
  }
}
