/**
 * src/3d/scene.js
 * Master 3D Forest Carbon Assessment Scene Controller (S0285-S0287)
 */
import * as THREE from 'three';
import { CameraRig } from './camera.js';
import { CarbonLayerManager } from './carbon-layer.js';
import { ForestManager } from './forest.js';
import { TerrainManager } from './terrain.js';

export class ForestCarbonScene {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      reducedMotion: false,
      isMobile: false,
      pointCount: 45000,
      onParcelHover: null,
      onParcelClick: null,
      onFallback: null
    }, options);

    this.currentState = 'A';
    this.animationFrameId = null;
    this.lastTime = performance.now();
    this.isDisposed = false;
    this.isVisible = true;

    // Detect WebGL capability
    if (!this.checkWebGL()) {
      if (typeof this.options.onFallback === 'function') {
        this.options.onFallback();
      }
      return;
    }

    this.init();
  }

  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  init() {
    const isMobile = this.options.isMobile;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080d10);
    this.scene.fog = new THREE.FogExp2(0x080d10, 0.008);

    // 2. Renderer setup — P0-03: mobile gets antialias:false + DPR clamped to 1.0
    this.renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight || 500);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // 3. Lighting (restrained scientific lighting)
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xb0d4e8, 0.85);
    this.dirLight.position.set(40, 80, 30);
    this.scene.add(this.dirLight);

    // 4. Sub-managers
    this.cameraRig = new CameraRig(this.renderer.domElement, {
      reducedMotion: this.options.reducedMotion
    });

    this.terrain = new TerrainManager(this.scene, { size: 80, segments: isMobile ? 60 : 100 });
    this.forest = new ForestManager(this.scene, this.terrain, { count: isMobile ? 180 : 360 });
    // P0-02: Point count is passed from options — 12K mobile / 45K desktop
    this.carbon = new CarbonLayerManager(this.scene, this.terrain, this.forest, {
      pointCount: this.options.pointCount
    });

    // 5. Raycasting for parcel interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.hoveredParcel = null;
    this.setupInteractions();

    // 6. Visibility observer — P1-05: threshold 0.15 to avoid premature render start
    this.setupVisibilityObserver();

    // 7. Initial render & loop
    this.setState('A');

    // P0-04: Do not start animation loop when prefers-reduced-motion is active
    if (this.options.reducedMotion) {
      this.renderer.render(this.scene, this.cameraRig.camera);
    } else {
      this.animate();
    }
  }

  setupInteractions() {
    this.onPointerMove = (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Only perform parcel raycasting in State E or when parcels are visible
      if (this.currentState === 'E') {
        this.raycaster.setFromCamera(this.mouse, this.cameraRig.camera);
        const hits = this.raycaster.intersectObject(this.terrain.mesh);
        if (hits.length > 0) {
          const parcel = this.terrain.getParcelAtPoint(hits[0].point);
          if (parcel !== this.hoveredParcel) {
            this.hoveredParcel = parcel;
            if (typeof this.options.onParcelHover === 'function') {
              this.options.onParcelHover(parcel, e);
            }
          }
        } else if (this.hoveredParcel) {
          this.hoveredParcel = null;
          if (typeof this.options.onParcelHover === 'function') {
            this.options.onParcelHover(null, e);
          }
        }
      }
    };

    this.onClick = (e) => {
      if (this.currentState === 'E' && this.hoveredParcel) {
        if (typeof this.options.onParcelClick === 'function') {
          this.options.onParcelClick(this.hoveredParcel, e);
        }
      }
    };

    this.renderer.domElement.addEventListener('pointermove', this.onPointerMove);
    this.renderer.domElement.addEventListener('click', this.onClick);
  }

  setupVisibilityObserver() {
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
      // P1-05: Only restart loop if not in reduced-motion mode
      if (this.isVisible && !this.animationFrameId && !this.options.reducedMotion) {
        this.lastTime = performance.now();
        this.animate();
      }
    // P1-05: threshold 0.15 — only start rendering when 15% of the widget is visible
    }, { threshold: 0.15 });

    this.intersectionObserver.observe(this.container);
  }

  setState(stateKey) {
    if (!['A', 'B', 'C', 'D', 'E'].includes(stateKey)) return;
    this.currentState = stateKey;

    this.cameraRig.transitionToState(stateKey);
    this.terrain.setState(stateKey);
    this.forest.setState(stateKey);
    this.carbon.setState(stateKey);

    // Orbit inspection enabled only in State E
    this.cameraRig.setOrbitEnabled(stateKey === 'E');
  }

  setProgress(progress) {
    // Continuous progress 0.0 -> 1.0
    const clamped = Math.max(0, Math.min(1, progress));
    this.terrain.setInterpolatedProgress(clamped);
    this.forest.setInterpolatedProgress(clamped);
    this.carbon.setInterpolatedProgress(clamped);

    // Camera interpolation between corresponding keys
    if (clamped < 0.25) {
      this.cameraRig.interpolateBetween('A', 'B', clamped / 0.25);
    } else if (clamped < 0.5) {
      this.cameraRig.interpolateBetween('B', 'C', (clamped - 0.25) / 0.25);
    } else if (clamped < 0.75) {
      this.cameraRig.interpolateBetween('C', 'D', (clamped - 0.5) / 0.25);
    } else {
      this.cameraRig.interpolateBetween('D', 'E', (clamped - 0.75) / 0.25);
    }
  }

  setReducedMotion(enabled) {
    this.options.reducedMotion = !!enabled;
    if (this.cameraRig) {
      this.cameraRig.setReducedMotion(enabled);
    }
  }

  resize() {
    if (!this.renderer || !this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight || 500;
    this.renderer.setSize(w, h);
    this.cameraRig.resize(w, h);
  }

  animate() {
    if (this.isDisposed || !this.isVisible) {
      this.animationFrameId = null;
      return;
    }

    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    this.cameraRig.update(dt);
    this.carbon.update(dt);

    this.renderer.render(this.scene, this.cameraRig.camera);

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  dispose() {
    this.isDisposed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.removeEventListener('pointermove', this.onPointerMove);
      this.renderer.domElement.removeEventListener('click', this.onClick);
      if (this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }

    if (this.cameraRig) this.cameraRig.dispose();
    if (this.terrain) this.terrain.dispose();
    if (this.forest) this.forest.dispose();
    if (this.carbon) this.carbon.dispose();

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}
