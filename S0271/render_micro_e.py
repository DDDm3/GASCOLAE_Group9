import os, shutil, subprocess, math
from PIL import Image, ImageDraw
import numpy as np
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
video_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\video'
images_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\images'
artifact_dir = r'C:\Users\Alex_Ha\.gemini\antigravity-ide\brain\be29baec-0dfe-4cfc-8c2f-76394352596e'

# Load Hero / Surveyed Zone image
base_raw = Image.open(os.path.join(images_dir, 'hero_editorial_window_master.jpg')).convert('RGB')
# Resize base to a larger canvas (2400x1350) for ultra-sharp sub-pixel cropping during push-in
high_res = base_raw.resize((2400, 1350), Image.Resampling.LANCZOS)

fps = 24
total_frames = 144 # 6.0 seconds
width, height = 1920, 1080

tmp_dir = os.path.join(video_dir, '_tmp_frames_micro_e')
os.makedirs(tmp_dir, exist_ok=True)

# Focal center for push-in (slightly right of center towards surveyed cell & UAV)
focal_x = 2400 * 0.52
focal_y = 1350 * 0.54

# Maximum zoom factor (10% slow push-in)
max_zoom = 0.10

color_teal = (47, 169, 140)       # Data Teal
color_mint = (221, 239, 232)     # Soft Mint
color_amber = (215, 169, 62)     # Measurement Amber

for i in range(total_frames):
    # Smooth harmonic ease (zero velocity at start and end for infinite seamless loop)
    t = (1.0 - math.cos(2.0 * math.pi * i / total_frames)) * 0.5
    scale = 1.0 + max_zoom * t
    
    # Crop dimensions from 2400x1350
    crop_w = 2160 / scale
    crop_h = 1215 / scale
    
    # Calculate crop bounding box centered around focal point
    left = focal_x - crop_w * 0.5
    top = focal_y - crop_h * 0.5
    right = left + crop_w
    bottom = top + crop_h
    
    # Boundary clamps
    if left < 0:
        right -= left
        left = 0
    if right > 2400:
        left -= (right - 2400)
        right = 2400
    if top < 0:
        bottom -= top
        top = 0
    if bottom > 1350:
        top -= (bottom - 1350)
        bottom = 1350
        
    frame_crop = high_res.crop((int(left), int(top), int(right), int(bottom)))
    frame_1080 = frame_crop.resize((width, height), Image.Resampling.LANCZOS)
    
    # Add subtle, high-end spatial survey reticle / corner brackets at the surveyed zone
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Survey target zone brackets
    bracket_size = 28
    cx, cy = int(width * 0.52), int(height * 0.54)
    b_half = 90 + int(15 * t)
    
    # Subtle breathing alpha
    alpha_b = int(120 + 80 * t)
    
    # 4 corner brackets
    # Top-Left
    draw.line([(cx - b_half, cy - b_half), (cx - b_half + bracket_size, cy - b_half)], fill=(*color_mint, alpha_b), width=2)
    draw.line([(cx - b_half, cy - b_half), (cx - b_half, cy - b_half + bracket_size)], fill=(*color_mint, alpha_b), width=2)
    # Top-Right
    draw.line([(cx + b_half, cy - b_half), (cx + b_half - bracket_size, cy - b_half)], fill=(*color_mint, alpha_b), width=2)
    draw.line([(cx + b_half, cy - b_half), (cx + b_half, cy - b_half + bracket_size)], fill=(*color_mint, alpha_b), width=2)
    # Bottom-Left
    draw.line([(cx - b_half, cy + b_half), (cx - b_half + bracket_size, cy + b_half)], fill=(*color_mint, alpha_b), width=2)
    draw.line([(cx - b_half, cy + b_half), (cx - b_half, cy + b_half - bracket_size)], fill=(*color_mint, alpha_b), width=2)
    # Bottom-Right
    draw.line([(cx + b_half, cy + b_half), (cx + b_half - bracket_size, cy + b_half)], fill=(*color_mint, alpha_b), width=2)
    draw.line([(cx + b_half, cy + b_half), (cx + b_half, cy + b_half - bracket_size)], fill=(*color_mint, alpha_b), width=2)
    
    # Small center crosshair
    draw.line([(cx - 8, cy), (cx + 8, cy)], fill=(*color_amber, int(180 * t)), width=1)
    draw.line([(cx, cy - 8), (cx, cy + 8)], fill=(*color_amber, int(180 * t)), width=1)
    
    # Alpha blend overlay onto 1080p frame
    frame_arr = np.array(frame_1080, dtype=np.float32)
    overlay_arr = np.array(overlay, dtype=np.float32)
    ov_alpha = overlay_arr[:, :, 3:4] / 255.0
    comp_arr = (1.0 - ov_alpha) * frame_arr + ov_alpha * overlay_arr[:, :, :3]
    
    final_img = Image.fromarray(np.clip(comp_arr, 0, 255).astype(np.uint8))
    final_img.save(os.path.join(tmp_dir, f'frame_{i:04d}.jpg'), 'JPEG', quality=95)

# Render MP4
mp4_path = os.path.join(video_dir, 'micro_loop_e_cta_portal.mp4')
cmd_mp4 = [
    ffmpeg_exe, '-y',
    '-r', str(fps),
    '-i', os.path.join(tmp_dir, 'frame_%04d.jpg'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '18',
    mp4_path
]
subprocess.run(cmd_mp4, check=True)

# Render WebM (VP9)
webm_path = os.path.join(video_dir, 'micro_loop_e_cta_portal.webm')
cmd_webm = [
    ffmpeg_exe, '-y',
    '-r', str(fps),
    '-i', os.path.join(tmp_dir, 'frame_%04d.jpg'),
    '-c:v', 'libvpx-vp9',
    '-b:v', '2M',
    '-crf', '24',
    webm_path
]
subprocess.run(cmd_webm, check=True)

# Clean up tmp
shutil.rmtree(tmp_dir)

shutil.copy2(mp4_path, os.path.join(artifact_dir, 'micro_loop_e_cta_portal.mp4'))
shutil.copy2(webm_path, os.path.join(artifact_dir, 'micro_loop_e_cta_portal.webm'))

print('Clip E rendered successfully!')
print('MP4 size:', f'{os.path.getsize(mp4_path)/1024:.1f} KB')
print('WebM size:', f'{os.path.getsize(webm_path)/1024:.1f} KB')
