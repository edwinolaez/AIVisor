# AIVisor

**AIVisor** is an AI-powered assistant for Alberta post-secondary students. It provides personalized education pathways (diploma → degree → master's → doctorate), year-aligned soft skills development, program switching support, and co-op/internship preparation — all linked to trusted [ALIS](https://alis.alberta.ca/) and [Transfer Alberta](https://transferalberta.alberta.ca/) resources.

Built for hackathon demo with **Business**, **Computer Science**, and **Engineering** programs.

## Features

- **My Pathway** — Semester/year roadmaps and multi-phase pathways (diploma laddering, grad school)
- **Soft Skills** — Year-specific skills, activities, and "why now" guidance
- **Switch Program** — Compare programs, transfer checklist, ALIS links
- **Co-op & Career** — Stage-appropriate checklists and job search resources
- **Ask AIVisor** — OpenAI-powered chat with full student context (fallback mode without API key)

## Quick Start

### 1. Install dependencies

```bash
cd AIVisor
npm install
```

### 2. Add your OpenAI API key

Copy the example env file and add your key:

```bash
copy .env.example .env.local
```

Edit `.env.local`:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

Get a key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

> **No API key?** The app still works — chat uses smart fallback responses.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Personas

Use the quick-load buttons on the onboarding screen:

| Persona | Program | Path |
|---------|---------|------|
| **Alex** | Business Diploma Y2 | Diploma → Degree → MBA |
| **Jordan** | CS BSc Y4 | BSc → MSc → PhD |
| **Sam** | Engineering UT Y1 | UT → BEng → Co-op |

## 3-Minute Demo Script

1. **Problem** — Students lack personalized guidance for laddering, soft skills, and co-op prep
2. **Alex (Business)** — Pathway tab → diploma→degree→MBA → Soft Skills Year 2 → Transfer Alberta link
3. **Jordan (CS)** — BSc→MSc→PhD pathway → co-op tab → Ask AIVisor about grad school
4. **Engineering switch** — Switch Program tab → UT→BEng
5. **Close** — One assistant, ALIS-grounded, diploma to doctorate

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **OpenAI API** (gpt-4o-mini)
- **JSON data** — programs, pathways, soft skills, ALIS links

## Project Structure

```
src/
├── app/              # Pages and API routes
├── components/       # UI components
├── context/          # Student profile (localStorage)
├── data/
│   ├── programs/     # Business, CS, Engineering data
│   └── alis.ts       # ALIS resource URLs
├── lib/              # AI context and fallback logic
└── types/            # TypeScript types
```

## Disclaimer

AIVisor complements academic advisors and ALIS — it does not replace them. Always verify requirements with your institution and Transfer Alberta.

## License

MIT — hackathon project
