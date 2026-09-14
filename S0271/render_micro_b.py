import os, shutil, subprocess
from PIL import Image
import numpy as np
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
video_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\video'
images_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\images'
artifact_dir = r'C:\Users\Alex_Ha\.gemini\antigravity-ide\brain\be29baec-0dfe-4cfc-8c2f-76394352596e'

# 5 stages corresponding to the 5 plateaus of the customer journey:
# 1. DETECT: problem dispersion
# 2. LOCATE: screening / hotspot pinpointing
# 3. QUANTIFY: baseline survey
# 4. VERIFY: confirmation post-remediation
# 5. REPORT: deliverable map dossier
stage_files = [
    'problem_editorial_dispersion_master.jpg',
    'hero_editorial_window_master.jpg',
    'baseline_reference_master.jpg',
    'confirmation_reference_master.jpg',
    'deliverable_ch4_spatial_map_master.jpg'
]

stage_imgs = [Image.open(os.path.join(images_dir, f)).resize((1920, 1080), Image.Resampling.LANCZOS) for f in stage_files]
stage_arrs = [np.array(im, dtype=np.float32) for im in stage_imgs]

fps = 24
# 5 plateaus, each 2.5s -> total 12.5s (300 frames)
# In each 2.5s (60 frames): 36 frames hold (1.5s), 24 frames transition (1.0s)
total_frames = 300
tmp_dir = os.path.join(video_dir, '_tmp_frames_micro_b')
os.makedirs(tmp_dir, exist_ok=True)

for i in range(total_frames):
    plateau_idx = i // 60
    sub_frame = i % 60
    
    if sub_frame < 36 or plateau_idx == 4:
        # Holding on current plateau with slow subtle camera drift
        cur_arr = stage_arrs[plateau_idx]
        drift_t = sub_frame / 60.0
        drift_x = int(6 * np.sin(np.pi * drift_t))
        drift_y = int(4 * np.cos(np.pi * drift_t))
        frame_img = Image.fromarray(np.clip(cur_arr, 0, 255).astype(np.uint8))
        cropped = frame_img.crop((10 - drift_x, 6 - drift_y, 1910 - drift_x, 1074 - drift_y))
        final_frame = cropped.resize((1920, 1080), Image.Resampling.LANCZOS)
    else:
        # Transition to next plateau
        next_arr = stage_arrs[plateau_idx + 1]
        trans_t = (sub_frame - 36) / 24.0 # 0 to 1
        ease = 0.5 * (1.0 - np.cos(np.pi * trans_t))
        
        # Horizontal slide / blend
        blend_arr = (1.0 - ease) * stage_arrs[plateau_idx] + ease * next_arr
        frame_img = Image.fromarray(np.clip(blend_arr, 0, 255).astype(np.uint8))
        final_frame = frame_img

    final_frame.save(os.path.join(tmp_dir, f'frame_{i:04d}.jpg'), 'JPEG', quality=95)

# Render MP4
mp4_path = os.path.join(video_dir, 'micro_loop_b_horizontal_journey.mp4')
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
webm_path = os.path.join(video_dir, 'micro_loop_b_horizontal_journey.webm')
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

shutil.copy2(mp4_path, os.path.join(artifact_dir, 'micro_loop_b_horizontal_journey.mp4'))
shutil.copy2(webm_path, os.path.join(artifact_dir, 'micro_loop_b_horizontal_journey.webm'))

print('Clip B rendered successfully!')
print('MP4 size:', f'{os.path.getsize(mp4_path)/1024:.1f} KB')
print('WebM size:', f'{os.path.getsize(webm_path)/1024:.1f} KB')
