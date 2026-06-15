"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OuterWildlandsProps {
  cityRadius: number;
  themeIndex: number;
}

export default function OuterWildlands({
  cityRadius,
  themeIndex,
}: OuterWildlandsProps) {
  const fogRef = useRef<THREE.FogExp2>(null);

  const groundSize = cityRadius * 4;

  const color = useMemo(() => {
    const colors = ["#1a1a2e", "#16213e", "#0f3460", "#2d1b2e"];
    return colors[themeIndex % colors.length];
  }, [themeIndex]);

  useFrame(({ scene }) => {
    scene.fog = new THREE.FogExp2(color, 0.003);
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[groundSize, groundSize]} />
        <meshStandardMaterial color={color} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}
