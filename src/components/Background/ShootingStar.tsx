import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, PlaneGeometry, MeshBasicMaterial } from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SHOOTING_STAR_CONFIG } from '@/constants/scene';

export function ShootingStar() {
  const reduced = useReducedMotion();
  const meshRef = useRef<Mesh>(null);
  const state = useRef({
    active: false,
    progress: 0,
    startX: 0,
    startY: 0,
    startZ: 0,
    nextTime: SHOOTING_STAR_CONFIG.intervalMin + Math.random() * (SHOOTING_STAR_CONFIG.intervalMax - SHOOTING_STAR_CONFIG.intervalMin),
  });

  const geometry = useMemo(() => new PlaneGeometry(0.3, 0.005), []);

  useFrame(() => {
    if (reduced) return;
    const s = state.current;
    const now = Date.now();

    if (!s.active) {
      if (now > s.nextTime) {
        s.active = true;
        s.progress = 0;
        s.startX = (Math.random() - 0.5) * 20;
        s.startY = 5 + Math.random() * 5;
        s.startZ = -(8 + Math.random() * 5);
      }
      if (meshRef.current) meshRef.current.visible = false;
      return;
    }

    if (!meshRef.current) return;
    meshRef.current.visible = true;

    s.progress += SHOOTING_STAR_CONFIG.speed * 0.016;

    if (s.progress > 1) {
      s.active = false;
      meshRef.current.visible = false;
      s.nextTime = now + SHOOTING_STAR_CONFIG.intervalMin + Math.random() * (SHOOTING_STAR_CONFIG.intervalMax - SHOOTING_STAR_CONFIG.intervalMin);
      return;
    }

    const t = s.progress;
    meshRef.current.position.set(s.startX + t * 15, s.startY - t * 8, s.startZ + t * 2);
    const opacity = t < 0.1 ? t * 10 : t > 0.8 ? (1 - t) * 5 : 1;
    (meshRef.current.material as MeshBasicMaterial).opacity = opacity;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} visible={false}>
      <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} blending={2} />
    </mesh>
  );
}
