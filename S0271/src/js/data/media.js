// Module-relative URLs work both at the domain root and beneath /S0271/.
const assetUrl = (file) => new URL(`../../../asset/${file}`, import.meta.url).href;
const exported = (file) => assetUrl(`web_export/${file}`);

const image = (key, alt) => ({
  id: key,
  type: 'image',
  alt,
  desktop: {
    avif: exported(`${key}-1920.avif`),
    webp: exported(`${key}-1920.webp`),
    fallback: exported(`${key}-master.jpg`),
  },
  tablet: { webp: exported(`${key}-1280.webp`) },
  mobile: {
    avif: exported(`${key}-mobile.avif`),
    webp: exported(`${key}-mobile.webp`),
    fallback: exported(`${key}-mobile.jpg`),
  },
});

const video = (key, description, hasMobile) => ({
  id: key,
  type: 'video',
  description,
  desktop: { mp4: exported(`${key}-1080p.mp4`), webm: exported(`${key}-1080p.webm`) },
  optimized: { mp4: exported(`${key}-720p.mp4`), webm: exported(`${key}-720p.webm`) },
  mobile: hasMobile ? { mp4: exported(`${key}-mobile.mp4`), webm: exported(`${key}-mobile.webm`) } : null,
  poster: { webp: exported(`${key}-poster.webp`), fallback: exported(`${key}-poster.jpg`) },
  playback: { muted: true, playsInline: true, preload: 'none', autoplay: false },
  reducedMotion: 'poster',
});

export const images = {
  hero: image('s0271-hero', 'Minh họa UAV khảo sát methane tại bãi chôn lấp.'),
  expandedMap: image('s0271-expanded-map', 'Minh họa dữ liệu methane trên bản đồ không gian bãi chôn lấp.'),
  problem: image('s0271-problem', 'Minh họa nguồn methane phân tán trên bề mặt bãi chôn lấp.'),
  baseline: image('s0271-baseline', 'Minh họa kỳ đo nền trước biện pháp khắc phục.'),
  confirmation: image('s0271-confirmation', 'Minh họa kỳ đo xác nhận sau biện pháp khắc phục.'),
  deliverableMap: image('s0271-deliverable-map', 'Minh họa bản đồ CH₄ và vị trí cần kiểm tra.'),
  deliverableQaqc: image('s0271-deliverable-qaqc', 'Minh họa hồ sơ truy vết và báo cáo QA/QC.'),
  level1: image('s0271-level-1', 'Minh họa khảo sát sàng lọc và lập bản đồ methane.'),
  level2: image('s0271-level-2', 'Minh họa khảo sát kỳ nền và kỳ xác nhận.'),
  level3: image('s0271-level-3', 'Minh họa giám sát nhiều bãi chôn lấp.'),
  // Technology still is in images/, not the web export manifest.
  technology: {
    id: 'technology-core-uav',
    type: 'image',
    alt: 'Minh họa UAV mang thiết bị khảo sát; model cảm biến cần GASCOLAE xác nhận.',
    desktop: { webp: assetUrl('images/technology_core_uav_1920.webp'), fallback: assetUrl('images/technology_core_uav_master.jpg') },
    tablet: { webp: assetUrl('images/technology_core_uav_1280.webp') },
    mobile: { webp: assetUrl('images/technology_core_uav_mobile.webp'), fallback: assetUrl('images/technology_core_uav_mobile.jpg') },
  },
};

export const videos = {
  hero: {
    id: 'hero-video',
    type: 'video',
    description: 'Video minh họa khảo sát bằng UAV.',
    desktop: { mp4: assetUrl('video/video_hero.mp4') },
    optimized: { mp4: assetUrl('video/video_hero.mp4') },
    mobile: { mp4: assetUrl('video/video_hero.mp4') },
    poster: { webp: assetUrl('video/Generate_ONE_complete_cinemati_poster.webp'), fallback: assetUrl('video/Generate_ONE_complete_cinemati_poster.jpg') },
    playback: { muted: true, playsInline: true, preload: 'none', autoplay: false },
    reducedMotion: 'poster',
  },
  technology: video('s0271-video-technology', 'Minh họa thiết bị khảo sát trên UAV.', true),
  journey: video('s0271-video-journey', 'Minh họa hành trình đo lường.', false),
  beforeAfter: video('s0271-video-before-after', 'Minh họa so sánh kỳ nền và kỳ xác nhận; không phải số liệu hiệu quả thực tế.', false),
  deliverableMap: video('s0271-video-deliverable-map', 'Minh họa hình thành bản đồ dữ liệu không gian.', false),
  cta: video('s0271-video-cta', 'Minh họa khu vực khảo sát bãi chôn lấp.', true),
};

// References use content item IDs where a section has multiple items.
export const sectionMedia = {
  hero: { image: images.hero, video: videos.hero },
  heroExpansion: { image: images.expandedMap },
  problems: { image: images.problem },
  technology: { image: images.technology, video: videos.technology },
  journey: {
    video: videos.journey,
    stages: { detect: images.problem, locate: images.expandedMap, quantify: images.technology, verify: images.confirmation, report: images.deliverableQaqc },
  },
  beforeAfter: { before: images.baseline, after: images.confirmation, video: videos.beforeAfter },
  deliverables: {
    'ch4-map': { image: images.deliverableMap, video: videos.deliverableMap },
    'traceability-qaqc': { image: images.deliverableQaqc },
    'before-after-report': { before: images.baseline, after: images.confirmation },
  },
  serviceLevels: { 'level-1': images.level1, 'level-2': images.level2, 'level-3': images.level3 },
  whyGascolae: null,
  faq: null,
  agent: null,
  contact: { video: videos.cta },
};

export const media = {
  sourceManifest: assetUrl('web_export/s0271_web_manifest.json'),
  usage: 'illustration',
  images,
  videos,
  sections: sectionMedia,
};
