import React from 'react';

const cvCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #12121a;
    --surface-hover: #1a1a24;
    --border: #2a2a35;
    --accent: #7efff5;
    --accent-glow: rgba(126,255,245,0.3);
    --accent2: #ff6b6b;
    --accent3: #ffd93d;
    --accent4: #c084fc;
    --text: #ffffff;
    --text-secondary: #b0b0c0;
    --muted: #808090;
    --gradient-1: linear-gradient(135deg, #7efff5 0%, #c084fc 50%, #ff6b6b 100%);
    --font-main: 'Space Grotesk', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-hero: 'Syne', sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-main);
    overflow-x: hidden;
    line-height: 1.6;
  }

  a { color: inherit; text-decoration: none; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

  @keyframes border-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    50%, 100% { transform: translateX(220%) skewX(-15deg); }
  }
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.9; }
  }

  @media print {
    body { background: white !important; color: black !important; }
    .no-print { display: none !important; }
    .cv-wrapper { box-shadow: none !important; border: none !important; }
  }
`;

function Tag({ text, color = '#7efff5' }) {
    return (
        <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            padding: '5px 12px',
            border: `1px solid ${color}50`,
            color,
            background: `${color}10`,
            borderRadius: 4,
            letterSpacing: 0.5,
            display: 'inline-block',
        }}>{text}</span>
    );
}

function Section({ title, number, children }) {
    return (
        <div style={{ marginBottom: 56, animation: 'fadeUp 0.7s ease both' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28,
                borderBottom: '1px solid var(--border)', paddingBottom: 16,
            }}>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11, color: 'var(--accent)',
                    letterSpacing: 3, fontWeight: 600,
                    padding: '3px 10px',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    background: 'var(--surface)',
                }}>{number}</span>
                <div style={{ width: 2, height: 28, background: 'var(--gradient-1)', backgroundSize: '200% auto', animation: 'border-flow 3s ease infinite' }} />
                <h2 style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: 26, fontWeight: 800, letterSpacing: -1,
                    background: 'var(--gradient-1)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    backgroundSize: '200% auto', animation: 'border-flow 5s ease infinite',
                }}>{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default function CVPage() {
    return (
        <>
            <style>{cvCSS}</style>

            {/* Top nav bar */}
            <div className="no-print" style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(10,10,15,0.9)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border)',
                padding: '14px 48px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <a href="/" style={{
                        fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)',
                        letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8,
                        transition: 'color 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                        ← Portfolio
                    </a>
                    <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase' }}>Curriculum Vitæ</span>
                </div>
                <button
                    onClick={() => window.print()}
                    style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 2,
                        padding: '8px 20px', border: '1.5px solid var(--accent)',
                        borderRadius: 4, background: 'rgba(126,255,245,0.08)',
                        color: 'var(--accent)', cursor: 'pointer', textTransform: 'uppercase',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#0a0a0f'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(126,255,245,0.08)'; e.currentTarget.style.color = 'var(--accent)'; }}
                >
                    ⬇ Download / Print
                </button>
            </div>

            {/* Main CV */}
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 40px 100px' }}>

                {/* ── Header ── */}
                <div className="cv-wrapper" style={{
                    marginBottom: 64,
                    padding: '48px 48px 40px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    position: 'relative', overflow: 'hidden',
                    animation: 'fadeUp 0.6s ease both',
                }}>
                    {/* gradient top line */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                        background: 'var(--gradient-1)', backgroundSize: '200% auto',
                        animation: 'border-flow 3s ease infinite',
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
                        <div>
                            <div style={{
                                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)',
                                letterSpacing: 5, marginBottom: 12, textTransform: 'uppercase',
                            }}>B.Tech · Computer Science</div>
                            <h1 style={{
                                fontFamily: 'var(--font-hero)',
                                fontSize: 'clamp(40px,7vw,72px)',
                                fontWeight: 800, letterSpacing: -2, lineHeight: 0.9,
                                marginBottom: 16,
                            }}>
                                <span style={{ display: 'block', color: 'var(--text)' }}>Kishan</span>
                                <span style={{
                                    display: 'block',
                                    background: 'var(--gradient-1)', backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                    animation: 'border-flow 5s ease infinite',
                                }}>Singh</span>
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 420, lineHeight: 1.7 }}>
                                Full-Stack MERN Developer · IIT BHU Hackathon Runner-Up · LPU CSE (CGPA 7.84)
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 240 }}>
                            {[
                                { icon: '📧', label: 'kishansingh2882004@gmail.com', href: 'mailto:kishansingh2882004@gmail.com' },
                                { icon: '📱', label: '+91 91427 16152', href: 'tel:+919142716152' },
                                { icon: '💼', label: 'linkedin.com/in/kishan-singh', href: 'https://linkedin.com/in/kishan-singh' },
                                { icon: '⚡', label: 'github.com/K-dotKishan', href: 'https://github.com/K-dotKishan' },
                            ].map(item => (
                                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)',
                                    transition: 'color 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    <span>{item.icon}</span> {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Education ── */}
                <Section title="Education" number="01">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {[
                            {
                                inst: 'Lovely Professional University', loc: 'Phagwara, Punjab',
                                degree: 'B.Tech — Computer Science & Engineering',
                                period: 'Aug 2023 — Present', detail: 'CGPA: 7.84',
                                color: '#7efff5',
                            },
                            {
                                inst: 'SGD Modern School', loc: '',
                                degree: 'Intermediate (Class 12)',
                                period: '2022', detail: '74%',
                                color: '#c084fc',
                            },
                            {
                                inst: 'SGD Modern School', loc: '',
                                degree: 'Matriculation (Class 10)',
                                period: '2020', detail: '82%',
                                color: '#ffd93d',
                            },
                        ].map((e, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
                                padding: '22px 28px',
                                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
                                borderLeft: `3px solid ${e.color}`,
                                transition: 'all 0.3s ease',
                            }}
                                onMouseEnter={el => { el.currentTarget.style.transform = 'translateX(6px)'; el.currentTarget.style.boxShadow = `0 8px 24px ${e.color}20`; }}
                                onMouseLeave={el => { el.currentTarget.style.transform = 'none'; el.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{e.inst}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>{e.degree}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{e.period}</div>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: 13, color: e.color,
                                        border: `1px solid ${e.color}50`, padding: '4px 12px', borderRadius: 4,
                                        background: `${e.color}10`,
                                    }}>{e.detail}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── Skills ── */}
                <Section title="Skills" number="02">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                        {[
                            { label: 'Languages', color: '#7efff5', items: ['C', 'C++', 'Java', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'] },
                            { label: 'Frameworks', color: '#ff6b6b', items: ['React.js', 'Node.js', 'Express.js', 'MERN', 'Tailwind CSS'] },
                            { label: 'Tools & Databases', color: '#ffd93d', items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'MySQL', 'Git', 'GitHub', 'RESTful APIs'] },
                            { label: 'Core Concepts', color: '#c084fc', items: ['DSA', 'JWT', 'RBAC', 'OOP', 'Problem Solving'] },
                            { label: 'Soft Skills', color: '#38bdf8', items: ['Team Collaboration', 'Adaptability', 'Technical Presentations'] },
                        ].map(cat => (
                            <div key={cat.label} style={{
                                padding: '28px', background: 'var(--surface)',
                                border: '1px solid var(--border)', borderRadius: 10,
                                position: 'relative', overflow: 'hidden',
                                transition: 'all 0.3s ease',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.boxShadow = `0 12px 32px ${cat.color}15`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: cat.color, backgroundSize: '200% auto', animation: 'border-flow 3s ease infinite' }} />
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: cat.color, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>{cat.label}</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {cat.items.map(item => <Tag key={item} text={item} color={cat.color} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── Projects ── */}
                <Section title="Projects" number="03">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {[
                            {
                                title: 'Occamy Bioscience Field Management System',
                                date: 'Feb 2026',
                                color: '#7efff5',
                                link: 'https://github.com/K-dotKishan',
                                points: [
                                    'Developed a scalable Full-Stack MERN application to streamline logistics between field officers and farmers.',
                                    'Integrated real-time tracking using Google Maps JavaScript API with dynamic markers and live analytics.',
                                    'Engineered secure RESTful APIs with JWT authentication and Role-Based Access Control (RBAC).',
                                    'Implemented automated attendance and activity monitoring for operational transparency.',
                                ],
                                tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Google Maps API'],
                            },
                            {
                                title: 'Jharkhand Tourism Website',
                                date: 'Jan 2026',
                                color: '#ff6b6b',
                                link: 'https://github.com/K-dotKishan',
                                points: [
                                    'Designed a responsive tourism website showcasing Jharkhand destinations with a modern UI and engaging UX.',
                                    'Built interactive components with React.js and implemented robust backend APIs using Node.js and MongoDB.',
                                ],
                                tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
                            },
                            {
                                title: 'Empowerment of Farmer Platform',
                                date: 'Apr 2025',
                                color: '#ffd93d',
                                link: 'https://github.com/K-dotKishan',
                                points: [
                                    'Developed a farmer-centric platform providing direct market access, real-time crop price tracking, and financial resources.',
                                    'Enabled direct farmer-to-mandi access, reducing dependency on middlemen and improving farmer profitability.',
                                    'Integrated government scheme databases and built secure authentication with multilingual support.',
                                ],
                                tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
                            },
                        ].map((p, i) => (
                            <div key={i} style={{
                                padding: '36px', background: 'var(--surface)',
                                border: '1px solid var(--border)', borderRadius: 12,
                                position: 'relative', overflow: 'hidden',
                                transition: 'all 0.4s ease',
                                borderLeft: `4px solid ${p.color}`,
                            }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 48px ${p.color}15`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: 'var(--text)' }}>{p.title}</h3>
                                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 4 }}>{p.date}</span>
                                        <a href={p.link} target="_blank" rel="noreferrer" style={{
                                            fontFamily: 'var(--font-mono)', fontSize: 11, color: p.color,
                                            border: `1px solid ${p.color}50`, padding: '4px 12px', borderRadius: 4,
                                            background: `${p.color}10`, letterSpacing: 1.5, textTransform: 'uppercase',
                                            display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600,
                                            transition: 'all 0.2s ease',
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.background = `${p.color}25`; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = `${p.color}10`; }}
                                        >GitHub ↗</a>
                                    </div>
                                </div>
                                <ul style={{ listStyle: 'none', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {p.points.map((pt, j) => (
                                        <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                            <span style={{ color: p.color, flexShrink: 0, marginTop: 2 }}>→</span> {pt}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {p.tech.map(t => <Tag key={t} text={t} color={p.color} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── Achievements ── */}
                <Section title="Achievements" number="04">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { icon: '🏆', title: 'IIT BHU Hackathon — Runner-Up', desc: 'Outperformed 1350+ teams with a MERN-based solution.', date: 'Feb 2026', color: '#ffd93d', link: 'https://drive.google.com/file/d/YOUR_IIT_BHU_CERT_ID/view' },
                            { icon: '💻', title: 'Technical DSA Proficiency', desc: 'Solved 200+ problems across LeetCode and GFG with a consistent streak.', date: 'Feb 2026', color: '#7efff5', link: null },
                            { icon: '🎤', title: 'Communication Excellence', desc: 'Twice awarded Certificates of Excellence.', date: 'Oct 2025', color: '#ff6b6b', link: 'https://drive.google.com/file/d/YOUR_COMM_CERT_ID/view' },
                            { icon: '🌐', title: 'Inter-College Debate Competition', desc: 'Represented institution in inter-college debate competitions.', date: 'Oct 2025', color: '#c084fc', link: 'https://drive.google.com/file/d/YOUR_DEBATE_CERT_ID/view' },
                            { icon: '🌍', title: 'Social Volunteer', desc: 'Volunteered for social welfare at a local rehabilitation center.', date: 'Jul 2024', color: '#38bdf8', link: null },
                        ].map((a, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
                                padding: '20px 24px',
                                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
                                transition: 'all 0.3s ease',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${a.color}15`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <span style={{ fontSize: 28, flexShrink: 0 }}>{a.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{a.title}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{a.desc}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                                    {a.link && (
                                        <a href={a.link} target="_blank" rel="noreferrer" style={{
                                            fontFamily: 'var(--font-mono)', fontSize: 11, color: a.color,
                                            border: `1px solid ${a.color}50`, padding: '4px 12px', borderRadius: 4,
                                            background: `${a.color}10`, letterSpacing: 1.5, textTransform: 'uppercase',
                                            display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600,
                                            transition: 'all 0.2s ease',
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = `${a.color}25`}
                                            onMouseLeave={e => e.currentTarget.style.background = `${a.color}10`}
                                        >↗ Cert</a>
                                    )}
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 4 }}>{a.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── Training ── */}
                <Section title="Training" number="05">
                    <div style={{
                        padding: '28px 32px',
                        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
                        borderLeft: '4px solid #7efff5',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Logic Building & Data Structures</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>Lovely Professional University</div>
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 4 }}>Jul 2024</span>
                        </div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            Strengthened C++ problem-solving skills and practiced implementation of core DSA concepts and Git.
                        </p>
                    </div>
                </Section>

                {/* ── Certifications ── */}
                <Section title="Certifications" number="06">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            { name: 'Full Stack Development', org: 'Infosys Springboard', year: 'Sep 2024', color: '#7efff5', link: null },
                            { name: 'Human–Computer Interaction', org: 'NPTEL', year: 'Apr 2024', color: '#c084fc', link: 'https://drive.google.com/file/d/YOUR_HCI_CERT_ID/view' },
                            { name: 'Responsive Web Design', org: 'FreeCodeCamp', year: 'Oct 2023', color: '#ffd93d', link: 'https://drive.google.com/file/d/YOUR_FCC_CERT_ID/view' },
                        ].map((c, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
                                padding: '18px 24px',
                                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
                                transition: 'all 0.3s ease',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.transform = 'translateX(6px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
                            >
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{c.name}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{c.org}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    {c.link && (
                                        <a href={c.link} target="_blank" rel="noreferrer" style={{
                                            fontFamily: 'var(--font-mono)', fontSize: 11, color: c.color,
                                            border: `1px solid ${c.color}50`, padding: '4px 12px', borderRadius: 4,
                                            background: `${c.color}10`, letterSpacing: 1.5, textTransform: 'uppercase',
                                            display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600,
                                            transition: 'all 0.2s ease',
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = `${c.color}25`}
                                            onMouseLeave={e => e.currentTarget.style.background = `${c.color}10`}
                                        >↗ View</a>
                                    )}
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: c.color, border: `1px solid ${c.color}50`, padding: '4px 14px', borderRadius: 4, background: `${c.color}10` }}>{c.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Footer */}
                <div style={{
                    borderTop: '1px solid var(--border)', paddingTop: 32, marginTop: 8,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
                    fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)',
                }}>
                    <span>Kishan Singh · kishansingh2882004@gmail.com · +91 91427 16152</span>
                    <span style={{ color: 'var(--accent)' }}>github.com/K-dotKishan</span>
                </div>
            </div>
        </>
    );
}
