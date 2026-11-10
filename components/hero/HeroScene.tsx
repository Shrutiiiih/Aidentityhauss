"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Palette mirrors styles/tokens.css. Swap this whole scene for a pre-rendered asset
// via lib/assets when the 3D artwork is ready; the Hero only cares about the stage box.
const C = {
  wall: "#ffe9d6", roof: "#ff6b57", ink: "#14182b", sky: "#a9dcf5",
  amber: "#ffc247", cloud: "#ffffff", lilac: "#c9b8f2", skin: "#f3b79a",
};

type V3 = [number, number, number];

function Clay({ color, ...rest }: { color: string } & Record<string, unknown>) {
  return <meshStandardMaterial color={color} roughness={0.95} metalness={0} {...rest} />;
}

const PUFFS: [number, number, number, number][] = [
  [0, 0, 0, 0.55], [0.58, -0.08, 0.05, 0.42], [-0.58, -0.05, 0, 0.45], [0.28, 0.3, 0, 0.38], [-0.22, 0.32, 0.05, 0.34],
];

function Cloud({ position, scale = 1, speed = 1, phase = 0 }: { position: V3; scale?: number; speed?: number; phase?: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.elapsedTime * speed + phase;
    g.current.position.x = position[0] + Math.sin(t * 0.6) * 0.2;
    g.current.position.y = position[1] + Math.sin(t * 0.9) * 0.06;
  });
  return (
    <group ref={g} position={position} scale={scale}>
      {PUFFS.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 24, 24]} />
          <Clay color={C.cloud} />
        </mesh>
      ))}
    </group>
  );
}

function Haus({ pointer, drift }: { pointer: React.MutableRefObject<{ x: number; y: number }>; drift: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const flame = useRef<THREE.Group>(null);
  const arm = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const fit = Math.min(1, viewport.width / 5.6);

  useFrame(({ clock }, dt) => {
    const g = rig.current;
    if (!g) return;
    const t = clock.elapsedTime;
    const px = drift ? Math.sin(t * 0.5) * 0.45 : pointer.current.x;
    const py = drift ? Math.cos(t * 0.4) * 0.3 : pointer.current.y;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.5 - 0.35, 4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.16 + scroll * 0.45, 4, dt);
    g.rotation.z = Math.sin(t * 0.8) * 0.03;
    g.position.y = Math.sin(t * 1.2) * 0.12 + scroll * 0.7;
    if (flame.current) flame.current.scale.set(1, 0.85 + Math.sin(t * 14) * 0.14, 1);
    if (arm.current) arm.current.rotation.z = -0.9 + Math.sin(t * 5) * 0.35;
  });

  return (
    <group scale={fit}>
      <group ref={rig}>
        {/* walls */}
        <RoundedBox args={[1.7, 1.2, 1.3]} radius={0.12} smoothness={4}><Clay color={C.wall} /></RoundedBox>
        {/* roof: a 3-sided cylinder lying on its side, flattened into a pitch */}
        <mesh position={[0, 0.92, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.55]}>
          <cylinderGeometry args={[1.15, 1.15, 1.5, 3]} />
          <Clay color={C.roof} />
        </mesh>
        {/* door + windows */}
        <RoundedBox args={[0.38, 0.62, 0.06]} radius={0.03} position={[0, -0.29, 0.66]}><Clay color={C.ink} /></RoundedBox>
        <RoundedBox args={[0.34, 0.34, 0.06]} radius={0.04} position={[0.5, 0.1, 0.66]}><Clay color={C.sky} /></RoundedBox>
        <RoundedBox args={[0.34, 0.34, 0.06]} radius={0.04} position={[-0.5, 0.1, 0.66]}><Clay color={C.sky} /></RoundedBox>
        {/* chimney that is also a megaphone: the campaign */}
        <mesh position={[0.62, 1.2, 0]} rotation={[0, 0, -0.6]}>
          <cylinderGeometry args={[0.36, 0.13, 0.58, 28]} />
          <Clay color={C.amber} />
        </mesh>
        {/* rocket nozzle, fins, flame */}
        <mesh position={[0, -0.74, 0]}><cylinderGeometry args={[0.55, 0.38, 0.3, 28]} /><Clay color={C.ink} /></mesh>
        <RoundedBox args={[0.14, 0.7, 0.5]} radius={0.05} position={[0.98, -0.5, 0]} rotation={[0, 0, 0.35]}><Clay color={C.roof} /></RoundedBox>
        <RoundedBox args={[0.14, 0.7, 0.5]} radius={0.05} position={[-0.98, -0.5, 0]} rotation={[0, 0, -0.35]}><Clay color={C.roof} /></RoundedBox>
        <group ref={flame} position={[0, -1.2, 0]}>
          <mesh rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.4, 0.95, 28]} /><Clay color={C.amber} /></mesh>
          <mesh position={[0, 0.1, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.22, 0.6, 24]} /><Clay color={C.roof} /></mesh>
        </group>
        {/* pilot on the ridge, waving */}
        <group position={[-0.3, 1.06, 0]}>
          <mesh position={[0, 0.22, 0]}><capsuleGeometry args={[0.15, 0.22, 6, 14]} /><Clay color={C.lilac} /></mesh>
          <mesh position={[0, 0.58, 0]}><sphereGeometry args={[0.17, 20, 20]} /><Clay color={C.skin} /></mesh>
          <mesh position={[0, 0.68, -0.02]}><sphereGeometry args={[0.15, 20, 20]} /><Clay color={C.ink} /></mesh>
          <group ref={arm} position={[0.14, 0.34, 0]}>
            <mesh position={[0.12, 0.08, 0]}><capsuleGeometry args={[0.05, 0.2, 4, 10]} /><Clay color={C.lilac} /></mesh>
          </group>
        </group>
        {/* the exhaust cloud the house rides on */}
        <Cloud position={[0, -1.75, 0.1]} scale={1.15} speed={0.8} />
      </group>
      <Cloud position={[-2.5, 1.2, -1]} scale={0.7} speed={0.6} phase={1.2} />
      <Cloud position={[2.4, -0.3, -0.8]} scale={0.55} speed={0.7} phase={2.4} />
    </group>
  );
}

export default function HeroScene({ active, drift }: { active: boolean; drift: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const on = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);

  return (
    <Canvas
      dpr={[1, drift ? 1.25 : 1.75]}
      camera={{ position: [0, 0.1, 7.8], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[-3, 5, 4]} intensity={2.3} color="#fff2e0" />
      <directionalLight position={[4, -1, 3]} intensity={0.8} color="#a9dcf5" />
      <Haus pointer={pointer} drift={drift} />
    </Canvas>
  );
}
