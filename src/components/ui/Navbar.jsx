import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const navLinks = [
  { num: '01', label: 'HOME', id: 'hero' },
  { num: '02', label: 'ABOUT', id: 'about' },
  { num: '03', label: 'PROJECTS', id: 'projects' },
  { num: '04', label: 'SKILLS', id: 'skills' },
  { num: '05', label: 'CONTACT', id: 'contact' },
];

export default function Navbar() {
  const navRef = useRef();
  const [active, setActive] = useState('HOME');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power2.out' }
    );
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoBM}>BM</span>
        <span className={styles.logoDot}>.</span>
      </div>

      {/* Numbered links */}
      <ul className={styles.links}>
        {navLinks.map(({ num, label, id }) => (
          <li key={label}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${active === label ? styles.active : ''}`}
              onClick={() => setActive(label)}
              data-hover
            >
              <span className={styles.num}>{num}.</span>
              <span className={styles.label}>{label}</span>
              {active === label && <span className={styles.underline} />}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#contact" className={styles.cta} data-hover>
        LET'S TALK <span className={styles.ctaArrow}>→</span>
      </a>

      {/* Right accent bar */}
      <div className={styles.accentBar} />
    </nav>
  );
}
