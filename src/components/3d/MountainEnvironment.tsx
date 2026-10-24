'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface MountainEnvironmentProps {
  onReady?: () => void;
  onError?: (err: Error) => void;
}

export default function MountainEnvironment({ onReady, onError }: MountainEnvironmentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number | null = null;
    let isDisposed = false;
    let isVisible = true;
    let prefersReducedMotion = false;

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010611, 0.0075);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 800);
    camera.position.set(0, 12, 42);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      if (onError) onError(err instanceof Error ? err : new Error('WebGL initialization failed'));
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x010611, 0.0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvasElement = renderer.domElement;
    canvasElement.style.display = 'block';
    canvasElement.style.width = '100%';
    canvasElement.style.height = '100%';
    canvasElement.style.pointerEvents = 'none';
    canvasElement.setAttribute('aria-hidden', 'true');
    container.appendChild(canvasElement);

    // 2. Atmospheric Himalayan Lighting
    const ambientLight = new THREE.AmbientLight(0x081a33, 1.4);
    scene.add(ambientLight);

    // Cyan Glacial Key Light
    const cyanKeyLight = new THREE.DirectionalLight(0x00aeef, 2.8);
    cyanKeyLight.position.set(45, 55, 30);
    scene.add(cyanKeyLight);

    // Warm Himalayan Dawn/Dusk Rim Light
    const warmRimLight = new THREE.DirectionalLight(0xff9944, 1.2);
    warmRimLight.position.set(-60, 35, -50);
    scene.add(warmRimLight);

    // Soft Indigo Fill Light from Valley
    const valleyFillLight = new THREE.DirectionalLight(0x1a2e56, 1.0);
    valleyFillLight.position.set(0, -20, 20);
    scene.add(valleyFillLight);

    // 3. Procedural Mountain Geometry Generator
    function createMountainRidge(
      widthSegs: number,
      depthSegs: number,
      sizeX: number,
      sizeZ: number,
      maxHeight: number,
      roughness: number,
      baseColor: number,
      peakColor: number,
      zPos: number,
      yOffset: number,
    ) {
      const geometry = new THREE.PlaneGeometry(sizeX, sizeZ, widthSegs, depthSegs);
      geometry.rotateX(-Math.PI / 2);

      const posAttr = geometry.attributes.position;
      const vertex = new THREE.Vector3();
      const colors = new Float32Array(posAttr.count * 3);

      const cBase = new THREE.Color(baseColor);
      const cPeak = new THREE.Color(peakColor);

      for (let i = 0; i < posAttr.count; i++) {
        vertex.fromBufferAttribute(posAttr, i);

        // Fractal elevation with multiple harmonic frequencies
        const nx = vertex.x * roughness;
        const nz = vertex.z * roughness;

        const h1 = Math.sin(nx * 1.0) * Math.cos(nz * 1.0);
        const h2 = Math.sin(nx * 2.3 + 1.2) * Math.cos(nz * 2.1 + 0.8) * 0.5;
        const h3 = Math.sin(nx * 4.7) * Math.sin(nz * 4.4) * 0.25;
        const h4 = Math.sin(nx * 9.2 + 2.0) * 0.12;

        let elevation = (h1 + h2 + h3 + h4) * maxHeight;

        // Crest sharp ridge factor (Himalayan jagged ridge profiles)
        const ridgeFactor = Math.pow(Math.abs(Math.sin(nx * 1.8)), 2.5);
        elevation += ridgeFactor * (maxHeight * 0.45);

        // Valley taper towards edges
        const edgeDist = Math.abs(vertex.x) / (sizeX * 0.5);
        const taper = Math.max(0, 1.0 - Math.pow(edgeDist, 2.0) * 0.35);
        elevation *= taper;

        posAttr.setY(i, elevation + yOffset);

        // Vertex elevation color blending (dark rock at base -> icy snow at peaks)
        const heightNorm = Math.max(0, Math.min(1, (elevation + yOffset) / (maxHeight * 1.3)));
        const vertColor = cBase.clone().lerp(cPeak, Math.pow(heightNorm, 1.8));

        colors[i * 3] = vertColor.r;
        colors[i * 3 + 1] = vertColor.g;
        colors[i * 3 + 2] = vertColor.b;
      }

      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.82,
        metalness: 0.18,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, yOffset, zPos);
      return mesh;
    }

    // Add 3 Himalayan Depth Layers:
    // Layer 1: Distant snow-capped Himalayan summits
    const distantSummits = createMountainRidge(
      80, 40, 320, 120, 38, 0.022, 0x051329, 0x9edbff, -140, 2,
    );
    scene.add(distantSummits);

    // Layer 2: Mid-range Massif & Alpine Ridge
    const midRangeMassif = createMountainRidge(
      65, 35, 240, 90, 26, 0.035, 0x030d1d, 0x00aeef, -75, -4,
    );
    scene.add(midRangeMassif);

    // Layer 3: Foreground Craggy Silhouetted Valleys
    const foreValleyRidge = createMountainRidge(
      50, 25, 160, 60, 16, 0.052, 0x010611, 0x071e3d, -22, -10,
    );
    scene.add(foreValleyRidge);

    // 4. Subtle Floating Alpine Mist / Stardust Particles
    const particleCount = prefersReducedMotion ? 200 : 900;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 160;
      particlePositions[i * 3 + 1] = Math.random() * 40 - 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 120 - 20;
      particleVelocities[i] = 0.2 + Math.random() * 0.4;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x66d9ff,
      size: 0.75,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Interactive Camera Parallax & Scroll Depth Logic
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouseX = normX * 4.5; // Max 4.5 units lateral camera drift
      targetMouseY = -normY * 2.2; // Max 2.2 units vertical camera drift
    };

    const handleScroll = () => {
      const scrollContainer = container.closest<HTMLElement>('.hero-scroll-container');
      if (!scrollContainer) {
        const scrolled = window.scrollY;
        targetScrollProgress = Math.min(1, Math.max(0, scrolled / (window.innerHeight * 2.5)));
        return;
      }
      const rect = scrollContainer.getBoundingClientRect();
      const scrollableDistance = scrollContainer.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) {
        targetScrollProgress = 0;
        return;
      }
      const scrolled = -rect.top;
      targetScrollProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 7. Visibility Throttling (Zero CPU/GPU usage when off-screen or tab hidden)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial render & mark ready
    renderer.render(scene, camera);
    setIsRendered(true);
    if (onReady) onReady();

    // 8. Animation Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip work if scrolled past hero or tab hidden

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth mouse lerp
        currentMouseX += (targetMouseX - currentMouseX) * 0.04;
        currentMouseY += (targetMouseY - currentMouseY) * 0.04;

        // Smooth scroll progress lerp
        currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;

        // Camera positioning based on parallax and scroll progression
        const scrollZOffset = currentScrollProgress * 18.0; // Camera glides forward through mountain valley
        const scrollYOffset = currentScrollProgress * 4.0;

        camera.position.x = currentMouseX;
        camera.position.y = 12 + currentMouseY + scrollYOffset;
        camera.position.z = 42 - scrollZOffset;

        // Camera subtly tracks the majestic Himalayan summits
        camera.lookAt(
          currentMouseX * 0.4,
          10 + currentMouseY * 0.2 + currentScrollProgress * 6.0,
          -80,
        );

        // Drift alpine mist particles
        const posAttr = particleGeometry.attributes.position;
        const positions = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          positions[idx + 1] += particleVelocities[i] * delta * 1.5;
          positions[idx] += Math.sin(elapsed * 0.3 + i) * delta * 0.6;

          // Wrap particles vertically
          if (positions[idx + 1] > 35) {
            positions[idx + 1] = -5;
          }
        }
        posAttr.needsUpdate = true;
      } else {
        // Static frame for reduced motion
        camera.position.set(0, 12, 42);
        camera.lookAt(0, 10, -80);
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Resource Disposal Cleanup
    return () => {
      isDisposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();

      // Dispose Three.js objects
      [distantSummits, midRangeMassif, foreValleyRidge].forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();
      renderer.forceContextLoss();

      if (container.contains(canvasElement)) {
        container.removeChild(canvasElement);
      }
    };
  }, [onError, onReady]);

  return (
    <div
      ref={containerRef}
      className={`cinematic-hero-canvas transition-opacity duration-1000 ${
        isRendered ? 'opacity-100' : 'opacity-0'
      }`}
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
    />
  );
}
