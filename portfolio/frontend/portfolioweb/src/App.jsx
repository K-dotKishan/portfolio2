import React, { useState, useEffect, useRef } from 'react';
import cvPhoto from './assets/cv-photo.png';

/* ─── Global Styles ─── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&family=Clash+Display:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #12121a;
    --surface-hover: #1a1a24;
    --border: #2a2a35;
    --border-glow: #3a3a45;
    --accent: #7efff5;
    --accent-glow: rgba(126, 255, 245, 0.4);
    --accent2: #ff6b6b;
    --accent2-glow: rgba(255, 107, 107, 0.4);
    --accent3: #ffd93d;
    --accent3-glow: rgba(255, 217, 61, 0.4);
    --accent4: #c084fc;
    --accent4-glow: rgba(192, 132, 252, 0.4);
    --text: #ffffff;
    --text-secondary: #b0b0c0;
    --muted: #808090;
    --gradient-1: linear-gradient(135deg, #7efff5 0%, #c084fc 50%, #ff6b6b 100%);
    --gradient-2: linear-gradient(135deg, #ffd93d 0%, #ff6b6b 50%, #c084fc 100%);
    --font-display: 'Clash Display', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-hero: 'Syne', sans-serif;
    --font-alt: 'Space Grotesk', sans-serif;
  }

  [data-theme="light"] {
    --bg: #f8fafc;
    --surface: #ffffff;
    --surface-hover: #f1f5f9;
    --border: #e2e8f0;
    --border-glow: #cbd5e1;
    --accent: #0891b2;
    --accent-glow: rgba(8, 145, 178, 0.2);
    --accent2: #dc2626;
    --accent2-glow: rgba(220, 38, 38, 0.2);
    --accent3: #ca8a04;
    --accent3-glow: rgba(202, 138, 4, 0.2);
    --accent4: #7c3aed;
    --accent4-glow: rgba(124, 58, 237, 0.2);
    --text: #0f172a;
    --text-secondary: #334155;
    --muted: #64748b;
  }

  html { transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  body { transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1); }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-alt);
    overflow-x: hidden;
    cursor: none;
    line-height: 1.6;
  }

  ::selection { 
    background: var(--accent); 
    color: var(--bg); 
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { 
    background: var(--bg); 
  }
  ::-webkit-scrollbar-thumb { 
    background: var(--accent); 
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent2);
  }

  a { color: inherit; text-decoration: none; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-10px) scale(1.02); }
  }

  @keyframes glow-pulse {
    0%, 100% { 
      filter: drop-shadow(0 0 20px var(--accent-glow)) drop-shadow(0 0 40px var(--accent2-glow));
      opacity: 0.5;
    }
    50% { 
      filter: drop-shadow(0 0 40px var(--accent-glow)) drop-shadow(0 0 80px var(--accent2-glow)) drop-shadow(0 0 120px var(--accent3-glow));
      opacity: 0.8;
    }
  }

  @keyframes border-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    50%, 100% { transform: translateX(200%) skewX(-15deg); }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes scale-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes rotate-glow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes fadeUp {
    from { 
      opacity: 0; 
      transform: translateY(60px) scale(0.95);
      filter: blur(10px);
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

/* ─── Custom Cursor ─── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const trail = useRef([]);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let trailPositions = [];
    const trailCount = 8;

    const onMove = e => {
      mx = e.clientX;
      my = e.clientY;
    };

    const animate = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      // Update trail positions
      trailPositions.unshift({ x: mx, y: my });
      if (trailPositions.length > trailCount) trailPositions.pop();

      if (dot.current) {
        dot.current.style.left = mx + 'px';
        dot.current.style.top = my + 'px';
      }
      if (ring.current) {
        ring.current.style.left = rx + 'px';
        ring.current.style.top = ry + 'px';
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed',
        width: 6,
        height: 6,
        background: 'var(--accent)',
        borderRadius: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: '0 0 20px var(--accent-glow)',
        transition: 'transform 0.1s ease'
      }} />
      <div ref={ring} style={{
        position: 'fixed',
        width: 44,
        height: 44,
        border: '1.5px solid var(--accent)',
        borderRadius: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0.4,
        boxShadow: '0 0 30px var(--accent-glow)',
        transition: 'all 0.2s ease'
      }} />
    </>
  );
}

/* ─── Enhanced Noise Overlay ─── */
function Noise() {
  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9990,
        backgroundImage: `radial-gradient(circle at 30% 50%, rgba(126,255,245,0.03) 0%, transparent 50%),
                         radial-gradient(circle at 70% 50%, rgba(255,107,107,0.03) 0%, transparent 50%)`,
      }} />
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9991,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
        opacity: 0.2,
        mixBlendMode: 'overlay',
      }} />
    </>
  );
}

