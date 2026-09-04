/**
 * src/3d/terrain.js
 * Digital Terrain Model (DTM), Parcel Partitioning & Choropleth Map
 */
import * as THREE from 'three';

export const PARCELS_DATA = [
  {
    id: 1,
    name: 'Lô 01 / Khoảnh 1',
    forestType: 'Rừng tự nhiên giàu (Trạng thái IIIA2)',
    areaHa: 14.8,
    agbTonnesPerHa: 184.2,
    carbonCO2ePerHa: 168.5,
    totalCO2e: 2494,
    r2: 0.88,
    rmsePct: 11.2,
    colorHex: 0xf07030 // Highest carbon - warm orange
  },
  {
    id: 2,
    name: 'Lô 02 / Khoảnh 1',
    forestType: 'Rừng tự nhiên trung bình (Trạng thái IIIA1)',
    areaHa: 18.5,
    agbTonnesPerHa: 132.0,
    carbonCO2ePerHa: 120.8,
    totalCO2e: 2235,
    r2: 0.86,
    rmsePct: 12.4,
    colorHex: 0xf5c94e // High carbon - amber
  },
  {
    id: 3,
    name: 'Lô 03 / Khoảnh 2',
    forestType: 'Rừng hỗn giao tre nứa gỗ',
    areaHa: 12.2,
    agbTonnesPerHa: 76.5,
    carbonCO2ePerHa: 70.0,
    totalCO2e: 854,
    r2: 0.84,
    rmsePct: 13.5,
    colorHex: 0x7be36a // Medium carbon - lime
  },
  {
    id: 4,
    name: 'Lô 04 / Khoảnh 2',
    forestType: 'Rừng phục hồi sau nương rẫy',
    areaHa: 16.0,
    agbTonnesPerHa: 48.0,
    carbonCO2ePerHa: 43.9,
    totalCO2e: 702,
    r2: 0.82,
    rmsePct: 14.2,
    colorHex: 0x3dd6b5 // Lower carbon - teal
  },
  {
    id: 5,
    name: 'Lô 05 / Khoảnh 3',
    forestType: 'Rừng thứ sinh nghèo kiệt',
    areaHa: 9.5,
    agbTonnesPerHa: 27.5,
    carbonCO2ePerHa: 25.2,
    totalCO2e: 239,
    r2: 0.80,
    rmsePct: 15.1,
    colorHex: 0x00c4e8 // Lowest carbon - cyan
  }
];

export class TerrainManager {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.size = options.size || 80;
    this.segments = options.segments || 100;
    this.currentState = 'A';

