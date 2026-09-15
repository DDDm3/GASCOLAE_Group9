from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import struct
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "src"


def rgb(hex_color: str) -> tuple[int, int, int]:
    return tuple(int(hex_color[index:index + 2], 16) for index in (1, 3, 5))


def channel(value: int) -> float:
    normalized = value / 255
    return normalized / 12.92 if normalized <= 0.04045 else ((normalized + 0.055) / 1.055) ** 2.4


def luminance(color: tuple[int, int, int]) -> float:
    red, green, blue = color
    return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue)


def contrast(foreground: str, background: str) -> float:
    high, low = sorted((luminance(rgb(foreground)), luminance(rgb(background))), reverse=True)
    return (high + 0.05) / (low + 0.05)


def composite(foreground: str, background: str, alpha: float) -> str:
    values = [round(alpha * first + (1 - alpha) * second) for first, second in zip(rgb(foreground), rgb(background))]
    return "#" + "".join(f"{value:02x}" for value in values)


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.labels: set[str] = set()
        self.controls: list[dict[str, str | None]] = []
        self.images: list[dict[str, str | None]] = []
        self.headings: list[int] = []
        self.sections: list[dict[str, str | None]] = []
        self.scripts: list[dict[str, str | None]] = []
        self.videos: list[dict[str, str | None]] = []
        self.track_count = 0

    def handle_starttag(self, tag: str, attrs_list: list[tuple[str, str | None]]) -> None:
        attrs = dict(attrs_list)
        if attrs.get("id"): self.ids.add(str(attrs["id"]))
        if tag == "label" and attrs.get("for"): self.labels.add(str(attrs["for"]))
        if tag in {"input", "textarea", "select"}: self.controls.append(attrs)
        if tag == "img": self.images.append(attrs)
        if re.fullmatch(r"h[1-6]", tag): self.headings.append(int(tag[1]))
        if tag == "section": self.sections.append(attrs)
        if tag == "script": self.scripts.append(attrs)
        if tag == "video": self.videos.append(attrs)
        if tag == "track": self.track_count += 1


class QualityAuditTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.html = (PUBLIC / "index.html").read_text(encoding="utf-8")
        cls.css = (PUBLIC / "css" / "styles.css").read_text(encoding="utf-8")
        cls.js = (PUBLIC / "js" / "main.js").read_text(encoding="utf-8")
        cls.parser = AuditParser()
        cls.parser.feed(cls.html)

    def test_known_text_color_pairs_meet_4_5_to_1(self) -> None:
        pairs = {
            "ink/paper": ("#292d24", "#f5f2e9"),
            "olive/paper": ("#59633d", "#f5f2e9"),
            "paper/olive": ("#f5f2e9", "#59633d"),
            "paper/forest": ("#f5f2e9", "#313a25"),
            "clay-strong/paper": ("#93452f", "#f5f2e9"),
            "clay-light/forest": ("#e1a086", "#313a25"),
            "placeholder/paper": (composite("#292d24", "#f5f2e9", 0.70), "#f5f2e9"),
            "price-label/sand": (composite("#292d24", "#e7e1d3", 0.72), "#e7e1d3"),
        }
        for name, (foreground, background) in pairs.items():
            with self.subTest(pair=name): self.assertGreaterEqual(contrast(foreground, background), 4.5)

    def test_heading_outline_and_section_names(self) -> None:
        self.assertEqual(self.parser.headings.count(1), 1)
        for previous, current in zip(self.parser.headings, self.parser.headings[1:]):
            self.assertLessEqual(current - previous, 1)
        for section in self.parser.sections:
            label_id = section.get("aria-labelledby")
            self.assertTrue(label_id)
            self.assertIn(label_id, self.parser.ids)

    def test_form_controls_have_programmatic_labels(self) -> None:
        for control in self.parser.controls:
            control_id = control.get("id")
            self.assertTrue(control_id)
            self.assertIn(control_id, self.parser.labels)
        self.assertIn('role="status" aria-live="polite"', self.html)

    def test_images_have_intrinsic_dimensions_and_loading_strategy(self) -> None:
        for image in self.parser.images:
            source = image.get("src")
            self.assertTrue(source)
            image_path = PUBLIC / str(source)
            with Image.open(image_path) as asset:
                self.assertEqual((int(str(image["width"])), int(str(image["height"]))), asset.size)
            if source == "assets/images/S0283_1.jpg" and image.get("fetchpriority") == "high":
                self.assertNotEqual(image.get("loading"), "lazy")
            elif source != "assets/logo/LOGO_no-bg.png":
                self.assertEqual(image.get("loading"), "lazy")

    def test_critical_local_asset_budget_is_recorded(self) -> None:
        critical = [
            PUBLIC / "index.html",
            PUBLIC / "css" / "styles.css",
            PUBLIC / "js" / "main.js",
            PUBLIC / "assets" / "logo" / "LOGO_no-bg.png",
            PUBLIC / "assets" / "logo" / "logo.png",
            PUBLIC / "assets" / "images" / "S0283_1.jpg",
        ]
        total = sum(path.stat().st_size for path in critical)
        self.assertLess(total, 450_000)

    def test_video_uses_metadata_preload_and_fast_start(self) -> None:
        self.assertEqual(len(self.parser.videos), 1)
        video = self.parser.videos[0]
        self.assertEqual(video.get("preload"), "metadata")
        self.assertIn("controls", video)
        self.assertNotIn("autoplay", video)
        data = (PUBLIC / "assets" / "videos" / "vegetation-monitoring.mp4").read_bytes()
        self.assertGreater(data.find(b"moov"), 0)
        self.assertLess(data.find(b"moov"), data.find(b"mdat"))
        self.assertIn(b"soun", data)

    def test_no_external_runtime_or_unsafe_browser_apis(self) -> None:
        self.assertFalse(re.search(r'''(?:src|href)=["']https?://''', self.html))
        self.assertEqual(len(self.parser.scripts), 1)
        self.assertIn("defer", self.parser.scripts[0])
        for forbidden in ("document.write", "innerHTML", "eval(", "XMLHttpRequest", "fetch("):
            self.assertNotIn(forbidden, self.js)
        self.assertNotIn("@import", self.css)

    def test_public_tree_has_no_internal_documents(self) -> None:
        forbidden = {".docx", ".xlsx", ".xlsm", ".pptx"}
        self.assertFalse(any(path.suffix.lower() in forbidden for path in PUBLIC.rglob("*") if path.is_file()))
        self.assertNotRegex(self.html.lower(), r"mailto:|tel:|example\.com|real.?time|testimonial")


if __name__ == "__main__":
    unittest.main(verbosity=2)
