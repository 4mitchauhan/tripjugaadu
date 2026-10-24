'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 150;
const LERP_FACTOR = 0.14;
const INITIAL_PRIORITY_FRAMES = 12;
const MAX_CACHED_FRAMES = 35;
const NEARBY_WINDOW = 6;
const KEYFRAME_STRIDE = 10;

export default function CinematicHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingFramesRef = useRef<Map<number, Promise<HTMLImageElement | null>>>(new Map());
  const failedFramesRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef<boolean>(false);
  const isComponentMountedRef = useRef<boolean>(true);
  const isVisibleRef = useRef<boolean>(true);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState<boolean>(false);

  const getFramePath = useCallback((index: number) => {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `/frames/frame_${frameNumber}.jpg`;
  }, []);

  const evictOldFrames = useCallback((activeFrame: number) => {
    const cache = imagesCacheRef.current;
    if (cache.size <= MAX_CACHED_FRAMES) return;

    // Collect candidates to evict (never evict frame 0, or frame 149, or frames within nearby window)
    const candidates: { index: number; dist: number }[] = [];
    cache.forEach((_, idx) => {
      if (idx === 0 || idx === TOTAL_FRAMES - 1) return;
      const dist = Math.abs(idx - activeFrame);
      if (dist > NEARBY_WINDOW) {
        candidates.push({ index: idx, dist });
      }
    });

    // Sort by furthest distance descending
    candidates.sort((a, b) => b.dist - a.dist);

    const toRemove = cache.size - MAX_CACHED_FRAMES;
    for (let i = 0; i < Math.min(toRemove, candidates.length); i++) {
      const idxToRemove = candidates[i].index;
      const img = cache.get(idxToRemove);
      if (img) {
        img.onload = null;
        img.onerror = null;
        img.src = ''; // Release decoded image memory in browser
      }
      cache.delete(idxToRemove);
    }
  }, []);

  const getClosestLoadedFrame = useCallback((index: number): { index: number; image: HTMLImageElement } | null => {
    const cache = imagesCacheRef.current;
    if (cache.has(index)) {
      const img = cache.get(index)!;
      if (img.complete && (img.naturalWidth > 0 || img.width > 0)) {
        return { index, image: img };
      }
    }

    let minDiff = Infinity;
    let closestIndex = -1;
    let closestImg: HTMLImageElement | null = null;

    cache.forEach((img, frameIdx) => {
      if (img.complete && (img.naturalWidth > 0 || img.width > 0)) {
        const diff = Math.abs(frameIdx - index);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = frameIdx;
          closestImg = img;
        }
      }
    });

    return closestImg ? { index: closestIndex, image: closestImg } : null;
  }, []);

  const drawFrame = useCallback((frameIndex: number): number | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return null;

    const loadedFrame = getClosestLoadedFrame(frameIndex);
    if (!loadedFrame) return null;

    const img = loadedFrame.image;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imageWidth = img.naturalWidth || img.width;
    const imageHeight = img.naturalHeight || img.height;

    if (!imageWidth || !imageHeight) return null;

    const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    return loadedFrame.index;
  }, [getClosestLoadedFrame]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const targetWidth = Math.floor(displayWidth * dpr);
    const targetHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      lastDrawnFrameRef.current = -1;
      const drawnFrame = drawFrame(Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current))));
      if (drawnFrame !== null) {
        lastDrawnFrameRef.current = drawnFrame;
      }
    }
  }, [drawFrame]);

  const updateScrollProgress = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvas?.closest<HTMLElement>('.hero-scroll-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = container.offsetHeight - window.innerHeight;

    if (scrollableDistance <= 0) {
      targetFrameRef.current = 0;
      return;
    }

    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    
    // Normalize progress 0..1 to index 0..149 (frame_001 to frame_150)
    targetFrameRef.current = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1))),
    );

    // Fluid hero text & search panel fadeout:
    // Fades smoothly over the first 25% of scroll distance giving instant visual feedback
    const heroContent = container.querySelector<HTMLElement>('.hero__content');
    const heroSearch = container.querySelector<HTMLElement>('.hero__search');
    const readabilityLayer = container.querySelector<HTMLElement>('.hero__readability-layer');

    const fadeFactor = Math.min(1, progress * 4.0);
    const contentOpacity = Math.max(0, 1 - fadeFactor);
    const contentTranslateY = fadeFactor * -50;
    const searchTranslateY = fadeFactor * 30;

    if (heroContent) {
      heroContent.style.opacity = contentOpacity.toFixed(3);
      heroContent.style.transform = `translate3d(0, ${contentTranslateY.toFixed(1)}px, 0)`;
      heroContent.style.pointerEvents = contentOpacity < 0.05 ? 'none' : 'auto';
      heroContent.style.transition = 'opacity 0.08s ease-out, transform 0.08s ease-out';
    }

    const searchElements = container.querySelectorAll<HTMLElement>('.hero__search, .search-panel');
    searchElements.forEach((el) => {
      el.style.opacity = contentOpacity.toFixed(3);
      el.style.transform = `translate3d(0, ${searchTranslateY.toFixed(1)}px, 0)`;
      el.style.pointerEvents = contentOpacity < 0.05 ? 'none' : 'auto';
      el.style.transition = 'opacity 0.08s ease-out, transform 0.08s ease-out';
    });

    if (readabilityLayer) {
      const vignetteOpacity = Math.max(0, 1 - progress * 2.5);
      readabilityLayer.style.opacity = vignetteOpacity.toFixed(3);
      readabilityLayer.style.transition = 'opacity 0.1s ease-out';
    }
  }, []);

  const loadFrame = useCallback((index: number): Promise<HTMLImageElement | null> => {
    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    const cached = imagesCacheRef.current.get(clampedIndex);
    if (cached) return Promise.resolve(cached);

    const inFlight = loadingFramesRef.current.get(clampedIndex);
    if (inFlight) return inFlight;

    const promise = new Promise<HTMLImageElement | null>((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = getFramePath(clampedIndex);

      img.onload = async () => {
        if (typeof img.decode === 'function') {
          try {
            await img.decode();
          } catch {
            // Already loaded, keep as usable
          }
        }

        if (isComponentMountedRef.current) {
          imagesCacheRef.current.set(clampedIndex, img);
          failedFramesRef.current.delete(clampedIndex);
          evictOldFrames(Math.round(currentFrameRef.current));

          const activeFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));
          if (activeFrame === clampedIndex || targetFrameRef.current === clampedIndex) {
            const drawnFrame = drawFrame(clampedIndex);
            if (drawnFrame !== null) {
              lastDrawnFrameRef.current = drawnFrame;
            }
          }
        }

        loadingFramesRef.current.delete(clampedIndex);
        resolve(img);
      };

      img.onerror = () => {
        failedFramesRef.current.add(clampedIndex);
        loadingFramesRef.current.delete(clampedIndex);
        resolve(null);
      };
    });

    loadingFramesRef.current.set(clampedIndex, promise);
    return promise;
  }, [drawFrame, evictOldFrames, getFramePath]);

  useEffect(() => {
    isComponentMountedRef.current = true;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Viewport intersection observer to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Visibility change handler (tab switch)
    const handleVisibility = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
      } else {
        isVisibleRef.current = true;
        updateScrollProgress();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    updateScrollProgress();

    // 1. Immediately preload and draw frame 0 (frame_001.jpg)
    loadFrame(0).then((img) => {
      if (img && isComponentMountedRef.current) {
        setIsFirstFrameLoaded(true);
        const drawnFrame = drawFrame(0);
        if (drawnFrame !== null) {
          lastDrawnFrameRef.current = drawnFrame;
        }
      }
    });

    // 2. Progressive background preload strategy
    const startProgressivePreload = async () => {
      // Step A: Priority start window (first 12 frames)
      const initial = Array.from({ length: INITIAL_PRIORITY_FRAMES }, (_, idx) => idx);
      await Promise.all(initial.map((idx) => loadFrame(idx)));

      if (!isComponentMountedRef.current) return;

      // Step B: Keyframe stride (every 10th frame: 10, 20, 30 ... 149)
      const keyframes: number[] = [];
      for (let k = KEYFRAME_STRIDE; k < TOTAL_FRAMES; k += KEYFRAME_STRIDE) {
        keyframes.push(k);
      }
      keyframes.push(TOTAL_FRAMES - 1); // ensure frame 149 is in keyframes
      await Promise.all(keyframes.map((idx) => loadFrame(idx)));

      if (!isComponentMountedRef.current) return;

      // Step C: Progressive filling in chunks of 8 frames
      for (let start = 0; start < TOTAL_FRAMES; start += 8) {
        if (!isComponentMountedRef.current) return;
        const chunk = Array.from(
          { length: Math.min(8, TOTAL_FRAMES - start) },
          (_, offset) => start + offset
        );
        await Promise.all(chunk.map((idx) => loadFrame(idx)));
      }
    };

    // Always start progressive preload so assets are ready on scroll
    startProgressivePreload();

    // 3. Render loop with lerp and visibility pausing
    const renderLoop = () => {
      if (!isComponentMountedRef.current) return;

      if (!isVisibleRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      // When reduced motion is requested, snap directly to target frame without momentum lerp
      if (prefersReducedMotionRef.current) {
        currentFrameRef.current = target;
      } else {
        const diff = target - current;
        if (Math.abs(diff) < 0.005) {
          currentFrameRef.current = target;
        } else {
          currentFrameRef.current = current + diff * LERP_FACTOR;
        }
      }

      const frameToDraw = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));

      // Request nearby frames around current scroll target
      for (let offset = -2; offset <= 2; offset++) {
        const neighbor = frameToDraw + offset;
        if (neighbor >= 0 && neighbor < TOTAL_FRAMES) {
          if (!imagesCacheRef.current.has(neighbor) && !failedFramesRef.current.has(neighbor)) {
            loadFrame(neighbor);
          }
        }
      }

      const drawnFrame = drawFrame(frameToDraw);
      if (drawnFrame !== null) {
        lastDrawnFrameRef.current = drawnFrame;
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isComponentMountedRef.current = false;
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateScrollProgress);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      imagesCacheRef.current.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
      imagesCacheRef.current.clear();
      loadingFramesRef.current.clear();
      failedFramesRef.current.clear();
    };
  }, [drawFrame, handleResize, loadFrame, updateScrollProgress]);

  return (
    <div
      ref={containerRef}
      className="cinematic-hero-canvas"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`cinematic-hero-canvas__surface ${
          isFirstFrameLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
