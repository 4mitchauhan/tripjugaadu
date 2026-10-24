'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ItinerarySceneProps {
  destination?: string;
  daysCount?: number;
  className?: string;
}

export default function ItineraryScene({
  destination = 'Rishikesh',
  daysCount = 3,
  className = '',
}: ItinerarySceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = motionQuery.matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    let isDisposed = false;
    let isVisible = true;
    let animId: number | null = null;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010611, 0.02);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 14, 26);
    camera.lookAt(0, 0, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    // 1. Stylized 3D Elevation Waypoint Path
    const points = [
      new THREE.Vector3(-14, 0, 4),   // Day 1 Arrival & Check-in
      new THREE.Vector3(-5, 4.5, -2),  // Ascent Ridge
      new THREE.Vector3(2, 6.5, -5),   // Day 2 Peak Expedition
      new THREE.Vector3(8, 3.0, 1),    // Valley Descent
      new THREE.Vector3(14, 0.5, 5),   // Day 3 Cultural Immersion & Departure
    ];

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.22, 12, false);
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00aeef,
      emissive: 0x005588,
      emissiveIntensity: 0.8,
      metalness: 0.3,
      roughness: 0.2,
    });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    // 2. Waypoint Spheres / Markers
    const markerPositions = [
      points[0],
      points[2],
      points[4],
    ];

    const markerGeometry = new THREE.SphereGeometry(0.85, 24, 24);
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: 0x39ff14,
      emissive: 0x1f880a,
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });

    const markerGroup = new THREE.Group();
    markerPositions.forEach((pos, idx) => {
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(pos);
      markerGroup.add(marker);

      // Vertical beacon pin
      const pinGeom = new THREE.CylinderGeometry(0.06, 0.06, 2.5);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0x00aeef, transparent: true, opacity: 0.6 });
      const pin = new THREE.Mesh(pinGeom, pinMat);
      pin.position.set(pos.x, pos.y + 1.6, pos.z);
      markerGroup.add(pin);
    });
    scene.add(markerGroup);

    // 3. Flowing Route Pulse Particle
    const pulseGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
    scene.add(pulseMesh);

    // 4. Subtle Base Terrain Grid
    const gridHelper = new THREE.GridHelper(36, 18, 0x0a2b4c, 0x041324);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // Lights
    const ambLight = new THREE.AmbientLight(0x0e2a47, 1.2);
    scene.add(ambLight);
    const dirLight = new THREE.DirectionalLight(0x00aeef, 2.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // Observers & Listeners
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container || !renderer) return;
      const nw = container.clientWidth || 600;
      const nh = container.clientHeight || 240;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Move pulse particle along curve smoothly
        const t = (elapsed * 0.18) % 1;
        const pt = curve.getPoint(t);
        pulseMesh.position.copy(pt);

        // Subtle camera pan
        camera.position.x = Math.sin(elapsed * 0.2) * 2.5;
        camera.lookAt(0, 3, 0);
      } else {
        pulseMesh.position.copy(points[1]);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);

      tubeGeometry.dispose();
      tubeMaterial.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();

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
      className={`relative w-full rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)]/60 my-6 ${className}`}
      style={{ height: '220px' }}
      aria-label={`3D Stylized Trail Map for ${daysCount}-day ${destination} itinerary`}
    >
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="badge" style={{ fontSize: '10px' }}>3D Expedition Elevation Trail</span>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">{destination} · {daysCount} Days</span>
      </div>
      <div className="absolute bottom-3 right-4 z-10 flex items-center gap-3 text-[10px] text-[var(--text-muted)] pointer-events-none">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#39ff14]"></span> Waypoints</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00aeef]"></span> Trail Path</span>
      </div>
    </div>
  );
}
