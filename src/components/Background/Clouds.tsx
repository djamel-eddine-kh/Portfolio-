import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, PlaneGeometry, MeshBasicMaterial, CanvasTexture, DoubleSide } from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceQuality } from '@/hooks/useDeviceQuality';
import { CLOUD_CONFIG } from '@/constants/scene';
import { useSceneTheme } from './useSceneTheme';

let cachedCloudTex: CanvasTexture | null = null;

function getCloudTexture(): CanvasTexture {
  if (cachedCloudTex) return cachedCloudTex;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255,255,255,0.6)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.25)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.08)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new CanvasTexture(canvas);
  tex.needsUpdate = true;
  cachedCloudTex = tex;
  return tex;
}

export function Clouds() {
  const reduced = useReducedMotion();
  const theme = useSceneTheme();
  const texture = useMemo(getCloudTexture, []);
  const planeGeo = useMemo(() => new PlaneGeometry(1, 1), []);

  const layerData = useMemo(
    () =>
      Array.from({ length: CLOUD_CONFIG.layers }, (_, i) => ({
        x: (Math.random() - 0.5) * CLOUD_CONFIG.spread * 0.8,
        y: 1 + Math.random() * 2,
        z: -(3 + Math.random() * 4),
        scale: 1.5 + Math.random() * 2.5,
        speed: CLOUD_CONFIG.speed * (0.5 + Math.random() * 0.5),
        id: i,
      })),
    [],
  );

  const meshRefs = useRef<(Mesh | null)[]>([]);
  meshRefs.current.length = CLOUD_CONFIG.layers;

  const setRef = (i: number) => (el: Mesh | null) => { meshRefs.current[i] = el; };

  useFrame(({ clock }) => {
    const opacity = theme.cloudOpacity * CLOUD_CONFIG.maxOpacity;
    for (let i = 0; i < CLOUD_CONFIG.layers; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      (mesh.material as MeshBasicMaterial).opacity = opacity;
      if (!reduced) {
        const d = layerData[i];
        const t = clock.getElapsedTime();
        mesh.position.x = d.x + Math.sin(t * d.speed + i) * 0.5;
        mesh.position.y = d.y + Math.sin(t * d.speed * 0.5 + i) * 0.15;
      }
    }
  });

  return (
    <>
      {layerData.map((d) => (
        <mesh
          key={d.id}
          ref={setRef(d.id)}
          geometry={planeGeo}
          position={[d.x, d.y, d.z]}
          scale={[d.scale, d.scale * 0.6, 1]}
        >
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0}
            depthWrite={false}
            side={DoubleSide}
            blending={1}
          />
        </mesh>
      ))}
    </>
  );
}
