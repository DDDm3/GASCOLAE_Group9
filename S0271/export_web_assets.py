import os, shutil, subprocess, json
from PIL import Image
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

base_dir = r'd:\Work\CT-group\GASCOLAE_Group9\S0271'
images_dir = os.path.join(base_dir, 'asset', 'images')
video_dir = os.path.join(base_dir, 'asset', 'video')
export_dir = os.path.join(base_dir, 'asset', 'web_export')
os.makedirs(export_dir, exist_ok=True)

artifact_dir = r'C:\Users\Alex_Ha\.gemini\antigravity-ide\brain\be29baec-0dfe-4cfc-8c2f-76394352596e'

manifest_entries = []

def export_avif(in_path, out_path):
    cmd = [ffmpeg_exe, '-y', '-i', in_path, '-c:v', 'libaom-av1', '-crf', '32', '-cpu-used', '6', out_path]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# -------------------------------------------------------------
# 1. IMAGE ASSETS EXPORT
# -------------------------------------------------------------
image_mappings = [
    {
        'key': 's0271-hero',
        'src': 'hero_editorial_window_master.jpg',
        'section': 'Hero Section / Main Window',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'hero_editorial_window_mobile_crop.jpg'
    },
    {
        'key': 's0271-expanded-map',
        'src': 'expanded_spatial_map_master.jpg',
        'section': 'Spatial Overview / Territory Context',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'expanded_spatial_map_mobile.jpg'
    },
    {
        'key': 's0271-problem',
        'src': 'problem_editorial_dispersion_master.jpg',
        'section': 'Problem Editorial / Invisible Dispersion',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'problem_editorial_dispersion_mobile.jpg'
    },
    {
        'key': 's0271-baseline',
        'src': 'baseline_reference_master.jpg',
        'section': 'Baseline Survey / Pre-Remediation Reference',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'baseline_reference_mobile.jpg'
    },
    {
        'key': 's0271-confirmation',
        'src': 'confirmation_reference_master.jpg',
        'section': 'Confirmation Audit / Post-Remediation Reference',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'confirmation_reference_mobile.jpg'
    },
    {
        'key': 's0271-deliverable-map',
        'src': 'deliverable_ch4_spatial_map_master.jpg',
        'section': 'Deliverables / CH4 Spatial GIS Map Dossier',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'deliverable_ch4_spatial_map_mobile.jpg'
    },
    {
        'key': 's0271-deliverable-qaqc',
        'src': 'deliverable_qaqc_audit_sheet_master.jpg',
        'section': 'Deliverables / Technical QA/QC Audit Dossier',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'deliverable_qaqc_audit_sheet_mobile.jpg'
    },
    {
        'key': 's0271-level-1',
        'src': 'service_level_1_screening_master.jpg',
        'section': 'Service Level 1 / Rapid Screening',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'service_level_1_screening_mobile.jpg'
    },
    {
        'key': 's0271-level-2',
        'src': 'service_level_2_quantification_master.jpg',
        'section': 'Service Level 2 / Full Quantification & Audit',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'service_level_2_quantification_mobile.jpg'
    },
    {
        'key': 's0271-level-3',
        'src': 'service_level_3_multisite_master.jpg',
        'section': 'Service Level 3 / Multi-Site Regional Enterprise',
        'aspect': '16:9 (Desktop) / 9:16 (Mobile)',
        'has_mobile_crop': True,
        'mobile_src': 'service_level_3_multisite_mobile.jpg'
    }
]

