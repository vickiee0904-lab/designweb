"use client";

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  age: number;
  strength: number;
};

export default function FooterParticles({ pauseWhenHidden = false }: { pauseWhenHidden?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !footer || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, energy: 0, targetEnergy: 0 };
    const ripples: Ripple[] = [];
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let previousTime = performance.now();
    let lastRippleTime = 0;
    let isVisible = true;

    const resize = () => {
      const rect = footer.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (pointer.x === 0 && pointer.y === 0) {
        pointer.x = pointer.targetX = width * 0.5;
        pointer.y = pointer.targetY = height * 0.58;
      }
    };

    const addRipple = (x: number, y: number, strength = 1) => {
      ripples.push({ x, y, age: 0, strength });
      if (ripples.length > 6) ripples.shift();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = footer.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      pointer.targetEnergy = 1;

      const now = performance.now();
      if (now - lastRippleTime > 150) {
        addRipple(pointer.targetX, pointer.targetY, 0.72);
        lastRippleTime = now;
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const rect = footer.getBoundingClientRect();
      addRipple(event.clientX - rect.left, event.clientY - rect.top, 1.25);
    };

    const handlePointerLeave = () => {
      pointer.targetEnergy = 0;
      pointer.targetX = width * 0.5;
      pointer.targetY = height * 0.58;
    };

    const draw = (now: number) => {
      const deltaTime = Math.min((now - previousTime) / 1000, 0.04);
      previousTime = now;
      const time = reduceMotion.matches ? 0 : now / 1000;

      pointer.x += (pointer.targetX - pointer.x) * 0.1;
      pointer.y += (pointer.targetY - pointer.y) * 0.1;
      pointer.energy += (pointer.targetEnergy - pointer.energy) * 0.07;

      context.clearRect(0, 0, width, height);
      const ambient = context.createRadialGradient(
        width * 0.5,
        height * 0.58,
        0,
        width * 0.5,
        height * 0.58,
        width * 0.62,
      );
      ambient.addColorStop(0, "rgba(52, 78, 162, 0.16)");
      ambient.addColorStop(0.48, "rgba(31, 43, 108, 0.08)");
      ambient.addColorStop(1, "rgba(2, 8, 24, 0)");
      context.fillStyle = ambient;
      context.fillRect(0, 0, width, height);

      if (!reduceMotion.matches) {
        for (let index = ripples.length - 1; index >= 0; index -= 1) {
          ripples[index].age += deltaTime;
          if (ripples[index].age > 2.25) ripples.splice(index, 1);
        }
      }

      const spacing = width < 680 ? 22 : 18;
      const columns = Math.ceil(width / spacing) + 2;
      const rows = width < 680 ? 10 : 13;
      context.globalCompositeOperation = "lighter";

      for (let row = 0; row < rows; row += 1) {
        const depth = row / Math.max(1, rows - 1);
        for (let column = -1; column < columns; column += 1) {
          const baseX = column * spacing + (row % 2) * spacing * 0.5;
          const baseY = height * (0.34 + depth * 0.42);
          const broadWave = Math.sin(baseX * 0.009 - time * 0.62 + row * 0.34) * (13 + depth * 8);
          const fineWave = Math.sin(baseX * 0.021 + time * 0.42 + row * 0.71) * 5;
          let x = baseX;
          let y = baseY + broadWave + fineWave;
          let rippleGlow = 0;

          for (const ripple of ripples) {
            const dx = x - ripple.x;
            const dy = y - ripple.y;
            const distance = Math.max(1, Math.hypot(dx, dy));
            const radius = ripple.age * 118;
            const life = Math.max(0, 1 - ripple.age / 2.25);
            const ring = Math.exp(-Math.pow((distance - radius) / 24, 2)) * life * ripple.strength;
            x += (dx / distance) * ring * 10;
            y += (dy / distance) * ring * 10;
            rippleGlow += ring;
          }

          const pointerDistance = Math.hypot(x - pointer.x, y - pointer.y);
          const pointerField = Math.exp(-Math.pow(pointerDistance / 118, 2)) * pointer.energy;
          y += Math.sin(pointerDistance * 0.075 - time * 3.1) * pointerField * 5;

          const edgeFade = Math.min(1, x / 80, (width - x) / 80);
          const verticalFade = Math.sin(depth * Math.PI);
          const alpha = Math.max(0, edgeFade) * (0.14 + verticalFade * 0.28) + rippleGlow * 0.16;
          const sizeNoise = (Math.sin(column * 19.13 + row * 7.71) + 1) * 0.28;
          const radius = 0.72 + sizeNoise + pointerField * 0.55 + rippleGlow * 0.34;
          const blue = Math.round(218 + depth * 26);

          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(${146 + Math.round(pointerField * 50)}, ${182 + Math.round(pointerField * 35)}, ${blue}, ${Math.min(0.8, alpha)})`;
          context.fill();
        }
      }

      for (const ripple of ripples) {
        const radius = ripple.age * 118;
        const life = Math.max(0, 1 - ripple.age / 2.25);
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(167, 201, 255, ${life * ripple.strength * 0.12})`;
        context.lineWidth = 1;
        context.stroke();
      }

      context.globalCompositeOperation = "source-over";
      if (!reduceMotion.matches && (!pauseWhenHidden || isVisible)) frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(footer);
    const visibilityObserver = pauseWhenHidden
      ? new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !reduceMotion.matches) {
            cancelAnimationFrame(frame);
            previousTime = performance.now();
            frame = requestAnimationFrame(draw);
          } else {
            cancelAnimationFrame(frame);
          }
        }, { rootMargin: "160px" })
      : null;
    visibilityObserver?.observe(footer);
    footer.addEventListener("pointermove", handlePointerMove);
    footer.addEventListener("pointerdown", handlePointerDown);
    footer.addEventListener("pointerleave", handlePointerLeave);

    const handleMotionPreference = () => {
      cancelAnimationFrame(frame);
      previousTime = performance.now();
      draw(previousTime);
    };
    reduceMotion.addEventListener("change", handleMotionPreference);

    resize();
    draw(previousTime);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver?.disconnect();
      footer.removeEventListener("pointermove", handlePointerMove);
      footer.removeEventListener("pointerdown", handlePointerDown);
      footer.removeEventListener("pointerleave", handlePointerLeave);
      reduceMotion.removeEventListener("change", handleMotionPreference);
    };
  }, [pauseWhenHidden]);

  return <canvas ref={canvasRef} className="footer-particles" aria-hidden="true" />;
}
