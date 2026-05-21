import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// loading my env variables
dotenv.config({ path: join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 3001

// open cors for all origins — fine for a portfolio project
app.use(cors())
app.use(express.json())

// multer handles the image uploads and keeps them in memory (no saving to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10mb max per file
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('only image files are allowed'))
  },
})

// this is the prompt i send to the ai — tells it exactly what to analyze and how to format the response
function buildPrompt(context) {
  return `You are Clairiti, an expert UI/UX accessibility and usability reviewer.

Analyze the provided screenshot(s) of a user interface and return a structured JSON review.
${context ? `Additional context from the user: "${context}"` : ''}

Evaluate the interface across these 6 categories:
1. Color & Contrast
2. Typography & Readability
3. Buttons & Links
4. Forms & Inputs
5. Layout & Visual Hierarchy
6. Mobile Usability

Return ONLY a valid JSON object with exactly this structure — no markdown, no explanation, just raw JSON:

{
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentence overall summary>",
  "priorityFixes": [
    "<most important fix>",
    "<second most important fix>",
    "<third most important fix>"
  ],
  "categories": [
    {
      "name": "Color & Contrast",
      "status": "<Good | Needs improvement | Needs attention>",
      "severity": "<Low | Medium | High>",
      "issue": "<specific issue found, or 'No major issues found'>",
      "whyItMatters": "<1-2 sentences on why this matters for users>",
      "suggestedFix": "<specific actionable fix>"
    },
    {
      "name": "Typography & Readability",
      "status": "<Good | Needs improvement | Needs attention>",
      "severity": "<Low | Medium | High>",
      "issue": "<specific issue found, or 'No major issues found'>",
      "whyItMatters": "<1-2 sentences on why this matters for users>",
      "suggestedFix": "<specific actionable fix>"
    },
    {
      "name": "Buttons & Links",
      "status": "<Good | Needs improvement | Needs attention>",
      "severity": "<Low | Medium | High>",
      "issue": "<specific issue found, or 'No major issues found'>",
      "whyItMatters": "<1-2 sentences on why this matters for users>",
      "suggestedFix": "<specific actionable fix>"
    },
    {
      "name": "Forms & Inputs",
      "status": "<Good | Needs improvement | Needs attention>",
      "severity": "<Low | Medium | High>",
      "issue": "<specific issue found, or 'No major issues found'>",
      "whyItMatters": "<1-2 sentences on why this matters for users>",
      "suggestedFix": "<specific actionable fix>"
    },
    {
      "name": "Layout & Visual Hierarchy",
      "status": "<Good | Needs improvement | Needs attention>",
      "severity": "<Low | Medium | High>",
      "issue": "<specific issue found, or 'No major issues found'>",
      "whyItMatters": "<1-2 sentences on why this matters for users>",
      "suggestedFix": "<specific actionable fix>"
    },
    {
      "name": "Mobile Usability",
      "status": "<Good | Needs improvement | Needs attention>",
      "severity": "<Low | Medium | High>",
      "issue": "<specific issue found, or 'No major issues found'>",
      "whyItMatters": "<1-2 sentences on why this matters for users>",
      "suggestedFix": "<specific actionable fix>"
    }
  ]
}`
}

// main review endpoint — takes the screenshots, sends them to the ai, returns the report
app.post('/api/review', upload.array('screenshots', 10), async (req, res) => {
  try {
    const files = req.files
    const context = req.body.context || ''

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one screenshot.' })
    }

    // converting each image to base64 so i can send it to openrouter
    const imageMessages = files.map(file => ({
      type: 'image_url',
      image_url: {
        url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      },
    }))

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Clairiti',
      },
      body: JSON.stringify({
        model: 'openrouter/auto', // auto picks the best free vision model available
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: buildPrompt(context) },
              ...imageMessages,
            ],
          },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('openrouter error:', data)
      return res.status(500).json({ error: data.error?.message || 'AI request failed.' })
    }

    const rawText = data.choices?.[0]?.message?.content || ''

    // sometimes the ai wraps the json in markdown fences so i strip those out
    const cleaned = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    let report
    try {
      report = JSON.parse(cleaned)
    } catch (parseErr) {
      console.error('failed to parse ai response:', rawText)
      return res.status(500).json({ error: 'The AI returned an unexpected format. Please try again.' })
    }

    // basic check to make sure the response has what i need
    if (!report.overallScore || !report.categories) {
      return res.status(500).json({ error: 'Incomplete response from AI. Please try again.' })
    }

    return res.json(report)

  } catch (err) {
    console.error('review error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

// quick test endpoint to make sure the api connection is working
app.get('/api/test', async (req, res) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Clairiti',
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [{ role: 'user', content: 'Say "Clairiti is working!" and nothing else.' }],
      }),
    })

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''
    res.json({ success: true, message: text })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// start the server
app.listen(PORT, () => {
  console.log(`✦ Clairiti server running at http://localhost:${PORT}`)
  const key = process.env.OPENROUTER_API_KEY
  console.log('key loaded:', key ? `"${key.substring(0, 12)}..."` : 'undefined — check your .env file!')
})