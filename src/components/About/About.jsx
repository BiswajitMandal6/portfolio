import { useEffect, useRef } from 'react';
import { HologramCard } from './HologramCard';
import { TerminalBox } from './TerminalBox';
import styles from './About.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();
  const headingRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );
      // Left card
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' }
        }
      );
      // Right terminal
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      {/* Background glow blobs */}
      <div className={styles.blobLeft} />
      <div className={styles.blobRight} />

      {/* Section label */}
      <div ref={headingRef} className={styles.heading}>
        <span className={styles.num}>02.</span>
        <span className={styles.title}>ABOUT ME</span>
        <div className={styles.line} />
      </div>

      {/* Content grid */}
      <div className={styles.grid}>
        <div ref={leftRef} className={styles.left}>
          <HologramCard />
        </div>
        <div ref={rightRef} className={styles.right}>
          <TerminalBox />
        </div>
      </div>
    </section>
  );
}
