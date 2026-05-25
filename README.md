# UWB Hackathon — Restaurant Review Analyzer

A full-stack web app that uses Google Gemini AI to analyze restaurant reviews and surface actionable business insights.

## What It Does

Enter a restaurant name and the app searches a California business database, collects its reviews, and sends them to Google Gemini for analysis. The AI returns a structured consulting-style report with issues categorized by impact level (high, medium, low), along with specific recommendations.

- Search restaurants by name with fuzzy matching
- AI-powered review analysis via Google Gemini 1.5 Flash
- Impact-level categorization with color-coded cards
- Actionable recommendations for restaurant owners

## Tech Stack

- **Frontend:** React 19, Tailwind CSS 4, Axios
- **Backend:** Express 5, Google Generative AI SDK, Cheerio
- **Build:** Vite, PostCSS

## Getting Started

### Prerequisites

- Node.js and npm
- Google Cloud API key for Gemini

### Setup

**1. Backend:**

```bash
cd server
npm install
```

Create `server/.env`:

```
API_KEY=your_google_gemini_api_key
```

Add `california_review.json` to `server/data/` (not included in repo due to size).

**2. Frontend:**

```bash
npm install
```

### Run

```bash
# Terminal 1 — backend (port 5050)
cd server
node index.js

# Terminal 2 — frontend (port 3000)
npm start
```

## Project Structure

```
UWBHackathon/
├── src/                        # React frontend
│   ├── App.js                  # Search logic & state management
│   ├── Reviews.js              # AI response parser & card renderer
│   ├── components/
│   │   ├── SearchBar.jsx       # Search input
│   │   └── LoadingSpinner.jsx  # Loading state
│   └── styles/
├── server/                     # Express backend
│   ├── index.js                # API routes & business search
│   ├── ai_typefein.js          # Gemini AI integration
│   └── data/
│       ├── california_business.json  # Business database
│       └── california_review.json    # Review data (not in repo)
└── public/                     # Static assets
```
