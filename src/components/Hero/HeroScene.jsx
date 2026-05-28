import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { GlobeOrb } from './GlobeOrb';
import { FloatingParticles } from './FloatingParticles';
import * as THREE from 'three';

function GridFloor() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.18 + Math.sin(clock.getElapsedTime() * 0.4) * 0.04;
  });

  const geo = useRef();
  const geometry = (() => {
    const size = 20;
    const divisions = 20;
    const step = size / divisions;
    const verts = [];
    for (let i = 0; i <= divisions; i++) {
      const x = -size / 2 + i * step;
      verts.push(x, 0, -size / 2, x, 0, size / 2);
    }
    for (let i = 0; i <= divisions; i++) {
      const z = -size / 2 + i * step;
      verts.push(-size / 2, 0, z, size / 2, 0, z);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return g;
  })();

  return (
    <lineSegments ref={ref} geometry={geometry} position={[0, -3.8, 0]} rotation={[0, 0, 0]}>
      <lineBasicMaterial color="#00D9FF" transparent opacity={0.18} />
    </lineSegments>
  );
}

export function HeroScene({ mousePos }) {
  const camRef = useRef();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const tx = mousePos.current.y * 0.05;
    const ty = mousePos.current.x * 0.06;
    targetRot.current.x += (tx - targetRot.current.x) * 0.04;
    targetRot.current.y += (ty - targetRot.current.y) * 0.04;
    if (camRef.current) {
      camRef.current.rotation.x = targetRot.current.x;
      camRef.current.rotation.y = targetRot.current.y;
    }
  });

  return (
    <>
      <PerspectiveCamera ref={camRef} makeDefault position={[0, 1, 8]} fov={55} />
      <fog attach="fog" args={['#070B14', 12, 22]} />
      <ambientLight intensity={0.15} color="#0a0a2e" />
      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />
      <GridFloor />
      <GlobeOrb />
      <FloatingParticles count={60} />
    </>
  );
}