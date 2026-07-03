import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture, PresentationControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import avatarUrl from "@/assets/avatar-hero.png";

type Badge = {
  label: string;
  className: string;
  bg: string;
  delay: number;
};

const badges: Badge[] = [
  { label: "TS", className: "top-6 left-2 sm:left-6", bg: "bg-[#3178c6]", delay: 0.1 },
  { label: "{ }", className: "top-1/3 -left-2 sm:left-0", bg: "bg-[#f7df1e] text-black", delay: 0.25 },
  { label: "⚛", className: "bottom-10 left-4 sm:left-10", bg: "bg-[#61dafb] text-black", delay: 0.4 },
  { label: "▲", className: "top-4 right-4 sm:right-8", bg: "bg-black border border-white/20", delay: 0.15 },
  { label: "Py", className: "top-1/2 right-0 sm:-right-2", bg: "bg-[#306998]", delay: 0.3 },
  { label: "☁", className: "bottom-6 right-6 sm:right-10", bg: "bg-[color:var(--brand)] text-primary-foreground", delay: 0.45 },
];

/** A static 3D plane textured with the avatar PNG */
function AvatarBillboard() {
  const texture = useTexture(avatarUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  return (
    <mesh>
      <planeGeometry args={[3.4, 3.4]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        roughness={0.6}
        metalness={0.05}
      />
    </mesh>
  );
}

export function HeroAvatar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Orbit rings */}
      <div className="absolute inset-0 ring-orbit rounded-full opacity-70" />
      <div
        className="absolute inset-6 rounded-full border border-dashed border-white/10"
      />

      {/* Soft glow behind avatar */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_60%_55%,oklch(0.72_0.19_45/0.45),transparent_60%)] blur-2xl" />

      {/* Static 3D avatar */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 3, 4]} intensity={1.1} />
          <directionalLight position={[-3, -1, 2]} intensity={0.4} color="#ff8a3d" />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <AvatarBillboard />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating tech badges */}
      {badges.map((b) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: b.delay }}
          className={`absolute ${b.className} flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-primary-foreground shadow-md ${b.bg}`}
        >
          {b.label}
        </motion.div>
      ))}
    </div>
  );
}
