import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function OrbitRing({ radius, tilt, color, speed, dotCount = 6 }) {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.z += speed * 0.004;
  });

  const dots = useMemo(() => {
    return Array.from({ length: dotCount }, (_, i) => {
      const angle = (i / dotCount) * Math.PI * 2;
      return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, key: i };
    });
  }, [dotCount, radius]);

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={groupRef}>
        <mesh>
          <torusGeometry args={[radius, 0.008, 6, 64]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.9} />
        </mesh>
        {dots.map(d => (
          <mesh key={d.key} position={[d.x, d.y, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function GlobeSphere() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  const dotPositions = useMemo(() => {
    const positions = [];
    for (let lat = -80; lat <= 80; lat += 15) {
      for (let lon = 0; lon < 360; lon += 15) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);
        const r = 1.45;
        positions.push([
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ]);
      }
    }
    return positions;
  }, []);

  return (
    <group ref={ref}>
      {/* Sphere core */}
      <Sphere args={[1.4, 32, 32]}>
        <meshStandardMaterial
          color="#020818"
          emissive="#061530"
          emissiveIntensity={0.7}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.97}
        />
      </Sphere>

      {/* Surface dots */}
      {dotPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.025, 4, 4]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={3}
            transparent
            opacity={1}
          />
        </mesh>
      ))}

      {/* Outer glow shell */}
      <Sphere args={[1.45, 16, 16]}>
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.1}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

export function GlobeOrb({ position = [0, 0, 0] }) {
  return (
    <Float speed={0.6} floatIntensity={0.1} rotationIntensity={0.0}>
      {/* Pushed hard right: x=2.8, centered vertically, z slightly back */}
      <group position={[1.8, 0.1, -0.5]}>
        <GlobeSphere />
        <OrbitRing radius={2.2} tilt={0.3}  color="#00D9FF" speed={0.8}  dotCount={9} />
        <OrbitRing radius={2.6} tilt={1.05} color="#FF4ECD" speed={-0.6} dotCount={7} />
        <OrbitRing radius={3.0}  tilt={0.15} color="#8B5CF6" speed={0.4}  dotCount={5} />

        <pointLight color="#00D9FF" intensity={8} distance={10} />
        <pointLight color="#8B5CF6" intensity={5} distance={8} />
      </group>
    </Float>
  );
}