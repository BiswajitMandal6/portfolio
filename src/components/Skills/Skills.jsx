import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    id: 1, name: 'Python', icon: '🐍', color: '#3B82F6', bg: '#1e3a5f',
    level: 95, levelLabel: 'Advanced',
    desc: 'Primary language for AI, backend, automation and data pipelines.',
    subSkills: [
      { label: 'Core Concepts', val: 95 },
      { label: 'FastAPI / Django', val: 40 },
      { label: 'Async / Celery', val: 20 },
      { label: 'Data Structures', val: 40 },
      
    ],
  },
  {
    id: 2, name: 'DSA / C++', icon: '⚡', color: '#00D9FF', bg: '#0a2a3a',
    level: 80, levelLabel: 'Intermediate',
    desc: 'Problem solving with algorithms and data structures in C++.',
    subSkills: [
      { label: 'Arrays & Trees', val: 60 },
      { label: 'Graphs & DP', val: 40 },
      { label: 'Sorting & Search', val: 50 },
      { label: 'C++ STL', val: 60 },
      { label: 'Time Complexity', val: 60 },
    ],
  },
  {
    id: 3, name: 'React', icon: '⚛', color: '#61DAFB', bg: '#0a2535',
    level: 82, levelLabel: 'Advanced',
    desc: 'Building modern component-driven UIs with hooks and state management.',
    subSkills: [
      { label: 'Vibe Coding', val: 100 },
      { label: 'Learning', val: 20 },
      
    ],
  },
  {
    id: 4, name: 'Three.js', icon: '🔺', color: '#8B5CF6', bg: '#1a0f35',
    level: 75, levelLabel: 'Intermediate',
    desc: '3D graphics, WebGL scenes, shaders and interactive experiences.',
    subSkills: [
      { label: 'Vibe Coding', val: 100 },
      { label: 'Learning', val: 10 },
      
    ],
  },
  {
    id: 5, name: 'LangChain', icon: '🔗', color: '#FF4ECD', bg: '#2a0a1f',
    level: 88, levelLabel: 'Advanced',
    desc: 'Building RAG pipelines, AI agents and LLM-powered applications.',
    subSkills: [
      { label: 'RAG Pipelines', val: 92 },
      { label: 'Vector Stores', val: 88 },
      { label: 'Agents & Tools', val: 85 },
      { label: 'Prompt Templates', val: 90 },
      { label: 'Memory Chains', val: 82 },
    ],
  },
  {
    id: 6, name: 'FastAPI', icon: '🚀', color: '#10B981', bg: '#0a2318',
    level: 85, levelLabel: 'Advanced',
    desc: 'High-performance REST APIs with async support and auto-documentation.',
    subSkills: [
      { label: 'Vibe Coding', val: 100 },
      { label: 'Learning', val: 20 },
    ],
  },
  {
    id: 7, name: 'Django', icon: '🎸', color: '#84CC16', bg: '#182200',
    level: 78, levelLabel: 'Intermediate',
    desc: 'Full-stack web development with Django ORM, REST framework and admin.',
    subSkills: [
      { label: 'Vibe Coding', val: 100 },
      { label: 'Learning', val: 20 },
    ],
  },
  {
    id: 8, name: 'PostgreSQL', icon: '🐘', color: '#6366F1', bg: '#0f1135',
    level: 78, levelLabel: 'Intermediate',
    desc: 'Relational database design, queries, indexing and optimization.',
    subSkills: [
      { label: 'Schema Design', val: 82 },
      { label: 'Complex Queries', val: 78 },
      { label: 'Indexing', val: 75 },
      { label: 'Joins & CTEs', val: 80 },
      { label: 'Performance', val: 72 },
    ],
  },
  {
    id: 9, name: 'Git', icon: '🌿', color: '#F97316', bg: '#2a1200',
    level: 85, levelLabel: 'Advanced',
    desc: 'Version control, branching strategies, collaboration and CI workflows.',
    subSkills: [
      { label: 'Branching', val: 90 },
      { label: 'Merging & Rebase', val: 85 },
      { label: 'Pull Requests', val: 88 },
      { label: 'Git Flow', val: 82 },
      { label: 'Conflict Resolution', val: 85 },
    ],
  },
  {
    id: 10, name: 'System Design', icon: '📐', color: '#F59E0B', bg: '#2a1a00',
    level: 80, levelLabel: 'Intermediate',
    desc: 'Designing scalable distributed systems with proper architecture patterns.',
    subSkills: [
      { label: 'Architecture', val: 82 },
      { label: 'Scalability', val: 78 },
      { label: 'Caching (Redis)', val: 80 },
      { label: 'Queues (Celery)', val: 75 },
      { label: 'Load Balancing', val: 72 },
    ],
  },
];

