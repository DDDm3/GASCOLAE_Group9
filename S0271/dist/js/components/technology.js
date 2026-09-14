export function initTechnology() {
  const section = document.querySelector('[data-technology]');
  if (!section) return;
  const nodes = [...section.querySelectorAll('[data-node]')];
  const panels = [...section.querySelectorAll('[data-panel]')];
  if (!nodes.length || nodes.some(node => !panels.some(panel => panel.dataset.panel === node.dataset.node))) return;
  let selected;
  function select(id) {
    if (id === selected) return;
    selected = id;
    section.dataset.activeNode = id;
    nodes.forEach(node => node.setAttribute('aria-pressed', String(node.dataset.node === id)));
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== id; });
  }
  nodes.forEach((node, index) => {
    // Links work without JS; enhanced controls act as disclosure selectors.
    node.setAttribute('role', 'button');
    node.setAttribute('aria-controls', `technology-${node.dataset.node}`);
    node.addEventListener('click', event => { event.preventDefault(); select(node.dataset.node); });
    node.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') select(node.dataset.node);
    });
    node.addEventListener('focus', () => select(node.dataset.node));
    node.addEventListener('keydown', event => {
      if (event.key === ' ') { event.preventDefault(); select(node.dataset.node); return; }
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % nodes.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + nodes.length) % nodes.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = nodes.length - 1;
      if (next !== undefined) { event.preventDefault(); nodes[next].focus(); }
    });
  });
  section.setAttribute('data-technology-ready', '');
  const fromHash = nodes.find(node => node.hash === window.location.hash);
  select(fromHash?.dataset.node ?? nodes[0].dataset.node);
}