/* ─── Glowing Orb ─── */
function GlowingOrb({ color, size, top, right, left, bottom, delay }) {
  return (
    <div style={{
      position: 'absolute',
      top,
      right,
      left,
      bottom,
      width: size,
      height: size,
      background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
      opacity: 0.1,
      animation: `float-slow ${8 + delay}s ease-in-out infinite`,
      pointerEvents: 'none',
      zIndex: 0,
      filter: 'blur(40px)',
    }} />
  );
}

/* ─── Navbar ─── */
function Navbar({ dark, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [cvHovered, setCvHovered] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = ['About', 'Skills', 'Projects', 'Achievements', 'Contact'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '18px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? (dark ? 'rgba(10,10,15,0.85)' : 'rgba(248,250,252,0.85)') : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        fontWeight: 700,
        position: 'relative',
        padding: '6px 12px',
        background: scrolled ? 'var(--surface)' : 'transparent',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <span style={{
          background: 'var(--gradient-1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          position: 'relative',
          zIndex: 1
        }}>KS</span>
        <span style={{ color: 'var(--muted)' }}>.dev</span>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)',
          transform: 'translateX(-100%)',
          animation: scrolled ? 'shimmer 3s infinite' : 'none',
        }} />
      </div>

      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: 2,
              color: hoveredLink === l ? 'var(--accent)' : 'var(--muted)',
              textTransform: 'uppercase',
              position: 'relative',
              padding: '4px 0',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={() => setHoveredLink(l)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {l}
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: hoveredLink === l ? '100%' : '0%',
              height: '2px',
              background: 'var(--gradient-1)',
              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </a>
        ))}

        {/* CV Button */}
        <a
          href="https://drive.google.com/file/d/1Rrn5dhpD17vykgtZL6TnPpl78XXKf5F_/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setCvHovered(true)}
          onMouseLeave={() => setCvHovered(false)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            padding: '7px 18px',
            border: '1.5px solid var(--accent)',
            borderRadius: '4px',
            color: cvHovered ? 'var(--bg)' : 'var(--accent)',
            background: cvHovered
              ? 'var(--gradient-1)'
              : 'rgba(126,255,245,0.07)',
            backgroundSize: '200% auto',
            boxShadow: cvHovered ? '0 4px 20px var(--accent-glow)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontWeight: 700,
            cursor: 'none',
          }}
        >
          <span style={{ fontSize: 11 }}>↗</span>
          CV
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%)',
            animation: cvHovered ? 'shimmer 1.5s infinite' : 'none',
          }} />
        </a>

        {/* Enhanced Theme Toggle */}
        <button onClick={onToggle} style={{
          width: 56,
          height: 30,
          borderRadius: 15,
          border: '2px solid var(--border)',
          background: dark ? 'linear-gradient(135deg, #1a1a2a 0%, #2a2a3a 100%)' : 'linear-gradient(135deg, #f0f4fa 0%, #e0e8f0 100%)',
          cursor: 'none',
          position: 'relative',
          flexShrink: 0,
          transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          outline: 'none',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%)',
            animation: 'shimmer 3s infinite',
          }} />
          <span style={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 12,
            opacity: dark ? 0.3 : 1,
            transition: 'opacity 0.3s'
          }}>☀️</span>
          <span style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 12,
            opacity: dark ? 1 : 0.3,
            transition: 'opacity 0.3s'
          }}>🌙</span>
          <span style={{
            position: 'absolute',
            top: 3,
            left: dark ? 3 : 29,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: dark ? 'linear-gradient(135deg, #7efff5 0%, #c084fc 100%)' : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            transition: 'left 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}>
            {dark ? '🌙' : '☀️'}
          </span>
        </button>
      </div>
    </nav>
  );
}

