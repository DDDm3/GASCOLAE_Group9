export const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

export const arrow = '<span aria-hidden="true">↗</span>';

export function buttonLink(text, href = '#lien-he', variant = '') {
  return `<a class="button ${escapeHtml(variant)}" href="${escapeHtml(href)}">${escapeHtml(text)}${arrow}</a>`;
}

export function sectionLabel(number, text) {
  return `<p class="eyebrow"><span>${escapeHtml(number)}</span> ${escapeHtml(text)}</p>`;
}

export function articleList(items, className = '') {
  return items.map((item, index) => `<article class="${escapeHtml(className)}"><span class="index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join('');
}

export function heroMedia(asset) {
  const poster = `./media/${escapeHtml(asset.file)}`;
  if (asset.video) {
    return `<video poster="${poster}" width="${asset.width}" height="${asset.height}" muted loop playsinline preload="none" data-src="./media/${escapeHtml(asset.video)}" aria-label="${escapeHtml(asset.alt)}"><img src="${poster}" width="${asset.width}" height="${asset.height}" alt="${escapeHtml(asset.alt)}"></video>`;
  }
  return `<img src="${poster}" srcset="./media/${escapeHtml(asset.small)} 640w, ${poster} 1024w" sizes="(max-width: 800px) 92vw, 48vw" width="${asset.width}" height="${asset.height}" alt="${escapeHtml(asset.alt)}" fetchpriority="high" decoding="async">`;
}

export function responsiveFigure(asset, className = '') {
  const full = `./media/${escapeHtml(asset.file)}`;
  const small = `./media/${escapeHtml(asset.small)}`;
  return `<figure class="section-media ${escapeHtml(className)}"><picture><source media="(max-width: 700px)" srcset="${small}"><img src="${full}" srcset="${small} 640w, ${full} 1024w" sizes="(max-width: 800px) 92vw, 80vw" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async" alt="${escapeHtml(asset.alt)}"></picture><figcaption>${escapeHtml(asset.caption)}</figcaption></figure>`;
}
