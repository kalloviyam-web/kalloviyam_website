"use client";

import { useEffect, useRef } from "react";

export default function HorizontalScrollContainer({ children, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Convert vertical wheel / touchpad scroll (deltaY) into horizontal scroll on desktop (lg: >= 1024px)
    const handleWheel = (e) => {
      if (typeof window === "undefined" || window.innerWidth < 1024) return;

      if (Math.abs(e.deltaY) > 0) {
        if (e.cancelable) {
          e.preventDefault();
        }
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
