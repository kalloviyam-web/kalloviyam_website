"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectImageLightbox({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onNext,
  onPrev,
  projectName = "",
}) {
  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose?.();
      } else if (e.key === "ArrowRight") {
        onNext?.();
      } else if (e.key === "ArrowLeft") {
        onPrev?.();
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-2xl select-none"
          onClick={() => onClose?.()}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Counter & Project Name */}
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wider shadow-sm">
                Photo {currentIndex + 1} / {images.length}
              </span>
              {projectName && (
                <span className="hidden sm:inline-block text-white/70 text-xs sm:text-sm font-serif tracking-wide truncate max-w-xs">
                  {projectName}
                </span>
              )}
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-md"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 border border-white/25 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl backdrop-blur-md pointer-events-auto"
              title="Previous Photo (Left Arrow)"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 border border-white/25 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl backdrop-blur-md pointer-events-auto"
              title="Next Photo (Right Arrow)"
              aria-label="Next Photo"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Main Image with Fast Seamless Dissolve + Touch Swipe */}
          <div
            className="relative w-full h-full flex items-center justify-center px-4 py-16 sm:px-20 sm:py-20 overflow-hidden"
            onClick={() => onClose?.()}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50) onPrev?.();
                  if (info.offset.x < -50) onNext?.();
                }}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing p-4 sm:p-12"
              >
                {currentImage?.imageUrl && (
                  <img
                    src={currentImage.imageUrl}
                    alt={`Photo ${currentIndex + 1}`}
                    draggable={false}
                    className="max-h-[84vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-xl shadow-2xl pointer-events-none select-none"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Bottom Swipe & Counter Hint */}
          <div className="sm:hidden absolute bottom-4 inset-x-0 flex items-center justify-center pointer-events-none z-30">
            <span className="text-white/60 text-[11px] tracking-wider font-light bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
              Swipe left / right or tap arrows
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
