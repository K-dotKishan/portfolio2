require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Open CORS — allows all origins (safe for a portfolio contact form)
app.use(cors());
app.use(express.json());

// POST /api/contact
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // STARTTLS
            family: 4,     // Force IPv4 — Render free tier blocks IPv6
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: { rejectUnauthorized: false },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER || 'kishansingh2882004@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact from ${name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #0d0d0d; color: #f0f0f0; border-radius: 12px;">
          <h2 style="color: #00ffe0; margin-bottom: 8px;">New Message from Your Portfolio</h2>
          <hr style="border-color: #333; margin-bottom: 24px;" />
          <p><strong style="color:#aaa">Name:</strong> ${name}</p>
          <p><strong style="color:#aaa">Email:</strong> ${email}</p>
          <p><strong style="color:#aaa">Message:</strong></p>
          <p style="background:#1a1a1a; padding:16px; border-radius:8px; border-left:3px solid #00ffe0;">${message}</p>
        </div>
      `,
        });

        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (err) {
        console.error('Email error:', err);
        res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
});

app.get('/', (req, res) => res.send('Portfolio API is running.'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));