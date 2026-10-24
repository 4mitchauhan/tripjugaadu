'use client';

import React from 'react';

interface SceneFallbackProps {
  className?: string;
}

export default function SceneFallback({ className = '' }: SceneFallbackProps) {
  return (
    <div
      className={`cinematic-hero-canvas pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#010611',
      }}
    >
      <img
        src="/frames/frame_001.jpg"
        alt=""
        loading="eager"
        fetchPriority="high"
        className="w-full h-full object-cover opacity-80"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.85) contrast(1.05)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(0, 174, 239, 0.08) 0%, rgba(1, 6, 17, 0.75) 75%, #010611 100%)',
        }}
      />
    </div>
  );
}
