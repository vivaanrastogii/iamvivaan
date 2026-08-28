import React, { useEffect, useRef, useState } from 'react';

const heroImg1 = new URL('../assets/images/hero_balaclava_red_1786093853595.jpg', import.meta.url).href;
const heroImg2 = new URL('../assets/images/hero_balaclava_zoom_1786093875849.jpg', import.meta.url).href;

interface HeroVideoBackgroundProps {
  opacity?: number;
}

export default function HeroVideoBackground({ opacity = 1.0 }: HeroVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const scrollRatioRef = useRef(0);
  const targetScrollRatioRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const img1Ref = useRef<HTMLImageElement | null>(null);
  const img2Ref = useRef<HTMLImageElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload frames for instant scroll responsiveness
  useEffect(() => {
    let loadedCount = 0;

    const img1 = new Image();
    img1.src = heroImg1;
    img1.onload = () => {
      img1Ref.current = img1;
      loadedCount++;
      if (loadedCount === 2) setImagesLoaded(true);
    };

    const img2 = new Image();
    img2.src = heroImg2;
    img2.onload = () => {
      img2Ref.current = img2;
      loadedCount++;
      if (loadedCount === 2) setImagesLoaded(true);
    };
  }, []);

  // Track window scroll progress relative to hero height
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const heroHeight = containerRef.current.parentElement?.clientHeight || window.innerHeight;
      const scrollY = window.scrollY;
      // Smooth progress calculation across scroll
      const progress = Math.min(Math.max(scrollY / (heroHeight * 0.65), 0), 1);
      targetScrollRatioRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Continuous animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      // Smooth lerp scroll progress for ultra-fluid response
      scrollRatioRef.current += (targetScrollRatioRef.current - scrollRatioRef.current) * 0.12;
      const p = scrollRatioRef.current;

      const width = canvas.width;
      const height = canvas.height;

      if (width === 0 || height === 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Clean vibrant red background
      ctx.fillStyle = '#E30613';
      ctx.fillRect(0, 0, width, height);

      // Render image frames with scroll zoom, shift, and crossfade
      if (imagesLoaded && img1Ref.current && img2Ref.current) {
        ctx.save();

        const scale = 1.02 + (p * 0.18); 
        const translateY = p * height * 0.12;
        const translateX = width > 1024 ? width * 0.20 : (width > 640 ? width * 0.14 : 0);

        ctx.translate(width / 2 + translateX, height / 2 + translateY);
        ctx.scale(scale, scale);

        // Aspect fill calculation
        const img = p > 0.5 ? img2Ref.current : img1Ref.current;
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;

        let drawW = width;
        let drawH = height;

        if (canvasRatio > imgRatio) {
          drawH = width / imgRatio;
        } else {
          drawW = height * imgRatio;
        }

        // Crossfade between frame 1 and frame 2
        const alpha1 = Math.max(0, Math.min(1, 1 - p * 2));
        const alpha2 = Math.max(0, Math.min(1, (p - 0.2) * 2));

        if (alpha1 > 0 && img1Ref.current) {
          ctx.globalAlpha = alpha1;
          ctx.drawImage(img1Ref.current, -drawW / 2, -drawH / 2, drawW, drawH);
        }

        if (alpha2 > 0 && img2Ref.current) {
          ctx.globalAlpha = alpha2;
          ctx.drawImage(img2Ref.current, -drawW / 2, -drawH / 2, drawW, drawH);
        }

        ctx.restore();
      }

      // Smooth gradient texture blending at bottom edge to transition into next section (#111111)
      const bottomGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
      bottomGrad.addColorStop(0, 'rgba(17, 17, 17, 0)');
      bottomGrad.addColorStop(0.5, 'rgba(17, 17, 17, 0.6)');
      bottomGrad.addColorStop(1, '#111111');

      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, height * 0.6, width, height * 0.4);

      animFrameRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      style={{ opacity }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover block"
      />
    </div>
  );
}
