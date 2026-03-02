# Kishan Singh — Portfolio Website

A full-stack portfolio built with **React.js** (frontend) + **Node.js / Express** (backend) with **Nodemailer** contact form.

---

## 📁 Structure
```
portfolio/
├── frontend/portfolioweb/   ← Vite + React app
│   ├── src/
│   │   └── App.jsx          ← All UI components
│   ├── .env                 ← VITE_API_URL (Render URL)
│   └── vite.config.js       ← Dev proxy to backend
└── backend/                 ← Express server
    ├── server.js            ← API + Nodemailer + CORS
    ├── .env                 ← EMAIL_USER, EMAIL_PASS, FRONTEND_URL
    └── package.json
```

---

## 🚀 Setup & Run

### 1. Backend
```bash
cd portfolio/backend
npm install
cp .env.example .env
# Fill in EMAIL_USER, EMAIL_PASS (Gmail App Password), FRONTEND_URL

npm start   # Runs on http://localhost:5000
```

> **Gmail App Password**: Google Account → Security → 2-Step Verification → App Passwords → Mail.

### 2. Frontend
```bash
cd portfolio/frontend/portfolioweb
npm install
npm run dev   # Runs on http://localhost:5173
```

Vite proxies `/api/*` to `localhost:5000` automatically (configured in `vite.config.js`).

---

## 📡 API Reference (Swagger-style)

Base URL (local): `http://localhost:5000`
Base URL (production): `https://your-app.onrender.com`

---

### `GET /`
Health check — confirms the server is running.

**Response `200`**
```json
"Portfolio API is running."
```

---

### `POST /api/contact`
Sends an email to the portfolio owner via Nodemailer (Gmail).

**Request Body** `application/json`
```json
{
  "name":    "string (required) — sender's name",
  "email":   "string (required) — sender's email",
  "message": "string (required) — message body"
}
```

**Response `200` — Success**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Response `400` — Missing fields**
```json
{
  "error": "All fields are required."
}
```

**Response `500` — Email failure**
```json
{
  "error": "Failed to send email. Please try again."
}
```

---

## 📧 How Nodemailer Works

When a recruiter fills the contact form and clicks **Send Message**, the frontend POSTs to `/api/contact`. The backend uses Nodemailer to send an email to your Gmail inbox with a styled HTML template.

---

## 🌐 Deploy

| Service | Platform | Key Config |
|---|---|---|
| **Backend** | [Render](https://render.com) | Root dir: `portfolio/backend`, Start: `node server.js` |
| **Frontend** | [Vercel](https://vercel.com) | Root dir: `portfolio/frontend/portfolioweb`, Env: `VITE_API_URL` |

Set these env variables:
- **Render**: `EMAIL_USER`, `EMAIL_PASS`, `FRONTEND_URL` (Vercel URL)
- **Vercel**: `VITE_API_URL` (Render URL)