# AIVisor

**AIVisor** is an AI-powered assistant for Alberta post-secondary students. It provides personalized education pathways (diploma → degree → master's → doctorate), year-aligned soft skills development, program switching support, and co-op/internship preparation — all linked to trusted [ALIS](https://alis.alberta.ca/) and [Transfer Alberta](https://transferalberta.alberta.ca/) resources.

Built for hackathon demo with **Business**, **Computer Science**, and **Engineering** programs.

## Features

- **My Pathway** — Semester/year roadmaps and multi-phase pathways (diploma laddering, grad school)
- **Soft Skills** — Year-specific skills, activities, and "why now" guidance
- **Switch Program** — Compare programs, transfer checklist, ALIS links
- **Co-op & Career** — Stage-appropriate checklists and job search resources
- **Ask AIVisor** — OpenAI-powered chat with full student context (fallback mode without API key)

## Business Model Canvas

### 1. Problem

Post-secondary students often feel overwhelmed when planning their academic path. Many students are unsure which courses to take, how electives connect to their future goals, what soft skills they should build, or what steps to follow if they want to switch programs. Students also struggle to find co-op and internship resources that are actually connected to their program.

Advisors are helpful, but they can be busy or hard to access quickly. Online information is also scattered across school websites, ALIS, career pages, program calendars, and job resources. AIVisor solves this by bringing academic planning, career guidance, and student support into one personalized tool.

### 2. Customer Segments

AIVisor is designed for Alberta post-secondary students, especially:

- Students entering college or university
- Students already in a program who need a clearer roadmap
- Students thinking about switching programs
- Students preparing for co-op, internships, or future careers
- Students who want guidance before meeting an advisor

Our demo focuses on students in Business, Computer Science, Engineering, Nursing, and Psychology.

### 3. Unique Value Proposition

AIVisor gives students a personalized academic and career roadmap based on their program, year, goals, and interests.

Instead of giving generic advice, AIVisor helps students understand what steps to take next, what skills to build, what resources to use, and how their current program connects to their future plans.


### 4. Solution

AIVisor provides four main tools:

- **Program Roadmap:** Creates a semester-by-semester path with courses, milestones, electives, and graduation planning.
- **Soft Skills Coach:** Suggests program-specific skills, activities, clubs, projects, and habits that help students grow outside the classroom.
- **Program Switch Support:** Helps students compare programs, understand possible credit transfer, and see a new roadmap if they change direction.
- **Co-op / Internship Prep:** Gives students checklists, timelines, resume tips, networking advice, and field-specific preparation steps.

The app also includes an AI chat feature where students can ask questions using their own academic context.


Why AIVisor Matters

AIVisor solves a real student pain point: many post-secondary students are making expensive, stressful decisions about programs, courses, careers, and skills without a clear personalized roadmap. Alberta’s publicly funded post-secondary system serves a large student population, so even a small improvement in student guidance can have a meaningful impact (Government of Alberta, n.d.). The need is clear: Statistics Canada found that about 19% of employed post-secondary graduates — almost 1 in 5 — were not working in a job related to their program, showing that many students need stronger support connecting education to career outcomes (Statistics Canada, 2020). This confusion also exists in a stressful student environment, with national survey data showing high levels of anxiety, depression, and loneliness among Canadian post-secondary students (American College Health Association, 2019; McCall MacBain Foundation, 2024). AIVisor responds to this by giving students one clear place to plan their academic path, explore program switching, build soft skills, and prepare for co-op or future careers — directly supporting the same outcomes Alberta already measures, including employment, job relatedness, graduate satisfaction, and skills relevance (Government of Alberta, n.d.).

APA 7 reference list
American College Health Association. (2019). American College Health Association-National College Health Assessment II: Canadian reference group data report spring 2019. American College Health Association.
Government of Alberta. (n.d.). Graduate Outcomes Survey. Alberta.ca.
Government of Alberta. (n.d.). Headcount enrolment within the Alberta post-secondary education system. Open Alberta.
McCall MacBain Foundation. (2024, May 9). Committing to mental health & well-being for post-secondary students in Canada.
Organisation for Economic Co-operation and Development. (2025). The state of global teenage career preparation. OECD Publishing.
Statistics Canada. (2020, November 17). Labour market outcomes of postsecondary graduates, class of 2015.
Universities Canada. (2024, October 21). How work-integrated learning could boost Canada’s economy.





### 5. Channels

AIVisor could reach students through:

- University and college advising offices
- Student orientation events
- School websites and student portals
- Career centres
- Campus clubs
- Social media
- Hackathons and student innovation events

### 6. Revenue Streams

Possible future revenue models include:

- Free basic student version
- Premium AI roadmap and planning features
- Partnerships with universities, colleges, and advising departments
- Institutional subscriptions for student support services
- Career preparation tools for co-op and internship programs

### 7. Key Metrics

AIVisor’s success can be measured by:

- Number of students who complete onboarding
- Number of roadmaps generated
- Number of students using the switch-program tool
- Number of students using co-op and internship resources
- Student satisfaction with their roadmap
- Repeat usage over time

### 8. Competitive Advantage

AIVisor is different because it is not just a chatbot or a basic course planner. It combines academic roadmaps, soft-skill development, program switching support, and career preparation in one place.

It is also built around real student pain points: confusion, scattered resources, overloaded advisors, and uncertainty about the future. By connecting students to trusted resources like ALIS and Transfer Alberta, AIVisor gives guidance that feels both personalized and practical.

### 9. Future Opportunities

In the future, AIVisor could expand by adding:

- More Alberta schools and programs
- Saved student profiles
- Progress tracking
- Calendar reminders
- PDF roadmap exports
- Real program catalog integration
- Advisor booking links
- More career and labour-market data









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
