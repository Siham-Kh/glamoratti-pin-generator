# 🎀 Glamoratti Pin Generator

> **Pinterest Keyword Intelligence + AI-Powered Pin Content Generator for Amazon Affiliate Marketing**

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)
![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)

---

## ✨ What This Does

Most Pinterest affiliates fail because they pin into **saturated keywords** and get buried on page 10 forever. This tool solves that with a two-layer approach:

- 🔍 **Pinterest SEO** — targets the exact keywords the Pinterest algorithm weights most
- 🌍 **AI Geo-Search Optimization** — writes content that surfaces in ChatGPT, Google AI Overviews, and Perplexity for local searches
- 📊 **Keyword Intelligence** — shows search volume, pin saturation, and an Opportunity Score so you never waste a pin again

---

## 🚀 Features

### 🎯 Keyword Intelligence Engine
- Researches **5 keyword variants** per niche: broad, long-tail, geo-modified, seasonal, and question-based
- Shows **monthly search volume** estimates sourced via live web search
- Shows **Pinterest pin saturation** (your real competition metric)
- Scores each keyword **0–100** for opportunity (high volume + low competition = high score)
- **Verdict system**: 🟢 Go for it / 🟡 Use a geo twist / 🔴 Avoid

### 📌 Pin Content Generator
- **Pin Title** — first 40 chars locked to winning keyword (highest algorithm weight)
- **Pin Description** — 500 chars, first 100 chars keyword-rich, written to answer AI search queries
- **4-Layer Hashtag System**:
  - 🟣 Broad tags (reach)
  - 🟣 Niche-specific tags (algorithm match)
  - 🟣 Product tags (purchase intent)
  - 🟡 Geo tags (local + AI search)
- **AI Geo Queries** — 5 natural language questions your pin now ranks for in ChatGPT & Google AI
- **Strategy Panel** — board name, best post time, Amazon commission category & rate

### 🌎 Geo Targeting
- USA national + 10 major US cities
- UK, Canada, Australia
- Geo context woven naturally into titles, descriptions, and hashtags

### 🛍️ Boards Supported
Home Decor · Skincare & Beauty · Outfits & Fashion · Accessories & Jewelry · Wellness · Hair Care · Kitchen Finds · Gift Ideas

---

## 🖥️ Screenshots

> _Coming soon — star the repo to get notified_

---

## 🧠 How the SEO Strategy Works

### Pinterest Algorithm Layer
Pinterest indexes the **first 40 characters of your title** and **first 100 characters of your description** most heavily. This tool locks your winning keyword into those positions automatically.

### AI Search Layer (The secret weapon 🤫)
In 2026, Google AI Overviews, ChatGPT, and Perplexity surface Pinterest content when descriptions match natural language queries. This tool writes your description to answer questions like:

> _"best affordable skincare routine for dry winters in Chicago"_
> _"quiet luxury home decor ideas for small New York apartments"_

Those are now **searchable queries that lead directly to your affiliate links.**

### The Keyword Sweet Spot
| Zone | Monthly Volume | Competing Pins | Action |
|------|---------------|----------------|--------|
| 🟢 Win | 10K–500K | Under 50K | Target now |
| 🟡 Twist | 10K–500K | 50K–200K | Add geo modifier |
| 🔴 Avoid | Any | 1M+ | Skip entirely |

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | OpenAI GPT-4o with Web Search |
| Deployment | Vercel |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation
```bash
# Clone the repo
git clone https://github.com/Siham-Kh/glamoratti-pin-generator.git
cd glamoratti-pin-generator

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your OpenAI API key to .env.local

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 🚀 Deploy to Vercel

The fastest way to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Siham-Kh/glamoratti-pin-generator)

Or manually:
1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add `OPENAI_API_KEY` in Environment Variables
4. Deploy ✅

---

## 📖 How to Use

1. **Select your board** — choose the niche you're pinning to
2. **Set your geo target** — national or city-level targeting
3. **Pick season & price range** — for seasonal keyword opportunities
4. **Find trending products** — live search for what's hot on Amazon + Pinterest right now
5. **Run keyword analysis** — see volume, competition, and opportunity scores
6. **Generate your pin** — title, description, hashtags, and AI queries ready to copy-paste

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improving the keyword scoring, adding new niches, or improving the AI prompts:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/better-keywords`)
3. Commit your changes (`git commit -m 'Add better keyword scoring'`)
4. Push to the branch (`git push origin feature/better-keywords`)
5. Open a Pull Request

---

## ⭐ Show Your Support

If this tool helps your Pinterest affiliate strategy, **give it a star!** It helps others find it and motivates continued development.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👩‍💻 Built By

**Glamoratti Finds** — luxury glam Amazon finds that look expensive.

Follow on Pinterest: [@GlamorattiFinds](https://www.pinterest.com/GlamorattiFinds/)

---

_Made with 💗 for Pinterest affiliates who are done guessing._
