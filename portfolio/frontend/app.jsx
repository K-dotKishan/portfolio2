import React, { useState, useEffect, useRef } from 'react';

/* ─── Global Styles ─── */
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060608;
    --surface: #0e0e12;
    --border: #1e1e28;
    --accent: #7efff5;
    --accent2: #ff6b6b;
    --accent3: #ffd93d;
    --text: #e8e8f0;
    --muted: #6b6b80;
    --font-display: 'Syne', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-display);
    overflow-x: hidden;
    cursor: none;
  }

  ::selection { background: var(--accent); color: #000; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  a { color: inherit; text-decoration: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: scaleX(0); } to { transform: scaleX(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 20px rgba(126,255,245,0.3); }
    50%       { text-shadow: 0 0 60px rgba(126,255,245,0.8), 0 0 100px rgba(126,255,245,0.4); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

/* ─── Custom Cursor ─── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = e => { mx = e.clientX; my = e.clientY; };
    const animate = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px'; }
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', onMove);
    animate();
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={dot} style={{ position:'fixed',width:8,height:8,background:'var(--accent)',borderRadius:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:9999,transition:'transform 0.1s' }} />
      <div ref={ring} style={{ position:'fixed',width:36,height:36,border:'1px solid var(--accent)',borderRadius:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:9998,opacity:0.5 }} />
    </>
  );
}

/* ─── Noise Overlay ─── */
function Noise() {
  return (
    <div style={{
      position:'fixed',inset:0,pointerEvents:'none',zIndex:9990,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      opacity:0.4
    }}/>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = ['About','Skills','Projects','Achievements','Contact'];

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:1000,
      padding:'20px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',
      background: scrolled ? 'rgba(6,6,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition:'all 0.4s ease'
    }}>
      <div style={{ fontFamily:'var(--font-mono)',color:'var(--accent)',fontSize:14,letterSpacing:2 }}>
        KS<span style={{color:'var(--muted)'}}>.dev</span>
      </div>
      <div style={{display:'flex',gap:32}}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:2,color:'var(--muted)',
            textTransform:'uppercase',transition:'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color='var(--accent)'}
          onMouseLeave={e => e.target.style.color='var(--muted)'}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const [typed, setTyped] = useState('');
  const roles = ['Full Stack Developer', 'MERN Specialist', 'Problem Solver', 'Hackathon Runner-Up'];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const deleting = useRef(false);
 
  // here is the code for the typing effect
  useEffect(() => {
    const tick = () => {
      const role = roles[roleRef.current];
      if (!deleting.current) {
        setTyped(role.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === role.length) { deleting.current = true; return setTimeout(tick, 1800); }
      } else {
        setTyped(role.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) { deleting.current = false; roleRef.current = (roleRef.current + 1) % roles.length; }
      }
      setTimeout(tick, deleting.current ? 40 : 80);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="about" style={{
      minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',
      padding:'120px 60px 60px',position:'relative',overflow:'hidden'
    }}>
      {/* Grid background */}
      <div style={{
        position:'absolute',inset:0,
        backgroundImage:'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize:'60px 60px',opacity:0.4,
        maskImage:'radial-gradient(ellipse at center, black 30%, transparent 80%)'
      }}/>

      {/* Glow blob */}
      <div style={{
        position:'absolute',top:'20%',right:'10%',width:500,height:500,
        background:'radial-gradient(circle, rgba(126,255,245,0.08) 0%, transparent 70%)',
        animation:'float 6s ease-in-out infinite'
      }}/>

      <div style={{ position:'relative', maxWidth:900, animation:'fadeUp 0.8s ease both' }}>
        <div style={{ fontFamily:'var(--font-mono)',color:'var(--accent)',fontSize:13,letterSpacing:4,marginBottom:24,display:'flex',alignItems:'center',gap:12 }}>
          <span style={{ display:'inline-block',width:40,height:1,background:'var(--accent)' }}/>
          AVAILABLE FOR OPPORTUNITIES
        </div>

        <h1 style={{
          fontSize:'clamp(52px, 8vw, 110px)',fontWeight:800,lineHeight:0.9,letterSpacing:-3,
          marginBottom:24,animation:'glow 4s ease-in-out infinite'
        }}>
          Kishan<br/>
          <span style={{ color:'var(--accent)',WebkitTextStroke:'2px var(--accent)',WebkitTextFillColor:'transparent' }}>Singh</span>
        </h1>

        <div style={{ fontFamily:'var(--font-mono)',fontSize:'clamp(16px,2.5vw,22px)',color:'var(--muted)',marginBottom:40,height:32 }}>
          <span style={{ color:'var(--text)' }}>{typed}</span>
          <span style={{ animation:'blink 1s infinite',color:'var(--accent)' }}>_</span>
        </div>

        <p style={{ maxWidth:500,lineHeight:1.7,color:'var(--muted)',fontSize:15,marginBottom:48 }}>
          Computer Science student at LPU. Runner-up at IIT BHU Hackathon among 1350+ teams.
          Building scalable MERN applications that solve real-world problems.
        </p>

        <div style={{ display:'flex',gap:16,flexWrap:'wrap' }}>
          <a href="#contact" style={{
            padding:'14px 32px',background:'var(--accent)',color:'#000',fontWeight:700,
            fontSize:13,letterSpacing:2,textTransform:'uppercase',
            border:'none',cursor:'none',transition:'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.background='#000'; e.target.style.color='var(--accent)'; e.target.style.boxShadow='0 0 30px rgba(126,255,245,0.4)'; }}
          onMouseLeave={e => { e.target.style.background='var(--accent)'; e.target.style.color='#000'; e.target.style.boxShadow='none'; }}
          >Hire Me →</a>

          <a href="https://github.com/K-dotKishan" target="_blank" rel="noreferrer" style={{
            padding:'14px 32px',background:'transparent',color:'var(--text)',fontWeight:600,
            fontSize:13,letterSpacing:2,textTransform:'uppercase',
            border:'1px solid var(--border)',cursor:'none',transition:'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text)'; }}
          >GitHub ↗</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute',bottom:40,left:60,fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',letterSpacing:3,display:'flex',alignItems:'center',gap:12 }}>
        <div style={{ width:1,height:60,background:'linear-gradient(to bottom, transparent, var(--accent))' }}/>
        SCROLL
      </div>
    </section>
  );
}

/* ─── Skills ─── */
function Skills() {
  const cats = [
    { label: 'Languages', color: '#7efff5', items: ['C', 'C++', 'Java', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'] },
    { label: 'Frameworks', color: '#ff6b6b', items: ['React.js', 'Node.js', 'Express.js', 'MERN', 'Tailwind CSS'] },
    { label: 'Tools & DBs', color: '#ffd93d', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Git', 'GitHub', 'REST APIs', 'Mongoose'] },
    { label: 'Core Concepts', color: '#c084fc', items: ['DSA', 'JWT', 'RBAC', 'OOP', 'Problem Solving'] },
  ];

  return (
    <section id="skills" style={{ padding:'100px 60px',position:'relative' }}>
      <SectionHeader number="01" title="Technical Skills" />

      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:2,marginTop:60 }}>
        {cats.map((cat,i) => (
          <div key={cat.label} style={{
            background:'var(--surface)',border:'1px solid var(--border)',
            padding:'32px',position:'relative',overflow:'hidden',
            animation:`fadeUp 0.6s ease ${i*0.1}s both`,
            transition:'transform 0.3s, border-color 0.3s'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=cat.color; e.currentTarget.style.transform='translateY(-4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none'; }}
          >
            <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:cat.color }}/>
            <div style={{ fontFamily:'var(--font-mono)',fontSize:11,color:cat.color,letterSpacing:3,marginBottom:20,textTransform:'uppercase' }}>{cat.label}</div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
              {cat.items.map(item => (
                <span key={item} style={{
                  fontFamily:'var(--font-mono)',fontSize:12,padding:'6px 12px',
                  border:`1px solid ${cat.color}30`,color:'var(--text)',
                  background:`${cat.color}08`,letterSpacing:1
                }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Projects ─── */
function Projects() {
  const projects = [
    {
      title: 'Occamy Bioscience FMS',
      date: 'Feb 2026',
      tag: 'FEATURED',
      tagColor: '#7efff5',
      desc: 'Full-Stack MERN application to streamline logistics between field officers and farmers with real-time tracking.',
      points: ['Real-time tracking via Google Maps JS API with dynamic markers','JWT authentication + Role-Based Access Control (RBAC)','Automated attendance & activity monitoring'],
      tech: ['MongoDB','Express','React','Node','Tailwind','Maps API'],
      link: 'https://github.com/K-dotKishan',
      color: '#7efff5'
    },
    {
      title: 'Jharkhand Tourism Website',
      date: 'Jan 2026',
      tag: 'WEB',
      tagColor: '#ff6b6b',
      desc: 'Responsive tourism platform showcasing Jharkhand destinations with modern UI and engaging user experience.',
      points: ['Interactive React.js components','Full backend with Node.js + MongoDB','Responsive mobile-first design'],
      tech: ['React','Node','Express','MongoDB','Tailwind'],
      link: 'https://github.com/K-dotKishan',
      color: '#ff6b6b'
    },
    {
      title: 'Farmer Empowerment Platform',
      date: 'Apr 2025',
      tag: 'SOCIAL IMPACT',
      tagColor: '#ffd93d',
      desc: 'Farmer-centric platform providing direct market access, crop price tracking and government scheme database.',
      points: ['Direct farmer-to-mandi access (bypasses middlemen)','Real-time crop price tracking','Multilingual support + secure auth'],
      tech: ['HTML','CSS','JavaScript','PHP','MySQL'],
      link: 'https://github.com/K-dotKishan',
      color: '#ffd93d'
    }
  ];

  return (
    <section id="projects" style={{ padding:'100px 60px',background:'linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)' }}>
      <SectionHeader number="02" title="Projects" />

      <div style={{ display:'flex',flexDirection:'column',gap:2,marginTop:60 }}>
        {projects.map((p, i) => (
          <div key={p.title} style={{
            background:'var(--bg)',border:'1px solid var(--border)',
            padding:'40px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,
            animation:`fadeUp 0.6s ease ${i*0.15}s both`,
            transition:'border-color 0.3s, background 0.3s',
            position:'relative',overflow:'hidden'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=p.color; e.currentTarget.style.background='var(--surface)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg)'; }}
          >
            {/* Accent line */}
            <div style={{ position:'absolute',left:0,top:0,bottom:0,width:3,background:p.color }}/>

            <div>
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16 }}>
                <span style={{
                  fontFamily:'var(--font-mono)',fontSize:10,padding:'4px 10px',
                  border:`1px solid ${p.color}`,color:p.color,letterSpacing:2
                }}>{p.tag}</span>
                <span style={{ fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)' }}>{p.date}</span>
              </div>
              <h3 style={{ fontSize:28,fontWeight:800,letterSpacing:-1,marginBottom:12 }}>{p.title}</h3>
              <p style={{ color:'var(--muted)',lineHeight:1.7,fontSize:14 }}>{p.desc}</p>
            </div>

            <div>
              <ul style={{ listStyle:'none',marginBottom:24 }}>
                {p.points.map(pt => (
                  <li key={pt} style={{ fontFamily:'var(--font-mono)',fontSize:12,color:'var(--muted)',paddingLeft:16,position:'relative',marginBottom:8,lineHeight:1.6 }}>
                    <span style={{ position:'absolute',left:0,color:p.color }}>→</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:20 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    fontFamily:'var(--font-mono)',fontSize:11,padding:'4px 10px',
                    background:`${p.color}10`,border:`1px solid ${p.color}30`,color:p.color
                  }}>{t}</span>
                ))}
              </div>
              <a href={p.link} target="_blank" rel="noreferrer" style={{
                fontFamily:'var(--font-mono)',fontSize:12,color:p.color,letterSpacing:2,
                textTransform:'uppercase',display:'inline-flex',alignItems:'center',gap:8,
                borderBottom:`1px solid ${p.color}40`,paddingBottom:2,transition:'gap 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.gap='16px'}
              onMouseLeave={e => e.currentTarget.style.gap='8px'}
              >View on GitHub →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Achievements ─── */
function Achievements() {
  const items = [
    { icon:'🏆', title:'IIT BHU Hackathon Runner-Up', sub:'2nd among 1350+ teams · Feb 2026', color:'#ffd93d' },
    { icon:'💻', title:'DSA Problem Solver', sub:'200+ problems on LeetCode & GFG · Consistent streak', color:'#7efff5' },
    { icon:'🎤', title:'Communication Excellence', sub:'Twice awarded Certificate of Excellence · Oct 2025', color:'#ff6b6b' },
    { icon:'🌐', title:'Inter-College Debate', sub:'Represented institution · Oct 2025', color:'#c084fc' },
  ];

  const certs = [
    { name:'Full Stack Development', org:'Infosys Springboard', year:'2024' },
    { name:'Human-Computer Interaction', org:'NPTEL', year:'2024' },
    { name:'Responsive Web Design', org:'FreeCodeCamp', year:'2023' },
  ];

  return (
    <section id="achievements" style={{ padding:'100px 60px' }}>
      <SectionHeader number="03" title="Achievements" />

      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))',gap:2,marginTop:60 }}>
        {items.map((a,i) => (
          <div key={a.title} style={{
            background:'var(--surface)',border:'1px solid var(--border)',
            padding:'32px',animation:`fadeUp 0.6s ease ${i*0.1}s both`,
            transition:'all 0.3s',position:'relative',overflow:'hidden'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor=a.color; }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--border)'; }}
          >
            <div style={{ fontSize:32,marginBottom:16 }}>{a.icon}</div>
            <h4 style={{ fontWeight:700,fontSize:16,marginBottom:8 }}>{a.title}</h4>
            <p style={{ fontFamily:'var(--font-mono)',fontSize:12,color:'var(--muted)' }}>{a.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop:60 }}>
        <div style={{ fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',letterSpacing:3,marginBottom:24,textTransform:'uppercase' }}>Certifications</div>
        <div style={{ display:'flex',flexDirection:'column',gap:2 }}>
          {certs.map(c => (
            <div key={c.name} style={{
              display:'flex',justifyContent:'space-between',alignItems:'center',
              padding:'20px 24px',background:'var(--surface)',border:'1px solid var(--border)',
              transition:'border-color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
            >
              <div>
                <div style={{ fontWeight:600,fontSize:15 }}>{c.name}</div>
                <div style={{ fontFamily:'var(--font-mono)',fontSize:12,color:'var(--muted)',marginTop:4 }}>{c.org}</div>
              </div>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:12,color:'var(--accent)',border:'1px solid var(--accent)30',padding:'4px 12px' }}>{c.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error'); setMsg('Please fill all fields.'); return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) { setStatus('success'); setMsg(data.message); setForm({ name:'',email:'',message:'' }); }
      else { setStatus('error'); setMsg(data.error); }
    } catch {
      setStatus('error'); setMsg('Network error. Please try again.');
    }
  };

  const inputStyle = {
    width:'100%',padding:'16px',background:'var(--bg)',border:'1px solid var(--border)',
    color:'var(--text)',fontFamily:'var(--font-display)',fontSize:15,outline:'none',
    transition:'border-color 0.2s',
  };
  const focusInput = e => e.target.style.borderColor='var(--accent)';
  const blurInput  = e => e.target.style.borderColor='var(--border)';

  return (
    <section id="contact" style={{ padding:'100px 60px',position:'relative' }}>
      <div style={{
        position:'absolute',top:0,left:0,right:0,height:1,
        background:'linear-gradient(90deg, transparent, var(--accent), transparent)'
      }}/>
      <SectionHeader number="04" title="Get In Touch" />

      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,marginTop:60,maxWidth:1100 }}>
        {/* Info */}
        <div style={{ animation:'fadeUp 0.6s ease both' }}>
          <p style={{ fontSize:18,lineHeight:1.8,color:'var(--muted)',marginBottom:48 }}>
            I'm actively looking for opportunities in full-stack development.
            Whether you have a project in mind or just want to say hi — my inbox is open!
          </p>

          {[
            { icon:'📧', label:'Email', value:'kishansingh2882004@gmail.com', href:'mailto:kishansingh2882004@gmail.com' },
            { icon:'📱', label:'Phone', value:'+91 91427 16152', href:'tel:+919142716152' },
            { icon:'💼', label:'LinkedIn', value:'linkedin.com/in/kishan-singh', href:'https://linkedin.com/in/kishan-singh' },
            { icon:'⚡', label:'GitHub', value:'github.com/K-dotKishan', href:'https://github.com/K-dotKishan' },
          ].map(item => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{
              display:'flex',alignItems:'center',gap:16,padding:'16px 0',
              borderBottom:'1px solid var(--border)',transition:'padding-left 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.paddingLeft='12px'}
            onMouseLeave={e => e.currentTarget.style.paddingLeft='0'}
            >
              <span style={{ fontSize:18 }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily:'var(--font-mono)',fontSize:10,color:'var(--muted)',letterSpacing:2 }}>{item.label}</div>
                <div style={{ fontSize:14,color:'var(--text)',marginTop:2 }}>{item.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div style={{ animation:'fadeUp 0.6s ease 0.2s both' }}>
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <input
              name="name" placeholder="Your Name" value={form.name}
              onChange={handle} style={inputStyle}
              onFocus={focusInput} onBlur={blurInput}
            />
            <input
              name="email" placeholder="Your Email" value={form.email}
              onChange={handle} style={inputStyle}
              onFocus={focusInput} onBlur={blurInput}
            />
            <textarea
              name="message" placeholder="Your Message" value={form.message}
              onChange={handle} rows={6}
              style={{ ...inputStyle, resize:'vertical', fontFamily:'var(--font-display)' }}
              onFocus={focusInput} onBlur={blurInput}
            />

            {status === 'success' && (
              <div style={{ padding:'12px 16px',background:'rgba(126,255,245,0.1)',border:'1px solid var(--accent)',color:'var(--accent)',fontFamily:'var(--font-mono)',fontSize:13 }}>
                ✓ {msg}
              </div>
            )}
            {status === 'error' && (
              <div style={{ padding:'12px 16px',background:'rgba(255,107,107,0.1)',border:'1px solid var(--accent2)',color:'var(--accent2)',fontFamily:'var(--font-mono)',fontSize:13 }}>
                ✗ {msg}
              </div>
            )}

            <button onClick={submit} disabled={status === 'loading'} style={{
              padding:'18px',background: status==='loading' ? 'var(--border)' : 'var(--accent)',
              color:'#000',fontFamily:'var(--font-display)',fontWeight:700,
              fontSize:14,letterSpacing:2,textTransform:'uppercase',
              border:'none',cursor: status==='loading' ? 'not-allowed' : 'none',
              transition:'all 0.2s',
            }}
            onMouseEnter={e => { if(status!=='loading'){ e.target.style.background='#fff'; e.target.style.boxShadow='0 0 40px rgba(126,255,245,0.5)'; }}}
            onMouseLeave={e => { e.target.style.background=status==='loading'?'var(--border)':'var(--accent)'; e.target.style.boxShadow='none'; }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{
      padding:'32px 60px',borderTop:'1px solid var(--border)',
      display:'flex',justifyContent:'space-between',alignItems:'center',
      fontFamily:'var(--font-mono)',fontSize:12,color:'var(--muted)'
    }}>
      <span>© 2026 Kishan Singh. Built with React + Node.js.</span>
      <span>Designed with <span style={{ color:'var(--accent2)' }}>♥</span></span>
    </footer>
  );
}

/* ─── Marquee Banner ─── */
function MarqueeBanner() {
  const items = ['MERN Developer','IIT BHU Runner-Up','200+ DSA Problems','LPU CSE','Open to Work'];
  const repeated = [...items,...items,...items,...items];
  return (
    <div style={{ overflow:'hidden',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'14px 0',background:'var(--surface)' }}>
      <div style={{ display:'flex',gap:60,animation:'marquee 20s linear infinite',whiteSpace:'nowrap' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily:'var(--font-mono)',fontSize:12,color:'var(--muted)',letterSpacing:3,textTransform:'uppercase' }}>
            <span style={{ color:'var(--accent)',marginRight:20 }}>✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ number, title }) {
  return (
    <div style={{ display:'flex',alignItems:'center',gap:20,marginBottom:8 }}>
      <span style={{ fontFamily:'var(--font-mono)',fontSize:12,color:'var(--accent)',letterSpacing:2 }}>{number}</span>
      <div style={{ width:1,height:40,background:'var(--border)' }}/>
      <h2 style={{ fontSize:'clamp(32px,5vw,56px)',fontWeight:800,letterSpacing:-2 }}>{title}</h2>
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <style>{globalCSS}</style>
      <Cursor />
      <Noise />
      <Navbar />
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