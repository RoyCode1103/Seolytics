SEOlytics

1. Overview
SEOlytics is a full-stack web application that combines automated website scraping with AI-powered SEO analysis. Users can analyze publicly accessible websites, receive an overall SEO score and category scores, inspect technical/content signals, review prioritized issues and recommendations, save analysis history, and track keyword rankings over time.

2. Core Features
•	AI-powered website SEO analysis using Google Gemini.
•	Overall SEO score plus SEO, Performance, Accessibility, and Best Practices scores.
•	Website metadata, headings, links, images, alt-text, page size, load time, and word-count analysis.
•	SEO issues categorized as Critical, Warning, or Info with recommendations.
•	Keyword extraction with frequency and density information.
•	Analysis history with pagination, report viewing, and deletion.
•	JWT-based authentication with registration, login, protected routes, and bcrypt password hashing.
•	Keyword rank tracking with current position, best position, position change, ranking history, and tracking status.
•	Competitor information from search results.
•	Manual rank refresh and enable/disable tracking.
•	Daily automated rank tracking using node-cron.
•	Responsive frontend and theme support.

3. Technology Stack
•	Frontend: React 19, TypeScript, Vite, React Router, Tailwind CSS, Axios, Lucide React, React Simple Icons, React Hot Toast.
•	Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, CORS, dotenv, node-cron.
•	AI: Google Gemini / Google Generative AI SDK.
•	Browser automation: Browserbase and Playwright.
•	Development: Git, GitHub, npm, ESLint, Nodemon.

4. Project Architecture
User Browser
    ↓
React + TypeScript + Vite
    ↓ REST API / Axios
Node.js + Express
    ├── MongoDB / Mongoose
    ├── Browserbase + Playwright
    └── Google Gemini
          ↓
     Website / Search Results

5. Folder Structure
SEOlytics/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── home/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── vercel.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── cron/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md

6. Important Backend Files
•	server.js — Express application entry point, middleware/routes, database startup, and cron initialization.
•	config/db.js — MongoDB connection.
•	controllers/analysisController.js — Website analysis, history, retrieval, and deletion logic.
•	controllers/authController.js — Registration and authentication logic.
•	controllers/rankController.js — Keyword tracking and rank-related API logic.
•	models/User.js — User data and authentication-related fields.
•	models/Analysis.js — Saved website analysis data and scores.
•	models/keywordTracking.js — Tracked keyword, ranking, competitor, and history data.
•	services/scraperService.js — Browser-based website scraping.
•	services/geminiService.js — AI-powered structured SEO analysis.
•	services/rankTrackerService.js — Search ranking collection.
•	services/keywordTrackingService.js — Keyword tracking workflow.
•	cron/rankTrackingCron.js — Scheduled daily rank updates.
•	middleware/auth.js — JWT authentication middleware.

7. Important Frontend Files
•	pages/Home.tsx — Landing page.
•	pages/Login.tsx — Login interface.
•	pages/Analyze.tsx — Website analysis interface.
•	pages/Dashboard.tsx — User dashboard and analysis overview.
•	pages/Report.tsx — Detailed SEO report.
•	pages/History.tsx — Previous analyses.
•	pages/RankTracker.tsx — Keyword tracking dashboard.
•	pages/RankDetail.tsx — Detailed ranking history.
•	components/ScoreGauge.tsx — Score visualization.
•	components/IssueCard.tsx — SEO issue presentation.
•	components/AnalysesCard.tsx — Analysis summary card.
•	components/ProtectedRoute.tsx — Authentication guard.
•	context/AppContext.tsx — Global authentication/API application state.
•	context/ThemeContext.tsx — Theme state.

8. Environment Variables
Frontend — client/.env
VITE_BACKEND_URL=http://localhost:5000
For production, replace the local backend URL with the deployed backend URL.
Backend — server/.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
BROWSERBASE_API_KEY=your_browserbase_api_key
GEMINI_API_KEY=your_gemini_api_key
Never commit .env files or API keys to GitHub.

9. Installation & Setup
Prerequisites
•	Node.js (recommended: Node.js 20.19+).
•	npm.
•	Git.
•	MongoDB / MongoDB Atlas.
•	Browserbase account and API key.
•	Google Gemini API key.
Clone
git clone https://github.com/YOUR_USERNAME/SEOlytics.git
cd SEOlytics
Install frontend
cd client
npm install
Install backend
cd ../server
npm install
Create client/.env and server/.env with the variables listed above.

10. Run Locally
Backend
cd server
npm run server
The backend normally runs at http://localhost:5000.
Frontend
cd client
npm run dev
Vite normally serves the application at http://localhost:5173. Run the backend and frontend in separate terminals.

11. Frontend Routes
/                 Landing page
/login              Login
/register           Registration
/dashboard          Dashboard
/analyze             Website analysis
/report/:id          SEO report
/history             Analysis history
/rank-tracker        Keyword tracker
/rank/:id            Keyword details

12. SEO Analysis Flow
User enters URL
    ↓
POST /api/analysis/analyze
    ↓
Create processing analysis
    ↓
Browserbase session
    ↓
Playwright opens website
    ↓
SEO data is extracted
    ↓
Data is sent to Gemini
    ↓
Gemini returns structured scores/issues
    ↓
Results saved to MongoDB
    ↓
Analysis marked completed
    ↓
Frontend displays report