print("--- EXPORTING IMAGE VARIANTS ---")
for item in image_mappings:
    src_path = os.path.join(images_dir, item['src'])
    im_master = Image.open(src_path).convert('RGB')
    
    # 1. Master High-Res JPG
    master_out = os.path.join(export_dir, f"{item['key']}-master.jpg")
    im_master.save(master_out, 'JPEG', quality=95)
    
    # 2. Desktop WebP & AVIF (1920x1080 and 1280x720)
    im_1920 = im_master.resize((1920, 1080), Image.Resampling.LANCZOS)
    webp_1920_path = os.path.join(export_dir, f"{item['key']}-1920.webp")
    im_1920.save(webp_1920_path, 'WEBP', quality=88)
    
    avif_1920_path = os.path.join(export_dir, f"{item['key']}-1920.avif")
    export_avif(webp_1920_path, avif_1920_path)
    
    im_1280 = im_master.resize((1280, 720), Image.Resampling.LANCZOS)
    webp_1280_path = os.path.join(export_dir, f"{item['key']}-1280.webp")
    im_1280.save(webp_1280_path, 'WEBP', quality=88)
    
    # 3. Mobile Crop
    if item['has_mobile_crop'] and os.path.exists(os.path.join(images_dir, item['mobile_src'])):
        mob_im = Image.open(os.path.join(images_dir, item['mobile_src'])).convert('RGB')
    else:
        # 9:16 Center Crop
        w, h = im_master.size
        target_w = int(h * (9.0 / 16.0))
        left = max(0, (w - target_w) // 2)
        mob_im = im_master.crop((left, 0, left + target_w, h)).resize((720, 1280), Image.Resampling.LANCZOS)
        
    mob_jpg_path = os.path.join(export_dir, f"{item['key']}-mobile.jpg")
    mob_webp_path = os.path.join(export_dir, f"{item['key']}-mobile.webp")
    mob_avif_path = os.path.join(export_dir, f"{item['key']}-mobile.avif")
    
    mob_im.save(mob_jpg_path, 'JPEG', quality=90)
    mob_im.save(mob_webp_path, 'WEBP', quality=85)
    export_avif(mob_webp_path, mob_avif_path)
    
    manifest_entries.append({
        'type': 'image',
        'key': item['key'],
        'section': item['section'],
        'aspect_ratio': item['aspect'],
        'desktop_file': f"{item['key']}-1920.webp",
        'desktop_avif': f"{item['key']}-1920.avif",
        'desktop_fallback': f"{item['key']}-master.jpg",
        'mobile_file': f"{item['key']}-mobile.webp",
        'mobile_fallback': f"{item['key']}-mobile.jpg",
        'poster': None
    })
    print(f"Exported Image: {item['key']}")

# -------------------------------------------------------------
# 2. VIDEO ASSETS EXPORT
# -------------------------------------------------------------
video_mappings = [
    {
        'key': 's0271-video-hero',
        'src_mp4': 'shot_01_approach.mp4',
        'src_webm': 'shot_01_approach.webm',
        'section': 'Hero Header / Spatial Approach',
        'has_mobile_crop': True
    },
    {
        'key': 's0271-video-technology',
        'src_mp4': 'micro_loop_a_technology_core.mp4',
        'src_webm': 'micro_loop_a_technology_core.webm',
        'section': 'Technology / UAV Hardware Core',
        'has_mobile_crop': True
    },
    {
        'key': 's0271-video-journey',
        'src_mp4': 'micro_loop_b_horizontal_journey.mp4',
        'src_webm': 'micro_loop_b_horizontal_journey.webm',
        'section': 'Service Journey / 5 Plateaus',
        'has_mobile_crop': False
    },
    {
        'key': 's0271-video-before-after',
        'src_mp4': 'micro_loop_c_before_after.mp4',
        'src_webm': 'micro_loop_c_before_after.webm',
        'section': 'Verification Proof / Fixed Before-After',
        'has_mobile_crop': False
    },
    {
        'key': 's0271-video-deliverable-map',
        'src_mp4': 'micro_loop_d_deliverable_map.mp4',
        'src_webm': 'micro_loop_d_deliverable_map.webm',
        'section': 'Deliverables / GIS Cartographic Build',
        'has_mobile_crop': False
    },
    {
        'key': 's0271-video-cta',
        'src_mp4': 'micro_loop_e_cta_portal.mp4',
        'src_webm': 'micro_loop_e_cta_portal.webm',
        'section': 'Bottom Call-to-Action / Survey Portal',
        'has_mobile_crop': True
    }
]

print("\n--- EXPORTING VIDEO VARIANTS ---")
for item in video_mappings:
    src_mp4_path = os.path.join(video_dir, item['src_mp4'])
    src_webm_path = os.path.join(video_dir, item['src_webm'])
    
    # 1. 1080p Master (copy cleanly, strip any audio if any)
    out_1080_mp4 = os.path.join(export_dir, f"{item['key']}-1080p.mp4")
    out_1080_webm = os.path.join(export_dir, f"{item['key']}-1080p.webm")
    
    cmd_copy_mp4 = [ffmpeg_exe, '-y', '-i', src_mp4_path, '-an', '-c:v', 'copy', out_1080_mp4]
    subprocess.run(cmd_copy_mp4, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    cmd_copy_webm = [ffmpeg_exe, '-y', '-i', src_webm_path, '-an', '-c:v', 'copy', out_1080_webm]
    subprocess.run(cmd_copy_webm, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    # 2. 720p Optimized (1280x720)
    out_720_mp4 = os.path.join(export_dir, f"{item['key']}-720p.mp4")
    cmd_720_mp4 = [ffmpeg_exe, '-y', '-i', src_mp4_path, '-an', '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'fast', '-crf', '20', out_720_mp4]
    subprocess.run(cmd_720_mp4, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    out_720_webm = os.path.join(export_dir, f"{item['key']}-720p.webm")
    cmd_720_webm = [ffmpeg_exe, '-y', '-i', src_webm_path, '-an', '-vf', 'scale=1280:720', '-c:v', 'libvpx-vp9', '-b:v', '1M', '-crf', '28', out_720_webm]
    subprocess.run(cmd_720_webm, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    # 3. Poster Image (First frame in WebP & JPG)
    poster_jpg = os.path.join(export_dir, f"{item['key']}-poster.jpg")
    cmd_poster_jpg = [ffmpeg_exe, '-y', '-i', src_mp4_path, '-vframes', '1', '-q:v', '2', poster_jpg]
    subprocess.run(cmd_poster_jpg, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    poster_webp = os.path.join(export_dir, f"{item['key']}-poster.webp")
    poster_im = Image.open(poster_jpg)
    poster_im.save(poster_webp, 'WEBP', quality=88)
    
    # 4. Mobile Crop (720x1280 9:16 centered crop) if applicable
    mobile_mp4 = None
    mobile_webm = None
    if item['has_mobile_crop']:
        mobile_mp4 = f"{item['key']}-mobile.mp4"
        mobile_webm = f"{item['key']}-mobile.webm"
        out_mob_mp4 = os.path.join(export_dir, mobile_mp4)
        out_mob_webm = os.path.join(export_dir, mobile_webm)
        
        cmd_mob_mp4 = [
            ffmpeg_exe, '-y', '-i', src_mp4_path, '-an',
            '-vf', 'crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=720:1280',
            '-c:v', 'libx264', '-preset', 'fast', '-crf', '20',
            out_mob_mp4
        ]
        subprocess.run(cmd_mob_mp4, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        cmd_mob_webm = [
            ffmpeg_exe, '-y', '-i', src_webm_path, '-an',
            '-vf', 'crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=720:1280',
            '-c:v', 'libvpx-vp9', '-b:v', '1M', '-crf', '28',
            out_mob_webm
        ]
        subprocess.run(cmd_mob_webm, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    manifest_entries.append({
        'type': 'video',
        'key': item['key'],
        'section': item['section'],
        'aspect_ratio': '16:9 (Desktop) / 9:16 (Mobile)' if item['has_mobile_crop'] else '16:9',
        'master_1080p_mp4': f"{item['key']}-1080p.mp4",
        'master_1080p_webm': f"{item['key']}-1080p.webm",
        'optimized_720p_mp4': f"{item['key']}-720p.mp4",
        'optimized_720p_webm': f"{item['key']}-720p.webm",
        'mobile_mp4': mobile_mp4,
        'mobile_webm': mobile_webm,
        'poster_file': f"{item['key']}-poster.webp",
        'poster_fallback': f"{item['key']}-poster.jpg"
    })
    print(f"Exported Video: {item['key']}")

# Save Manifest JSON
manifest_json_path = os.path.join(export_dir, 's0271_web_manifest.json')
with open(manifest_json_path, 'w', encoding='utf-8') as f:
    json.dump(manifest_entries, f, indent=2, ensure_ascii=False)

shutil.copy2(manifest_json_path, os.path.join(artifact_dir, 's0271_web_manifest.json'))

print("\n--- WEB EXPORT COMPLETED SUCCESSFULLY ---")
print(f"Manifest saved to: {manifest_json_path}")
print(f"Total entries in manifest: {len(manifest_entries)}")
