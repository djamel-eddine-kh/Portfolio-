import React, { Suspense, Component, useMemo, useCallback, type ReactNode, type ErrorInfo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/components/ThemeProvider';
import { SceneThemeProvider, setSceneTheme } from './useSceneTheme';
import { Lights } from './Lights';
import { Stars } from './Stars';
import { Clouds } from './Clouds';
import { SpaceDust } from './SpaceDust';
import { Effects } from './Effects';
import { CameraController } from './CameraController';
import { ShootingStar } from './ShootingStar';
import { Fallback } from './Fallback';
import { useDeviceQuality } from '@/hooks/useDeviceQuality';
import { getPixelRatio } from '@/utils/performance';
import { TARGET_VALUES } from '@/constants/scene';

const SceneInner = React.memo(function SceneInner() {
  return (
    <SceneThemeProvider>
      <Lights />
      <CameraController />
      <Stars />
      <Clouds />
      <SpaceDust />
      <ShootingStar />
      <Effects />
    </SceneThemeProvider>
  );
});

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('WebGL canvas error:', error.message);
  }
  render() {
    return this.state.hasError ? (
      <>{this.props.fallback}</>
    ) : (
      this.props.children
    );
  }
}

function CanvasFallback() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Fallback />
    </div>
  );
}

function hasWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

function WebGLCheck({ children }: { children: ReactNode }) {
  const [supported] = React.useState(typeof window === 'undefined' ? true : hasWebGLSupport());
  if (!supported) return <CanvasFallback />;
  return <>{children}</>;
}

function LoadingFallback() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background: 'linear-gradient(135deg, #05070d 0%, #0b1020 50%, #12182a 100%)',
      }}
      aria-hidden="true"
    />
  );
}

export default function BackgroundScene() {
  const { theme } = useTheme();
  const quality = useDeviceQuality();
  const dpr = getPixelRatio(quality);

  setSceneTheme(theme);

  const glConfig = useMemo(
    () => ({
      antialias: quality !== 'low',
      alpha: false,
      powerPreference: 'high-performance' as const,
      stencil: false,
      depth: true,
    }),
    [quality],
  );

  const cameraConfig = useMemo(
    () => ({ position: [0, 0.5, 8] as const, fov: 45, near: 0.1, far: 50 }),
    [],
  );

  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => gl.setClearColor(TARGET_VALUES.dark.backgroundTop.clone()),
    [],
  );

  return (
    <WebGLCheck>
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <CanvasErrorBoundary fallback={<CanvasFallback />}>
          <Suspense fallback={<LoadingFallback />}>
            <Canvas
              dpr={dpr}
              gl={glConfig}
              camera={cameraConfig}
              style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
              onCreated={handleCreated}
            >
              <SceneInner />
            </Canvas>
          </Suspense>
        </CanvasErrorBoundary>
      </div>
    </WebGLCheck>
  );
}
