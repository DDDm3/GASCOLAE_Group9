import os, shutil, subprocess, math
from PIL import Image, ImageDraw
import numpy as np
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
video_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\video'
images_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\images'
artifact_dir = r'C:\Users\Alex_Ha\.gemini\antigravity-ide\brain\be29baec-0dfe-4cfc-8c2f-76394352596e'

# Load base orthomosaic map
base_raw = Image.open(os.path.join(images_dir, 'deliverable_ch4_spatial_map_master.jpg')).convert('RGB')
base_1080 = base_raw.resize((1920, 1080), Image.Resampling.LANCZOS)

fps = 24
total_frames = 120 # 5.0 seconds
width, height = 1920, 1080

tmp_dir = os.path.join(video_dir, '_tmp_frames_micro_d')
os.makedirs(tmp_dir, exist_ok=True)

# Define Flight Path Waypoints (lawnmower pattern over central active cells)
waypoints = [
    (380, 260), (1540, 260),
    (1540, 360), (380, 360),
    (380, 460), (1540, 460),
    (1540, 560), (380, 560),
    (380, 660), (1540, 660),
    (1540, 760), (380, 760)
]

# Calculate total path length for smooth progressive drawing
segment_lengths = []
total_path_len = 0.0
for j in range(len(waypoints) - 1):
    dx = waypoints[j+1][0] - waypoints[j][0]
    dy = waypoints[j+1][1] - waypoints[j][1]
    l = math.hypot(dx, dy)
    segment_lengths.append(l)
    total_path_len += l

# Define Wind Vectors (arrows showing atmospheric dispersion direction)
wind_origins = [
    (300, 200), (600, 240), (900, 220), (1200, 200), (1500, 240),
    (400, 450), (700, 430), (1000, 460), (1300, 440), (1600, 420),
    (350, 700), (650, 720), (950, 680), (1250, 710), (1550, 690)
]
wind_angle = math.radians(25) # blowing slightly down-right
wind_len = 45

# Define Contours (3 concentric isolines representing CH4 dispersion)
hotspot_centers = [
    (880, 490),  # Primary hotspot
    (1240, 420), # Secondary hotspot
    (610, 620)   # Tertiary hotspot
]

color_teal = (47, 169, 140)       # Data Teal
color_mint = (221, 239, 232)     # Soft Mint
color_action = (23, 107, 91)     # Action Teal
color_amber = (215, 169, 62)     # Measurement Amber

base_arr = np.array(base_1080, dtype=np.float32)

