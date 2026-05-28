import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ProjectModal.module.css';

export function ProjectModal({ project, onClose }) {
  const overlayRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Animate in
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(modalRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 }
    );

    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, { opacity: 0, y: 20, scale: 0.97, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, delay: 0.1,
      onComplete: onClose
    });
  };

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={(e) => e.target === overlayRef.current && handleClose()}>
      <div ref={modalRef} className={styles.modal} style={{ '--accent': project.color, '--accent2': project.accent }}>

        {/* Close button */}
        <button className={styles.closeBtn} onClick={handleClose} data-hover>
          <span>✕</span>
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrap} style={{ borderColor: `${project.color}40`, background: `${project.color}12` }}>
            <span className={styles.icon}>{project.icon}</span>
          </div>
          <div className={styles.headerText}>
            <div className={styles.headerMeta}>
              <span className={styles.category} style={{ color: project.color }}>{project.category}</span>
              <span className={`${styles.status} ${project.status === 'Completed' ? styles.completed : styles.indev}`}>
                {project.status === 'Completed' ? '✓' : '◉'} {project.status}
              </span>
            </div>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.subtitle}>{project.subtitle}</p>
          </div>
        </div>

        <div className={styles.divider} style={{ background: `linear-gradient(90deg, ${project.color}50, ${project.accent}30, transparent)` }} />

        {/* Body */}
        <div className={styles.body}>

          {/* About */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle} style={{ color: project.color }}>// About</h4>
            <p className={styles.longDesc}>{project.longDescription}</p>
          </div>

          {/* Features */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle} style={{ color: project.color }}>// Key Features</h4>
            <ul className={styles.features}>
              {project.features.map((f, i) => (
                <li key={i} className={styles.feature}>
                  <span className={styles.featureDot} style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle} style={{ color: project.color }}>// Tech Stack</h4>
            <div className={styles.techGrid}>
              {Object.entries(project.tech).map(([layer, items]) => (
                <div key={layer} className={styles.techLayer}>
                  <span className={styles.layerName}>{layer}</span>
                  <div className={styles.techItems}>
                    {items.map(item => (
                      <span key={item} className={styles.techItem} style={{ borderColor: `${project.color}25`, color: `${project.color}bb` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className={styles.footer}>
          <a href={project.github} className={styles.btnGithub} target="_blank" rel="noreferrer" data-hover>
            <span className={styles.btnIcon}>⌥</span> GitHub
          </a>
          {project.live && (
            <a href={project.live} className={styles.btnLive} style={{ background: `linear-gradient(135deg, ${project.color}, ${project.accent})` }} target="_blank" rel="noreferrer" data-hover>
              Live Demo →
            </a>
          )}
          {!project.live && (
            <span className={styles.btnDisabled}>Deploy Pending</span>
          )}
        </div>
      </div>
    </div>
  );
}