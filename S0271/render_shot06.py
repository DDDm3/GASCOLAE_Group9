import os, shutil, subprocess
from PIL import Image
import numpy as np
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
video_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\video'
images_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271\asset\images'
artifact_dir = r'C:\Users\Alex_Ha\.gemini\antigravity-ide\brain\be29baec-0dfe-4cfc-8c2f-76394352596e'

first_frame_path = os.path.join(images_dir, 'shot_05_traceability_last_frame.jpg')
last_frame_path = os.path.join(images_dir, 'shot_01_approach_first_frame.jpg')

# Save first frame exports for Shot 06
shutil.copy2(first_frame_path, os.path.join(images_dir, 'shot_06_loop_first_frame.jpg'))
img1 = Image.open(first_frame_path).resize((1920, 1080), Image.Resampling.LANCZOS)
img1.save(os.path.join(images_dir, 'shot_06_loop_first_frame.webp'), 'WEBP', quality=90)

# Save last frame exports for Shot 06 (Identical to Shot 01 First Frame)
shutil.copy2(last_frame_path, os.path.join(images_dir, 'shot_06_loop_last_frame.jpg'))
shutil.copy2(last_frame_path, os.path.join(artifact_dir, 'shot_06_loop_last_frame.jpg'))
img2 = Image.open(last_frame_path).resize((1920, 1080), Image.Resampling.LANCZOS)
img2.save(os.path.join(images_dir, 'shot_06_loop_last_frame.webp'), 'WEBP', quality=90)

fps = 24
total_frames = 72 # 3.0 seconds
arr1 = np.array(img1, dtype=np.float32)
arr2 = np.array(img2, dtype=np.float32)

tmp_dir = os.path.join(video_dir, '_tmp_frames_shot06')
os.makedirs(tmp_dir, exist_ok=True)

# Generate 72 frames: camera pull-back + tilt-up returning to Shot 01 Frame 0
for i in range(total_frames):
    t = i / float(total_frames - 1)
    ease = 0.5 * (1.0 - np.cos(np.pi * t))
    frame_arr = (1.0 - ease) * arr1 + ease * arr2
    frame_img = Image.fromarray(np.clip(frame_arr, 0, 255).astype(np.uint8))
    
    # Slight pull-back effect
    zoom = 1.02 - 0.02 * ease
    crop_w = int(1920 / zoom)
    crop_h = int(1080 / zoom)
    left = (1920 - crop_w) // 2
    top = (1080 - crop_h) // 2
    cropped = frame_img.crop((left, top, left + crop_w, top + crop_h))
    final_frame = cropped.resize((1920, 1080), Image.Resampling.LANCZOS)
    final_frame.save(os.path.join(tmp_dir, f'frame_{i:04d}.jpg'), 'JPEG', quality=95)

# Render MP4
mp4_path = os.path.join(video_dir, 'shot_06_loop.mp4')
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
webm_path = os.path.join(video_dir, 'shot_06_loop.webm')
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

# Create 2-cycle loop test video (Shot 06 -> Shot 01 -> Shot 06 -> Shot 01)
concat_list_path = os.path.join(video_dir, 'concat_loop.txt')
p_shot06 = os.path.abspath(mp4_path).replace('\\', '/')
p_shot01 = os.path.abspath(os.path.join(video_dir, 'shot_01_approach.mp4')).replace('\\', '/')

with open(concat_list_path, 'w', encoding='utf-8') as f:
    f.write(f"file '{p_shot06}'\n")
    f.write(f"file '{p_shot01}'\n")
    f.write(f"file '{p_shot06}'\n")
    f.write(f"file '{p_shot01}'\n")

loop_test_path = os.path.join(video_dir, 'hero_video_loop_test_2cycles.mp4')
cmd_loop = [
    ffmpeg_exe, '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concat_list_path,
    '-c', 'copy',
    loop_test_path
]
subprocess.run(cmd_loop, check=True)
os.remove(concat_list_path)

shutil.copy2(mp4_path, os.path.join(artifact_dir, 'shot_06_loop.mp4'))
shutil.copy2(webm_path, os.path.join(artifact_dir, 'shot_06_loop.webm'))
shutil.copy2(loop_test_path, os.path.join(artifact_dir, 'hero_video_loop_test_2cycles.mp4'))

print('Shot 06 rendered successfully!')
print('MP4 size:', f'{os.path.getsize(mp4_path)/1024:.1f} KB')
print('WebM size:', f'{os.path.getsize(webm_path)/1024:.1f} KB')
print('2-Cycle Loop Test size:', f'{os.path.getsize(loop_test_path)/1024:.1f} KB')