    this.initGeometry();
    this.initMaterials();
    this.initMesh();
    this.initParcelBoundaries();
  }

  // Multi-harmonic mathematical terrain elevation generator
  getElevation(x, z) {
    const s = 0.05;
    const h1 = Math.sin(x * s * 1.2) * Math.cos(z * s * 1.1) * 5.0;
    const h2 = Math.sin(x * s * 2.5 + 1.2) * Math.cos(z * s * 2.3 + 0.8) * 2.5;
    const h3 = Math.cos((x + z) * s * 0.8) * 3.0;
    const ridge = Math.exp(-((x * 0.04) ** 2 + (z * 0.04) ** 2)) * 4.0;
    return h1 + h2 + h3 + ridge;
  }

  // Determine parcel index (1 to 5) based on spatial coordinates
  getParcelIndex(x, z) {
    if (x < -10 && z < 0) return 1;
    if (x >= -10 && z < -5) return 2;
    if (x < 5 && z >= 0 && z < 20) return 3;
    if (x >= 5 && z >= -5) return 4;
    return 5;
  }

  initGeometry() {
    this.geometry = new THREE.PlaneGeometry(this.size, this.size, this.segments, this.segments);
    this.geometry.rotateX(-Math.PI / 2);

    const pos = this.geometry.attributes.position;
    const colorsNatural = new Float32Array(pos.count * 3);
    const colorsChoropleth = new Float32Array(pos.count * 3);
    const parcelIds = new Float32Array(pos.count);

    const colorBase = new THREE.Color(0x0e1820);
    const colorSlope = new THREE.Color(0x162430);
    const tempColor = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = this.getElevation(x, z);
      pos.setY(i, y);

      const pId = this.getParcelIndex(x, z);
      parcelIds[i] = pId;

      // Natural shading (subtle elevation dependent)
      const t = Math.max(0, Math.min(1, (y + 5) / 15));
      tempColor.lerpColors(colorBase, colorSlope, t);
      colorsNatural[i * 3 + 0] = tempColor.r;
      colorsNatural[i * 3 + 1] = tempColor.g;
      colorsNatural[i * 3 + 2] = tempColor.b;

      // Choropleth parcel color
      const pData = PARCELS_DATA.find(p => p.id === pId) || PARCELS_DATA[0];
      tempColor.setHex(pData.colorHex);
      // Blend slightly with terrain depth
      tempColor.multiplyScalar(0.7 + t * 0.3);
      colorsChoropleth[i * 3 + 0] = tempColor.r;
      colorsChoropleth[i * 3 + 1] = tempColor.g;
      colorsChoropleth[i * 3 + 2] = tempColor.b;
    }

    this.geometry.setAttribute('color', new THREE.BufferAttribute(colorsNatural, 3));
    this.geometry.setAttribute('colorNatural', new THREE.BufferAttribute(colorsNatural, 3));
    this.geometry.setAttribute('colorChoropleth', new THREE.BufferAttribute(colorsChoropleth, 3));
    this.geometry.setAttribute('parcelId', new THREE.BufferAttribute(parcelIds, 1));
    this.geometry.computeVertexNormals();
  }

  initMaterials() {
    this.material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: false
    });
  }

  initMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = false;
    this.scene.add(this.mesh);
  }

  initParcelBoundaries() {
    // Generate boundary line segments separating parcel regions
    const linePoints = [];
    const step = 1.0;
    const half = this.size / 2;

    for (let x = -half; x <= half; x += step) {
      for (let z = -half; z <= half; z += step) {
        const pCurrent = this.getParcelIndex(x, z);
        const pEast = this.getParcelIndex(x + step, z);
        const pSouth = this.getParcelIndex(x, z + step);

        if (x + step <= half && pCurrent !== pEast) {
          const y1 = this.getElevation(x + step / 2, z) + 0.15;
          const y2 = this.getElevation(x + step / 2, z + step) + 0.15;
          linePoints.push(new THREE.Vector3(x + step / 2, y1, z));
          linePoints.push(new THREE.Vector3(x + step / 2, y2, z + step));
        }

        if (z + step <= half && pCurrent !== pSouth) {
          const y1 = this.getElevation(x, z + step / 2) + 0.15;
          const y2 = this.getElevation(x + step, z + step / 2) + 0.15;
          linePoints.push(new THREE.Vector3(x, y1, z + step / 2));
          linePoints.push(new THREE.Vector3(x + step, y2, z + step / 2));
        }
      }
    }

    const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
    this.boundaryMaterial = new THREE.LineBasicMaterial({
      color: 0x00c4e8,
      transparent: true,
      opacity: 0.0, // hidden initially
      linewidth: 1
    });
    this.boundaryLines = new THREE.LineSegments(lineGeom, this.boundaryMaterial);
    this.scene.add(this.boundaryLines);
  }

  setState(stateKey) {
    this.currentState = stateKey;
    const colors = this.geometry.attributes.color.array;
    const natural = this.geometry.attributes.colorNatural.array;
    const choro = this.geometry.attributes.colorChoropleth.array;

    const isStateE = (stateKey === 'E');
    const targetArray = isStateE ? choro : natural;

    for (let i = 0; i < colors.length; i++) {
      colors[i] = targetArray[i];
    }
    this.geometry.attributes.color.needsUpdate = true;

    // Show parcel boundary lines in State E
    this.boundaryMaterial.opacity = isStateE ? 0.75 : 0.0;
  }

  setInterpolatedProgress(progress) {
    // progress: 0.0 to 1.0 (State A -> E)
    // Choropleth fades in during last 25% (progress > 0.75)
    const eFactor = Math.max(0, Math.min(1, (progress - 0.75) / 0.25));

    const colors = this.geometry.attributes.color.array;
    const natural = this.geometry.attributes.colorNatural.array;
    const choro = this.geometry.attributes.colorChoropleth.array;

    for (let i = 0; i < colors.length; i++) {
      colors[i] = natural[i] * (1 - eFactor) + choro[i] * eFactor;
    }
    this.geometry.attributes.color.needsUpdate = true;
    this.boundaryMaterial.opacity = eFactor * 0.75;
  }

  getParcelAtPoint(worldPoint) {
    const pId = this.getParcelIndex(worldPoint.x, worldPoint.z);
    return PARCELS_DATA.find(p => p.id === pId) || null;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.boundaryLines.geometry.dispose();
    this.boundaryMaterial.dispose();
    this.scene.remove(this.mesh);
    this.scene.remove(this.boundaryLines);
  }
}
