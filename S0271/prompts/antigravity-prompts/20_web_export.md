# Step 20 — Web Export

Chỉ chạy sau khi QC PASS.

## Image export
- AVIF/WebP
- desktop + mobile crop
- poster frame cho mỗi video
- giữ bản master chất lượng cao

## Video export
Tạo web variants:
- 1920x1080 master
- 1280x720 optimized
- mobile crop nếu cần
- H.264/MP4 hoặc WebM tùy pipeline
- muted
- no audio track nếu không cần

## File naming
s0271-hero.*
s0271-expanded-map.*
s0271-baseline.*
s0271-confirmation.*
s0271-level-1.*
s0271-level-2.*
s0271-level-3.*
s0271-video-hero.*
s0271-video-technology.*
s0271-video-journey.*
s0271-video-before-after.*
s0271-video-cta.*

Xuất manifest gồm:
filename / section / aspect ratio / poster / mobile fallback.
