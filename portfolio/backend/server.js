require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from localhost (dev), any vercel.app domain, or FRONTEND_URL
        const allowed = [
            'http://localhost:5173',
            'http://localhost:3000',
            process.env.FRONTEND_URL,
        ].filter(Boolean);
        if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
}));
app.use(express.json());

// POST /api/contact - sends email via Nodemailer
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Configure transporter — uses Gmail by default.
        // Set EMAIL_USER and EMAIL_PASS in your .env file.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Use a Gmail App Password
            },
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