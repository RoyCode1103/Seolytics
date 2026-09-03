# SEOlytics

SEOlytics is a full-stack AI-powered SEO analysis and keyword rank tracking platform. It allows users to analyze websites, identify SEO issues, view performance insights, and monitor keyword rankings over time.

## ✨ Features

- 🔐 **User authentication** with JWT
- 🌐 **Website SEO analysis** using a URL
- 🤖 **AI-powered SEO scoring** using Google Gemini
- 📊 **Overall SEO score** with category-wise scoring
- 🔍 **SEO issue detection** and recommendations
- ⚡ **Performance analysis** of webpages
- ♿ **Accessibility analysis**
- 🛠️ **Best practices analysis**
- 🔑 **Keyword extraction and analysis**
- 📈 **Keyword rank tracking** on Google
- 🏆 **Competitor tracking** for tracked keywords
- 📜 **Rank history** for monitored keywords
- 🔄 **Manual rank refresh**
- ⏱️ **Automatic rank tracking** using scheduled cron jobs
- 📋 **Analysis history** with pagination
- 📊 **Dashboard** for viewing previous analyses
- 🗑️ **Delete previous analyses**
- 🎨 **Responsive UI** with light/dark theme support
- ⚡ **React + Vite** frontend
- 🚀 **Express.js REST API** backend
- 🗄️ **MongoDB** for storing users, analyses, and keyword tracking data

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Axios
- Node-Cron
- Playwright Core
- Browserbase SDK
- Google Gemini API

### External Services

- **Google Gemini API** — AI-powered SEO analysis
- **Browserbase** — browser automation infrastructure
- **Playwright** — webpage scraping and Google search automation
- **MongoDB Atlas** — database hosting

## 📁 Project Structure

```text
SEOlytics/
│
├── client/                              # React + Vite frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── home/
│       │   │   ├── Features.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── Hero.tsx
│       │   │   ├── HowItWorks.tsx
│       │   │   └── Pricing.tsx
│       │   ├── AnalysesCard.tsx
│       │   ├── IssueCard.tsx
│       │   ├── Loading.tsx
│       │   ├── Navbar.tsx
│       │   ├── ProtectedRoute.tsx
│       │   └── ScoreGauge.tsx
│       ├── context/
│       │   ├── AppContext.tsx
│       │   └── ThemeContext.tsx
│       ├── pages/
│       │   ├── Analyze.tsx
│       │   ├── Dashboard.tsx
│       │   ├── History.tsx
│       │   ├── Home.tsx
│       │   ├── Login.tsx
│       │   ├── RankDetail.tsx
│       │   ├── RankTracker.tsx
│       │   └── Report.tsx
│       ├── App.tsx
│       └── main.tsx
│
├── server/                              # Express backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── analysisController.js
│   │   ├── authController.js
│   │   └── rankController.js
│   ├── cron/
│   │   └── rankTrackingCron.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Analysis.js
│   │   ├── User.js
│   │   └── keywordTracking.js
│   ├── routes/
│   │   ├── analysisRoutes.js
│   │   ├── authRoutes.js
│   │   └── rankRoutes.js
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── keywordTrackingService.js
│   │   ├── rankTrackerService.js
│   │   └── scraperService.js
│   └── server.js
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RoyCode1103/SEOlytics.git
cd SEOlytics
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

## 🔑 Environment Variables

Do **not** commit your `.env` files or API keys to GitHub.

### Frontend

Create:

```text
client/.env
```

Add:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Backend

Create:

```text
server/.env
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BROWSERBASE_API_KEY=your_browserbase_api_key
GEMINI_API_KEY=your_gemini_api_key
```

> Use your own MongoDB, Browserbase, and Google Gemini credentials.

## 🗄️ Database

SEOlytics uses **MongoDB with Mongoose**.

The application stores:

- User information
- Website analyses
- SEO scores
- Category scores
- Keywords
- SEO issues
- Analysis status
- Scraped webpage information
- Keyword rankings
- Competitors
- Ranking history
- Tracking status

The database connection is configured in:

```text
server/config/db.js
```

## ▶️ Running Locally

### Start the backend

From `server/`:

```bash
npm run server
```

For normal execution:

```bash
npm start
```

### Start the frontend

From `client/`:

```bash
npm run dev
```

The frontend communicates with the backend using:

```env
VITE_BACKEND_URL
```

## 🔌 API Endpoints

Protected endpoints require:

```text
Authorization: Bearer <JWT_TOKEN>
```

### Authentication Routes

Base URL:

```text
/api/auth
```

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login user |
| GET | `/user` | Get authenticated user |

### Analysis Routes

Base URL:

```text
/api/analysis
```

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/analyze` | Analyze a website |
| GET | `/:id` | Get a specific analysis |
| GET | `/list` | Get user's analysis history |
| DELETE | `/:id` | Delete an analysis |

