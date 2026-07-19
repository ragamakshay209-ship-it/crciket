# CreaseHub

A cricket hub with live scores and AI-generated match insights. Node/Express backend, React (Vite) frontend.

## Structure

```
cricket-hub/
  backend/     Express API — match data + AI insights endpoint
  frontend/    React app (Vite) — scoreboard UI
```

## Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and set `ANTHROPIC_API_KEY` to a real key from console.anthropic.com. Then:

```bash
npm run dev
```

Runs on `http://localhost:4000`.

### API endpoints

- `GET /api/health` — health check
- `GET /api/matches` — list all matches
- `GET /api/matches/:id` — single match detail
- `POST /api/matches/:id/insights` — generates AI insights for that match (calls Claude)

## Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` and proxies `/api` requests to the backend (see `vite.config.js`).

## Notes

- Match data in `backend/data/matches.js` is mocked. To go live, replace `getMatches()` / `getMatchById()` with calls to a real provider (CricAPI, Cricbuzz unofficial API, SportRadar, etc.) — the route layer and frontend don't need to change.
- The Anthropic API key lives only on the backend (`.env`), never in frontend code, so it's never exposed to the browser.
- To deploy: host `backend/` as a Node service (e.g. Render, Railway) and set `ANTHROPIC_API_KEY` + `CORS_ORIGIN` there; build the frontend with `npm run build` in `frontend/` and serve `frontend/dist` as a static site, pointing it at the backend's public URL.