function CircularProgress({ value, color }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 50 50)"
        style={{ filter: `drop-shadow(0 0 5px ${color})`, transition: 'stroke-dashoffset 1s ease' }}
      />
      <text x="50" y="46" textAnchor="middle" fill="#E8EDF5" fontSize="15" fontWeight="800" fontFamily="Syne,sans-serif">{value}%</text>
      <text x="50" y="59" textAnchor="middle" fill="rgba(232,237,245,0.35)" fontSize="7" fontFamily="Space Mono,monospace">Overall</text>
    </svg>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const pausedRef = useRef(false);

  const sectionRef = useRef();
  const detailRef = useRef();
  const total = SKILLS.length;

  // Fix: single stable interval, reads pausedRef to avoid stale closure
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) {
        setActive(a => (a + 1) % total);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  const handleCardClick = (idx) => {
    setActive(idx);
    setSelected(SKILLS[idx]);
  };

  useEffect(() => {
    if (selected && detailRef.current) {
      gsap.fromTo(detailRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      );
    }
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setActive(a => (a - 1 + total) % total);
      if (e.key === 'ArrowRight') setActive(a => (a + 1) % total);
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);



  return (
    <section ref={sectionRef} className={styles.section} id="skills">
      <div className={styles.gridBg} />
      <div className={styles.blob} />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLine} />
        <h2 className={styles.title}>MY SKILLS</h2>
        <div className={styles.headerLine} />
      </div>
      <p className={styles.hint}>Click any card to view progress</p>

      {/* Carousel */}
      <div className={styles.carouselWrap}>
        <button className={styles.arrowBtn} onClick={() => setActive(a => (a - 1 + total) % total)} data-hover>‹</button>

        <div className={styles.carousel}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {SKILLS.map((s, index) => {
            const offset = index - active;
            const isCenter = offset === 0;
            const absOff = Math.abs(offset);
            return (
              <motion.div
                key={s.name}
                onClick={() => handleCardClick(index)}
                animate={{
                  x: offset * 210,
                  scale: isCenter ? 1 : 0.82 - absOff * 0.04,
                  rotateY: offset * -22,
                  opacity: absOff > 2 ? 0 : isCenter ? 1 : 1 - absOff * 0.22,
                  zIndex: 10 - absOff,
                  filter: isCenter ? 'brightness(1) blur(0px)' : `brightness(${0.48 - absOff * 0.05}) blur(0px)`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 16,
                  mass: 1,
                }}
                className={`${styles.card} ${isCenter ? styles.cardActive : ''}`}
                style={{ '--sc': s.color }}
                data-hover
              >
                <div className={styles.scanLine} />
                <div className={styles.cardNum}>0{index + 1}</div>
                <span className={`${styles.corner} ${styles.tl}`} style={{ borderColor: s.color }} />
                <span className={`${styles.corner} ${styles.br}`} style={{ borderColor: s.color }} />

                <div className={styles.iconWrap} style={{ background: s.bg, borderColor: `${s.color}55` }}>
                  <span className={styles.cardIcon}>{s.icon}</span>
                </div>

                <h3 className={styles.cardName} style={{ color: isCenter ? s.color : '#E8EDF5' }}>{s.name}</h3>

                <AnimatePresence mode="wait">
                  {isCenter && (
                    <motion.p
                      key={s.name + '-desc'}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className={styles.cardDesc}
                    >
                      {s.desc}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className={styles.cardPct} style={{ color: isCenter ? s.color : `${s.color}aa` }}>{s.level}%</div>
                <div className={styles.cardBar}>
                  <motion.div
                    className={styles.cardBarFill}
                    initial={{ width: 0 }}
                    animate={{ width: isCenter ? `${s.level}%` : '30%' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    style={{ background: `linear-gradient(90deg,${s.color}66,${s.color})` }}
                  />
                </div>

                <AnimatePresence>
                  {isCenter && (
                    <motion.span
                      key={s.name + '-sub'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={styles.cardSub}
                    >
                      Completed
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Holographic border glow */}
                <div className={styles.holoRing} style={{ borderColor: `${s.color}22` }} />
              </motion.div>
            );
          })}
        </div>

        <button className={styles.arrowBtn} onClick={() => setActive(a => (a + 1) % total)} data-hover>›</button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {SKILLS.map((sk, i) => (
          <button key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            style={i === active ? { background: SKILLS[active].color, boxShadow: `0 0 8px ${SKILLS[active].color}` } : {}}
            onClick={() => setActive(i)} data-hover
          />
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div ref={detailRef} className={styles.detail} style={{ '--sc': selected.color }}>
          <div className={styles.detailInner}>
            <button className={styles.closeBtn} onClick={() => setSelected(null)} data-hover>✕</button>

            {/* Left */}
            <div className={styles.dLeft}>
              <div className={styles.dIconWrap} style={{ background: selected.bg, borderColor: `${selected.color}55` }}>
                <span className={styles.dIcon}>{selected.icon}</span>
              </div>
              <h3 className={styles.dName} style={{ color: selected.color }}>{selected.name}</h3>
              <p className={styles.dDesc}>{selected.desc}</p>
              <div className={styles.dPct}>{selected.level}%<span>Completed</span></div>
              <div className={styles.dBar}>
                <div className={styles.dBarFill} style={{ width: `${selected.level}%`, background: `linear-gradient(90deg,${selected.color}66,${selected.color})` }} />
              </div>
              <div className={styles.dMeta}>
                <span className={styles.dMetaItem}>⬡ Level &nbsp;<strong>{selected.levelLabel}</strong></span>
              </div>
            </div>

            {/* Right */}
            <div className={styles.dRight}>
              <p className={styles.dSectionTitle}>PROGRESS OVERVIEW</p>
              <div className={styles.dOverview}>
                <div className={styles.dCircle}>
                  <CircularProgress value={selected.level} color={selected.color} />
                </div>
                <div className={styles.dSubSkills}>
                  {selected.subSkills.map((s, i) => (
                    <div key={i} className={styles.dSub}>
                      <div className={styles.dSubTop}>
                        <span className={styles.dSubLabel}>{s.label}</span>
                        <span className={styles.dSubVal} style={{ color: selected.color }}>{s.val}%</span>
                      </div>
                      <div className={styles.dSubBar}>
                        <div className={styles.dSubFill} style={{ width: `${s.val}%`, background: `linear-gradient(90deg,${selected.color}55,${selected.color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className={styles.escHint}>Press ESC to close</p>
        </div>
      )}
    </section>
  );
}