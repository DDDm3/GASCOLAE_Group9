/**
 * src/js/main.js
 * Landing Page Orchestrator & Multi-Scene 3D Viewport Binder
 */
import { initNavbar } from './navbar.js';
import { initAccordion } from './accordion.js';
import { initProcessSteps } from './process-steps.js';
import { initAiPanel } from './ai-panel.js';
import { initLeadForm } from './lead-form.js';
import { initReveal } from './reveal.js';
import { HeroScene } from '../3d/hero-scene.js';
import { ForestCarbonScene } from '../3d/scene.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize UI components
  initNavbar();
  initAccordion();
  initProcessSteps();
  initAiPanel();
  initLeadForm();
  initReveal();

  // 2. Initialize Ambient 3D Scene in Hero Section
  const heroCanvasContainer = document.getElementById('hero-3d-canvas');
  let heroScene = null;
  if (heroCanvasContainer) {
    heroScene = new HeroScene(heroCanvasContainer, {
      onFallback: () => {
        const fb = document.getElementById('hero-fallback');
        if (fb) fb.style.display = 'flex';
      }
    });
  }

  // 3. Initialize Interactive 5-State 3D Scene in S05
  const viewer3D = document.getElementById('viewer-3d-canvas');
  const hud = document.getElementById('scene-tooltip');
  const hudTitle = document.getElementById('hud-title');
  const hudType = document.getElementById('hud-type');
  const hudVal = document.getElementById('hud-val');
  const hudMetrics = document.getElementById('hud-metrics');
  let interactiveScene = null;

  if (viewer3D) {
    interactiveScene = new ForestCarbonScene(viewer3D, {
      onParcelHover: (parcel, e) => {
        if (parcel && hud) {
          hudTitle.innerText = parcel.name;
          hudType.innerText = parcel.forestType;
          hudVal.innerText = parcel.carbonCO2ePerHa + ' tCO2e/ha';
          hudMetrics.innerText = `R²: ${parcel.r2} | RMSE: ${parcel.rmsePct}% | Tổng: ${parcel.totalCO2e} tCO2e`;
          hud.classList.add('visible');

          const rect = viewer3D.getBoundingClientRect();
          hud.style.left = (e.clientX - rect.left + 15) + 'px';
          hud.style.top = (e.clientY - rect.top + 15) + 'px';
        } else if (hud) {
          hud.classList.remove('visible');
        }
      },
      onFallback: () => {
        const fb = document.getElementById('viewer-fallback');
        if (fb) fb.style.display = 'block';
      }
    });

    // Toolbar buttons (State A -> E)
    const toolbarBtns = document.querySelectorAll('.viewer-3d__btn');
    toolbarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toolbarBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const stateKey = btn.dataset.state;
        interactiveScene.setState(stateKey);
      });
    });
  }

  // Handle window resizing for all active 3D scenes
  window.addEventListener('resize', () => {
    if (heroScene) heroScene.resize();
    if (interactiveScene) interactiveScene.resize();
  });
});
