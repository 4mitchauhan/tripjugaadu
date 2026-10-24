'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SceneFallback from './SceneFallback';

// Dynamically import MountainEnvironment with SSR disabled
const MountainEnvironment = dynamic(() => import('./MountainEnvironment'), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Test WebGL support safely on client
    try {
      const testCanvas = document.createElement('canvas');
      const gl =
        testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // During SSR or if WebGL is unavailable or errors out, render robust SceneFallback
  if (!mounted || !webGLSupported || hasError) {
    return <SceneFallback />;
  }

  return (
    <div
      className="cinematic-hero-canvas pointer-events-none select-none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        background: '#010611',
      }}
    >
      <MountainEnvironment onError={() => setHasError(true)} />
    </div>
  );
}
