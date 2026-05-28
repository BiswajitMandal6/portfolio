import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HeroText.module.css';

const badges = [
  { icon: '⬡', label: 'AGENTIC AI', sub: 'DEVELOPER' },
  { icon: '</>', label: 'FULL STACK', sub: 'DEVELOPER' },
  { icon: '◈', label: '3D & INTERACTIVE', sub: 'EXPERIENCES' },
];



const socials = [
  { icon: '⌥', label: 'GitHub',   href: 'https://github.com/BiswajitMandal6' },
  { icon: '⊞', label: 'LinkedIn', href: 'https://www.linkedin.com/in/biswajit-mandal-0b3790273' },
  { icon: '✕', label: 'Twitter',  href: 'https://x.com/mndl_biswa' },
  { icon: '✉', label: 'Email',    href: 'mailto:biswajitmandal9162@gmail.com' },
];

export function HeroText() {
  const wrapRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo('[data-anim="badge"]', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo('[data-anim="hello"]', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .fromTo('[data-anim="name1"]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .fromTo('[data-anim="name2"]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .fromTo('[data-anim="title"]', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .fromTo('[data-anim="subtitle"]', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .fromTo('[data-anim="btns"]', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .fromTo('[data-anim="skill-badge"]', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: 'power2.out' }, '-=0.3')
        .fromTo('[data-anim="social"]', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' }, '-=0.4')
        .fromTo('[data-anim="scroll"]', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {/* Left social sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarLine} />
        {socials.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noreferrer"
            data-anim="social" data-hover className={styles.socialBtn} title={s.label}>
            <span>{s.icon}</span>
          </a>
        ))}
        <div className={styles.sidebarLine} />
      </div>

      {/* Left content */}
      <div className={styles.left}>
        <div data-anim="badge" className={styles.availBadge}>
          <span className={styles.availDot} />
          AVAILABLE FOR WORK
        </div>

        <p data-anim="hello" className={styles.hello}>— HELLO, I'M —</p>

        <div className={styles.nameBlock}>
          <h1 data-anim="name1" className={styles.nameWhite}>BISWAJIT</h1>
          <h1 data-anim="name2" className={styles.nameGradient}>MANDAL</h1>
        </div>

        <div data-anim="title" className={styles.titleRow}>
          <span className={styles.titleDash} />
          <span className={styles.titleText}>CREATIVE <span className={styles.titleCyan}>ENGINEER</span></span>
          <span className={styles.titleDash} />
        </div>

        <p data-anim="subtitle" className={styles.subtitle}>
          Crafting immersive digital experiences<br />
          where design meets engineering.
        </p>

        <div data-anim="btns" className={styles.btns}>
          <a href="#projects" className={styles.btnPrimary} data-hover>
          VIEW MY WORK <span>→</span>
          </a>
          <a href="#contact" className={styles.btnOutline} data-hover>
          CONTACT ME <span className={styles.btnDot}>●</span>
          </a>
      </div>
      </div>

      {/* Right skill badges */}
      <div className={styles.badges}>
        {badges.map((b, i) => (
          <div key={i} data-anim="skill-badge" className={styles.skillBadge} data-hover>
            <div className={styles.skillIcon}>{b.icon}</div>
            <div>
              <div className={styles.skillLabel}>{b.label}</div>
              <div className={styles.skillSub}>{b.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div data-anim="scroll" className={styles.scrollRow}>
        <span className={styles.scrollDot}>·</span>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
        <span className={styles.scrollDot}>·</span>
      </div>
    </div>
  );
}