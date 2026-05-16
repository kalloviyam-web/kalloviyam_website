"use client";

import { useEffect } from "react";

export default function DesktopModeDetector() {
  useEffect(() => {
    const checkDesktopMode = () => {
      const ua = navigator.userAgent;

      /*
        Mobile browser desktop mode:
        width still small
        but browser removes "Mobile"
      */

      const isDesktopMode =
        !/Mobile|Android|iPhone|iPad/i.test(ua) &&
        window.innerWidth < 1024;

      if (isDesktopMode) {
        document.documentElement.classList.add(
          "force-desktop"
        );
      } else {
        document.documentElement.classList.remove(
          "force-desktop"
        );
      }
    };

    checkDesktopMode();

    window.addEventListener(
      "resize",
      checkDesktopMode
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkDesktopMode
      );
    };
  }, []);

  return null;
}