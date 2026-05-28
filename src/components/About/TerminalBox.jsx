import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import styles from './TerminalBox.module.css';

const LINES = [
  { type: 'cmd',    text: 'whoami' },
  { type: 'output', text: 'biswajit_mandal — Creative Engineer' },
  { type: 'gap' },
  { type: 'cmd',    text: 'cat bio.txt' },
  { type: 'output', text: 'Building immersive digital experiences' },
  { type: 'output', text: 'through code, creativity, and interaction.' },
  { type: 'output', text: 'Turning bold ideas into interactive realities.' },
  { type: 'gap' },
  { type: 'cmd',    text: 'ls skills/' },
  { type: 'skill',  text: 'python' },
  { type: 'skill',  text: 'dsa_cpp' },
  { type: 'skill',  text: 'react' },
  { type: 'skill',  text: 'three_js' },
  { type: 'skill',  text: 'system_design' },
  { type: 'skill',  text: 'vibe_coding' },
  { type: 'gap' },
  { type: 'cmd',    text: 'cat current_focus.txt' },
  { type: 'accent', text: '"Currently obsessed with building AI agents"' },
  { type: 'gap' },
  { type: 'cmd',    text: 'status --check' },
  { type: 'success',text: '✓ Available for collaboration' },
  { type: 'success',text: '✓ Open to new projects' },
];

const CHAR_SPEED = 28;   // ms per character
const LINE_PAUSE = 180;  // ms between lines

export function TerminalBox() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [done, setDone] = useState(false);
  const bodyRef = useRef();
  const ref = useRef();
  const inView = useInView(ref, { threshold: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    let lineIdx = 0;
    let cancelled = false;

    const typeNextLine = () => {
      if (cancelled || lineIdx >= LINES.length) {
        setDone(true);
        return;
      }

      const line = LINES[lineIdx];

      // Gap lines — just add immediately
      if (line.type === 'gap') {
        setVisibleLines(v => [...v, { ...line, text: '' }]);
        lineIdx++;
        setTimeout(typeNextLine, LINE_PAUSE / 2);
        return;
      }

      // For cmd lines — type character by character
      if (line.type === 'cmd') {
        setIsTyping(true);
        let charIdx = 0;
        setCurrentText('');

        const typeChar = () => {
          if (cancelled) return;
          if (charIdx <= line.text.length) {
            setCurrentText(line.text.slice(0, charIdx));
            charIdx++;
            setTimeout(typeChar, CHAR_SPEED);
          } else {
            setIsTyping(false);
            setVisibleLines(v => [...v, { ...line }]);
            setCurrentText('');
            lineIdx++;
            setTimeout(typeNextLine, LINE_PAUSE);
          }
        };
        typeChar();
      } else {
        // Output lines — appear instantly with short delay
        setVisibleLines(v => [...v, { ...line }]);
        lineIdx++;
        setTimeout(typeNextLine, LINE_PAUSE * 0.6);
      }
    };

    const startDelay = setTimeout(typeNextLine, 400);
    return () => { cancelled = true; clearTimeout(startDelay); };
  }, [inView]);

  // Auto scroll terminal body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visibleLines, currentText]);

  const renderLine = (line, i) => {
    if (line.type === 'gap') return <div key={i} className={styles.gap} />;
    if (line.type === 'cmd') return (
      <div key={i} className={styles.lineCmd}>
        <span className={styles.prompt}>~/portfolio</span>
        <span className={styles.arrow}> ❯ </span>
        <span>{line.text}</span>
      </div>
    );
    if (line.type === 'skill') return (
      <div key={i} className={styles.lineSkill}>
        <span className={styles.skillIcon}>▸</span>
        <span className={styles.skillName}>{line.text}</span>
        <span className={styles.skillBar}>
          <span className={styles.skillFill} style={{ width: `${60 + Math.random() * 35}%` }} />
        </span>
      </div>
    );
    if (line.type === 'accent') return (
      <div key={i} className={styles.lineAccent}>{line.text}</div>
    );
    if (line.type === 'success') return (
      <div key={i} className={styles.lineSuccess}>{line.text}</div>
    );
    return <div key={i} className={styles.lineOutput}>{line.text}</div>;
  };

  return (
    <div ref={ref} className={styles.terminal}>
      {/* Title bar */}
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <span className={styles.dotR} />
          <span className={styles.dotY} />
          <span className={styles.dotG} />
        </div>
        <span className={styles.titleText}>terminal — biswajit@portfolio</span>
        <span className={styles.titleBadge}>LIVE</span>
      </div>

      {/* Terminal body */}
      <div ref={bodyRef} className={styles.body}>
        {visibleLines.map((line, i) => renderLine(line, i))}

        {/* Currently typing cmd line */}
        {isTyping && (
          <div className={styles.lineCmd}>
            <span className={styles.prompt}>~/portfolio</span>
            <span className={styles.arrow}> ❯ </span>
            <span>{currentText}</span>
            <span className={styles.cursor}>▋</span>
          </div>
        )}

        {/* Idle cursor when done */}
        {done && (
          <div className={styles.lineCmd}>
            <span className={styles.prompt}>~/portfolio</span>
            <span className={styles.arrow}> ❯ </span>
            <span className={styles.cursor}>▋</span>
          </div>
        )}
      </div>

      {/* Bottom status */}
      <div className={styles.footer}>
        <span className={styles.footerDot} />
        <span>node v20.0 &nbsp;·&nbsp; react 18 &nbsp;·&nbsp; vite 5</span>
      </div>
    </div>
  );
}
