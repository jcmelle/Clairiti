# clairiti ✦

an ai-powered ui accessibility reviewer. upload a screenshot of your interface and get clear, prioritized feedback on accessibility, readability, visual hierarchy, and usability.

built as a portfolio project using react, node/express, and the openrouter api.

---

## what it does

- upload one or multiple ui screenshots
- ai reviews them across 6 categories: color & contrast, typography, buttons & links, forms & inputs, layout, and mobile usability
- get an overall score, a summary, priority fixes, and detailed feedback per category

---

## tech stack

**frontend:** react, vite, tailwind css, react router

**backend:** node.js, express, multer, openrouter api

---

## setup

### 1. install frontend dependencies
```bash
cd clairiti
npm install
```

### 2. install backend dependencies
```bash
cd server
npm install
```

### 3. add your api key
create a file at `server/.env` and add:
```
OPENROUTER_API_KEY=your_key_here
PORT=3001
```
get a free key at openrouter.ai — no credit card needed.

### 4. run both servers

in one terminal (backend):
```bash
cd server
npm run dev
```

in another terminal (frontend):
```bash
npm run dev
```

then open http://localhost:5173

---

## fonts

this project uses **made bon voyage** for headings and **lora** for body text.

bon voyage is for personal use only — if you plan to deploy this publicly, grab a commercial license at madetype.com first.

to swap the font, update `src/index.css` — the @font-face blocks and the `--font-display` variable are all at the top of that file.

---

## project structure

```
src/
├── assets/fonts/         ← bon voyage font files
├── components/           ← reusable ui pieces
├── data/mockReport.js    ← fallback data if the api fails
├── pages/                ← one file per page
├── App.jsx               ← routes
├── main.jsx              ← entry point
└── index.css             ← all global styles and gradients

server/
├── index.js              ← express server + openrouter api calls
├── .env                  ← your api key (never commit this)
└── package.json
```
