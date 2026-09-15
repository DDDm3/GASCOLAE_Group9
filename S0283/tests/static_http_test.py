from __future__ import annotations

import contextlib
import functools
import http.server
from html.parser import HTMLParser
from pathlib import Path
import socketserver
import threading
import unittest
import urllib.request


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "src"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.anchors: list[str] = []
        self.resources: list[str] = []
        self.details = 0
        self.summaries = 0
        self.images: list[dict[str, str | None]] = []
        self.videos: list[dict[str, str | None]] = []
        self.inputs: list[dict[str, str | None]] = []
        self.scripts: list[str] = []
        self.stylesheets: list[str] = []
        self.meta_description = False
        self.title_depth = 0
        self.title = ""

    def handle_starttag(self, tag: str, attrs_list: list[tuple[str, str | None]]) -> None:
        attrs = dict(attrs_list)
        if attrs.get("id"):
            self.ids.append(str(attrs["id"]))
        href = attrs.get("href")
        if tag == "a" and href and href.startswith("#"):
            self.anchors.append(href)
        if tag == "link" and href:
            self.resources.append(href)
            if attrs.get("rel") == "stylesheet":
                self.stylesheets.append(href)
        for key in ("src", "poster"):
            if attrs.get(key):
                self.resources.append(str(attrs[key]))
        if attrs.get("srcset"):
            self.resources.append(str(attrs["srcset"]).split()[0])
        if tag == "details": self.details += 1
        if tag == "summary": self.summaries += 1
        if tag == "img": self.images.append(attrs)
        if tag == "video": self.videos.append(attrs)
        if tag == "input": self.inputs.append(attrs)
        if tag == "script" and attrs.get("src"): self.scripts.append(str(attrs["src"]))
        if tag == "meta" and attrs.get("name") == "description" and attrs.get("content"):
            self.meta_description = True
        if tag == "title": self.title_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "title": self.title_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.title_depth: self.title += data


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_args: object) -> None:
        pass


class FunctionalStaticTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.html = (PUBLIC / "index.html").read_text(encoding="utf-8")
        cls.css = (PUBLIC / "css" / "styles.css").read_text(encoding="utf-8")
        cls.js = (PUBLIC / "js" / "main.js").read_text(encoding="utf-8")
        cls.parser = PageParser()
        cls.parser.feed(cls.html)
        handler = functools.partial(QuietHandler, directory=str(PUBLIC))
        cls.server = socketserver.TCPServer(("127.0.0.1", 0), handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base_url = f"http://127.0.0.1:{cls.server.server_address[1]}"

    @classmethod
    def tearDownClass(cls) -> None:
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=2)

    def test_internal_anchors_are_unique_and_resolve(self) -> None:
        self.assertEqual(len(self.parser.ids), len(set(self.parser.ids)))
        missing = sorted({anchor[1:] for anchor in self.parser.anchors} - set(self.parser.ids))
        self.assertEqual(missing, [])
        self.assertIn("[id] { scroll-margin-top: var(--header-offset); }", self.css)

    def test_ctas_target_contact_or_results(self) -> None:
        self.assertGreaterEqual(self.html.count('href="#lien-he"'), 8)
        self.assertGreaterEqual(self.html.count('href="#ket-qua"'), 2)

    def test_package_prices_match_published_proposals(self) -> None:
        for price in ("65 triệu VNĐ", "165 triệu VNĐ", "420 triệu VNĐ"):
            self.assertEqual(self.html.count(f"<strong>{price}</strong>"), 1)
        self.assertEqual(self.html.count("Giá đề xuất"), 3)
        self.assertNotIn('<span>Giá</span> Liên hệ tư vấn', self.html)

    def test_no_js_content_and_native_faq_are_present(self) -> None:
        self.assertEqual(self.parser.details, 5)
        self.assertEqual(self.parser.summaries, 5)
        self.assertIn("comparison-grid comparison-fallback", self.html)
        self.assertIn(".js .comparison-fallback { display: none; }", self.css)
        self.assertNotIn(".comparison-fallback { display: none; }", self.css.replace(".js .comparison-fallback { display: none; }", ""))
        self.assertIn('data-demo-submit type="button"', self.html)

    def test_range_and_form_semantics(self) -> None:
        ranges = [attrs for attrs in self.parser.inputs if attrs.get("type") == "range"]
        self.assertEqual(len(ranges), 1)
        self.assertEqual((ranges[0].get("min"), ranges[0].get("max"), ranges[0].get("value")), ("0", "100", "50"))
        for field_id in ("ho-ten", "aoi", "muc-tieu"):
            self.assertRegex(self.html, rf'id="{field_id}"[^>]*required')
        self.assertIn('role="status" aria-live="polite"', self.html)
        for forbidden in ("fetch(", "XMLHttpRequest", "localStorage", "sessionStorage"):
            self.assertNotIn(forbidden, self.js)

    def test_accessibility_and_metadata_structure(self) -> None:
        self.assertTrue(self.parser.meta_description)
        self.assertTrue(self.parser.title.strip())
        self.assertIn('class="skip-link"', self.html)
        self.assertIn(":focus-visible", self.css)
        self.assertIn("@media (prefers-reduced-motion: reduce)", self.css)
        self.assertEqual(self.html.count('class="legend-symbol'), 4)
        for image in self.parser.images:
            self.assertIn("alt", image)
            self.assertTrue(image.get("width"))
            self.assertTrue(image.get("height"))
        self.assertEqual(len(self.parser.videos), 1)
        self.assertIn("controls", self.parser.videos[0])
        self.assertNotIn("autoplay", self.parser.videos[0])

    def test_all_local_resources_return_http_200(self) -> None:
        resources = sorted(set(self.parser.resources + self.parser.scripts + self.parser.stylesheets))
        self.assertEqual(len(resources), 15)
        for resource in resources:
            with self.subTest(resource=resource):
                request = urllib.request.Request(f"{self.base_url}/{resource}", method="HEAD")
                with contextlib.closing(urllib.request.urlopen(request, timeout=5)) as response:
                    self.assertEqual(response.status, 200)
                    self.assertGreater(int(response.headers.get("Content-Length", "1")), 0)

    def test_internal_docs_are_not_public(self) -> None:
        with self.assertRaises(urllib.error.HTTPError) as raised:
            urllib.request.urlopen(f"{self.base_url}/docs/implementation-status.md", timeout=5)
        self.assertEqual(raised.exception.code, 404)
        raised.exception.close()

    def test_public_bundle_has_no_office_files_or_placeholder_contacts(self) -> None:
        public_files = [path for path in PUBLIC.rglob("*") if path.is_file()]
        self.assertFalse(any(path.suffix.lower() in {".docx", ".xlsx", ".xlsm", ".pptx"} for path in public_files))
        for forbidden in ("example.com", "mailto:", "tel:"):
            self.assertNotIn(forbidden, self.html)


if __name__ == "__main__":
    unittest.main(verbosity=2)
