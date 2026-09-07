/**
 * src/3d/carbon-layer.js
 * UAV LiDAR Scanning Beam & 3D Point Cloud Representation
 */
import * as THREE from 'three';

export class CarbonLayerManager {
  constructor(scene, terrain, forest, options = {}) {
    this.scene = scene;
    this.terrain = terrain;
    this.forest = forest;
    this.pointCount = options.pointCount || 45000;
    this.currentState = 'A';

    this.initPointCloud();
    this.initUav();
  }

  initPointCloud() {
    this.pointGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(this.pointCount * 3);
    const colors = new Float32Array(this.pointCount * 3);
    const colorsCHM = new Float32Array(this.pointCount * 3);
    const colorsAGB = new Float32Array(this.pointCount * 3);

    const half = this.terrain.size / 2 - 3;
    let seed = 4821;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const cCHM = new THREE.Color();
    const cAGB = new THREE.Color();

    for (let i = 0; i < this.pointCount; i++) {
      const x = (rnd() - 0.5) * 2 * half;
      const z = (rnd() - 0.5) * 2 * half;
      const groundY = this.terrain.getElevation(x, z);

      // 70% canopy returns (stratified above ground), 30% ground returns
      const isCanopy = rnd() < 0.72;
      const heightAboveGround = isCanopy ? (0.8 + rnd() * 9.5) : (rnd() * 0.3);
      const y = groundY + heightAboveGround;

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // CHM coloring (height normalized 0..10m)
      const hNorm = Math.min(1, heightAboveGround / 10.0);
      if (hNorm < 0.1) {
        cCHM.setHex(0x1a3a4a); // ground/near-ground
      } else if (hNorm < 0.45) {
        cCHM.setHex(0x00c4e8); // lower canopy
      } else if (hNorm < 0.8) {
        cCHM.setHex(0x3dd6b5); // mid/upper canopy
      } else {
        cCHM.setHex(0xf5c94e); // emergent peaks
      }

      colorsCHM[i * 3 + 0] = cCHM.r;
      colorsCHM[i * 3 + 1] = cCHM.g;
      colorsCHM[i * 3 + 2] = cCHM.b;

      // AGB Biomass coloring
      const p = this.terrain.getParcelAtPoint(new THREE.Vector3(x, 0, z));
      const bioRel = p ? (p.agbTonnesPerHa / 200.0) : 0.4;
      if (bioRel < 0.25) {
        cAGB.setHex(0x00c4e8);
      } else if (bioRel < 0.55) {
        cAGB.setHex(0x7be36a);
      } else if (bioRel < 0.8) {
        cAGB.setHex(0xf5c94e);
      } else {
        cAGB.setHex(0xf07030);
      }

      colorsAGB[i * 3 + 0] = cAGB.r;
      colorsAGB[i * 3 + 1] = cAGB.g;
      colorsAGB[i * 3 + 2] = cAGB.b;

      // Default initial color (State A: muted cyan/white points)
      colors[i * 3 + 0] = 0.0;
      colors[i * 3 + 1] = 0.77;
      colors[i * 3 + 2] = 0.91;
    }

    this.pointGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.pointGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.pointGeom.setAttribute('colorCHM', new THREE.BufferAttribute(colorsCHM, 3));
    this.pointGeom.setAttribute('colorAGB', new THREE.BufferAttribute(colorsAGB, 3));

    this.pointMaterial = new THREE.PointsMaterial({
      size: 0.22,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.0, // hidden in State A
      depthWrite: false
    });

    this.points = new THREE.Points(this.pointGeom, this.pointMaterial);
    this.scene.add(this.points);
  }

