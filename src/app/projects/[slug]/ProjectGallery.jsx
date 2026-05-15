//src/app/projects/[slug]/ProjectGallery.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { getOptimizedImageUrl } from "@/utils/cloudinary";

export default function ProjectGallery({
  images,
}) {
  const [selectedImage, setSelectedImage] =
    useState(0);

  const scrollRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let animationFrame;
    let scrollAmount = 0;

    const autoScroll = () => {
      scrollAmount += 0.5;

      container.scrollLeft = scrollAmount;

      if (
        scrollAmount >=
        container.scrollWidth / 2
      ) {
        scrollAmount = 0;
      }

      animationFrame =
        requestAnimationFrame(autoScroll);
    };

    animationFrame =
      requestAnimationFrame(autoScroll);

    return () =>
      cancelAnimationFrame(animationFrame);
  }, []);

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current =
      e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current =
      e.changedTouches[0].screenX;

    const swipeDistance =
      touchStartX.current -
      touchEndX.current;

    if (swipeDistance > 50) {
      nextImage();
    }

    if (swipeDistance < -50) {
      prevImage();
    }
  };

  return (
    <section
      className="
        pt-[95px]
        sm:pt-[110px]

        overflow-hidden
      "
    >
      {/* HORIZONTAL CINEMATIC SCROLL */}
      <div
        ref={scrollRef}
        className="
          flex
          gap-4
          sm:gap-5

          overflow-x-auto

          scrollbar-hide

          px-5
          sm:px-8
          lg:px-12
        "
      >
        {[...images, ...images].map(
          (image, index) => (
            <div
              key={index}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="
                relative

                min-w-[85vw]
                sm:min-w-[70vw]
                lg:min-w-[58vw]

                overflow-hidden

                rounded-[28px]

                shadow-[0_18px_70px_rgba(0,0,0,0.08)]
              "
            >
              <img
                src={getOptimizedImageUrl(
                  image.publicId,
                  1600
                )}
                alt="project"
                className="
                  w-full

                  h-[68vh]
                  sm:h-[78vh]
                  lg:h-[90vh]

                  object-cover
                "
              />

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/25
                  via-transparent
                  to-transparent
                "
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}
