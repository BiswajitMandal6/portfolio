import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

function OrbitRing({ radius, tilt, color, speed, dotCount = 6 }) {
  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.z += speed * 0.005;
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
          <torusGeometry args={[radius, 0.012, 8, 128]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.7} />
        </mesh>
        {dots.map(d => (
          <mesh key={d.key} position={[d.x, d.y, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
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
    for (let lat = -80; lat <= 80; lat += 10) {
      for (let lon = 0; lon < 360; lon += 10) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);
        const r = 1.55;
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
      {/* Perfect sphere core */}
      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial
          color="#020818"
          emissive="#061530"
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.97}
        />
      </Sphere>

      {/* Surface dots */}
      {dotPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.016, 4, 4]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={1.2}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}

      {/* Subtle outer glow shell */}
      <Sphere args={[1.58, 32, 32]}>
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.08}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function Platform() {
  return (
    <group position={[0, -2.2, 0]}>
      {/* Main platform discs */}
      {[1.8, 2.4, 3.0].map((r, i) => (
        <mesh key={i} position={[0, -i * 0.18, 0]}>
          <cylinderGeometry args={[r, r + 0.1, 0.08, 64]} />
          <meshStandardMaterial
            color="#050c20"
            emissive="#00D9FF"
            emissiveIntensity={0.15 - i * 0.04}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Glowing ring on top platform */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[1.75, 0.04, 8, 64]} />
        <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <torusGeometry args={[2.35, 0.03, 8, 64]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={2} />
      </mesh>

      {/* Ground glow */}
      <pointLight position={[0, 0.2, 0]} color="#00D9FF" intensity={4} distance={5} />
      <pointLight position={[0, 0.2, 0]} color="#8B5CF6" intensity={2} distance={8} />
    </group>
  );
}

export function GlobeOrb({ position = [0, 0, 0] }) {
  return (
    <Float speed={0.6} floatIntensity={0.15} rotationIntensity={0.0}>
      <group position={[position[0], position[1] + 0.3, position[2]]}>
        <GlobeSphere />
        {/* Rings with controlled tilts so they appear as clean circles from camera POV */}
        <OrbitRing radius={2.4} tilt={0.3}  color="#00D9FF" speed={0.8}  dotCount={9} />
        <OrbitRing radius={2.9} tilt={1.05} color="#FF4ECD" speed={-0.6} dotCount={7} />
        <OrbitRing radius={3.3} tilt={0.15} color="#8B5CF6" speed={0.4}  dotCount={5} />

        <pointLight color="#00D9FF" intensity={5} distance={8} />
        <pointLight color="#8B5CF6" intensity={3} distance={6} />
      </group>
    </Float>
  );
}