/* ─── Enhanced Hero ─── */
function Hero() {
  const [typed, setTyped] = useState('');
  const roles = ['IIT BHU Hackathon Runner-Up 🏆', 'Full Stack Engineer', 'Problem Solver'];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const role = roles[roleRef.current];
      if (!deleting.current) {
        setTyped(role.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === role.length) { deleting.current = true; return setTimeout(tick, 2000); }
      } else {
        setTyped(role.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) { deleting.current = false; roleRef.current = (roleRef.current + 1) % roles.length; }
      }
      setTimeout(tick, deleting.current ? 30 : 70);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="about" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '140px 60px 80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient orbs */}
      <GlowingOrb color="var(--accent)" size="600px" top="-200px" right="-100px" delay={0} />
      <GlowingOrb color="var(--accent2)" size="500px" bottom="-200px" left="-100px" delay={2} />
      <GlowingOrb color="var(--accent3)" size="400px" top="30%" left="20%" delay={4} />

      {/* Animated grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.2,
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
        animation: 'float-slow 20s ease-in-out infinite',
      }} />

      {/* Two-column layout */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: 80,
        maxWidth: 1200,
        width: '100%',
        animation: 'fadeUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) both',
      }}>

        {/* Left: Text content */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            fontSize: 14,
            letterSpacing: 5,
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <span style={{
              display: 'inline-block',
              width: 60,
              height: 2,
              background: 'var(--gradient-1)',
              backgroundSize: '200% auto',
              animation: 'border-flow 3s ease infinite',
            }} />
            <span style={{
              padding: '4px 12px',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              background: 'var(--surface)',
              backdropFilter: 'blur(10px)'
            }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(56px, 8vw, 110px)',
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: -4,
            marginBottom: 40,
            textTransform: 'uppercase',
          }}>
            <span style={{
              display: 'block',
              color: 'var(--text)',
              textShadow: '0 0 40px var(--accent-glow)',
              position: 'relative',
            }}>
              Kishan
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'var(--gradient-1)',
                opacity: 0.3,
                filter: 'blur(40px)',
                zIndex: -1,
              }} />
            </span>
            <span style={{
              display: 'block',
              background: 'var(--gradient-1)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 5s ease infinite',
              letterSpacing: -2,
              position: 'relative',
            }}>
              Singh
            </span>
          </h1>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(18px,3vw,24px)',
            color: 'var(--muted)',
            marginBottom: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              color: 'var(--text)',
              fontWeight: 500,
              background: 'linear-gradient(135deg, var(--text) 0%, var(--text-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>{typed}</span>
            <span style={{
              animation: 'blink 1s infinite',
              color: 'var(--accent)',
              fontSize: '32px',
              lineHeight: 1
            }}>_</span>
          </div>

          <p style={{
            maxWidth: 560,
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            fontSize: 16,
            marginBottom: 56,
            fontWeight: 400,
            letterSpacing: 0.3
          }}>
            Computer Science student at LPU. Runner-up at IIT BHU Hackathon among 1350+ teams.
            Building scalable MERN applications that solve real-world problems with elegant design.
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href="#contact" style={{
              padding: '16px 40px',
              background: 'var(--gradient-1)',
              backgroundSize: '200% auto',
              color: 'var(--bg)',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'none',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px var(--accent-glow)',
            }}
              onMouseEnter={e => {
                e.target.style.backgroundPosition = 'right center';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 30px var(--accent-glow)';
              }}
              onMouseLeave={e => {
                e.target.style.backgroundPosition = 'left center';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px var(--accent-glow)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Hire Me →</span>
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transform: 'translateX(-100%)',
                animation: 'shimmer 3s infinite',
              }} />
            </a>

            <a href="https://github.com/K-dotKishan" target="_blank" rel="noreferrer" style={{
              padding: '16px 40px',
              background: 'transparent',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              border: '2px solid var(--border)',
              cursor: 'none',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 20px var(--accent-glow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >GitHub ↗</a>
          </div>
        </div>

        {/* Right: Photo */}
        <div style={{
          position: 'relative',
          width: 320,
          height: 320,
          flexShrink: 0,
          animation: 'fadeUp 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
        }}>
          {/* Spinning gradient ring */}
          <div style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            background: 'var(--gradient-1)',
            backgroundSize: '300% 300%',
            animation: 'rotate-glow 4s linear infinite, gradient-shift 5s ease infinite',
            zIndex: 0,
          }} />
          {/* Inner dark gap ring */}
          <div style={{
            position: 'absolute',
            inset: 3,
            borderRadius: '50%',
            background: 'var(--bg)',
            zIndex: 1,
          }} />
          {/* Glow halo */}
          <div style={{
            position: 'absolute',
            inset: -20,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(126,255,245,0.15) 0%, rgba(192,132,252,0.1) 50%, transparent 70%)',
            animation: 'glow-pulse 3s ease-in-out infinite',
            zIndex: 0,
          }} />
          {/* The photo */}
          <img
            src={cvPhoto}
            alt="Kishan Singh"
            style={{
              position: 'absolute',
              inset: 8,
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 16px)',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center top',
              zIndex: 2,
              filter: 'contrast(1.05) brightness(1.02)',
            }}
          />
          {/* Subtle overlay shimmer */}
          <div style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(126,255,245,0.08) 0%, transparent 60%)',
            zIndex: 3,
            pointerEvents: 'none',
          }} />
          {/* Status badge */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            right: 0,
            zIndex: 4,
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
            borderRadius: 20,
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--accent)',
            letterSpacing: 1.5,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px var(--accent-glow)',
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
              boxShadow: '0 0 8px var(--accent)',
              animation: 'scale-pulse 1.5s ease-in-out infinite',
            }} />
            OPEN TO WORK
          </div>
        </div>

      </div>

    </section>
  );
}

