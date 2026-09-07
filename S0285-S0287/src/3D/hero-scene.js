/**
 * src/3d/hero-scene.js
 * Scientific Geospatial 3D Remote Sensing Visualization for the Hero Section (S0285-S0287)
 * Implemented strictly from approved specification: docs/12-hero-3d-redesign-spec.md
 *
 * Core Value Chain:
 *   FOREST -> UAV LiDAR MEASUREMENT -> FOREST STRUCTURE / BIOMASS -> CARBON DENSITY -> SPATIAL CARBON MAP
 *
 * Visual Hierarchy:
 *   L0 - Digital Terrain Model (DTM) with Subtle Topographic Isolines
 *   L1 - Multi-Archetype Forest Canopy (Visible Trunks + 2-4 Irregular Organic Canopy Volumes)
 *   L2 - Spatially Anchored LiDAR Point Cloud & Surveying UAV with Subtle Downward Laser Rays
 *   L3 - Structural Above-Ground Biomass (AGB) Visual Encoding on Canopies
 *   L4 - Irregular GIS Cadastral Carbon Management Parcels & Choropleth Drapes
 */
import * as THREE from 'three';

export class HeroScene {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      reducedMotion: false,
      onFallback: null
    }, options);

    this.animationFrameId = null;
    this.isDisposed = false;
    this.isVisible = true;

    // 24-Second 4-Stage Scientific Sequence
    this.CYCLE_DURATION = 24.0;
    this.forcedTime = null;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    if (typeof window !== 'undefined' && window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.matches) {
        this.options.reducedMotion = true;
      }
    }

    if (!this.checkWebGL()) {
      if (typeof this.options.onFallback === 'function') {
        this.options.onFallback();
      }
      return;
    }

    // Expose instance for QA inspection
    if (this.container) {
      this.container.__heroScene = this;
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
    const isMobile = window.innerWidth < 768;
    this.isMobile = isMobile;

    // 1. Scene & Remote Sensing Atmosphere
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080d11);
    this.scene.fog = new THREE.FogExp2(0x080d11, 0.012);

    // 2. Camera: Controlled Oblique Aerial Perspective
    const w = this.container.clientWidth || 480;
    const h = this.container.clientHeight || 340;
    const aspect = w / h;

    this.camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 500);
    this.cameraBasePos = isMobile
      ? new THREE.Vector3(15.0, 13.0, 21.0)
      : new THREE.Vector3(18.0, 16.0, 26.0);
    this.cameraTarget = new THREE.Vector3(0.0, 2.5, -2.0);
    this.camera.position.copy(this.cameraBasePos);
    this.camera.lookAt(this.cameraTarget);

    // 3. WebGL Renderer with Clamped DPR
    this.renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      powerPreference: 'high-performance',
      alpha: true
    });
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // 4. Remote Sensing Lighting System (Natural daylight + Hemisphere fill + Cyan rim)
    this.hemiLight = new THREE.HemisphereLight(0xd2edf8, 0x142b36, 1.05);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.55);
    this.sunLight.position.set(32, 46, 22);
    this.scene.add(this.sunLight);

    const rimLight = new THREE.DirectionalLight(0x00e5ff, 0.55);
    rimLight.position.set(-20, 20, -18);
    this.scene.add(rimLight);

    // 5. Build Architectural Layers L0 through L4
    this.buildL0Terrain(isMobile);
    this.buildL1Forest(isMobile);
    this.buildL2UAVAndLaser(isMobile);
    this.buildL2LidarPointCloud(isMobile);
    this.buildL4CarbonParcels(isMobile);

    // 6. Interaction & Visibility Handlers
    this.setupPointerInteraction();
    this.setupVisibilityObserver();

    // 7. Render Loop
    this.clock = new THREE.Clock();
    if (this.options.reducedMotion) {
      this.applyReducedMotionState();
      this.renderer.render(this.scene, this.camera);
    } else {
      this.animate();
    }
  }

  getTerrainHeight(x, z) {
    const s1 = 0.075;
    const s2 = 0.15;
    const ridge = Math.sin(x * s1 * 1.05) * Math.cos(z * s1 * 0.95) * 3.0;
    const valley = Math.cos((x + z * 0.8) * s2) * 1.25;
    const slope = (z * 0.65 - x * 0.35) * 0.08;
    return ridge + valley + slope;
  }

  /* ─────────────────────────────────────────────────────────────
     L0 — NATURAL DTM TERRAIN & SUBTLE TOPOGRAPHIC ISOLINES
  ───────────────────────────────────────────────────────────── */
  buildL0Terrain(isMobile) {
    const size = 56;
    const segs = isMobile ? 36 : 54;
    this.terrainGeom = new THREE.PlaneGeometry(size, size, segs, segs);
    this.terrainGeom.rotateX(-Math.PI / 2);

    const pos = this.terrainGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, this.getTerrainHeight(x, z));
    }
    this.terrainGeom.computeVertexNormals();

    this.terrainMat = new THREE.MeshStandardMaterial({
      color: 0x1b2d3a,
      roughness: 0.84,
      metalness: 0.04,
      flatShading: false
    });
    this.terrainMesh = new THREE.Mesh(this.terrainGeom, this.terrainMat);
    this.scene.add(this.terrainMesh);

    // Subtle Topographic Contour Isolines
    const contourLevels = [-1.5, 0.5, 2.5, 4.5, 6.0];
    const contourPoints = [];
    const step = 0.95;
    const half = size / 2;

    for (const level of contourLevels) {
      for (let x = -half; x < half; x += step) {
        for (let z = -half; z < half; z += step) {
          const h00 = this.getTerrainHeight(x, z);
          const h10 = this.getTerrainHeight(x + step, z);
          const h01 = this.getTerrainHeight(x, z + step);

          if ((h00 <= level && h10 > level) || (h00 > level && h10 <= level)) {
            const frac = (level - h00) / (h10 - h00 || 0.001);
            const ix = x + step * frac;
            contourPoints.push(new THREE.Vector3(ix, level + 0.04, z));
            contourPoints.push(new THREE.Vector3(ix, level + 0.04, z + step * 0.5));
          }
          if ((h00 <= level && h01 > level) || (h00 > level && h01 <= level)) {
            const frac = (level - h00) / (h01 - h00 || 0.001);
            const iz = z + step * frac;
            contourPoints.push(new THREE.Vector3(x, level + 0.04, iz));
            contourPoints.push(new THREE.Vector3(x + step * 0.5, level + 0.04, iz));
          }
        }
      }
    }

    if (contourPoints.length > 0) {
      const contourGeom = new THREE.BufferGeometry().setFromPoints(contourPoints);
      this.contourMat = new THREE.LineBasicMaterial({
        color: 0x24556a,
        transparent: true,
        opacity: 0.38,
        linewidth: 1
      });
      this.contourLines = new THREE.LineSegments(contourGeom, this.contourMat);
      this.scene.add(this.contourLines);
    }
  }

  /* ─────────────────────────────────────────────────────────────
     L1 — MULTI-ARCHETYPE REAL FOREST (VISIBLE TRUNKS + 2-4 LOBES)
  ───────────────────────────────────────────────────────────── */
  createMultiLobeCanopyGeometry(lobeConfigs) {
    let totalFloats = 0;
    const lobeGeoms = [];

    for (const cfg of lobeConfigs) {
      const base = new THREE.IcosahedronGeometry(cfg.radius, 1);
      const nonIndexed = base.toNonIndexed();
      nonIndexed.scale(cfg.scale.x, cfg.scale.y, cfg.scale.z);
      nonIndexed.translate(cfg.offset.x, cfg.offset.y, cfg.offset.z);
      nonIndexed.computeVertexNormals();

      const p = nonIndexed.attributes.position.array;
      totalFloats += p.length;
      lobeGeoms.push(nonIndexed);
    }

    const mergedPositions = new Float32Array(totalFloats);
    const mergedNormals = new Float32Array(totalFloats);
    let offset = 0;

    for (const g of lobeGeoms) {
      const p = g.attributes.position.array;
      const n = g.attributes.normal.array;
      mergedPositions.set(p, offset);
      mergedNormals.set(n, offset);
      offset += p.length;
      g.dispose();
    }

    const mergedGeom = new THREE.BufferGeometry();
    mergedGeom.setAttribute('position', new THREE.BufferAttribute(mergedPositions, 3));
    mergedGeom.setAttribute('normal', new THREE.BufferAttribute(mergedNormals, 3));
    return mergedGeom;
  }

  buildL1Forest(isMobile) {
    // 1. REGENERATION (Young understory): 4.5m - 6.5m, slender trunk, 2 lobes
    this.canopyGeomRegen = this.createMultiLobeCanopyGeometry([
      { radius: 0.85, scale: new THREE.Vector3(1.15, 0.8, 1.05), offset: new THREE.Vector3(0.04, 1.6, -0.04) },
      { radius: 0.65, scale: new THREE.Vector3(0.9, 0.9, 0.9), offset: new THREE.Vector3(-0.04, 2.4, 0.04) }
    ]);

    // 2. MEDIUM (Co-dominant): 7.5m - 10.5m, 3 stratified lobes
    this.canopyGeomMid = this.createMultiLobeCanopyGeometry([
      { radius: 1.25, scale: new THREE.Vector3(1.2, 0.75, 1.1), offset: new THREE.Vector3(0.08, 2.2, -0.06) },
      { radius: 1.0, scale: new THREE.Vector3(1.0, 0.85, 0.95), offset: new THREE.Vector3(-0.1, 3.2, 0.08) },
      { radius: 0.68, scale: new THREE.Vector3(0.8, 0.9, 0.8), offset: new THREE.Vector3(0.04, 4.1, -0.03) }
    ]);

    // 3. MATURE (Main Canopy): 11m - 14.5m, wide spreading umbrella silhouette (4 lobes)
    this.canopyGeomMature = this.createMultiLobeCanopyGeometry([
      { radius: 1.65, scale: new THREE.Vector3(1.3, 0.7, 1.2), offset: new THREE.Vector3(0.12, 2.8, -0.1) },
      { radius: 1.3, scale: new THREE.Vector3(1.1, 0.75, 1.05), offset: new THREE.Vector3(-0.14, 4.0, 0.12) },
      { radius: 0.95, scale: new THREE.Vector3(0.95, 0.85, 0.9), offset: new THREE.Vector3(0.08, 5.0, -0.06) },
      { radius: 0.62, scale: new THREE.Vector3(0.8, 0.9, 0.8), offset: new THREE.Vector3(0.0, 5.8, 0.04) }
    ]);

    // 4. EMERGENT (Forest Giant): 15m - 18.5m, towering crown with prominent stratified apex
    this.canopyGeomEmergent = this.createMultiLobeCanopyGeometry([
      { radius: 2.1, scale: new THREE.Vector3(1.35, 0.68, 1.25), offset: new THREE.Vector3(0.15, 3.4, -0.15) },
      { radius: 1.65, scale: new THREE.Vector3(1.15, 0.75, 1.1), offset: new THREE.Vector3(-0.18, 4.8, 0.16) },
      { radius: 1.2, scale: new THREE.Vector3(1.0, 0.85, 0.95), offset: new THREE.Vector3(0.1, 6.1, -0.08) },
      { radius: 0.75, scale: new THREE.Vector3(0.85, 0.95, 0.85), offset: new THREE.Vector3(-0.03, 7.2, 0.05) }
    ]);

    // Common Trunk Geometry: vertical cylinder with visible clearance above ground
    this.trunkGeom = new THREE.CylinderGeometry(0.12, 0.22, 2.8, 6);
    this.trunkGeom.translate(0, 1.4, 0);
    this.trunkMat = new THREE.MeshStandardMaterial({
      color: 0x3d3025,
      roughness: 0.88,
      metalness: 0.03
    });

    this.foliageMat = new THREE.MeshStandardMaterial({
      roughness: 0.48,
      metalness: 0.04,
      transparent: true,
      opacity: 0.96
    });

    const counts = isMobile
      ? { regen: 2, mid: 4, mature: 2, emergent: 1 }
      : { regen: 24, mid: 62, mature: 28, emergent: 8 };

    this.totalTreeCount = counts.regen + counts.mid + counts.mature + counts.emergent;

    this.trunkMesh = new THREE.InstancedMesh(this.trunkGeom, this.trunkMat, this.totalTreeCount);
    this.canopyMeshRegen = new THREE.InstancedMesh(this.canopyGeomRegen, this.foliageMat, counts.regen);
    this.canopyMeshMid = new THREE.InstancedMesh(this.canopyGeomMid, this.foliageMat, counts.mid);
    this.canopyMeshMature = new THREE.InstancedMesh(this.canopyGeomMature, this.foliageMat, counts.mature);
    this.canopyMeshEmergent = new THREE.InstancedMesh(this.canopyGeomEmergent, this.foliageMat, counts.emergent);

    this.trunkMesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    this.canopyMeshRegen.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    this.canopyMeshMid.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    this.canopyMeshMature.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    this.canopyMeshEmergent.instanceMatrix.setUsage(THREE.StaticDrawUsage);

    this.colorNatural = new THREE.Color(0x389c62);
    this.colorBiomassRegen = new THREE.Color(0x24744a);
    this.colorBiomassMid = new THREE.Color(0x389c62);
    this.colorBiomassMature = new THREE.Color(0x4ebd7e);
    this.colorBiomassEmergent = new THREE.Color(0xd4af37);

    this.treeRecords = [];
    const dummy = new THREE.Object3D();
    let seed = 48271;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    let trunkIdx = 0;
    let regenIdx = 0;
    let midIdx = 0;
    let matureIdx = 0;
    let emergentIdx = 0;

    const mobileCoords = [
      { x: 3.5, z: 5.5, type: 'emergent', scale: 0.95 },
      { x: 0.8, z: 1.0, type: 'mature', scale: 0.9 },
      { x: -2.5, z: 2.5, type: 'mid', scale: 0.9 },
      { x: -5.0, z: -1.0, type: 'mid', scale: 0.85 },
      { x: 2.2, z: -2.5, type: 'mid', scale: 0.95 },
      { x: -1.2, z: -4.8, type: 'regen', scale: 0.85 },
      { x: 4.8, z: -3.2, type: 'mid', scale: 0.9 },
      { x: -3.8, z: -6.0, type: 'regen', scale: 0.8 }
    ];

    for (let i = 0; i < this.totalTreeCount; i++) {
      let x, z, type, scaleY, scaleXZ;

      if (isMobile && i < mobileCoords.length) {
        const mc = mobileCoords[i];
        x = mc.x;
        z = mc.z;
        type = mc.type;
        scaleY = mc.scale;
        scaleXZ = mc.scale;
      } else {
        if (i < 4) {
          // 4 Foreground Anchor Trees in lower-right foreground at z: 4.5..8.5
          x = 4.0 + (i % 2) * 3.5 + (rnd() - 0.5) * 1.2;
          z = 4.8 + Math.floor(i / 2) * 3.0 + (rnd() - 0.5) * 1.2;
          type = i === 0 ? 'emergent' : (i === 1 ? 'mature' : 'mid');
          scaleY = 0.88 + rnd() * 0.15;
          scaleXZ = 0.88 + rnd() * 0.15;
        } else {
          // Hillside distribution with open central clearing
          const u = rnd();
          const v = rnd();
          const r = 4.5 + Math.sqrt(u) * 16.5;
          const theta = v * Math.PI * 2;
          x = Math.cos(theta) * r * 1.1;
          z = Math.sin(theta) * r * 0.85 - 2.5;

          const roll = rnd();
          if (roll < 0.20) type = 'regen';
          else if (roll < 0.68) type = 'mid';
          else if (roll < 0.92) type = 'mature';
          else type = 'emergent';

          scaleY = 0.78 + rnd() * 0.3;
          scaleXZ = 0.78 + rnd() * 0.25;
        }
      }

      const y = this.getTerrainHeight(x, z);
      const rotY = rnd() * Math.PI * 2;

      dummy.position.set(x, y, z);
      dummy.scale.set(scaleXZ, scaleY, scaleXZ);
      dummy.rotation.set(0, rotY, 0);
      dummy.updateMatrix();

      this.trunkMesh.setMatrixAt(trunkIdx++, dummy.matrix);

      let targetMesh, instSubIdx, archetypeHeight, crownRadius, targetBiomassColor;

      if (type === 'regen') {
        targetMesh = this.canopyMeshRegen;
        instSubIdx = regenIdx++;
        archetypeHeight = 5.2 * scaleY;
        crownRadius = 1.2 * scaleXZ;
        targetBiomassColor = this.colorBiomassRegen;
      } else if (type === 'mid') {
        targetMesh = this.canopyMeshMid;
        instSubIdx = midIdx++;
        archetypeHeight = 9.2 * scaleY;
        crownRadius = 1.9 * scaleXZ;
        targetBiomassColor = this.colorBiomassMid;
      } else if (type === 'mature') {
        targetMesh = this.canopyMeshMature;
        instSubIdx = matureIdx++;
        archetypeHeight = 13.5 * scaleY;
        crownRadius = 2.6 * scaleXZ;
        targetBiomassColor = this.colorBiomassMature;
      } else {
        targetMesh = this.canopyMeshEmergent;
        instSubIdx = emergentIdx++;
        archetypeHeight = 17.5 * scaleY;
        crownRadius = 3.4 * scaleXZ;
        targetBiomassColor = this.colorBiomassEmergent;
      }

      targetMesh.setMatrixAt(instSubIdx, dummy.matrix);

      const indNaturalColor = this.colorNatural.clone().offsetHSL(
        (rnd() - 0.5) * 0.08,
        (rnd() - 0.5) * 0.12,
        (rnd() - 0.5) * 0.08
      );
      targetMesh.setColorAt(instSubIdx, indNaturalColor);

      this.treeRecords.push({
        position: new THREE.Vector3(x, y, z),
        type,
        height: archetypeHeight,
        radius: crownRadius,
        targetMesh,
        instSubIdx,
        naturalColor: indNaturalColor,
        biomassColor: targetBiomassColor
      });
    }

    this.trunkMesh.instanceMatrix.needsUpdate = true;
    this.canopyMeshRegen.instanceMatrix.needsUpdate = true;
    this.canopyMeshMid.instanceMatrix.needsUpdate = true;
    this.canopyMeshMature.instanceMatrix.needsUpdate = true;
    this.canopyMeshEmergent.instanceMatrix.needsUpdate = true;

    if (this.canopyMeshRegen.instanceColor) this.canopyMeshRegen.instanceColor.needsUpdate = true;
    if (this.canopyMeshMid.instanceColor) this.canopyMeshMid.instanceColor.needsUpdate = true;
    if (this.canopyMeshMature.instanceColor) this.canopyMeshMature.instanceColor.needsUpdate = true;
    if (this.canopyMeshEmergent.instanceColor) this.canopyMeshEmergent.instanceColor.needsUpdate = true;

    this.scene.add(this.trunkMesh);
    this.scene.add(this.canopyMeshRegen);
    this.scene.add(this.canopyMeshMid);
    this.scene.add(this.canopyMeshMature);
    this.scene.add(this.canopyMeshEmergent);
  }

  /* ─────────────────────────────────────────────────────────────
     L2 — UAV SURVEY DRONE & SUBTLE LASER RAYS (CHÚM TIA QUÉT)
  ───────────────────────────────────────────────────────────── */
  buildL2UAVAndLaser(isMobile) {
    this.uavGroup = new THREE.Group();

    // Drone Fuselage (Industrial survey drone silhouette, matte carbon finish)
    const bodyGeom = new THREE.BoxGeometry(1.2, 0.4, 1.5);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x161e28,
      roughness: 0.5,
      metalness: 0.5
    });
    const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
    this.uavGroup.add(bodyMesh);

    // 4 Diagonal Motor Arms
    const armMat = new THREE.MeshStandardMaterial({ color: 0x0a0e14, roughness: 0.8 });
    const armGeom = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 6);
    armGeom.rotateZ(Math.PI / 4);

    const arm1 = new THREE.Mesh(armGeom, armMat);
    arm1.position.set(0, 0.08, 0);
    this.uavGroup.add(arm1);

    const arm2 = arm1.clone();
    arm2.rotation.y = Math.PI / 2;
    this.uavGroup.add(arm2);

    // 4 Rotors
    const rotorGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.03, 8);
    const rotorMat = new THREE.MeshBasicMaterial({ color: 0x2e4252, transparent: true, opacity: 0.8 });
    const rOffsets = [[0.65, 0.65], [-0.65, 0.65], [0.65, -0.65], [-0.65, -0.65]];
    rOffsets.forEach(([rx, rz]) => {
      const rot = new THREE.Mesh(rotorGeom, rotorMat);
      rot.position.set(rx, 0.22, rz);
      this.uavGroup.add(rot);
    });

    // Gimbal LiDAR Sensor Pod (Prominent spherical pod with cyan sensor lens)
    const sensorGeom = new THREE.SphereGeometry(0.32, 10, 10);
    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x006680,
      emissiveIntensity: 0.4
    });
    this.sensorMesh = new THREE.Mesh(sensorGeom, sensorMat);
    this.sensorMesh.position.set(0, -0.35, 0.15);
    this.uavGroup.add(this.sensorMesh);

    // Status Navigation LED
    const ledGeom = new THREE.SphereGeometry(0.1, 8, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const ledMesh = new THREE.Mesh(ledGeom, ledMat);
    ledMesh.position.set(0, 0.24, -0.7);
    this.uavGroup.add(ledMesh);

    // Position UAV in upper-right survey quadrant (precisely within camera frustum)
    this.uavBasePos = isMobile
      ? new THREE.Vector3(7.0, 10.5, 3.0)
      : new THREE.Vector3(8.5, 11.5, 3.0);
    this.uavGroup.position.copy(this.uavBasePos);
    this.scene.add(this.uavGroup);

    // 12 Thin Laser Rays (radiating downward into canopy from sensor)
    const rayCount = isMobile ? 8 : 12;
    const rayPoints = [];

    for (let r = 0; r < rayCount; r++) {
      rayPoints.push(new THREE.Vector3(0, -0.35, 0.15));
      const angle = (r / rayCount) * Math.PI * 2;
      const dist = 3.5 + (r % 3) * 2.5;
      const targetX = Math.cos(angle) * dist - 8.5;
      const targetZ = Math.sin(angle) * (dist * 0.7) - 4.5;
      const targetY = -9.5;
      rayPoints.push(new THREE.Vector3(targetX, targetY, targetZ));
    }

    const rayGeom = new THREE.BufferGeometry().setFromPoints(rayPoints);
    this.laserRayMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      linewidth: 1
    });
    this.laserRays = new THREE.LineSegments(rayGeom, this.laserRayMat);
    this.uavGroup.add(this.laserRays);

    // Dynamic Laser Footprint on ground
    const footprintPts = [];
    const footprintWidth = 16;
    for (let i = 0; i <= 26; i++) {
      footprintPts.push(new THREE.Vector3((i / 26 - 0.5) * footprintWidth, 0, 0));
    }
    const footprintGeom = new THREE.BufferGeometry().setFromPoints(footprintPts);
    this.laserFootprintMat = new THREE.LineBasicMaterial({
      color: 0x3dd6b5,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    this.laserFootprint = new THREE.Line(footprintGeom, this.laserFootprintMat);
    this.scene.add(this.laserFootprint);
  }

  /* ─────────────────────────────────────────────────────────────
     L2 — SPATIALLY ANCHORED LiDAR POINT CLOUD
  ───────────────────────────────────────────────────────────── */
  buildL2LidarPointCloud(isMobile) {
    const totalPoints = isMobile ? 750 : 2400;
    this.lidarGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);

    const cGround = new THREE.Color(0x245a70);
    const cTrunk = new THREE.Color(0x00e5ff);
    const cCanopy = new THREE.Color(0x4dedc8);
    const cApex = new THREE.Color(0xffd952);

    let seed = 71829;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    let idx = 0;
    const treeCount = this.treeRecords.length;

    for (let i = 0; i < totalPoints; i++) {
      const tree = this.treeRecords[i % treeCount];
      const roll = rnd();
      let lx, ly, lz, col;

      if (roll < 0.35) {
        const ang = rnd() * Math.PI * 2;
        const r = rnd() * tree.radius * 1.3;
        lx = tree.position.x + Math.cos(ang) * r;
        lz = tree.position.z + Math.sin(ang) * r;
        ly = this.getTerrainHeight(lx, lz) + 0.05 + rnd() * 0.15;
        col = cGround;
      } else if (roll < 0.60) {
        const hFrac = 0.15 + rnd() * 0.45;
        lx = tree.position.x + (rnd() - 0.5) * 0.25;
        lz = tree.position.z + (rnd() - 0.5) * 0.25;
        ly = tree.position.y + hFrac * tree.height;
        col = cTrunk;
      } else if (roll < 0.92) {
        const ang = rnd() * Math.PI * 2;
        const hFrac = 0.40 + rnd() * 0.50;
        const crownR = tree.radius * Math.sin(hFrac * Math.PI) * (0.35 + rnd() * 0.65);
        lx = tree.position.x + Math.cos(ang) * crownR;
        lz = tree.position.z + Math.sin(ang) * crownR;
        ly = tree.position.y + hFrac * tree.height;
        col = hFrac > 0.72 ? cCanopy : cTrunk;
      } else {
        lx = tree.position.x + (rnd() - 0.5) * 0.3;
        lz = tree.position.z + (rnd() - 0.5) * 0.3;
        ly = tree.position.y + (0.92 + rnd() * 0.1) * tree.height;
        col = cApex;
      }

      positions[idx * 3 + 0] = lx;
      positions[idx * 3 + 1] = ly;
      positions[idx * 3 + 2] = lz;

      colors[idx * 3 + 0] = col.r;
      colors[idx * 3 + 1] = col.g;
      colors[idx * 3 + 2] = col.b;
      idx++;
    }

    this.lidarGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.lidarGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.lidarMat = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.15,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      depthWrite: false
    });
    this.lidarPoints = new THREE.Points(this.lidarGeom, this.lidarMat);
    this.scene.add(this.lidarPoints);
  }

  /* ─────────────────────────────────────────────────────────────
     L4 — IRREGULAR GIS CADASTRAL CARBON PARCELS & CHOROPLETH
  ───────────────────────────────────────────────────────────── */
  buildL4CarbonParcels(isMobile) {
    this.parcelGroup = new THREE.Group();

    const parcelDefs = [
      {
        name: 'Lô 01 - Rừng Cổ Thụ Giàu',
        density: 'Cao (>220 tCO2e/ha)',
        color: 0x6e5620,
        lineColor: 0xdca638,
        poly: [[-14, -10], [-4, -13], [3, -11], [5, -4], [-3, -3], [-12, -4]]
      },
      {
        name: 'Lô 02 - Rừng Tự Nhiên Trung Bình',
        density: 'Trung bình (145 tCO2e/ha)',
        color: 0x1a5242,
        lineColor: 0x3dd6b5,
        poly: [[-3, -3], [5, -4], [14, -5], [15, 5], [6, 6], [-1, 4]]
      },
      {
        name: 'Lô 03 - Rừng Tái Sinh',
        density: 'Thấp (<80 tCO2e/ha)',
        color: 0x0e3840,
        lineColor: 0x00c4e8,
        poly: [[-12, -4], [-1, 4], [6, 6], [8, 14], [-3, 15], [-13, 10]]
      },
      {
        name: 'Lô 04 - Đai Bảo Tồn Đầu Nguồn',
        density: 'Cao (195 tCO2e/ha)',
        color: 0x5a5426,
        lineColor: 0xc49c38,
        poly: [[6, 6], [15, 5], [17, 13], [8, 14]]
      }
    ];

    const activeParcels = isMobile ? [parcelDefs[1]] : parcelDefs;

    activeParcels.forEach(p => {
      const linePts = [];
      const pts = p.poly;
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];
        const p2 = pts[(i + 1) % pts.length];
        const steps = 8;
        for (let s = 0; s < steps; s++) {
          const frac = s / steps;
          const x = p1[0] * (1 - frac) + p2[0] * frac;
          const z = p1[1] * (1 - frac) + p2[1] * frac;
          const y = this.getTerrainHeight(x, z) + 0.12;
          linePts.push(new THREE.Vector3(x, y, z));
        }
      }
      linePts.push(linePts[0].clone());

      const bGeom = new THREE.BufferGeometry().setFromPoints(linePts);
      const bMat = new THREE.LineBasicMaterial({
        color: p.lineColor,
        transparent: true,
        opacity: 0.0,
        linewidth: 1
      });
      const bLine = new THREE.Line(bGeom, bMat);
      this.parcelGroup.add(bLine);

      const shape = new THREE.Shape();
      pts.forEach((pt, i) => {
        if (i === 0) shape.moveTo(pt[0], pt[1]);
        else shape.lineTo(pt[0], pt[1]);
      });
      shape.closePath();

      const drapeGeom = new THREE.ShapeGeometry(shape);
      drapeGeom.rotateX(-Math.PI / 2);

      const dPos = drapeGeom.attributes.position;
      for (let i = 0; i < dPos.count; i++) {
        const x = dPos.getX(i);
        const z = dPos.getZ(i);
        dPos.setY(i, this.getTerrainHeight(x, z) + 0.08);
      }
      drapeGeom.computeVertexNormals();

      const drapeMat = new THREE.MeshBasicMaterial({
        color: p.color,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const drapeMesh = new THREE.Mesh(drapeGeom, drapeMat);
      this.parcelGroup.add(drapeMesh);
    });

    this.scene.add(this.parcelGroup);
  }

  /* ─────────────────────────────────────────────────────────────
     4-STAGE DATA STORYTELLING ANIMATION ENGINE
  ───────────────────────────────────────────────────────────── */
  setStoryTime(seconds) {
    this.forcedTime = seconds;
    this.updateStoryProgression(seconds);
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  updateStoryProgression(elapsed) {
    if (this.options.reducedMotion) return;

    const t = elapsed % this.CYCLE_DURATION;

    // A. UAV Gentle Cruising
    if (this.uavGroup) {
      const droneBob = Math.sin(elapsed * 1.2) * 0.15;
      const droneSway = Math.cos(elapsed * 0.6) * 0.25;
      this.uavGroup.position.set(
        this.uavBasePos.x + droneSway,
        this.uavBasePos.y + droneBob,
        this.uavBasePos.z
      );
    }

    // B. State Transition Evaluator
    let lidarTargetOpacity = 0.30;
    let laserRaysTargetOpacity = 0.0;
    let footprintTargetOpacity = 0.0;
    let biomassBlendFactor = 0.0;
    let parcelTargetOpacity = 0.0;

    if (t < 6.0) {
      // STATE 1: Natural Forest
      lidarTargetOpacity = 0.30;
      laserRaysTargetOpacity = 0.0;
      footprintTargetOpacity = 0.0;
      biomassBlendFactor = 0.0;
      parcelTargetOpacity = 0.0;
    } else if (t < 12.0) {
      // STATE 2: UAV LiDAR Active Survey Sweep
      const alpha = (t - 6.0) / 6.0;
      const ease = 0.5 - 0.5 * Math.cos(alpha * Math.PI);
      lidarTargetOpacity = 0.30 + ease * 0.55;
      laserRaysTargetOpacity = Math.sin(alpha * Math.PI) * 0.70;
      footprintTargetOpacity = Math.sin(alpha * Math.PI) * 0.85;
      biomassBlendFactor = 0.0;
      parcelTargetOpacity = 0.0;

      if (this.laserFootprint) {
        const sweepZ = -10.0 + alpha * 18.0;
        const sweepX = Math.sin(elapsed * 0.8) * 3.5;
        this.laserFootprint.position.set(sweepX, 0, sweepZ);
        const fPos = this.laserFootprint.geometry.attributes.position;
        for (let i = 0; i < fPos.count; i++) {
          const fx = fPos.getX(i) + sweepX;
          const fz = sweepZ;
          fPos.setY(i, this.getTerrainHeight(fx, fz) + 0.12);
        }
        fPos.needsUpdate = true;
      }
    } else if (t < 17.0) {
      // STATE 3: Biomass Structure Quantification
      const alpha = (t - 12.0) / 5.0;
      const ease = 0.5 - 0.5 * Math.cos(alpha * Math.PI);
      lidarTargetOpacity = 0.75 - ease * 0.25;
      laserRaysTargetOpacity = 0.0;
      footprintTargetOpacity = 0.0;
      biomassBlendFactor = ease;
      parcelTargetOpacity = 0.0;
    } else if (t < 22.0) {
      // STATE 4: Cadastral Carbon Mapping
      const alpha = (t - 17.0) / 5.0;
      const ease = 0.5 - 0.5 * Math.cos(alpha * Math.PI);
      lidarTargetOpacity = 0.40;
      laserRaysTargetOpacity = 0.0;
      footprintTargetOpacity = 0.0;
      biomassBlendFactor = 1.0;
      parcelTargetOpacity = Math.min(1.0, ease * 1.5);
    } else {
      // RESET: Transition back to Natural Forest
      const alpha = (t - 22.0) / 2.0;
      const ease = 0.5 - 0.5 * Math.cos(alpha * Math.PI);
      lidarTargetOpacity = 0.40 * (1 - ease) + 0.30 * ease;
      laserRaysTargetOpacity = 0.0;
      footprintTargetOpacity = 0.0;
      biomassBlendFactor = 1.0 - ease;
      parcelTargetOpacity = 1.0 - ease;
    }

    if (this.lidarMat) this.lidarMat.opacity = lidarTargetOpacity;
    if (this.laserRayMat) this.laserRayMat.opacity = laserRaysTargetOpacity;
    if (this.laserFootprintMat) this.laserFootprintMat.opacity = footprintTargetOpacity;

    // P1-03: Only upload instanceColor to GPU when biomassBlendFactor actually changes
    const blendChanged = Math.abs(biomassBlendFactor - (this._lastBiomassBlend ?? -1)) > 0.001;
    if (blendChanged) {
      this._lastBiomassBlend = biomassBlendFactor;
      for (let i = 0; i < this.treeRecords.length; i++) {
        const rec = this.treeRecords[i];
        const blendedColor = rec.naturalColor.clone().lerp(rec.biomassColor, biomassBlendFactor);
        rec.targetMesh.setColorAt(rec.instSubIdx, blendedColor);
      }
      if (this.canopyMeshRegen.instanceColor) this.canopyMeshRegen.instanceColor.needsUpdate = true;
      if (this.canopyMeshMid.instanceColor) this.canopyMeshMid.instanceColor.needsUpdate = true;
      if (this.canopyMeshMature.instanceColor) this.canopyMeshMature.instanceColor.needsUpdate = true;
      if (this.canopyMeshEmergent.instanceColor) this.canopyMeshEmergent.instanceColor.needsUpdate = true;
    }

    if (this.parcelGroup) {
      this.parcelGroup.children.forEach(child => {
        if (child instanceof THREE.Line) {
          child.material.opacity = parcelTargetOpacity * 0.75;
        } else if (child instanceof THREE.Mesh) {
          child.material.opacity = parcelTargetOpacity * 0.32;
        }
      });
    }
  }

  setupPointerInteraction() {
    this.onPointerMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      this.mouse.targetX = nx * 0.8;
      this.mouse.targetY = ny * 0.5;
    };
    this.container.addEventListener('pointermove', this.onPointerMove, { passive: true });
  }

  applyReducedMotionState() {
    this.camera.position.copy(this.cameraBasePos);
    this.camera.lookAt(this.cameraTarget);

    if (this.lidarMat) this.lidarMat.opacity = 0.50;
    if (this.laserRayMat) this.laserRayMat.opacity = 0.0;
    if (this.laserFootprintMat) this.laserFootprintMat.opacity = 0.0;

    if (this.parcelGroup) {
      this.parcelGroup.children.forEach(child => {
        if (child instanceof THREE.Line) child.material.opacity = 0.65;
        else if (child instanceof THREE.Mesh) child.material.opacity = 0.28;
      });
    }
  }

  setupVisibilityObserver() {
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
      if (this.isVisible && !this.animationFrameId && !this.options.reducedMotion) {
        this.animate();
      }
    }, { threshold: 0.05 });

    this.intersectionObserver.observe(this.container);
  }

  resize() {
    if (!this.renderer || !this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight || 340;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  animate() {
    if (this.isDisposed || !this.isVisible || this.options.reducedMotion) {
      this.animationFrameId = null;
      return;
    }

    const elapsed = this.forcedTime !== null ? this.forcedTime : this.clock.getElapsedTime();

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    const ambientDriftX = Math.sin(elapsed * 0.15) * 0.5 + this.mouse.x;
    const ambientDriftZ = Math.cos(elapsed * 0.12) * 0.35 + this.mouse.y;

    this.camera.position.set(
      this.cameraBasePos.x + ambientDriftX,
      this.cameraBasePos.y + this.mouse.y * 0.25,
      this.cameraBasePos.z + ambientDriftZ
    );
    this.camera.lookAt(this.cameraTarget);

    this.updateStoryProgression(elapsed);

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  dispose() {
    this.isDisposed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.onPointerMove) {
      this.container.removeEventListener('pointermove', this.onPointerMove);
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }

    if (this.terrainGeom) this.terrainGeom.dispose();
    if (this.terrainMat) this.terrainMat.dispose();
    if (this.contourLines && this.contourLines.geometry) {
      this.contourLines.geometry.dispose();
      this.contourMat.dispose();
    }
    if (this.trunkGeom) this.trunkGeom.dispose();
    if (this.trunkMat) this.trunkMat.dispose();
    if (this.canopyGeomRegen) this.canopyGeomRegen.dispose();
    if (this.canopyGeomMid) this.canopyGeomMid.dispose();
    if (this.canopyGeomMature) this.canopyGeomMature.dispose();
    if (this.canopyGeomEmergent) this.canopyGeomEmergent.dispose();
    if (this.foliageMat) this.foliageMat.dispose();

    if (this.lidarGeom) this.lidarGeom.dispose();
    if (this.lidarMat) this.lidarMat.dispose();

    if (this.uavGroup) {
      this.uavGroup.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }

    if (this.laserFootprint && this.laserFootprint.geometry) {
      this.laserFootprint.geometry.dispose();
      this.laserFootprintMat.dispose();
    }

    if (this.parcelGroup) {
      this.parcelGroup.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}
