# Page Pulse

Page Pulse is a website auditing tool that analyzes any webpage and provides key SEO and accessibility metrics.

## Features

- HTTP Status Check
- Response Time Analysis
- Page Title Extraction
- Meta Description Detection
- H1 Count
- Missing Alt Text Detection
- Word Count Analysis
- SEO Score Calculation
- URL Validation
- Error Handling

## Tech Stack

### Frontend
- React
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Cheerio
- Axios

### Testing
- Jest

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoint

POST

```http
/api/audit
```

Example Request:

```json
{
  "url": "https://github.com"
}
```

## Design Decisions

- Used Cheerio for lightweight HTML parsing.
- Added URL validation before sending requests.
- Added timeout handling.
- Implemented SEO Score as an extra feature.
- Built responsive UI for desktop and mobile.

## AI Usage

AI tools were used for brainstorming, debugging assistance, UI refinements, and documentation support. Final implementation decisions, testing, and customization were completed by me.

## Future Improvements

- SEO Recommendations
- PDF Export Reports
- Audit History
- Lighthouse Integration