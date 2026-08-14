"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { sitePath } from "../lib/site-path";

const characterFrames = [
  sitePath("/assets/portfolio/character-hero/metro-pulse-laptop/frame-01.webp"),
  sitePath("/assets/portfolio/character-hero/metro-pulse-laptop/frame-02.webp"),
  sitePath("/assets/portfolio/character-hero/metro-pulse-laptop/frame-03.webp"),
  sitePath("/assets/portfolio/character-hero/metro-pulse-laptop/frame-04.webp"),
];

const motionPlan = [
  { frame: 0, duration: 3400, state: "laptop-closed" },
  { frame: 1, duration: 190, state: "laptop-opening" },
  { frame: 2, duration: 190, state: "laptop-opening" },
  { frame: 3, duration: 2800, state: "laptop-working" },
  { frame: 2, duration: 190, state: "laptop-closing" },
  { frame: 1, duration: 190, state: "laptop-closing" },
  { frame: 0, duration: 1800, state: "laptop-closed" },
] as const;

export default function CharacterHero() {
  const [motionIndex, setMotionIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) return;

    const currentMotion = motionPlan[motionIndex] ?? motionPlan[0];
    const timer = window.setTimeout(() => {
      setMotionIndex((current) => (current + 1) % motionPlan.length);
    }, currentMotion.duration);

    return () => window.clearTimeout(timer);
  }, [motionIndex]);

  const currentMotion = motionPlan[motionIndex] ?? motionPlan[0];

  return (
    <div
      className="character-stage"
      data-character-state={currentMotion.state}
      aria-hidden="true"
    >
      <div className="character-portrait">
        {characterFrames.map((src, index) => (
          <Image
            className={`character-frame ${currentMotion.frame === index ? "is-active" : ""}`}
            src={src}
            alt=""
            fill
            priority={index === 0}
            quality={90}
            sizes="(max-width: 700px) 68vw, 460px"
            key={src}
          />
        ))}
      </div>
    </div>
  );
}