### Rank Tracking Routes

Base URL:

```text
/api/rank
```

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/add` | Add a keyword for tracking |
| GET | `/list` | Get tracked keywords |
| GET | `/:id` | Get rank tracking details |
| POST | `/:id/refresh` | Refresh keyword ranking |
| PUT | `/:id/toggle` | Enable/disable tracking |
| DELETE | `/:id` | Delete tracked keyword |

## 🔐 Authentication

SEOlytics uses **JWT-based authentication**.

```text
User
  ↓
Register / Login
  ↓
Backend validates credentials
  ↓
JWT token generated
  ↓
Token stored by frontend
  ↓
Protected API requests
  ↓
JWT authentication middleware
  ↓
User-specific data returned
```

Passwords are hashed using **bcrypt**.

Protected routes use:

```text
server/middleware/auth.js
```

## 🔍 Website SEO Analysis

```text
User enters website URL
        ↓
POST /api/analysis/analyze
        ↓
Backend validates request
        ↓
Browserbase session
        ↓
Playwright loads webpage
        ↓
Website data is extracted
        ↓
Scraped data sent to Gemini
        ↓
AI analyzes SEO performance
        ↓
Scores and issues generated
        ↓
Analysis saved in MongoDB
        ↓
Result displayed in React
```

## 🕷️ Website Scraping

SEOlytics uses **Browserbase + Playwright** to inspect webpages.

The scraper collects:

- Page title
- Meta description
- Canonical URL
- Robots meta tag
- Open Graph tags
- Twitter metadata
- Viewport configuration
- Character encoding
- Headings
- Links
- Images
- Body text
- Word count
- Page size
- Load time
- HTTP status

Scraping logic:

```text
server/services/scraperService.js
```

## 🤖 AI SEO Analysis

The scraped webpage information is sent to the **Google Gemini API**.

The AI evaluates:

- SEO
- Performance
- Accessibility
- Best Practices

The system generates:

```text
Overall Score
      +
Category Scores
      +
Keywords
      +
SEO Issues
      +
Recommendations
```

Gemini integration:

```text
server/services/geminiService.js
```

## 📊 SEO Score

The overall score is calculated from the category scores and displayed using:

```text
client/src/components/ScoreGauge.tsx
```

| Category | Description |
|---|---|
| SEO | Search engine optimization factors |
| Performance | Website performance factors |
| Accessibility | Accessibility-related factors |
| Best Practices | General website best practices |

## 📋 Analysis History

Users can:

- View previous analyses
- Open detailed reports
- Navigate through paginated results
- Delete analyses

Frontend:

```text
client/src/pages/History.tsx
```

Backend:

```text
server/controllers/analysisController.js
```

## 📈 Rank Tracking

SEOlytics allows users to monitor Google rankings for specific keywords.

```text
User enters keyword + website URL
        ↓
Keyword saved in MongoDB
        ↓
Browserbase launches browser
        ↓
Google search performed
        ↓
Search results scanned
        ↓
Website position detected
        ↓
Competitors identified
        ↓
Ranking saved
        ↓
