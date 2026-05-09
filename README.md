# 🔭 ASTRO-AI — AI-Powered Astrology Platform

> A full-stack MERN application that blends traditional astrology with modern AI to deliver personalized horoscopes, birth charts, zodiac insights, and an intelligent astrology chatbot.

---

## 📌 Overview

**AstroAI** is a full-stack web application built on the MERN stack (MongoDB, Express, React, Node.js). It integrates Google Gemini and Groq AI APIs to generate personalized astrology content — including daily horoscopes, birth chart readings, compatibility reports, and a multi-turn conversational astrology assistant.

---

## ✨ Features

- 🔮 **AI Horoscope Generation** — Daily horoscopes generated per zodiac sign using Gemini / Groq
- 🪐 **Birth Chart Calculator** — Compute sun, moon, and rising signs from date, time, and place of birth
- 💬 **Astrology Chatbot** — Context-aware, multi-turn AI chat powered by Gemini / Groq
- ♈ **Zodiac Browser** — Explore all 12 signs with traits, elements, ruling planets, and compatibility
- 👤 **User Profiles** — Save horoscope history, birth charts, and chat sessions
- 🔐 **Clerk Authentication** — Secure sign-up / sign-in with social login, managed sessions, and protected routes via Clerk

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite, Tailwind CSS, React Router DOM, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | Clerk (managed auth, social login, session handling) |
| AI APIs | Google Gemini API, Groq API |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
ASTRO-AI/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   └── ...
│   └── package.json
├── server/                  # Express.js backend
│   ├── routes/              # API route handlers
│   ├── models/              # Mongoose schemas
│   ├── middleware/          # Auth and error middleware
│   └── ...
├── DATA FLOW DIAGRAM.MD     # System DFD (Level 0, 1, 2)
├── ER DIAGRAM.md            # Database entity relationships
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- [Clerk](https://clerk.com) account (for auth)
- Google Gemini API key and/or Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/kanchankahar23/ASTRO-AI.git
cd ASTRO-AI
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🗄 Database Schema

The platform uses five MongoDB collections:

| Collection | Purpose |
|---|---|
| `users` | Account info, zodiac sign, date of birth |
| `horoscopes` | AI-generated horoscope text per user/sign/date |
| `birth_charts` | Sun, moon, and rising sign data per user |
| `chat_histories` | Multi-turn chatbot message history per user |
| `zodiac_signs` | Seeded lookup data for all 12 signs |

See [`ER DIAGRAM.md`](./ER%20DIAGRAM.md) for full field-level schema and relationships.

---

## 🔄 Data Flow

The system follows a clean 3-tier architecture:

```
User (Browser)
    ↕  HTTP / Axios
React Frontend (Vite + Clerk)
    ↕  REST API + Clerk session token
Express Backend (Node.js + Clerk middleware)
    ↕                    ↕
MongoDB Atlas      Gemini / Groq AI
```

Key API flows:
- **Auth** — Handled entirely by Clerk; the frontend uses `<ClerkProvider>` and hooks (`useUser`, `useAuth`); the backend verifies Clerk session tokens via middleware
- **Horoscope** — Validated sign + date → prompt built → Gemini/Groq called → result saved to DB and returned
- **Chatbot** — Full conversation history sent with each request for context-aware responses

See [`DATA FLOW DIAGRAM.MD`](./DATA%20FLOW%20DIAGRAM.MD) for Level 0, 1, and 2 DFDs.

---

## 🔌 API Endpoints

### Auth

Authentication is fully managed by **Clerk**. There are no custom `/api/auth` routes — login, registration, session management, and social login are all handled on the frontend via Clerk's React components and hooks. The backend uses Clerk's Express middleware to verify session tokens on protected routes.

### Horoscopes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/horoscope` | Generate AI horoscope (auth required) |
| GET | `/api/horoscope/history` | Get saved horoscopes for current user |

### Birth Charts
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/birthchart` | Create a birth chart (auth required) |
| GET | `/api/birthchart` | Get birth charts for current user |

### Chatbot
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat` | Send a message to the astrology chatbot |
| GET | `/api/chat/history` | Retrieve chat history |

### Zodiac
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/zodiac` | Get all 12 zodiac signs |
| GET | `/api/zodiac/:sign` | Get details for a specific sign |

---

## 🤖 AI Integration

The platform supports two AI backends — switch via the `GROQ_API_KEY` / `GEMINI_API_KEY` environment variables:

- **Google Gemini** — Primary AI for horoscope generation and chatbot responses
- **Groq** — Fast LLM inference alternative (lower latency)

Prompts are dynamically constructed per request with user context, zodiac sign, and date to ensure personalized, relevant responses.

---

## 📊 Diagrams

- [📐 ER Diagram](./ER%20DIAGRAM.md) — MongoDB collections, fields, constraints, and relationships
- [🔄 Data Flow Diagram](./DATA%20FLOW%20DIAGRAM.MD) — Context (L0), system overview (L1), and AI horoscope flow (L2)

---

## 🎓 Academic Context

This project was developed as part of an academic program. It demonstrates full-stack development skills including REST API design, NoSQL database modeling, third-party auth with Clerk, and AI API integration.

---

## 👤 Author

**Kanchan Kahar**
[GitHub @kanchankahar23](https://github.com/kanchankahar23)

---

## 📄 License

This project is for academic purposes. All rights reserved by the author.
