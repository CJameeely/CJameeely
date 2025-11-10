from __future__ import annotations

import shutil
import sys
from datetime import datetime
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

BASE_DIR = Path(__file__).resolve().parents[1]
if str(BASE_DIR) not in sys.path:
    sys.path.append(str(BASE_DIR))

from site_data import NAV_STRUCTURE, PAGES, SITE_META  # noqa: E402
DIST_DIR = BASE_DIR / "dist"
ASSETS_DIR = BASE_DIR / "assets"
TEMPLATES_DIR = BASE_DIR / "templates"


def build_site() -> None:
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
    DIST_DIR.mkdir(parents=True)

    env = Environment(
        loader=FileSystemLoader(str(TEMPLATES_DIR)),
        autoescape=select_autoescape(["html", "xml"]),
        trim_blocks=True,
        lstrip_blocks=True,
    )
    template = env.get_template("base.html")

    nav_with_lookup = []
    for group in NAV_STRUCTURE:
        group_copy = dict(group)
        slug_set = {group["slug"]}
        for item in group["items"]:
            slug_set.add(item["slug"])
        group_copy["all_slugs"] = slug_set
        nav_with_lookup.append(group_copy)

    for page in PAGES:
        html = template.render(
            page=page,
            nav_structure=nav_with_lookup,
            site_meta=SITE_META,
            current_year=datetime.now().year,
        )
        output_path = DIST_DIR / page["filename"]
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(html, encoding="utf-8")

    shutil.copytree(ASSETS_DIR, DIST_DIR / "assets")


if __name__ == "__main__":
    build_site()
