import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from './projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef();
  const headingRef = useRef();
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );

      gsap.fromTo('[data-card]',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-card]', start: 'top 85%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="projects">
      {/* Background */}
      <div className={styles.blobLeft} />
      <div className={styles.blobRight} />
      <div className={styles.gridBg} />

      {/* Heading */}
      <div ref={headingRef} className={styles.heading}>
        <span className={styles.num}>03.</span>
        <span className={styles.title}>PROJECTS</span>
        <div className={styles.line} />
      </div>

      <p className={styles.subtitle}>
        A few things I've built — click any card to explore
      </p>

      {/* Cards grid */}
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            onClick={() => setActiveProject(p)}
          />
        ))}
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}