"use client";

import { useEffect } from "react";

export default function SecurityProtection() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Disable Right-Click Context Menu
    const handleContextMenu = (e) => {
      const isInput =
        e.target &&
        (e.target.tagName === "INPUT" ||
          e.target.tagName === "TEXTAREA" ||
          e.target.isContentEditable);
      const isAdminPath = window.location.pathname.startsWith("/admin");

      // Allow right-click menu only inside admin text fields for editing
      if (isAdminPath && isInput) return;

      e.preventDefault();
      return false;
    };

    // 2. Disable Developer Tools & Page Source Shortcuts
    const handleKeyDown = (e) => {
      // F12 key
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect Element)
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      // Ctrl+Shift+C / Cmd+Option+C (Inspect Selector)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.shiftKey || e.altKey) &&
        (e.key === "I" ||
          e.key === "i" ||
          e.key === "J" ||
          e.key === "j" ||
          e.key === "C" ||
          e.key === "c" ||
          e.keyCode === 73 ||
          e.keyCode === 74 ||
          e.keyCode === 67)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U / Cmd+U (View Page Source)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "u" || e.key === "U" || e.keyCode === 85)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page as HTML/Image) - disabled on public website
      const isAdminPath = window.location.pathname.startsWith("/admin");
      if (
        !isAdminPath &&
        (e.ctrlKey || e.metaKey) &&
        (e.key === "s" || e.key === "S" || e.keyCode === 83)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Prevent dragging images to desktop or other tabs
    const handleDragStart = (e) => {
      const isAdminPath = window.location.pathname.startsWith("/admin");
      if (isAdminPath) return; // Allow admin drag-and-drop ordering

      if (e.target && e.target.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
