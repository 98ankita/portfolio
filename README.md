# Ankita Doddihal — Portfolio

Ocean-themed personal portfolio. Plain HTML, CSS, and JavaScript — no build step.

## Run locally

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Moving-water background

The background uses `assets/water.mp4` (generated from `assets/bg-ocean.png` by
`make_water.py`). If that file is missing, the site falls back to animated CSS water.

- Replace `assets/water.mp4` with any looping clip, or run `python3 make_water.py`
  to regenerate it.

## Publish on GitHub Pages

1. Push this repo to GitHub (GitHub Desktop or `git push`)
2. **Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save**
3. Site URL: `https://98ankita.github.io/<repo-name>/`
