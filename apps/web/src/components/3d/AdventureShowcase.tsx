'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AdventureShowcaseProps {
  difficulty?: string;
  location?: string;
  className?: string;
}

export default function AdventureShowcase({
  difficulty = 'Certified',
  location = 'Himalayas',
  className = '',
}: AdventureShowcaseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = motionQuery.matches;

    // Verify WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    let isDisposed = false;
    let isVisible = true;
    let animId: number | null = null;

    const width = container.clientWidth || 180;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    // Subtle 3D Compass & Elevation Ring
    const group = new THREE.Group();
    scene.add(group);

    // 1. Outer Gyroscope Ring (TripJugaadu Cyan)
    const ringGeom = new THREE.TorusGeometry(4.2, 0.12, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00aeef,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x004466,
      emissiveIntensity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    group.add(ringMesh);

    // 2. Inner Dial Ring (Subtle Gold/Brass Expedition Trim)
    const innerGeom = new THREE.TorusGeometry(3.4, 0.08, 16, 48);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x442200,
      emissiveIntensity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    innerMesh.rotation.x = Math.PI * 0.25;
    group.add(innerMesh);

    // 3. Stylized 3D Mountain Peak inside the Compass
    const peakGeom = new THREE.ConeGeometry(2.2, 3.2, 4);
    peakGeom.rotateY(Math.PI * 0.25);
    const peakMat = new THREE.MeshStandardMaterial({
      color: 0x0b2545,
      flatShading: true,
      metalness: 0.4,
      roughness: 0.6,
      emissive: 0x001a33,
      emissiveIntensity: 0.2,
    });
    const peakMesh = new THREE.Mesh(peakGeom, peakMat);
    peakMesh.position.y = -0.4;
    group.add(peakMesh);

    // 4. Summit Cap (Snow Highlight)
    const capGeom = new THREE.ConeGeometry(1.0, 1.4, 4);
    capGeom.rotateY(Math.PI * 0.25);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xe6f4ff,
      flatShading: true,
      metalness: 0.2,
      roughness: 0.3,
    });
    const capMesh = new THREE.Mesh(capGeom, capMat);
    capMesh.position.y = 0.5;
    group.add(capMesh);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0x00aeef, 2.5);
    dir.position.set(5, 8, 8);
    scene.add(dir);

    // Parallax & Visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    let mouseX = 0;
    let mouseY = 0;
    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.5;
      mouseY = y * 0.5;
    };
    container.addEventListener('mousemove', handleMove, { passive: true });

    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        group.rotation.y = elapsed * 0.4 + mouseX;
        group.rotation.x = Math.sin(elapsed * 0.3) * 0.15 + mouseY;
        innerMesh.rotation.z = elapsed * 0.25;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      container.removeEventListener('mousemove', handleMove);

      ringGeom.dispose();
      ringMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      peakGeom.dispose();
      peakMat.dispose();
      capGeom.dispose();
      capMat.dispose();

      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: '140px', height: '140px' }}
      title={`${difficulty} expedition verified for ${location}`}
      aria-hidden="true"
    />
  );
}
