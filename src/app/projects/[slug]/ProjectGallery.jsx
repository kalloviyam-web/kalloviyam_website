//src/app/projects/[slug]/ProjectGallery.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { getOptimizedImageUrl } from "@/utils/cloudinary";

export default function ProjectGallery({
  images,
  projectName,
}) {

  const [selectedImage, setSelectedImage] = useState(0);

  const [openGallery, setOpenGallery] = useState(false);
  useEffect(() => {
  if (openGallery) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [openGallery]);

  const touchStartX = useRef(0);
const touchEndX = useRef(0);
  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === (images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? (images?.length || 1) - 1 : prev - 1
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

  // swipe left → next image
  if (swipeDistance > 50) {
    nextImage();
  }

  // swipe right → previous image
  if (swipeDistance < -50) {
    prevImage();
  }
};

  return (
    <section className="w-full pt-[120px]">

      <div className="max-w-7xl mx-auto px-5">

        {/* MAIN IMAGE */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[10px]

            bg-black

            shadow-[0_15px_50px_rgba(0,0,0,0.12)]
          "
        >

          <img
          loading="lazy"
            src={getOptimizedImageUrl(
  images?.[selectedImage]?.publicId,
  1600
)}
            alt={projectName}
            onClick={() => {
  if (images?.[selectedImage]?.asset?.url) {
    setOpenGallery(true);
  }
}}
            className="
              w-full

              h-[280px]
              sm:h-[420px]
              lg:h-[620px]

              object-cover

              cursor-zoom-in

              transition-all
              duration-500
            "
          />

          {/* LEFT BUTTON */}
          <button
            onClick={prevImage}
            className="
  absolute
  left-4
  top-1/2
  -translate-y-1/2

  w-5
h-14

sm:w-6
sm:h-20

lg:w-8
lg:h-24

  rounded-[5px]

  bg-black/45
  backdrop-blur-xl

  text-white

  text-2xl
  sm:text-3xl
  lg:text-4xl

  flex
  items-center
  justify-center

  hover:bg-black/65

  transition-all
  duration-300

  z-20
"
          >
            ‹
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextImage}
            className="
  absolute
  right-4
  top-1/2
  -translate-y-1/2

  w-5
h-14

sm:w-6
sm:h-20

lg:w-8
lg:h-24

  rounded-[5px]

  bg-black/45
  backdrop-blur-xl

  text-white

  text-2xl
  sm:text-3xl
  lg:text-4xl

  flex
  items-center
  justify-center

  hover:bg-black/65

  transition-all
  duration-300

  z-20
"
          >
            ›
          </button>

        </div>


        {/* THUMBNAILS */}
        <div
          className="
            flex
            items-center

            gap-3 sm:gap-4

            mt-7

            overflow-x-auto

            scrollbar-hide

            pb-2
          "
        >

          {images?.map((image, index) => (

            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`
                relative

                min-w-[82px]
w-[82px]

h-[82px]

sm:min-w-[100px]
sm:w-[100px]
sm:h-[100px]

lg:min-w-[120px]
lg:w-[120px]
lg:h-[120px]

                rounded-[10px]

                overflow-hidden

                border-[3px]

                transition-all
                duration-300

                ${
                  selectedImage === index
                    ? "border-[#DF9C43] scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }
              `}
            >

              <img
                src={getOptimizedImageUrl(
  image.publicId,
  500
)}
                alt={projectName}
                className="
                  w-full
                  h-full

                  object-cover
                "
              />

            </button>

          ))}

        </div>

      </div>


      {/* FULLSCREEN GALLERY */}
      {openGallery && (

        <div
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
  className="
    fixed
            inset-0

            bg-black/95

            z-[9999]

            flex
            items-center
            justify-center
          "
        >

          {/* CLOSE */}
          <button
            onClick={() => setOpenGallery(false)}
            className="
              absolute
              top-6
              right-6

              text-white
              text-5xl

              z-50
            "
          >
            ×
          </button>

          {/* LEFT */}
          <button
            onClick={prevImage}
            className="
  absolute
  left-4 sm:left-6 lg:left-8
  top-1/2
  -translate-y-1/2

  w-8
  h-14

  rounded-[6px]

  bg-black/40
  backdrop-blur-md

  sm:w-auto
  sm:h-auto

  sm:bg-transparent

  text-white
  text-4xl
  sm:text-5xl
  lg:text-6xl

  flex
  items-center
  justify-center

  z-50
"
          >
            ‹
          </button>
          {/* IMAGE */}
<div>

  <img
  loading="lazy"
    src={getOptimizedImageUrl(
  images?.[selectedImage]?.publicId,
  2000
)}
    alt={projectName}
    className="
      max-w-[92vw]
max-h-[92vh]

    object-contain

    rounded-none

    select-none
    "
  />

</div>

          {/* RIGHT */}
          <button
            onClick={nextImage}
            className="
  absolute
  right-4 sm:right-6 lg:right-8
  top-1/2
  -translate-y-1/2

  w-8
  h-14

  rounded-[6px]

  bg-black/40
  backdrop-blur-md

  sm:w-auto
  sm:h-auto

  sm:bg-transparent

  text-white
  text-4xl
  sm:text-5xl
  lg:text-6xl

  flex
  items-center
  justify-center

  z-50
"
          >
            ›
          </button>

        </div>

      )}

    </section>
  );
}