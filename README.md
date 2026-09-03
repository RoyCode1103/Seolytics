# SEOlytics

SEOlytics is a full-stack SEO auditing and rank tracking platform. It scrapes a live web page in a real browser, runs the extracted data through Google's Gemini AI for a scored audit and actionable recommendations, and tracks a site's Google search ranking for chosen keywords over time.

## Features

- **JWT Authentication** — register/login with hashed passwords (bcrypt) and protected API routes.
- **AI-Powered SEO Audit** — headless-browser scraping (Browserbase + Playwright) feeds meta tags, headings, links, images, load time, and page content to Gemini, which returns an overall score, per-category scores (SEO, performance, accessibility, best practices), prioritized issues, and keyword density.
- **Keyword Rank Tracking** — track a keyword/domain pair's live position in Google search results, with historical position data, best rank achieved, position change over time, and competitor listings.
- **Automated Daily Checks** — a cron job re-checks all active tracked keywords every day at 06:00.
- **Analysis History** — paginated list of past audits with the ability to revisit or delete any report.
- **Dashboard UI** — React + Tailwind CSS frontend with score gauges, issue cards, and light/dark theming.

## Tech Stack

**Frontend**
- React 19 + TypeScript, Vite
- React Router v7
- Tailwind CSS v4
- Axios, React Hot Toast, Lucide icons

**Backend**
- Node.js (ESM) + Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) + `bcrypt` for auth
- `node-cron` for scheduled rank checks

**External Services**
- [Google Gemini API](https://ai.google.dev/) (`@google/genai`) — AI SEO analysis
- [Browserbase](https://www.browserbase.com/) + `playwright-core` — remote headless browser for scraping Google search results and target pages

## Project Structure

```
SEOlytics/
├── client/                      # React + Vite frontend
│   └── src/
│       ├── components/          # Navbar, ScoreGauge, IssueCard, home sections, etc.
│       ├── context/              # AppContext (auth/user state), ThemeContext
│       └── pages/                # Home, Login, Dashboard, Analyze, Report, History,
│                                  # RankTracker, RankDetail
└── server/                      # Express API
    ├── config/db.js              # MongoDB connection
    ├── controllers/              # authController, analysisController, rankController
    ├── middleware/auth.js        # JWT verification middleware
    ├── models/                   # User, Analysis, KeywordTracking (Mongoose schemas)
    ├── routes/                   # authRoutes, analysisRoutes, rankRoutes
    ├── services/                 # scraperService, geminiService, rankTrackerService,
    │                              # keywordTrackingService
    ├── cron/rankTrackingCron.js  # Daily automated rank re-check
    └── server.js                 # App entry point
```

## Prerequisites

- Node.js 18+ and npm
- A MongoDB instance (local or Atlas)
- A [Google Gemini API key](https://ai.google.dev/)
- A [Browserbase](https://www.browserbase.com/) API key

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd SEOlytics

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure environment variables

**`server/.env`**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret
BROWSERBASE_API_KEY=your_browserbase_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

**`client/.env`**
```env
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Run the app

```bash
# Terminal 1 — start the API server (from /server)
npm run server      # nodemon, auto-restart
# or
npm start            # plain node

# Terminal 2 — start the frontend (from /client)
npm run dev
```

The client runs on Vite's default port (typically `http://localhost:5173`) and talks to the API at `VITE_BACKEND_URL`.

## API Overview

All routes below `/api` except `/register` and `/login` require a `Bearer <token>` header.

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Create a new account |
| POST | `/login` | Authenticate and receive a JWT |
| GET | `/user` | Get the current authenticated user |

### SEO Analysis — `/api/analysis`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/analyze` | Start an SEO audit for a URL (runs asynchronously) |
| GET | `/list` | Paginated list of the user's past analyses |
| GET | `/:id` | Get a single analysis report |
| DELETE | `/:id` | Delete an analysis |

### Rank Tracking — `/api/rank`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/add` | Start tracking a keyword for a domain |
| GET | `/list` | List all tracked keywords |
| GET | `/:id` | Get a tracked keyword's full rank history |
| POST | `/:id/refresh` | Manually trigger a rank re-check |
| PUT | `/:id/toggle` | Enable/disable tracking for a keyword |
| DELETE | `/:id` | Stop tracking a keyword |

## How It Works

1. **Analyze**: A URL is submitted → an `Analysis` record is created with `status: "processing"` and the ID is returned immediately → in the background, Browserbase/Playwright loads the page and extracts meta tags, headings, links, images, and content → Gemini scores the page and generates issues/recommendations → the record is updated to `status: "completed"`.
2. **Rank Tracking**: A keyword + target URL is submitted → the domain is extracted → a headless browser searches Google (up to 5 result pages) for the keyword → the target domain's position and top competitors are recorded → results are stored with a daily history entry, and the process repeats automatically via cron.

## Deployment

The included `client/vercel.json` configures SPA rewrites for deploying the frontend to Vercel. The backend can be deployed to any Node-compatible host (Render, Railway, Fly.io, a VPS, etc.) — just set the same environment variables listed above.

## License

ISC