  initUav() {
    this.uavGroup = new THREE.Group();

    // Central UAV pod
    const bodyGeom = new THREE.BoxGeometry(1.6, 0.4, 1.6);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e3040, metalness: 0.8, roughness: 0.2 });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    this.uavGroup.add(body);

    // Sensor unit (LiDAR puck)
    const sensorGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 12);
    const sensorMat = new THREE.MeshStandardMaterial({ color: 0x00c4e8, metalness: 0.9, roughness: 0.1 });
    const sensor = new THREE.Mesh(sensorGeom, sensorMat);
    sensor.position.y = -0.3;
    this.uavGroup.add(sensor);

    // 4 arms & rotor discs
    const armMat = new THREE.MeshBasicMaterial({ color: 0x4e7a9a });
    const rotorMat = new THREE.MeshBasicMaterial({ color: 0x00c4e8, transparent: true, opacity: 0.6 });
    const rotorGeom = new THREE.CircleGeometry(0.8, 12);
    rotorGeom.rotateX(-Math.PI / 2);

    const offsets = [
      [1.4, 1.4], [-1.4, 1.4], [1.4, -1.4], [-1.4, -1.4]
    ];
    offsets.forEach(([ox, oz]) => {
      const armGeom = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 6);
      armGeom.rotateZ(Math.PI / 2);
      armGeom.lookAt(ox, 0, oz);
      const arm = new THREE.Mesh(armGeom, armMat);
      arm.position.set(ox * 0.5, 0, oz * 0.5);
      this.uavGroup.add(arm);

      const rotor = new THREE.Mesh(rotorGeom, rotorMat);
      rotor.position.set(ox, 0.2, oz);
      this.uavGroup.add(rotor);
    });

    // Conical sweeping LiDAR beam
    const beamGeom = new THREE.ConeGeometry(9.0, 18.0, 16, 1, true);
    beamGeom.translate(0, -9.0, 0);
    this.beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x00c4e8,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.lidarBeam = new THREE.Mesh(beamGeom, this.beamMaterial);
    this.uavGroup.add(this.lidarBeam);

    this.uavAltitude = 22.0;
    this.uavGroup.position.set(0, this.uavAltitude, 0);
    this.uavGroup.visible = false; // visible in State B
    this.scene.add(this.uavGroup);

    this.flightTime = 0;
  }

  update(deltaTime) {
    if (this.uavGroup.visible) {
      this.flightTime += deltaTime * 0.6;
      // Smooth survey sweep trajectory (Lissajous/figure-8)
      const x = Math.sin(this.flightTime) * 22.0;
      const z = Math.cos(this.flightTime * 0.6) * 18.0;
      this.uavGroup.position.x = x;
      this.uavGroup.position.z = z;

      // Slight banking
      this.uavGroup.rotation.z = -Math.cos(this.flightTime) * 0.12;
      this.uavGroup.rotation.x = Math.sin(this.flightTime * 0.6) * 0.12;
    }
  }

  setState(stateKey) {
    this.currentState = stateKey;
    const colors = this.pointGeom.attributes.color.array;
    const chm = this.pointGeom.attributes.colorCHM.array;
    const agb = this.pointGeom.attributes.colorAGB.array;

    if (stateKey === 'A') {
      this.pointMaterial.opacity = 0.0;
      this.uavGroup.visible = false;
    } else if (stateKey === 'B') {
      this.pointMaterial.opacity = 0.75;
      this.uavGroup.visible = true;
      for (let i = 0; i < colors.length; i++) {
        colors[i] = chm[i];
      }
      this.pointGeom.attributes.color.needsUpdate = true;
    } else if (stateKey === 'C') {
      this.pointMaterial.opacity = 0.9;
      this.uavGroup.visible = false;
      for (let i = 0; i < colors.length; i++) {
        colors[i] = chm[i];
      }
      this.pointGeom.attributes.color.needsUpdate = true;
    } else if (stateKey === 'D') {
      this.pointMaterial.opacity = 0.9;
      this.uavGroup.visible = false;
      for (let i = 0; i < colors.length; i++) {
        colors[i] = agb[i];
      }
      this.pointGeom.attributes.color.needsUpdate = true;
    } else if (stateKey === 'E') {
      this.pointMaterial.opacity = 0.25;
      this.uavGroup.visible = false;
      for (let i = 0; i < colors.length; i++) {
        colors[i] = agb[i];
      }
      this.pointGeom.attributes.color.needsUpdate = true;
    }
  }

  setInterpolatedProgress(progress) {
    // Progressive state handling based on scroll
    if (progress < 0.15) {
      this.setState('A');
    } else if (progress < 0.4) {
      this.setState('B');
      this.pointMaterial.opacity = Math.min(0.85, (progress - 0.15) * 4.0);
    } else if (progress < 0.65) {
      this.setState('C');
    } else if (progress < 0.85) {
      this.setState('D');
    } else {
      this.setState('E');
    }
  }

  dispose() {
    this.pointGeom.dispose();
    this.pointMaterial.dispose();
    this.scene.remove(this.points);

    this.uavGroup.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
    this.scene.remove(this.uavGroup);
  }
}
