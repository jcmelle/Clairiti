# clairiti ✦

an ai-powered ui accessibility reviewer. upload a screenshot of your interface and get clear, prioritized feedback on accessibility, readability, visual hierarchy, and usability.

built as a portfolio project using react, node/express, and the openrouter api.

🔗 **[live demo → clairiti-five.vercel.app](https://clairiti-five.vercel.app)**

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

## fonts

this project uses **made bon voyage** for headings and **lora** for body text.

bon voyage is for personal use only 


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
├── index.js              ← express server + openrouter api calls
├── .env                  ← your api key (never commit this)
└── package.json
```
