# CJ Li Portfolio Site

This project rebuilds the structure of https://www.maiwenting.com/ for artist CJ Li with matching navigation (Units 1–3), dropdown menus, and individual pages for statements, reflections, contexts, and works. Content is rewritten to reflect CJ Li while keeping the referenced format.

## Structure

- `site_data.py` – central place for navigation groups and per-page content.
- `templates/base.html` – Jinja template shared by every page.
- `assets/` – global CSS and JavaScript for layout, typography, and menu behavior.
- `scripts/build_site.py` – renders the template with the data into static files.
- `dist/` – generated site ready for deployment.
- `reference/` – original Mai Wenting pages saved for comparison (not published).

## Building

```bash
cd /Users/cj/Desktop/CJameeely
python3 scripts/build_site.py
```

The command wipes and recreates `dist/`, so serve or deploy everything inside that folder (e.g., `dist/index.html`).

## Customizing

- Update copy, section layout, or add/remove pages inside `site_data.py`.
- Adjust the shared UI in `templates/base.html`.
- Extend styling or behavior via files in `assets/`, then rebuild.
