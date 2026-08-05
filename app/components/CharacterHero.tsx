"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const characterFrames = [
  "/assets/portfolio/character-hero/character-motion-2-clean.png",
  "/assets/portfolio/character-hero/character-glasses-chest-v2.png",
  "/assets/portfolio/character-hero/character-motion-4-clean.png",
  "/assets/portfolio/character-hero/character-motion-5-clean.png",
];

const motionPlan = [
  { frame: 0, duration: 5200, state: "arms-crossed" },
  { frame: 1, duration: 150, state: "raising-hand" },
  { frame: 2, duration: 150, state: "touching-glasses" },
  { frame: 3, duration: 680, state: "adjusting-glasses" },
  { frame: 2, duration: 150, state: "releasing-glasses" },
  { frame: 1, duration: 150, state: "lowering-hand" },
  { frame: 0, duration: 2800, state: "arms-crossed" },
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
            priority
            quality={92}
            sizes="(max-width: 700px) 68vw, 460px"
            key={src}
          />
        ))}
      </div>
    </div>
  );
}
