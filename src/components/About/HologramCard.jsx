import { useRef, useState } from 'react';
import styles from './HologramCard.module.css';

const stats = [
  { value: '∞',    label: 'Curiosity Level' },
  { value: 'AI',   label: 'First Thinking' },
  { value: '</>',  label: 'Code is Art' },
  { value: '🧠',   label: 'Always Learning' },
];

export function HologramCard() {
  const cardRef = useRef();
  const glowRef = useRef();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - rect.left}px`;
      glowRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      data-hover
    >
      {/* Cursor glow */}
      <div ref={glowRef} className={styles.cursorGlow} />

      {/* Hologram scan line */}
      <div className={styles.scanLine} />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar}>
          <span className={styles.avatarInitials}>BM</span>
          <div className={styles.avatarRing} />
          <div className={styles.avatarPulse} />
        </div>
        <div className={styles.headerText}>
          <h3 className={styles.name}>Biswajit Mandal</h3>
          <p className={styles.role}>
            <span className={styles.roleDot} />
            Creative Engineer
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Bio */}
      <div className={styles.bio}>
        <p>Building immersive digital experiences through code, creativity, and interaction.</p>
        <p>Turning bold ideas into interactive realities.</p>
      </div>

      {/* Tags */}
      <div className={styles.tags}>
        {['AI & Agents', 'Full Stack', '3D / WebGL', 'Creative Dev'].map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Stats */}
      <div className={styles.stats}>
        {stats.map((s, i) => (
          <div key={i} className={styles.stat}>
            <span className={styles.statVal}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom status bar */}
      <div className={styles.statusBar}>
        <span className={styles.statusDot} />
        <span className={styles.statusText}>Available for collaboration</span>
        <span className={styles.statusLocation}>📍 India</span>
      </div>
    </div>
  );
}