/* ─── Enhanced Skills ─── */
function Skills() {
  const cats = [
    { label: 'Languages', color: '#7efff5', glow: 'rgba(126,255,245,0.2)', items: ['C', 'C++', 'Java', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'] },
    { label: 'Frameworks', color: '#ff6b6b', glow: 'rgba(255,107,107,0.2)', items: ['React.js', 'Node.js', 'Express.js', 'MERN', 'Tailwind CSS'] },
    { label: 'Tools & DBs', color: '#ffd93d', glow: 'rgba(255,217,61,0.2)', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Git', 'GitHub', 'REST APIs', 'Mongoose'] },
    { label: 'Core Concepts', color: '#c084fc', glow: 'rgba(192,132,252,0.2)', items: ['DSA', 'JWT', 'RBAC', 'OOP', 'Problem Solving'] },
  ];

  return (
    <section id="skills" style={{ padding: '120px 60px', position: 'relative' }}>
      <GlowingOrb color="var(--accent4)" size="400px" top="20%" right="10%" delay={1} />

      <SectionHeader number="01" title="Technical Skills" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
        marginTop: 60
      }}>
        {cats.map((cat, i) => (
          <div key={cat.label} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden',
            animation: `fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s both`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.borderColor = cat.color;
              e.currentTarget.style.boxShadow = `0 20px 40px ${cat.glow}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80, ${cat.color})`,
              backgroundSize: '200% auto',
              animation: 'border-flow 3s ease infinite',
            }} />

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: cat.color,
              letterSpacing: 4,
              marginBottom: 24,
              textTransform: 'uppercase',
              fontWeight: 600
            }}>{cat.label}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {cat.items.map(item => (
                <span key={item} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  padding: '8px 16px',
                  border: `1px solid ${cat.color}40`,
                  color: 'var(--text)',
                  background: `${cat.color}08`,
                  letterSpacing: 1,
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.target.style.background = `${cat.color}20`;
                    e.target.style.borderColor = cat.color;
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = `${cat.color}08`;
                    e.target.style.borderColor = `${cat.color}40`;
                    e.target.style.transform = 'scale(1)';
                  }}
                >{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Enhanced Projects ─── */
function Projects() {
  const projects = [
    {
      title: 'Occamy Bioscience FMS',
      date: 'Feb 2026',
      tag: 'FEATURED',
      tagColor: '#7efff5',
      desc: 'Full-Stack MERN application to streamline logistics between field officers and farmers with real-time tracking.',
      points: ['Real-time tracking via Google Maps JS API with dynamic markers', 'JWT authentication + Role-Based Access Control (RBAC)', 'Automated attendance & activity monitoring'],
      tech: ['MongoDB', 'Express', 'React', 'Node', 'Tailwind', 'Maps API'],
      link: 'https://github.com/K-dotKishan',
      color: '#7efff5',
      gradient: 'linear-gradient(135deg, #7efff5 0%, #c084fc 100%)'
    },
    {
      title: 'Jharkhand Tourism Website',
      date: 'Jan 2026',
      tag: 'WEB',
      tagColor: '#ff6b6b',
      desc: 'Responsive tourism platform showcasing Jharkhand destinations with modern UI and engaging user experience.',
      points: ['Interactive React.js components', 'Full backend with Node.js + MongoDB', 'Responsive mobile-first design'],
      tech: ['React', 'Node', 'Express', 'MongoDB', 'Tailwind'],
      link: 'https://github.com/K-dotKishan',
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)'
    },
    {
      title: 'Farmer Empowerment Platform',
      date: 'Apr 2025',
      tag: 'SOCIAL IMPACT',
      tagColor: '#ffd93d',
      desc: 'Farmer-centric platform providing direct market access, crop price tracking and government scheme database.',
      points: ['Direct farmer-to-mandi access (bypasses middlemen)', 'Real-time crop price tracking', 'Multilingual support + secure auth'],
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      link: 'https://github.com/K-dotKishan',
      color: '#ffd93d',
      gradient: 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)'
    }
  ];

  return (
    <section id="projects" style={{
      padding: '120px 60px',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 30%, var(--bg) 100%)',
      position: 'relative'
    }}>
      <GlowingOrb color="var(--accent2)" size="500px" bottom="10%" right="10%" delay={3} />

      <SectionHeader number="02" title="Projects" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 60 }}>
        {projects.map((p, i) => (
          <div key={p.title} style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '48px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            animation: `fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.2}s both`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
              e.currentTarget.style.borderColor = p.color;
              e.currentTarget.style.boxShadow = `0 30px 60px ${p.color}20`;
              e.currentTarget.style.background = 'var(--surface)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              e.currentTarget.style.background = 'var(--bg)';
            }}
          >
            {/* Gradient accent line */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              background: p.gradient,
              backgroundSize: '200% auto',
              animation: 'gradient-shift 3s ease infinite',
            }} />

            {/* Shimmer effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
              transform: 'translateX(-100%)',
              animation: 'shimmer 4s infinite',
              pointerEvents: 'none',
            }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  padding: '6px 14px',
                  border: `1px solid ${p.color}`,
                  color: p.color,
                  letterSpacing: 3,
                  borderRadius: '4px',
                  background: `${p.color}10`,
                  fontWeight: 600
                }}>{p.tag}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--muted)',
                  padding: '4px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                }}>{p.date}</span>
              </div>
              <h3 style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: -1.5,
                marginBottom: 16,
                background: p.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{p.title}</h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: 15,
                fontWeight: 400
              }}>{p.desc}</p>
            </div>

            <div>
              <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                {p.points.map((pt, idx) => (
                  <li key={pt} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    paddingLeft: 24,
                    position: 'relative',
                    marginBottom: 12,
                    lineHeight: 1.7,
                    animation: `fadeInScale 0.5s ease ${i * 0.2 + idx * 0.1}s both`
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: p.color,
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}>→</span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {p.tech.map((t, idx) => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    padding: '6px 14px',
                    background: `${p.color}10`,
                    border: `1px solid ${p.color}30`,
                    color: p.color,
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                    animation: `fadeInScale 0.5s ease ${i * 0.2 + idx * 0.1}s both`
                  }}
                    onMouseEnter={e => {
                      e.target.style.background = `${p.color}20`;
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = `${p.color}10`;
                      e.target.style.transform = 'scale(1)';
                    }}
                  >{t}</span>
                ))}
              </div>

              <a href={p.link} target="_blank" rel="noreferrer" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: p.color,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                borderBottom: `2px solid ${p.color}40`,
                paddingBottom: 4,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: 600
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.gap = '16px';
                  e.currentTarget.style.borderBottomColor = p.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.gap = '8px';
                  e.currentTarget.style.borderBottomColor = `${p.color}40`;
                }}
              >View on GitHub →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Enhanced Achievements ─── */
function Achievements() {
  const items = [
    { icon: '🏆', title: 'IIT BHU Hackathon Runner-Up', sub: '2nd among 1350+ teams · Feb 2026', color: '#ffd93d', glow: 'rgba(255,217,61,0.3)', link: 'https://drive.google.com/file/d/YOUR_IIT_BHU_CERT_ID/view' },
    { icon: '💻', title: 'DSA Problem Solver', sub: '200+ problems on LeetCode & GFG · Consistent streak', color: '#7efff5', glow: 'rgba(126,255,245,0.3)', link: null },
    { icon: '🎤', title: 'Communication Excellence', sub: 'Twice awarded Certificate of Excellence · Oct 2025', color: '#ff6b6b', glow: 'rgba(255,107,107,0.3)', link: 'https://drive.google.com/file/d/YOUR_COMM_CERT_ID/view' },
    { icon: '🌐', title: 'Inter-College Debate', sub: 'Represented institution · Oct 2025', color: '#c084fc', glow: 'rgba(192,132,252,0.3)', link: 'https://drive.google.com/file/d/YOUR_DEBATE_CERT_ID/view' },
  ];

  const certs = [
    { name: 'Full Stack Development', org: 'Infosys Springboard', year: '2024', link: null },
    { name: 'Human-Computer Interaction', org: 'NPTEL', year: '2024', link: 'https://drive.google.com/file/d/YOUR_HCI_CERT_ID/view' },
    { name: 'Responsive Web Design', org: 'FreeCodeCamp', year: '2023', link: 'https://drive.google.com/file/d/YOUR_FCC_CERT_ID/view' },
  ];

  return (
    <section id="achievements" style={{ padding: '120px 60px', position: 'relative' }}>
      <GlowingOrb color="var(--accent3)" size="450px" top="30%" left="5%" delay={2} />

      <SectionHeader number="03" title="Achievements" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        marginTop: 60
      }}>
        {items.map((a, i) => (
          <div key={a.title} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '36px',
            animation: `fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s both`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.borderColor = a.color;
              e.currentTarget.style.boxShadow = `0 30px 60px ${a.glow}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              background: `radial-gradient(circle, ${a.color}20 0%, transparent 70%)`,
              animation: 'rotate-glow 10s linear infinite',
            }} />

            <div style={{
              fontSize: 42,
              marginBottom: 20,
              animation: 'scale-pulse 3s ease-in-out infinite',
            }}>{a.icon}</div>

            <h4 style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 10,
              color: 'var(--text)',
              letterSpacing: -0.5
            }}>{a.title}</h4>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: a.link ? 16 : 0,
            }}>{a.sub}</p>

            {a.link && (
              <a href={a.link} target="_blank" rel="noreferrer" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: a.color,
                letterSpacing: 2,
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                border: `1px solid ${a.color}50`,
                padding: '5px 12px',
                borderRadius: '4px',
                background: `${a.color}10`,
                transition: 'all 0.3s ease',
                fontWeight: 600,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${a.color}25`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${a.color}30`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${a.color}10`;
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >↗ Certificate</a>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 80 }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--muted)',
          letterSpacing: 4,
          marginBottom: 32,
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          <span style={{
            width: 40,
            height: 2,
            background: 'var(--gradient-2)',
            backgroundSize: '200% auto',
            animation: 'border-flow 3s ease infinite',
          }} />
          Certifications
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {certs.map((c, i) => (
            <div key={c.name} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 32px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: `fadeUp 0.6s ease ${i * 0.1}s both`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 10px 30px var(--accent-glow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              <div>
                <div style={{
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 4,
                  color: 'var(--text)'
                }}>{c.name}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--text-secondary)'
                }}>{c.org}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noreferrer" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--accent)',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    border: '1px solid var(--accent)50',
                    borderRadius: '4px',
                    background: 'var(--accent)08',
                    transition: 'all 0.3s ease',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--accent)20';
                      e.currentTarget.style.boxShadow = '0 4px 12px var(--accent-glow)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--accent)08';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >↗ View</a>
                )}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--accent)',
                  border: '1px solid var(--accent)40',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  background: 'var(--accent)08',
                }}>{c.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Enhanced Contact ─── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error'); setMsg('Please fill all fields.'); return;
    }
    setStatus('loading');
    try {
      const apiUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/contact`
        : '/api/contact';

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (res.ok) { setStatus('success'); setMsg(data.message); setForm({ name: '', email: '', message: '' }); }
      else { setStatus('error'); setMsg(data.error); }
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('error'); setMsg('Request timed out. Render is waking up — please try again in 30 seconds!');
      } else {
        setStatus('error'); setMsg('Network error. Please try again.');
      }
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '16px 20px',
    background: 'var(--bg)',
    border: `2px solid ${focusedField === field ? 'var(--accent)' : 'var(--border)'}`,
    color: 'var(--text)',
    fontFamily: 'var(--font-alt)',
    fontSize: 15,
    outline: 'none',
    transition: 'all 0.3s ease',
    borderRadius: '8px',
    boxShadow: focusedField === field ? '0 0 30px var(--accent-glow)' : 'none',
  });

  return (
    <section id="contact" style={{ padding: '120px 60px', position: 'relative' }}>
      <GlowingOrb color="var(--accent)" size="500px" bottom="20%" left="10%" delay={4} />

      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: 2,
        background: 'var(--gradient-1)',
        backgroundSize: '200% auto',
        animation: 'border-flow 3s ease infinite',
      }} />

      <SectionHeader number="04" title="Get In Touch" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        marginTop: 60,
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        {/* Info */}
        <div style={{ animation: 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) both' }}>
          <p style={{
            fontSize: 20,
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            marginBottom: 56,
            fontWeight: 400
          }}>
            I'm actively looking for opportunities in full-stack development.
            Whether you have a project in mind or just want to say hi — my inbox is open!
          </p>

          {[
            { icon: '📧', label: 'Email', value: 'kishansingh2882004@gmail.com', href: 'mailto:kishansingh2882004@gmail.com' },
            { icon: '📱', label: 'Phone', value: '+91 91427 16152', href: 'tel:+919142716152' },
            { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/kishan-singh', href: 'https://linkedin.com/in/kishan-singh' },
            { icon: '⚡', label: 'GitHub', value: 'github.com/K-dotKishan', href: 'https://github.com/K-dotKishan' },
          ].map((item, i) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '20px 0',
              borderBottom: '2px solid var(--border)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: `fadeInScale 0.5s ease ${i * 0.1}s both`,
              textDecoration: 'none',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.paddingLeft = '20px';
                e.currentTarget.style.borderBottomColor = 'var(--accent)';
                e.currentTarget.style.background = 'linear-gradient(90deg, var(--accent-glow), transparent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.paddingLeft = '0';
                e.currentTarget.style.borderBottomColor = 'var(--border)';
                e.currentTarget.style.background = 'none';
              }}
            >
              <span style={{
                fontSize: 24,
                animation: 'scale-pulse 3s ease-in-out infinite',
              }}>{item.icon}</span>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  letterSpacing: 3,
                  marginBottom: 4,
                  textTransform: 'uppercase'
                }}>{item.label}</div>
                <div style={{
                  fontSize: 15,
                  color: 'var(--text)',
                  fontWeight: 600,
                  letterSpacing: 0.5
                }}>{item.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div style={{ animation: 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            background: 'var(--surface)',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handle}
              style={inputStyle('name')}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
            <input
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handle}
              style={inputStyle('email')}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handle}
              rows={6}
              style={{
                ...inputStyle('message'),
                resize: 'vertical',
                fontFamily: 'var(--font-alt)',
              }}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
            />

            {status === 'success' && (
              <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, rgba(126,255,245,0.1) 0%, rgba(126,255,245,0.2) 100%)',
                border: '2px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                borderRadius: '8px',
                animation: 'fadeInScale 0.3s ease',
              }}>
                ✓ {msg}
              </div>
            )}
            {status === 'error' && (
              <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,107,107,0.2) 100%)',
                border: '2px solid var(--accent2)',
                color: 'var(--accent2)',
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                borderRadius: '8px',
                animation: 'fadeInScale 0.3s ease',
              }}>
                ✗ {msg}
              </div>
            )}

            <button
              onClick={submit}
              disabled={status === 'loading'}
              style={{
                padding: '18px',
                background: status === 'loading' ? 'var(--border)' : 'var(--gradient-1)',
                backgroundSize: '200% auto',
                color: 'var(--bg)',
                fontFamily: 'var(--font-alt)',
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px var(--accent-glow)',
              }}
              onMouseEnter={e => {
                if (status !== 'loading') {
                  e.target.style.backgroundPosition = 'right center';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 40px var(--accent-glow)';
                }
              }}
              onMouseLeave={e => {
                e.target.style.backgroundPosition = 'left center';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px var(--accent-glow)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transform: 'translateX(-100%)',
                animation: status === 'loading' ? 'none' : 'shimmer 3s infinite',
              }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Enhanced Footer ─── */
function Footer() {
  return (
    <footer style={{
      padding: '40px 60px',
      borderTop: '2px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--muted)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--gradient-1)',
        backgroundSize: '200% auto',
        animation: 'border-flow 3s ease infinite',
      }} />

      <span>© 2026 Kishan Singh. Built with React + Node.js.</span>

      <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        Designed with
        <span style={{
          color: 'var(--accent2)',
          animation: 'scale-pulse 1s ease-in-out infinite',
          display: 'inline-block',
        }}>♥</span>
        by Kishan
      </span>
    </footer>
  );
}

/* ─── Enhanced Marquee Banner ─── */
function MarqueeBanner() {
  const items = ['MERN Developer', 'IIT BHU Runner-Up', '200+ DSA Problems', 'LPU CSE', 'Open to Work'];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '2px solid var(--border)',
      borderBottom: '2px solid var(--border)',
      padding: '16px 0',
      background: 'var(--surface)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, var(--bg) 0%, transparent 10%, transparent 90%, var(--bg) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <div style={{
        display: 'flex',
        gap: 60,
        animation: 'marquee 25s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: 'var(--text-secondary)',
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            <span style={{
              color: 'var(--accent)',
              marginRight: 24,
              animation: 'glow-pulse 2s ease-in-out infinite',
            }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Enhanced Section Header ─── */
function SectionHeader({ number, title }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      marginBottom: 16,
      position: 'relative',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        color: 'var(--accent)',
        letterSpacing: 3,
        fontWeight: 600,
        padding: '4px 12px',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        background: 'var(--surface)',
      }}>{number}</span>
      <div style={{
        width: 2,
        height: 50,
        background: 'var(--gradient-1)',
        backgroundSize: '200% auto',
        animation: 'border-flow 3s ease infinite',
      }} />
      <h2 style={{
        fontSize: 'clamp(36px,6vw,64px)',
        fontWeight: 800,
        letterSpacing: -3,
        background: 'var(--gradient-1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundSize: '200% auto',
        animation: 'gradient-shift 5s ease infinite',
      }}>{title}</h2>
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <>
      <style>{globalCSS}</style>
      <Cursor />
      <Noise />
      <Navbar dark={dark} onToggle={() => setDark(d => !d)} />
      <Hero />
      <MarqueeBanner />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}