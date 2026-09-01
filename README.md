# EventPulse Portal

Vue 3 + Vite frontend for [eventpulse-api](https://github.com/victor-butita/eventpulse-api).

- Local: `http://localhost:5173`
- API: `https://eventpulse-api-production-259f.up.railway.app`

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

`VITE_API_BASE_URL` must be the API origin **without** a trailing slash, using **https**.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite on port 5173 |
| `npm run typecheck` | `vue-tsc --noEmit` |
| `npm run build` | Typecheck + production bundle in `dist/` |
| `npm run preview` | Serve `dist/` on 4173 |

CI (GitHub Actions) runs `npm ci`, `typecheck`, and `build` on `main` and pull requests.

## Deploy on Vercel

1. Push this repo to GitHub (`victor-butita/event-pulse-portal`).
2. In [Vercel](https://vercel.com) → **Add New** → **Project** → import `event-pulse-portal`.
3. Framework preset: **Vite**. Build command `npm run build`. Output `dist`.
4. Environment variable (Production **and** Preview):

   | Name | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://eventpulse-api-production-259f.up.railway.app` |

5. Deploy. The site URL will look like `https://event-pulse-portal.vercel.app`.
6. The API already allows `https://*.vercel.app` via CORS. If you later attach a custom domain, add that exact origin to `CorsOrigins` in eventpulse-api and redeploy the API.

`vercel.json` rewrites unknown paths to `index.html` so Vue Router history mode works.

## API used

| Method | Path | Notes |
|---|---|---|
| GET | `/api/v1/health` | Home page status |
| POST | `/api/auth/register` | email, password (≥ 8), role `ATTENDEE` or `ORGANIZER` |
| POST | `/api/auth/login` | JWT stored in `localStorage` |
| GET | `/api/events` | Public paginated list |