13. Data Collected During Website Analysis
•	Page title and meta description.
•	Canonical URL and robots meta tag.
•	Open Graph and Twitter metadata.
•	Viewport and character encoding.
•	H1–H6 heading structure.
•	Internal and external links.
•	Images and missing alt attributes.
•	Page text and word count.
•	Page size and load time.
•	HTTP status and other scraped signals.

14. AI Output
overallScore
categories
keywords
issues
Category scores include SEO, Performance, Accessibility, and Best Practices. Issues include severity, category, message, and recommendation.

15. Analysis Status
pending → processing → completed
                    ↘ failed

16. Rank Tracking Flow
User adds keyword + URL
    ↓
Keyword stored in MongoDB
    ↓
Browserbase + Playwright
    ↓
Search performed
    ↓
Target domain located
    ↓
Position and competitors extracted
    ↓
Ranking history updated
The system can manually refresh tracked keywords and automatically update active keywords using a scheduled job.

17. Rank Tracking Cron
The scheduled rank-tracking job is implemented in server/cron/rankTrackingCron.js. The configured schedule is 0 6 * * *, meaning every day at 06:00 according to the server's local timezone. A continuously running backend is required for an in-process node-cron job to execute reliably.

18. REST API
Authentication
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/user
Analysis
POST   /api/analysis/analyze
GET    /api/analysis/:id
GET    /api/analysis/list?page=1&limit=10
DELETE /api/analysis/:id
Rank Tracking
POST   /api/rank/add
GET    /api/rank/list
GET    /api/rank/:id
POST   /api/rank/:id/refresh
PUT    /api/rank/:id/toggle
DELETE /api/rank/:id
Protected endpoints require a JWT Authorization header in the form: Bearer <token>.

19. Authentication
•	Passwords are hashed using bcrypt.
•	JWT tokens are used for authenticated sessions.
•	Protected frontend routes use ProtectedRoute.
•	Protected backend endpoints validate the JWT using authentication middleware.
•	User-specific database queries prevent users from accessing another user's analyses or tracked keywords.

20. Useful npm Scripts
Client
npm run dev
npm run build
npm run lint
npm run preview
Server
npm start
npm run server

21. Production Deployment
A recommended deployment architecture is to host the React/Vite frontend separately from the Node/Express backend, with MongoDB as the database and Browserbase/Gemini as external services.
Frontend
  ↓
Backend API
  ├── MongoDB
  ├── Browserbase
  └── Gemini
Set VITE_BACKEND_URL to the deployed backend URL. Configure all backend secrets in the hosting provider's environment-variable settings. Do not expose server-side API keys to the frontend.

22. Deployment Considerations
•	The frontend can be built with npm run build.
•	The backend can be started with npm start.
•	The backend must be able to make outbound requests to MongoDB, Browserbase, and Gemini.
•	If deployed on a serverless platform, in-process node-cron may not be reliable; use a platform-native or external scheduled job when appropriate.
•	Restrict CORS to the production frontend origin for a production deployment.
•	Keep all API keys and database credentials server-side.

23. Troubleshooting
•	MongoDB errors: verify MONGODB_URI, database credentials, cluster availability, and network/IP access.
•	Authentication errors: verify JWT_SECRET and that frontend/backend are using the expected environment configuration.
•	Website analysis keeps loading: inspect backend logs for scraping, Browserbase, Gemini, network, or timeout errors.
•	Browserbase errors: verify BROWSERBASE_API_KEY and account/project access.
•	Gemini errors: verify GEMINI_API_KEY and inspect server logs.
•	Frontend cannot reach backend: verify the backend is running and VITE_BACKEND_URL is correct, then restart the Vite server after environment changes.

24. Security
•	Never commit .env files.
•	Rotate/revoke any API key accidentally exposed publicly.
•	Use a strong random JWT secret.
•	Restrict CORS in production.
•	Consider adding rate limiting and request validation before production scale.
•	Add security headers and abuse protection for expensive scraping operations.

25. Known Limitations
•	Website scraping depends on Browserbase and target-site accessibility.
•	Google ranking results can vary by location, language, device, personalization, and Google's algorithm.
•	AI-generated SEO recommendations should be reviewed before making important production changes.
•	In-process cron scheduling requires a suitable continuously running backend environment.

26. Future Improvements
•	Google Search Console integration.
•	Google Analytics integration.
•	Lighthouse/Core Web Vitals integration.
•	Backlink analysis.
•	Sitemap and robots.txt analysis.
•	Broken-link detection.
•	Competitor comparison dashboard.
•	Historical SEO score graphs.
•	Email alerts for ranking changes.
•	Scheduled SEO audits.
•	PDF/CSV report export.
•	Team/workspace support.
•	Subscription and payment integration.
•	Swagger/OpenAPI documentation.

27. Contributing
git checkout -b feature/your-feature-name
git add .
git commit -m "Add your feature"
git push origin feature/your-feature-name
Open a pull request describing what changed, why it changed, and how it was tested.

28. GitHub Checklist
•	Replace YOUR_USERNAME in clone examples with your actual GitHub username/repository.
•	Ensure .env files are ignored.
•	Remove API keys, passwords, database credentials, and other secrets from the repository.
•	Verify the README's screenshots/demo URL if you add them.
•	Run frontend lint/build before pushing.
•	Test login, analysis, history, deletion, and rank tracking before publishing.

29. Project Summary
SEOlytics combines automated website crawling, AI-powered SEO evaluation, analysis history, and keyword rank tracking into one platform.
Analyze → Understand → Optimize → Track → Improve