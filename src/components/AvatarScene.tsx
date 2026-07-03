import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

function Avatar() {
  const group = useRef<Group>(null);
  const head = useRef<Mesh>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
    if (head.current) {
      head.current.position.y =
        1.45 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    }
  });

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <capsuleGeometry args={[0.45, 0.7, 8, 16]} />
        <meshStandardMaterial
          color="#7b3fff"
          emissive="#5a1fcc"
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>
      {/* Head */}
      <mesh ref={head} position={[0, 1.45, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#a78bfa"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 1.48, 0.32]}>
        <boxGeometry args={[0.55, 0.18, 0.2]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive="#22d3ee"
          emissiveIntensity={1.4}
          roughness={0.05}
          metalness={1}
        />
      </mesh>
      {/* Arms */}
      {[-1, 1].map((x) => (
        <mesh key={x} position={[x * 0.55, 0.5, 0]} rotation={[0, 0, x * 0.3]}>
          <capsuleGeometry args={[0.13, 0.55, 6, 12]} />
          <meshStandardMaterial
            color="#6d28d9"
            emissive="#4c1d95"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      ))}
      {/* Floating ring */}
      <mesh position={[0, 1.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

function Platform() {
  return (
    <group position={[0, -1.4, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[1.6, 1.8, 0.2, 64]} />
        <meshStandardMaterial
          color="#1a0b3d"
          emissive="#3b0764"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
        <torusGeometry args={[1.55, 0.03, 16, 80]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

export function AvatarScene() {
  return (
    <div className="h-[420px] w-full sm:h-[520px]">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.6, 4.2], fov: 45 }}
      >
        <color attach="background" args={["#0b0418"]} />
        <fog attach="fog" args={["#0b0418", 6, 12]} />

        <ambientLight intensity={0.35} />
        <pointLight position={[3, 3, 3]} intensity={2.5} color="#a78bfa" />
        <pointLight position={[-3, 2, -2]} intensity={2} color="#22d3ee" />
        <directionalLight position={[0, 5, 2]} intensity={0.8} castShadow />

        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
            <Avatar />
          </Float>
          <Platform />
          <Sparkles
            count={60}
            scale={6}
            size={2}
            speed={0.4}
            color="#a78bfa"
          />
          <Environment preset="night" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
}
