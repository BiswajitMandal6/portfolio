import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    href: 'https://github.com/BiswajitMandal6',
    color: '#E8EDF5',
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: 'https://www.linkedin.com/in/biswajit-mandal-0b3790273',
    color: '#0A66C2',
  },
  {
    label: 'Email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    href: 'mailto:biswajitmandal9162@gmail.com',
    color: '#FF4ECD',
  },
];

const STATUS_LINES = [
  '> SYSTEM ONLINE',
  '> SECURE CHANNEL ACTIVE',
  '> AWAITING TRANSMISSION...',
];

function useVisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const animateTo = (end) => {
      let start = 0;
      const step = Math.ceil(end / 60);
      const timer = setInterval(() => {
        start = Math.min(start + step, end);
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, 16);
    };

    const fetchCount = async () => {
      try {
        // Only increment once per session
        const sessionKey = 'bm_visited';
        const visited = sessionStorage.getItem(sessionKey);

        if (!visited) {
          // Hit endpoint to increment
          const res = await fetch(
            'https://api.countapi.xyz/hit/biswajitmandal-portfolio/visits'
          );
          const data = await res.json();
          sessionStorage.setItem(sessionKey, '1');
          animateTo(data.value);
        } else {
          // Just read without incrementing
          const res = await fetch(
            'https://api.countapi.xyz/get/biswajitmandal-portfolio/visits'
          );
          const data = await res.json();
          animateTo(data.value);
        }
      } catch {
        // Fallback — show nothing if API fails
        setCount(null);
      }
    };

    fetchCount();
  }, []);

  return count;
}

export default function Contact() {
  const sectionRef = useRef();
  const headingRef = useRef();
  const visitorCount = useVisitorCount();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [termLine, setTermLine] = useState(0);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cycle terminal status lines
  useEffect(() => {
    const t = setInterval(() => setTermLine(l => (l + 1) % STATUS_LINES.length), 2200);
    return () => clearInterval(t);
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',       // ← replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID',      // ← replace with your EmailJS Template ID
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_name:    'Biswajit',
        },
        'YOUR_PUBLIC_KEY'        // ← replace with your EmailJS Public Key
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section ref={sectionRef} className={styles.section} id="contact">
      <div className={styles.gridBg} />
      <div className={styles.blobLeft} />
      <div className={styles.blobRight} />

      {/* Heading */}
      <div ref={headingRef} className={styles.heading}>
        <span className={styles.num}>05.</span>
        <span className={styles.title}>CONTACT</span>
        <div className={styles.line} />
      </div>

      <div className={styles.grid}>

        {/* ── LEFT PANEL ── */}
        <div className={styles.leftPanel}>

          {/* Control panel header */}
          <div className={styles.panelHeader}>
            <div className={styles.panelDots}>
              <span className={styles.dotR} /><span className={styles.dotY} /><span className={styles.dotG} />
            </div>
            <span className={styles.panelTitle}>CONTROL_PANEL_v1.0</span>
            <span className={styles.panelStatus}>● LIVE</span>
          </div>

          {/* Terminal status */}
          <div className={styles.terminalBox}>
            <AnimatePresence mode="wait">
              <motion.p key={termLine}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className={styles.termLine}
              >
                {STATUS_LINES[termLine]}
              </motion.p>
            </AnimatePresence>
            <span className={styles.termCursor}>▋</span>
          </div>

          {/* Info blocks */}
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>// LOCATION</span>
              <span className={styles.infoVal}>📍 India</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>// STATUS</span>
              <span className={styles.infoVal} style={{ color: '#28CA41' }}>
                <span className={styles.statusDot} />Available
              </span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>// EMAIL</span>
              <a href="mailto:biswajitmandal9162@gmail.com" className={styles.infoLink}>
                biswajitmandal9162@gmail.com
              </a>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>// RESPONSE</span>
              <span className={styles.infoVal}>Within 24 hours</span>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Social links */}
          <div className={styles.socialsLabel}>// CONNECT</div>
          <div className={styles.socials}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className={styles.socialBtn} style={{ '--sc': s.color }} data-hover
              >
                <span className={styles.socialIcon} style={{ color: s.color }}>{s.icon}</span>
                <span className={styles.socialLabel}>{s.label}</span>
                <span className={styles.socialArrow}>→</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL — FORM ── */}
        <div className={styles.rightPanel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelDots}>
              <span className={styles.dotR} /><span className={styles.dotY} /><span className={styles.dotG} />
            </div>
            <span className={styles.panelTitle}>TRANSMISSION_FORM</span>
            <span className={styles.formId}>ID: BM-{Date.now().toString().slice(-6)}</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>

            {/* Name */}
            <div className={`${styles.field} ${focused === 'name' ? styles.fieldFocused : ''}`}
              style={{ '--fc': '#00D9FF' }}>
              <label className={styles.label}>
                <span className={styles.labelNum}>01</span> IDENTIFIER (Name)
              </label>
              <input
                name="name" value={form.name} onChange={handleChange}
                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                placeholder="Your name"
                className={styles.input}
                autoComplete="off"
              />
              <div className={styles.fieldLine} />
            </div>

            {/* Email */}
            <div className={`${styles.field} ${focused === 'email' ? styles.fieldFocused : ''}`}
              style={{ '--fc': '#8B5CF6' }}>
              <label className={styles.label}>
                <span className={styles.labelNum}>02</span> CHANNEL (Email)
              </label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                placeholder="your@email.com"
                className={styles.input}
                autoComplete="off"
              />
              <div className={styles.fieldLine} />
            </div>

            {/* Message */}
            <div className={`${styles.field} ${focused === 'message' ? styles.fieldFocused : ''}`}
              style={{ '--fc': '#FF4ECD' }}>
              <label className={styles.label}>
                <span className={styles.labelNum}>03</span> TRANSMISSION (Message)
              </label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                placeholder="What's on your mind..."
                className={`${styles.input} ${styles.textarea}`}
                rows={4}
              />
              <div className={styles.fieldLine} />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className={`${styles.submitBtn} ${status === 'sent' ? styles.submitSent : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={status === 'sending' || status === 'sent'}
              style={status === 'error' ? { borderColor: 'rgba(255,78,78,0.5)', color: '#ff4e4e' } : {}}
              data-hover
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ▶ TRANSMIT MESSAGE
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.sending}>
                    <span className={styles.spinner} /> TRANSMITTING...
                  </motion.span>
                )}
                {status === 'sent' && (
                  <motion.span key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    ✓ TRANSMISSION SUCCESSFUL
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ✕ FAILED — TRY AGAIN
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </form>
        </div>
      </div>

      {/* Visitor counter */}
      <div className={styles.visitorWrap}>
        <div className={styles.visitorBox}>
          <span className={styles.visitorIcon}>👁</span>
          <div className={styles.visitorText}>
            <span className={styles.visitorCount}>
              {visitorCount !== null ? visitorCount.toLocaleString() : '...'}
            </span>
            <span className={styles.visitorLabel}>VISITORS</span>
          </div>
          <div className={styles.visitorPulse} />
        </div>
        <span className={styles.visitorSince}>since launch</span>
      </div>

      {/* Bottom signature */}
      <div className={styles.signature}>
        <span>Designed & Built by</span>
        <span className={styles.sigName}>Biswajit Mandal</span>
        <span className={styles.sigHeart}>with ♥</span>
      </div>
    </section>
  );
}