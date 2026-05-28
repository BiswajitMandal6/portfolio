import { useRef, useState } from 'react';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef();
  const glowRef = useRef();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - rect.left}px`;
      glowRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      data-card
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        '--accent': project.color,
        '--accent2': project.accent,
      }}
      data-hover
    >
      {/* Cursor glow */}
      <div ref={glowRef} className={styles.cursorGlow}
        style={{ background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)` }}
      />

      {/* Scan line */}
      <div className={styles.scanLine} style={{ background: `linear-gradient(90deg, transparent, ${project.color}55, transparent)` }} />

      {/* Top row */}
      <div className={styles.top}>
        <div className={styles.iconWrap} style={{ borderColor: `${project.color}40`, background: `${project.color}10` }}>
          <span className={styles.icon}>{project.icon}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.category} style={{ color: project.color }}>{project.category}</span>
          <span className={`${styles.status} ${project.status === 'Completed' ? styles.completed : styles.indev}`}>
            {project.status === 'Completed' ? '✓' : '◉'} {project.status}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.subtitle}>{project.subtitle}</p>

      {/* Divider */}
      <div className={styles.divider} style={{ background: `linear-gradient(90deg, ${project.color}40, ${project.accent}30, transparent)` }} />

      {/* Description */}
      <p className={styles.desc}>{project.description}</p>

      {/* Tags */}
      <div className={styles.tags}>
        {project.tags.slice(0, 5).map(t => (
          <span key={t} className={styles.tag} style={{ borderColor: `${project.color}25`, color: `${project.color}99` }}>
            {t}
          </span>
        ))}
        {project.tags.length > 5 && (
          <span className={styles.tagMore}>+{project.tags.length - 5}</span>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.explore} style={{ color: project.color }}>
          Explore project <span className={styles.arrow}>→</span>
        </span>
        <div className={styles.indexNum} style={{ color: `${project.color}30` }}>
          0{index + 1}
        </div>
      </div>

      {/* Platform shadow */}
      <div className={styles.platform} style={{ background: `radial-gradient(ellipse, ${project.color}15 0%, transparent 70%)` }} />
    </div>
  );
}