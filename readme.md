# Kishan Singh — Portfolio Website

A full-stack portfolio built with **React.js** (frontend) + **Node.js / Express** (backend) with **Nodemailer** contact form.

---

## 📁 Structure
```
portfolio/
├── frontend/          ← React app
│   ├── public/
│   └── src/
│       ├── App.jsx    ← All UI components
│       └── index.js
└── backend/           ← Express server
    ├── server.js      ← API + Nodemailer
    ├── .env.example
    └── package.json
```

---

## 🚀 Setup & Run

### 1. Backend
```bash
cd backend
npm install

# Copy env file and fill in your Gmail credentials
cp .env.example .env
# Edit .env:
#   EMAIL_USER=kishansingh2882004@gmail.com
#   EMAIL_PASS=your_gmail_app_password

npm start   # Runs on http://localhost:5000
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail".

### 2. Frontend
```bash
cd frontend
npm install
npm start   # Runs on http://localhost:3000
```

The frontend proxies `/api/*` requests to `localhost:5000` automatically.

---

## 📧 How Nodemailer Works

When a recruiter fills the contact form and clicks **Send Message**, the frontend POSTs to `/api/contact`. The backend uses Nodemailer to send an email directly to your Gmail inbox with the recruiter's name, email, and message.

---

## 🌐 Deploy

- **Backend**: Deploy to Railway / Render / Heroku. Set `EMAIL_USER` and `EMAIL_PASS` as environment variables.
- **Frontend**: Run `npm run build`, deploy the `build/` folder to Vercel / Netlify. Update the proxy URL to your deployed backend.