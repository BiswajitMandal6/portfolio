import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroScene } from './HeroScene';
import { HeroText } from './HeroText';
import styles from './Hero.module.css';

// Check WebGL support for cross-browser compatibility
const hasWebGL = (() => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch { return false; }
})();

export default function Hero() {
  const mousePos = useRef({ x: 0, y: 0 });
  const isMobile = window.innerWidth < 768;

  const handleMouseMove = (e) => {
    mousePos.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    };
  };

  return (
    <section className={styles.hero} onMouseMove={handleMouseMove} id="hero">

      {/* LAYER 1 — 3D canvas */}
      <div className={styles.canvasLayer}>
        {!isMobile && hasWebGL ? (
          <Canvas
            style={{ width: '100%', height: '100%' }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              toneMapping: 3,
              toneMappingExposure: 1.3,
              alpha: false,
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: false,
            }}
            dpr={Math.min(window.devicePixelRatio, 2)}
            frameloop="always"
            flat={false}
          >
            <Suspense fallback={null}>
              <HeroScene mousePos={mousePos} />
            </Suspense>
          </Canvas>
        ) : (
          <div className={styles.mobileBg}>
            <div className={styles.mobileOrb} />
          </div>
        )}
      </div>

      {/* LAYER 2 — HTML text */}
      <div className={styles.textLayer}>
        <HeroText />
      </div>

    </section>
  );
}