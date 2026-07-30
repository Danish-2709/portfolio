import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

type Props = {
  scrollProgress: number;
  mouse: { x: number; y: number; vx: number; vy: number };
  accent: string;
};

const PARTICLE_COUNT = 3500;

function ParticleField({ scrollProgress, mouse, accent }: Props) {
  const points = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const { viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const base = new THREE.Color(accent);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // distribute in a flattened sphere shell
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = base.clone().offsetHSL((Math.random() - 0.5) * 0.12, 0, (Math.random() - 0.5) * 0.25);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [accent]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (points.current) {
      // slow ambient rotation + scroll-driven camera dolly
      points.current.rotation.y = t * 0.03 + scrollProgress * Math.PI * 0.6;
      points.current.rotation.x = Math.sin(t * 0.08) * 0.08 + scrollProgress * 0.3;
      // mouse parallax
      points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, mouse.x * 2.5, 0.04);
      points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, -mouse.y * 1.5, 0.04);
      // velocity-based scale pulse
      const speed = Math.hypot(mouse.vx, mouse.vy);
      const s = 1 + Math.min(speed * 0.02, 0.12);
      points.current.scale.setScalar(THREE.MathUtils.lerp(points.current.scale.x, s, 0.1));
    }
    if (matRef.current) {
      matRef.current.size = 0.035 + Math.sin(t * 0.6) * 0.004 + scrollProgress * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingShards({ scrollProgress, mouse }: { scrollProgress: number; mouse: Props['mouse'] }) {
  const group = useRef<THREE.Group>(null);
  const shards = useMemo(() => {
    return new Array(7).fill(0).map((_, i) => ({
      pos: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      rotSpeed: (Math.random() - 0.5) * 0.4,
      scale: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.02;
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.x * 1.5, 0.03);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -mouse.y, 0.03);
    }
  });

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#10131f"
            emissive={new THREE.Color(i % 2 ? '#5eead4' : '#a78bfa')}
            emissiveIntensity={0.15}
            metalness={0.9}
            roughness={0.15}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleScene({ scrollProgress, mouse, accent }: Props) {
  return (
    <Canvas
      className="!fixed inset-0 z-0"
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#5eead4" />
      <pointLight position={[-10, -6, -8]} intensity={0.4} color="#a78bfa" />
      <ParticleField scrollProgress={scrollProgress} mouse={mouse} accent={accent} />
      <FloatingShards scrollProgress={scrollProgress} mouse={mouse} />
      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}