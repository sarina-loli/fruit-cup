# Fruit Cup

Two pages (Home, About) built with **React + Vite** and a **Django REST Framework** API.
The Home page pins a canvas for 350vh of scroll and maps scroll position to a 72-frame image sequence.

```
fruit-cup/
├── backend/    Django + DRF API (content for both pages)
└── frontend/   React app (Vite, React Router, Axios)
```

## Requirements
- Python 3.10+
- Node.js 18+ (npm)

## 1. Backend (terminal 1)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate           # creates the DB and seeds the page copy
python manage.py runserver         # http://localhost:8000
```

Check it: <http://localhost:8000/api/home/> and <http://localhost:8000/api/about/>.

Optional, to edit the copy in the browser:

```bash
python manage.py createsuperuser
# then open http://localhost:8000/admin/
```

## 2. Frontend (terminal 2)

```bash
cd frontend
npm install
npm run dev                        # http://localhost:5173
```

Open <http://localhost:5173>. If your API is not at `http://localhost:8000/api`,
copy `.env.example` to `.env` and change `VITE_API_BASE_URL`.

Production build: `npm run build` (output in `frontend/dist`).

## API

| Endpoint      | Method | Returns                                                        |
|---------------|--------|----------------------------------------------------------------|
| `/api/home/`  | GET    | hero heading, description, button label, scroll hint, closing line |
| `/api/about/` | GET    | page title, lead, and an ordered list of `{id, heading, body}` sections |

CORS allows `http://localhost:5173` and `http://127.0.0.1:5173` (GET only, `/api/*` only).
Override with `CORS_ALLOWED_ORIGINS="https://a.example,https://b.example"`.

## How the animation works

- `frontend/public/frames/frame-0001.jpg … frame-0072.jpg` are the original frames from the ZIP, untouched.
- `src/lib/FrameStore.js` downloads them in a coarse-to-fine order (first, last, every 16th, 8th, 4th, ...),
  decodes each to an `ImageBitmap` off the main thread, retries once on failure, and tolerates missing frames.
  Frames are decoded at the size the screen needs (capped at native 1920px), so phones use far less memory.
- `src/lib/createSequenceRenderer.js` owns scrolling and drawing outside React:
  scroll position -> eased progress -> fractional frame index -> two neighbouring frames cross-faded on the canvas.
  The `requestAnimationFrame` loop sleeps when the animation has settled.
- `src/components/ScrollSequence.jsx` is the thin React wrapper (the pinned `position: sticky` stage, loading bar, error message).

Tuning lives in `src/config/sequence.js` (pin length, easing speed, copy-swap thresholds, parallel downloads).
