"use client";

import { useEffect, useRef } from "react";

// Thin bar under the header showing how far through the page you are.
// Writes the transform directly (no React state) so scrolling never re-renders.
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-x-0 -bottom-px h-0.5">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand/70 to-brand" />
    </div>
  );
}
