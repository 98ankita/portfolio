# 🌊 Ankita Doddihal — Ocean Portfolio

A cute, colorful underwater-themed personal portfolio. Simple, crisp content;
animated fishes, a whale, jellyfish, seashells, and rising bubbles.

Built with plain **HTML + CSS + JavaScript** — no build step, no dependencies.

## Run it

Just open `index.html` in a browser. Or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customize (look for `TODO` in the files)

- **Your photo** → drop it in `assets/` as `ankita.jpg` (round bubble on the hero).
  To use a different name/format, update the `src` in `index.html`.
- **Experience** → edit the `.timeline` section in `index.html` (Starbucks is set;
  duplicate the job template for earlier roles).
- **Tableau projects** → update the two `.card.tableau` titles + links.
- **GitHub projects** → update the two `.card.github` links (descriptions are written).
- **Contact** → set your GitHub URL and email in the footer (`#contact`).

## Auto-updating years of experience

The "5+ years" number lives in `script.js` and **increments automatically every
January 1st**. It's anchored at 5 years as of 2026, so it becomes 6 in 2027, and
so on — no manual edits needed.

## Moving-water background video

The background uses a looping clip at `assets/water.mp4` (generated from
`assets/bg-ocean.png` by `make_water.py`). If that file is ever missing, the site
automatically falls back to the animated CSS water — nothing breaks.

- To use your own clip: replace `assets/water.mp4` with any looping `.mp4`.
- To regenerate the synthesized loop: `python3 make_water.py`

## Deploy

Works as-is on **GitHub Pages**, **Netlify**, or **Vercel** — just upload the folder.
