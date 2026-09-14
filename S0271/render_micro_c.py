import os, shutil, subprocess
from PIL import Image
import numpy as np
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
video_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\video'
images_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\images'
artifact_dir = r'C:\Users\Alex_Ha\.gemini\antigravity-ide\brain\be29baec-0dfe-4cfc-8c2f-76394352596e'

# Inputs: Step 06 (baseline) and Step 07 (confirmation)
baseline_img = Image.open(os.path.join(images_dir, 'baseline_reference_master.jpg')).resize((1920, 1080), Image.Resampling.LANCZOS)
confirm_img = Image.open(os.path.join(images_dir, 'confirmation_reference_master.jpg')).resize((1920, 1080), Image.Resampling.LANCZOS)

arr_base = np.array(baseline_img, dtype=np.float32)
arr_conf = np.array(confirm_img, dtype=np.float32)

fps = 24
total_frames = 192 # 8.0s @ 24fps
width, height = 1920, 1080

tmp_dir = os.path.join(video_dir, '_tmp_frames_micro_c')
os.makedirs(tmp_dir, exist_ok=True)

amber_color = np.array([215, 169, 62], dtype=np.float32) # Measurement Amber
line_width = 3
glow_radius = 6

for i in range(total_frames):
    # Determine split position
    if i < 36:
        # Phase 1: Hold on Before (0 to 1.5s)
        x_split = -1
    elif i < 84:
        # Phase 2: Wipe Left to Right (1.5s to 3.5s, 48 frames)
        t = (i - 36) / 48.0
        ease = 0.5 * (1.0 - np.cos(np.pi * t))
        x_split = ease * width
    elif i < 120:
        # Phase 3: Hold on After (3.5s to 5.0s, 36 frames)
        x_split = width + 10
    elif i < 168:
        # Phase 4: Wipe Right to Left (5.0s to 7.0s, 48 frames)
        t = (i - 120) / 48.0
        ease = 0.5 * (1.0 - np.cos(np.pi * t))
        x_split = (1.0 - ease) * width
    else:
        # Phase 5: Hold on Before (7.0s to 8.0s, 24 frames)
        x_split = -1
    
    # Compose frame
    frame = arr_base.copy()
    if x_split >= 0 and x_split <= width:
        split_col = int(round(x_split))
        split_col = max(0, min(width, split_col))
        # Left of split is confirmation
        frame[:, :split_col] = arr_conf[:, :split_col]
        
        # Draw measurement amber dividing line with glow
        for offset in range(-glow_radius, glow_radius + 1):
            col = split_col + offset
            if 0 <= col < width:
                if abs(offset) <= line_width // 2:
                    intensity = 0.95
                else:
                    dist = abs(offset) - line_width // 2
                    intensity = 0.95 * (1.0 - dist / (glow_radius - line_width // 2 + 1))
                frame[:, col] = (1.0 - intensity) * frame[:, col] + intensity * amber_color
    elif x_split > width:
        frame[:] = arr_conf
        
    out_img = Image.fromarray(np.clip(frame, 0, 255).astype(np.uint8))
    out_img.save(os.path.join(tmp_dir, f'frame_{i:04d}.jpg'), 'JPEG', quality=95)

# Render MP4
mp4_path = os.path.join(video_dir, 'micro_loop_c_before_after.mp4')
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
webm_path = os.path.join(video_dir, 'micro_loop_c_before_after.webm')
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

shutil.copy2(mp4_path, os.path.join(artifact_dir, 'micro_loop_c_before_after.mp4'))
shutil.copy2(webm_path, os.path.join(artifact_dir, 'micro_loop_c_before_after.webm'))

print('Clip C rendered successfully!')
print('MP4 size:', f'{os.path.getsize(mp4_path)/1024:.1f} KB')
print('WebM size:', f'{os.path.getsize(webm_path)/1024:.1f} KB')