Rank history updated
```

Main service:

```text
server/services/rankTrackerService.js
```

## 🏆 Competitor Tracking

While checking Google search results, SEOlytics collects competing websites appearing for tracked keywords.

This provides:

- Current website position
- Competitor results
- Ranking comparisons
- Ranking changes

## 📜 Rank History

SEOlytics stores previous ranking positions for tracked keywords so ranking changes can be monitored over time.

Tracking logic:

```text
server/services/keywordTrackingService.js
```

## ⏱️ Automatic Rank Tracking

SEOlytics includes a scheduled background job using **Node-Cron**.

The cron job periodically checks active tracked keywords and updates their rankings.

Configuration:

```text
server/cron/rankTrackingCron.js
```

## 📜 Available Frontend Routes

| Route | Page |
|---|---|
| `/` | Home page |
| `/login` | Login |
| `/register` | Registration |
| `/dashboard` | Dashboard |
| `/analyze` | Website analysis |
| `/report/:id` | SEO analysis report |
| `/history` | Analysis history |
| `/rank-tracker` | Keyword rank tracker |
| `/rank/:id` | Rank tracking details |

## 🧠 Application Architecture

```text
                    SEOlytics
                       │
          ┌────────────┴────────────┐
          │                         │
       Frontend                  Backend
     React + Vite             Node + Express
          │                         │
          │                    ┌────┴────┐
          │                    │         │
          │                 MongoDB   External APIs
          │                              │
          │                       ┌──────┴──────┐
          │                       │             │
          │                   Browserbase    Gemini
          │                   + Playwright     AI
          │
          └──────── REST API ────────────┘
```

## 📦 Useful npm Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run server
npm start
```

## 🏗️ Production Build

Build the frontend:

```bash
cd client
npm run build
```

Start the backend:

```bash
cd server
npm start
```

Configure all required environment variables in your hosting provider.

For production, set:

```env
VITE_BACKEND_URL=https://your-backend-url
```

## 🔒 Security Notes

- Never commit `.env` files.
- Never expose `GEMINI_API_KEY` in frontend code.
- Never expose `BROWSERBASE_API_KEY` in frontend code.
- Never expose `MONGODB_URI` publicly.
- Never expose `JWT_SECRET`.
- Passwords should always remain hashed.
- Use HTTPS in production.
- Configure CORS appropriately for production.
- Keep API keys in server-side environment variables.

## 🧪 Troubleshooting

### Frontend cannot connect to backend

Check:

```env
VITE_BACKEND_URL
```

Make sure the backend is running and the URL is correct.

### MongoDB connection error

Check:

```env
MONGODB_URI
```

Also verify your MongoDB Atlas network access settings.

### Gemini API error

Check:

```env
GEMINI_API_KEY
```

Make sure the API key is valid and the configured Gemini model is available.

### Browserbase error

Check:

```env
BROWSERBASE_API_KEY
```

Make sure your Browserbase account and API key are configured correctly.

### Rank tracking is not updating

Check:

- Browserbase configuration
- Google search accessibility
- Keyword tracking status
- Backend logs
- Rank tracking cron process

## 📌 Known Limitations

- Search rankings can vary depending on location, personalization, and Google changes.
- Web scraping depends on the target website being accessible.
- Google search result structures can change over time.
- AI-generated SEO recommendations should be treated as guidance rather than guaranteed SEO results.
- Browser automation and AI API usage may have service-specific limits and costs.

## 🚀 Future Improvements

- 📈 Advanced SEO analytics and charts
- 📊 Historical SEO score graphs
- 🔔 Ranking change notifications
- 📧 Email reports
- 🌍 Location-specific rank tracking
- 🔎 More detailed technical SEO audits
- 📱 Improved mobile SEO analysis
- 📄 PDF SEO reports
- 🔗 Backlink analysis
- 🗺️ Sitemap analysis
- 🤖 More advanced AI-powered recommendations
- 📊 Competitor comparison dashboards

## 👨‍💻 Author

**Kanhaiya Roy**

Built as a full-stack AI-powered SEO analytics project using React, Node.js, Express, MongoDB, Browserbase, Playwright, and Google Gemini.

## 📄 License

This project currently uses the ISC license as specified by the backend `package.json`.