for i in range(total_frames):
    t_sec = i / float(fps)
    
    # Layer canvas with RGBA for clean alpha blending
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # 1. FLIGHT PATH: draws progressively from 0.0s to 1.3s (frames 0 to 31)
    if i >= 2:
        draw_progress = min(1.0, i / 31.0)
        target_len = draw_progress * total_path_len
        accum_len = 0.0
        
        path_pts = [waypoints[0]]
        for j in range(len(segment_lengths)):
            seg_len = segment_lengths[j]
            p1 = waypoints[j]
            p2 = waypoints[j+1]
            if accum_len + seg_len <= target_len:
                path_pts.append(p2)
                accum_len += seg_len
            else:
                ratio = (target_len - accum_len) / seg_len
                cur_x = p1[0] + ratio * (p2[0] - p1[0])
                cur_y = p1[1] + ratio * (p2[1] - p1[1])
                path_pts.append((cur_x, cur_y))
                break
                
        # Draw path lines
        if len(path_pts) > 1:
            for k in range(len(path_pts) - 1):
                draw.line([path_pts[k], path_pts[k+1]], fill=(*color_teal, 180), width=2)
            # Leading pulse dot
            lead_pt = path_pts[-1]
            draw.ellipse([lead_pt[0]-4, lead_pt[1]-4, lead_pt[0]+4, lead_pt[1]+4], fill=(*color_mint, 240))
            
    # 2. WIND VECTORS: appear from 1.3s to 2.4s (frames 31 to 57)
    if i >= 28:
        wind_alpha = min(1.0, (i - 28) / 20.0)
        # Subtle drift along wind direction
        drift = (i % 24) * 0.8
        for ox, oy in wind_origins:
            x1 = ox + math.cos(wind_angle) * drift
            y1 = oy + math.sin(wind_angle) * drift
            x2 = x1 + math.cos(wind_angle) * wind_len
            y2 = y1 + math.sin(wind_angle) * wind_len
            
            draw.line([(x1, y1), (x2, y2)], fill=(*color_mint, int(160 * wind_alpha)), width=2)
            # Arrowhead
            a_angle1 = wind_angle + math.radians(150)
            a_angle2 = wind_angle - math.radians(150)
            draw.line([(x2, y2), (x2 + math.cos(a_angle1)*10, y2 + math.sin(a_angle1)*10)], fill=(*color_mint, int(160 * wind_alpha)), width=2)
            draw.line([(x2, y2), (x2 + math.cos(a_angle2)*10, y2 + math.sin(a_angle2)*10)], fill=(*color_mint, int(160 * wind_alpha)), width=2)
            
    # 3. CONTOURS: bloom from 2.4s to 3.7s (frames 57 to 88)
    if i >= 55:
        contour_alpha = min(1.0, (i - 55) / 24.0)
        for hx, hy in hotspot_centers:
            # Concentric isolines
            for r, alpha_mult, col in [(120, 0.25, color_action), (75, 0.4, color_teal), (40, 0.6, color_mint)]:
                # Organic wobble
                bbox = [hx - r, hy - int(r * 0.75), hx + r, hy + int(r * 0.75)]
                draw.ellipse(bbox, outline=(*col, int(200 * contour_alpha * alpha_mult)), width=2)
                
    # 4. HOTSPOTS: appear and pulse from 3.7s to 5.0s (frames 88 to 119)
    if i >= 85:
        hotspot_alpha = min(1.0, (i - 85) / 16.0)
        pulse = (math.sin(i * 0.3) + 1.0) * 0.5 # 0 to 1
        ring_r = 16 + pulse * 14
        
        for hx, hy in hotspot_centers:
            # Concentric ping ring
            draw.ellipse([hx - ring_r, hy - ring_r, hx + ring_r, hy + ring_r], 
                         outline=(*color_amber, int(190 * hotspot_alpha * (1.0 - pulse * 0.6))), width=2)
            # Core pin dot
            draw.ellipse([hx - 5, hy - 5, hx + 5, hy + 5], fill=(*color_amber, int(255 * hotspot_alpha)))
            
    # Seamless loop fade-out of dynamic overlays during last 10 frames (110 to 119)
    if i >= 110:
        fade_factor = 1.0 - (i - 110) / 10.0
    else:
        fade_factor = 1.0
        
    # Composite frame
    overlay_arr = np.array(overlay, dtype=np.float32)
    alpha = (overlay_arr[:, :, 3:4] / 255.0) * fade_factor
    rgb_overlay = overlay_arr[:, :, :3]
    
    frame_comp = (1.0 - alpha) * base_arr + alpha * rgb_overlay
    final_img = Image.fromarray(np.clip(frame_comp, 0, 255).astype(np.uint8))
    final_img.save(os.path.join(tmp_dir, f'frame_{i:04d}.jpg'), 'JPEG', quality=95)

# Render MP4
mp4_path = os.path.join(video_dir, 'micro_loop_d_deliverable_map.mp4')
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
webm_path = os.path.join(video_dir, 'micro_loop_d_deliverable_map.webm')
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

shutil.copy2(mp4_path, os.path.join(artifact_dir, 'micro_loop_d_deliverable_map.mp4'))
shutil.copy2(webm_path, os.path.join(artifact_dir, 'micro_loop_d_deliverable_map.webm'))

print('Clip D rendered successfully!')
print('MP4 size:', f'{os.path.getsize(mp4_path)/1024:.1f} KB')
print('WebM size:', f'{os.path.getsize(webm_path)/1024:.1f} KB')
