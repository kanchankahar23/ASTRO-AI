# 🌟 AstroAI — AI-Powered Astrology Platform

> A full-stack MERN application that combines traditional astrology with modern AI to deliver personalized horoscopes, birth charts, zodiac insights, and an intelligent astrology chatbot.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Data Flow Diagrams (DFD)](#data-flow-diagrams)
   - [Level 0 — Context Diagram](#level-0--context-diagram)
   - [Level 1 — System Overview](#level-1--system-overview)
   - [Level 2 — AI Horoscope Flow](#level-2--ai-horoscope-flow-p3)
---

## 📌 Project Overview

**AstroAI** is a college major project built on the MERN stack (MongoDB, Express, React, Node.js). It uses AI APIs (Gemini / Groq) to generate personalized astrology content including daily horoscopes, compatibility reports, and a conversational astrology assistant.

| Field            | Details                             |
|-----------------|--------------------------------------|
| Project Title   | AstroAI — AI-Powered Astrology Platform |
| Tech Stack      | MERN (MongoDB, Express, React, Node.js) |
| Frontend Build  | React + Vite + Tailwind CSS          |
| AI Integration  | Google Gemini API / Groq API         |
| Database        | MongoDB Atlas                        |
| Auth            | JWT (JSON Web Tokens)                |
| Deployment      | Vercel (frontend) + Render (backend) |

---

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with **Express.js**
- **MongoDB Atlas** via **Mongoose ORM**
- **JWT** for authentication
- **bcrypt** for password hashing

### AI & External Services
- **Google Gemini API** — AI horoscope generation
- **Groq API** — Fast LLM inference (alternative)

---

## 📊 Data Flow Diagrams

### Level 0 — Context Diagram

The context diagram shows AstroAI as a single system interacting with external entities.

```
                         ┌──────────────────────────────────┐
                         │                                  │
     ┌───────────┐       │         AstroAI Platform         │       ┌──────────────────┐
     │           │◄─────►│         (MERN Stack)             │◄─────►│  MongoDB Atlas   │
     │ End Users │       │       React + Express            │       │  (NoSQL Database)│
     │           │       │                                  │       └──────────────────┘
     └───────────┘       │                                  │
                         │                                  │◄─────►┌──────────────────┐
                         │                                  │       │ Gemini / Groq AI │
                         │                                  │       │  (AI Horoscope)  │
                         └──────────────────────────────────┘       └──────────────────┘
                                        │
                           ┌────────────┴────────────┐
                           │                         │
                    ┌──────▼──────┐         ┌───────▼───────┐
                    │ Auth Service│         │  Zodiac Data  │
                    │ (JWT Tokens)│         │ (Seeded in DB)│
                    └─────────────┘         └───────────────┘
```

**External Entities:**

| Entity           | Role                                              |
|-----------------|---------------------------------------------------|
| End Users       | Interact via browser — send requests, view results |
| MongoDB Atlas   | Stores users, horoscopes, charts, zodiac data      |
| Gemini / Groq   | Provides AI-generated horoscope text               |
| Auth Service    | Issues and verifies JWT tokens                     |
| Zodiac Data     | Static zodiac signs seeded in the database         |

---

### Level 1 — System Overview

The Level 1 DFD expands AstroAI into 6 major processes and 3 data stores.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        AstroAI Platform                                 │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐        │
│  │  P1: User Auth  │  │ P2: Zodiac      │  │ P3: AI Horoscope │        │
│  │  Register,      │  │ Browser         │  │ Gemini prompt    │        │
│  │  Login, JWT     │  │ 12 signs, traits│  │ + AI result      │        │
│  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘        │
│           │                   │                     │                   │
│  ┌────────▼────────┐  ┌───────▼─────────┐  ┌───────▼──────────┐        │
│  │  P4: Birth      │  │ P5: AI Chatbot  │  │ P6: User Profile │        │
│  │  Chart          │  │ Multi-turn      │  │ History, saved   │        │
│  │  DOB, planets   │  │ conversation    │  │ charts           │        │
│  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘        │
│           │                   │                     │                   │
│           └───────────────────┼─────────────────────┘                  │
│                               │                                         │
│                    ┌──────────▼──────────┐                              │
│                    │ D1: MongoDB Atlas   │                              │
│                    │ Users · Horoscopes  │                              │
│                    │ Charts · Zodiacs    │                              │
│                    └─────────────────────┘                              │
│                                                                         │
│   ┌───────────────┐                        ┌───────────────────┐        │
│   │ D2: Gemini AI │                        │ D3: JWT Session   │        │
│   │ External API  │                        │ Auth token store  │        │
│   └───────────────┘                        └───────────────────┘        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Process Descriptions:**

| Process | Name              | Input                        | Output                         | Technology              |
|---------|-------------------|------------------------------|--------------------------------|-------------------------|
| P1      | User Auth         | Email, password              | JWT token, user session        | JWT, bcrypt             |
| P2      | Zodiac Browser    | Sign selection               | Traits, dates, descriptions    | React, MongoDB          |
| P3      | AI Horoscope      | Zodiac sign, date            | AI-generated horoscope text    | Gemini API, Express     |
| P4      | Birth Chart       | Date of birth, location      | Planet positions, chart data   | Astronomy calculations  |
| P5      | AI Chatbot        | User message, chat history   | AI astrology response          | Gemini/Groq, WebSocket  |
| P6      | User Profile      | User ID                      | Saved charts, horoscope history| MongoDB, Mongoose       |

---

### Level 2 — AI Horoscope Flow (P3)

Detailed step-by-step flow of the AI Horoscope generation process.

```
┌──────────┐
│  User    │
└────┬─────┘
     │  1. Selects zodiac sign from UI
     ▼
┌────────────────────────────────────┐
│ P3.1: Validate Input               │
│ - Check sign name is valid         │
│ - Ensure date parameter exists     │
└────────────────┬───────────────────┘
     │  2. Valid input
     ▼
┌────────────────────────────────────┐
│ P3.2: Authenticate Request         │
│ POST /api/horoscope                │
│ - Extract JWT from header          │
│ - Verify with auth middleware      │◄─────────── D3: JWT Session Store
└────────────────┬───────────────────┘
     │  3. Authenticated (userId extracted)
     ▼
┌────────────────────────────────────┐
│ P3.3: Build AI Prompt              │
│ - Construct prompt string          │
│   "Generate a horoscope for        │
│    [sign] on [date]..."            │
│ - Attach user context (optional)   │
└────────────────┬───────────────────┘
     │  4. Prompt ready
     ▼
┌────────────────────────────────────┐
│ P3.4: Call Gemini / Groq API       │◄────────── D2: Gemini AI API
│ - POST to AI endpoint              │
│ - Receive generated horoscope text │──────────► (response: horoscope string)
│ - Handle errors / retries          │
└────────────────┬───────────────────┘
     │  5. AI response received
     ▼
┌────────────────────────────────────┐
│ P3.5: Save to DB + Return          │◄────────── D1: MongoDB (horoscopes collection)
│ - Save horoscope + userId + date   │
│ - Return JSON to frontend          │
└────────────────┬───────────────────┘
     │  6. JSON response
     ▼
┌──────────┐
│  User    │
│ (Display │
│ result)  │
└──────────┘

── Error Path ──────────────────────────────────
If JWT invalid at P3.2:
  → 401 Unauthorized → Redirect to /login
If Gemini API fails at P3.4:
  → 500 Server Error → Return fallback message
```



This project is built for academic purposes as part of the MCA program.