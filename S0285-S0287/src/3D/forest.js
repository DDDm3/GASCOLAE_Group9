/**
 * src/3d/forest.js
 * Instanced Canopy Trees & Ground Truth Calibration Plots
 */
import * as THREE from 'three';

export class ForestManager {
  constructor(scene, terrain, options = {}) {
    this.scene = scene;
    this.terrain = terrain;
    this.count = options.count || 380;
    this.currentState = 'A';

    this.initGroundTruthPlots();
    this.initTrees();
  }

  initTrees() {
    // Low-poly stylized coniferous/deciduous canopy
    // Tiered cone geometry for clear visual canopy layering
    const trunkGeom = new THREE.CylinderGeometry(0.15, 0.25, 2.0, 5);
    trunkGeom.translate(0, 1.0, 0);

    const foliage1 = new THREE.ConeGeometry(1.6, 3.2, 5);
    foliage1.translate(0, 3.2, 0);

    const foliage2 = new THREE.ConeGeometry(1.1, 2.4, 5);
    foliage2.translate(0, 4.8, 0);

    // Merge into single tree geometry
    // Note: We can also use a simple cone for maximum performance
    this.treeGeom = new THREE.ConeGeometry(1.4, 4.5, 6);
    this.treeGeom.translate(0, 2.25, 0);

    this.material = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95
    });

    this.instancedMesh = new THREE.InstancedMesh(this.treeGeom, this.material, this.count);
    this.instancedMesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);

    this.treeData = [];
    const dummy = new THREE.Object3D();
    const half = this.terrain.size / 2 - 4;

    // Deterministic pseudo-random placement
    let seed = 9285;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < this.count; i++) {
      const x = (rnd() - 0.5) * 2 * half;
      const z = (rnd() - 0.5) * 2 * half;
      const y = this.terrain.getElevation(x, z);

      // Random scale for realistic tree height variation (6m - 16m)
      const scaleY = 0.7 + rnd() * 0.9;
      const scaleXZ = 0.7 + rnd() * 0.6;
      const rotY = rnd() * Math.PI * 2;

      dummy.position.set(x, y, z);
      dummy.scale.set(scaleXZ, scaleY, scaleXZ);
      dummy.rotation.set(0, rotY, 0);
      dummy.updateMatrix();

      this.instancedMesh.setMatrixAt(i, dummy.matrix);

      // Store attributes for dynamic state coloring
      const treeHeight = 4.5 * scaleY;
      const heightNorm = Math.min(1, Math.max(0, (treeHeight - 3) / 6)); // normalized 0..1
      const parcel = this.terrain.getParcelAtPoint(new THREE.Vector3(x, 0, z));
      const biomassRel = (parcel ? parcel.agbTonnesPerHa / 200 : 0.5) * (0.8 + rnd() * 0.4);

      this.treeData.push({
        position: new THREE.Vector3(x, y, z),
        height: treeHeight,
        heightNorm,
        biomassRel: Math.min(1, biomassRel),
        parcelId: parcel ? parcel.id : 1
      });
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
    this.updateTreeColors('A');
    this.scene.add(this.instancedMesh);
  }

  initGroundTruthPlots() {
    // 4 Ground-truth calibration plots with white wireframe boundaries
    this.plotGroup = new THREE.Group();
    const plotPositions = [
      { x: -18, z: -15 },
      { x: 12, z: -20 },
      { x: -6, z: 10 },
      { x: 22, z: 15 }
    ];

    const boxGeom = new THREE.BoxGeometry(4.5, 0.4, 4.5);
    const edgesGeom = new THREE.EdgesGeometry(boxGeom);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    const fillMat = new THREE.MeshBasicMaterial({ color: 0x00c4e8, transparent: true, opacity: 0.25 });

    plotPositions.forEach((pos, idx) => {
      const y = this.terrain.getElevation(pos.x, pos.z) + 0.2;
      const plotNode = new THREE.Group();
      plotNode.position.set(pos.x, y, pos.z);

      const fillMesh = new THREE.Mesh(boxGeom, fillMat);
      const edgeLines = new THREE.LineSegments(edgesGeom, lineMat);
      plotNode.add(fillMesh);
      plotNode.add(edgeLines);

      this.plotGroup.add(plotNode);
    });

    this.plotGroup.visible = false; // Visible in States C and D
    this.scene.add(this.plotGroup);
  }

  updateTreeColors(stateKey) {
    this.currentState = stateKey;
    const color = new THREE.Color();

    for (let i = 0; i < this.count; i++) {
      const data = this.treeData[i];

      if (stateKey === 'A' || stateKey === 'B') {
        // Natural forest greens
        color.setHSL(0.38, 0.45, 0.14 + data.heightNorm * 0.08);
      } else if (stateKey === 'C') {
        // CHM Height Gradient: #1a3a4a -> #00c4e8 -> #3dd6b5 -> #f5c94e
        if (data.heightNorm < 0.25) {
          color.setHex(0x1a3a4a);
        } else if (data.heightNorm < 0.6) {
          color.setHex(0x00c4e8);
        } else if (data.heightNorm < 0.85) {
          color.setHex(0x3dd6b5);
        } else {
          color.setHex(0xf5c94e);
        }
      } else if (stateKey === 'D') {
        // Biomass AGB Density Gradient: #00c4e8 -> #7be36a -> #f5c94e -> #f07030
        if (data.biomassRel < 0.25) {
          color.setHex(0x00c4e8);
        } else if (data.biomassRel < 0.55) {
          color.setHex(0x7be36a);
        } else if (data.biomassRel < 0.8) {
          color.setHex(0xf5c94e);
        } else {
          color.setHex(0xf07030);
        }
      } else if (stateKey === 'E') {
        // Dim trees so parcel map is visible
        color.setHSL(0.58, 0.3, 0.12);
      }

      this.instancedMesh.setColorAt(i, color);
    }

    if (this.instancedMesh.instanceColor) {
      this.instancedMesh.instanceColor.needsUpdate = true;
    }

    // Toggle plot markers visibility
    if (this.plotGroup) this.plotGroup.visible = (stateKey === 'C' || stateKey === 'D');
  }

  setState(stateKey) {
    this.updateTreeColors(stateKey);
    this.material.opacity = (stateKey === 'E') ? 0.35 : 0.95;
  }

  setInterpolatedProgress(progress) {
    if (progress < 0.25) {
      this.updateTreeColors('A');
      this.material.opacity = 0.95;
    } else if (progress < 0.5) {
      this.updateTreeColors('B');
      this.material.opacity = 0.95;
    } else if (progress < 0.7) {
      this.updateTreeColors('C');
      this.material.opacity = 0.95;
    } else if (progress < 0.85) {
      this.updateTreeColors('D');
      this.material.opacity = 0.95;
    } else {
      this.updateTreeColors('E');
      this.material.opacity = 0.95 - (progress - 0.85) * 4.0 * 0.6;
    }
  }

  dispose() {
    this.treeGeom.dispose();
    this.material.dispose();
    this.scene.remove(this.instancedMesh);
    this.plotGroup.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
    this.scene.remove(this.plotGroup);
  }
}
