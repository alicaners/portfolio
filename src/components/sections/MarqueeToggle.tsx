"use client";

import { useState } from "react";

type Props = { targetId: string; pauseLabel: string; playLabel: string };

// Şeridi durdurur/oynatır (WCAG 2.2.2). Başlangıç "oynuyor": server ve client aynı HTML'i üretir.
export function MarqueeToggle({ targetId, pauseLabel, playLabel }: Props) {
  const [paused, setPaused] = useState(false);

  function onClick() {
    const next = !paused;
    setPaused(next);
    const el = document.getElementById(targetId);
    if (el) el.toggleAttribute("data-paused", next);
  }

  return (
    <button
      type="button"
      className="marquee-toggle"
      aria-controls={targetId}
      onClick={onClick}
    >
      {paused ? playLabel : pauseLabel}
    </button>
  );
}
