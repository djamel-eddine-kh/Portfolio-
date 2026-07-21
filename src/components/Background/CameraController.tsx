import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceQuality } from '@/hooks/useDeviceQuality';
import { CAMERA_CONFIG } from '@/constants/scene';

export function CameraController() {
  const { camera, size } = useThree();
  const reduced = useReducedMotion();
  const quality = useDeviceQuality();

  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const targetScroll = useRef(0);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const factor = quality === 'low' ? 0.5 : 1;
      targetOffset.current.x = ((e.clientX / size.width) * 2 - 1) * CAMERA_CONFIG.maxParallaxPixels * factor;
      targetOffset.current.y = (-(e.clientY / size.height) * 2 + 1) * CAMERA_CONFIG.maxParallaxPixels * factor;
    };
    const onScroll = () => { targetScroll.current = window.scrollY; };
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, [size, quality]);

  useFrame(() => {
    if (reduced) return;

    currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * CAMERA_CONFIG.parallaxSmoothFactor;
    currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * CAMERA_CONFIG.parallaxSmoothFactor;
    scrollY.current += (targetScroll.current - scrollY.current) * CAMERA_CONFIG.scrollSmoothFactor;

    camera.position.x = CAMERA_CONFIG.position.x + currentOffset.current.x * 0.001;
    camera.position.y = CAMERA_CONFIG.position.y + currentOffset.current.y * 0.001 - scrollY.current * 0.001;
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}
