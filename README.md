# ⚡ ViralForge AI

> AI-powered content generation platform with DSPy optimization — full-stack, fast, and built to scale.

---

## Overview

ViralForge AI is a full-stack AI content generation application. A **Next.js/React** frontend communicates with a **FastAPI** backend to deliver AI-powered content generation, prompt optimization via **DSPy**, and real-time system status monitoring.

The core generation and optimization pipelines are live. Authentication, authorization, and database persistence are actively in progress.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, Tailwind CSS |
| HTTP Client | Axios (with JWT interceptors) |
| Backend | FastAPI (Python) |
| AI Optimization | DSPy |
| Auth (WIP) | JWT |
| Database (WIP) | TBD |

---

## Project Status

| Feature | Status |
|---|---|
| `/generate` — AI content generation | ✅ Working |
| `/optimize` — DSPy optimization pipeline | ✅ Working |
| `/status` — route health check | ✅ Working |
| Frontend UI (Next.js + Tailwind) | ✅ Working |
| Backend (FastAPI + CORS) | ✅ Working |
| Frontend ↔ Backend integration | ✅ Working |
| Authentication & Authorization | 🚧 In Progress |
| Database connection | 🚧 In Progress |

---

## Architecture

```
┌────────────────────────────────────────────────┐
│         Frontend — Next.js · React · Tailwind   │
│  /generate  |  /optimize  |  /status  |  Auth  │
└────────────────────┬───────────────────────────┘
                     │  HTTP via Axios
                     │  JWT interceptors
┌────────────────────▼───────────────────────────┐
│         Backend — FastAPI (Python)              │
│  POST /generate  |  POST /optimize  |  /status │
│  CORS middleware · DSPy pipeline                │
└────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- pip

---

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The FastAPI server starts at `http://localhost:8000`.

---

### Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

The Next.js app starts at `http://localhost:3000`.

---

### Environment Variables

Create a `.env.local` file in the backend directory:

```env
OPENROUTER_API_KEY="YOUR KEY"
OPENAI_API_BASE="YOUR KEY"
DSPY_GENERATOR_MODEL="YOUR KEY"
DATABASE_URL="YOUR KEY"
ANTHROPIC_API_KEY=dummy

```

---

## API Reference

### `GET /status`

Returns the current health status of the backend.

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

## DSPy Optimization

The `/optimize` endpoint uses [DSPy](https://github.com/stanfordnlp/dspy) to automatically improve prompt quality through a compilation and optimization loop.

**How it works:**
1. You provide a base prompt and a set of input/output examples.
2. DSPy runs a MIPROv2 or BootstrapFewShot optimizer pass.
3. The backend returns the optimized prompt and a quality score.

This means content quality improves over time as you feed more examples into the system.

---

## Roadmap

- [x] FastAPI backend with CORS
- [x] Next.js frontend with Tailwind
- [x] Axios client with JWT interceptors
- [x] `/generate` endpoint (working)
- [x] `/optimize` endpoint with DSPy (working)
- [x] `/status` health route (working)
- [ ] JWT authentication (login/register flow)
- [ ] Authorization middleware on protected routes
- [ ] Database integration (user data, generation history)
- [ ] `.env.production` configuration
- [ ] Streaming responses (SSE / ReadableStream)
- [ ] Deployment setup (Docker / Vercel + Railway)

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a PR

---
