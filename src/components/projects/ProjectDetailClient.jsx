"use client";

import { useState } from "react";
import HorizontalScrollContainer from "@/components/projects/HorizontalScrollContainer";
import ProjectImageLightbox from "@/components/projects/ProjectImageLightbox";

export default function ProjectDetailClient({
  project,
  embedUrl,
  fontClassName = "",
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = Array.isArray(project.gallery_images)
    ? project.gallery_images
    : [];

  const heroImage = images[0];
  const descriptionImages = images.slice(1, 4);
  const featureImages = images.slice(4, 6);
  const remainingImages = images.slice(6);

  const openLightbox = (index) => {
    if (index >= 0 && index < images.length) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <HorizontalScrollContainer
        className="
          w-screen
          lg:h-screen
          overflow-y-auto
          lg:overflow-x-auto
          lg:overflow-y-hidden
          scrollbar-hide
          bg-[#F4F0EA]
        "
      >
        <main
          className="
            flex
            flex-col
            lg:flex-row
            lg:flex-nowrap
            w-full
            lg:w-max
            min-h-screen
            bg-[#F4F0EA]
            text-[#111111]
          "
        >
          {/* ================================================= */}
          {/* HERO */}
          {/* ================================================= */}
          <section
            className="
              w-full
              lg:min-w-[1600px]
              h-auto
              lg:h-screen
              pt-[70px]
              lg:pt-[68px]
              flex
              flex-col
              lg:flex-row
            "
          >
            {/* LEFT */}
            <div
              className={`
                ${fontClassName}
                w-full
                lg:w-[40%]
                flex
                flex-col
                justify-start
                pt-12
                lg:pt-20
                px-8
                sm:px-12
                lg:px-20
              `}
            >
              {/* TITLE */}
              <h1
                className="
                  text-[32px]
                  sm:text-[32px]
                  lg:text-[48px]
                  leading-[0.95]
                  tracking-[-0.045em]
                  font-normal
                  text-[#171717]
                  whitespace-nowrap
                "
              >
                {project.project_name}
              </h1>

              {/* TAGLINE */}
              {project.tagline && (
                <p
                  className="
                    text-[15px]
                    sm:text-[17px]
                    lg:text-[19px]
                    font-normal
                    text-[#8C7A6B]
                    tracking-[0.03em]
                    mt-3
                    max-w-[420px]
                  "
                >
                  {project.tagline}
                </p>
              )}

              {/* GOLDEN LINE */}
              <div
                className={`
                  w-[60px]
                  h-[1px]
                  bg-[#B58A52]
                  ${project.tagline ? "mt-6" : "mt-8"}
                  mb-10
                `}
              />

              {/* DETAILS */}
              <div className="space-y-8">
                {/* LOCATION */}
                {project.project_location && (
                  <div className="flex gap-7">
                    <p
                      className="
                        w-[90px]
                        uppercase
                        tracking-[0.32em]
                        text-[12px]
                        text-[#A29A90]
                      "
                    >
                      Location
                    </p>
                    <p
                      className="
                        text-[14px]
                        sm:text-[18px]
                        lg:text-[18px]
                        font-normal
                        text-[#1B1B1B]
                      "
                    >
                      {project.project_location}
                    </p>
                  </div>
                )}

                {/* BHK */}
                {project.bhk && (
                  <div className="flex gap-7">
                    <p
                      className="
                        w-[90px]
                        uppercase
                        tracking-[0.32em]
                        text-[12px]
                        text-[#A29A90]
                      "
                    >
                      BHK
                    </p>
                    <p
                      className="
                        text-[14px]
                        sm:text-[18px]
                        lg:text-[18px]
                        font-normal
                        text-[#1B1B1B]
                      "
                    >
                      {project.bhk}
                    </p>
                  </div>
                )}

                {/* SQFT */}
                {project.sqft && (
                  <div className="flex gap-7">
                    <p
                      className="
                        w-[90px]
                        uppercase
                        tracking-[0.32em]
                        text-[12px]
                        text-[#A29A90]
                      "
                    >
                      Sq.ft
                    </p>
                    <p
                      className="
                        text-[14px]
                        sm:text-[18px]
                        lg:text-[18px]
                        font-normal
                        text-[#1B1B1B]
                      "
                    >
                      {project.sqft}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* HERO IMAGE */}
            <div
              onClick={() => openLightbox(0)}
              className="
                w-full
                lg:w-[60%]
                h-[55vh]
                lg:h-full
                overflow-hidden
                pl-0
                lg:pl-12
                mt-10
                lg:mt-0
                cursor-pointer
                group
              "
            >
              {heroImage?.imageUrl ? (
                <img
                  src={heroImage.imageUrl}
                  alt={project.project_name}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.02]
                  "
                />
              ) : null}
            </div>
          </section>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}
          {descriptionImages.length > 0 || project.description ? (
            <section
              className="
                w-full
                lg:min-w-[2400px]
                h-auto
                lg:h-screen
                pt-0
                lg:pt-[68px]
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-[1fr_1fr_1fr_0.9fr]
              "
            >
              {/* IMAGES */}
              {descriptionImages.map((image, index) => {
                const globalIndex = index + 1; // 1, 2, 3
                return (
                  <div
                    key={index}
                    onClick={() => openLightbox(globalIndex)}
                    className="
                      overflow-hidden
                      h-[55vh]
                      sm:h-[70vh]
                      lg:h-full
                      cursor-pointer
                      group
                    "
                  >
                    <img
                      src={image?.imageUrl}
                      alt={`${project.project_name} gallery ${globalIndex + 1}`}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.03]
                      "
                    />
                  </div>
                );
              })}

              {/* DESCRIPTION */}
              {project.description && (
                <div
                  className="
                    bg-[#F4F0EA]
                    flex
                    items-start
                    justify-center
                    pt-16
                    lg:pt-24
                    px-8
                    lg:px-14
                    pb-14
                  "
                >
                  <p
                    className="
                      text-center
                      text-[16px]
                      lg:text-[21px]
                      leading-[2]
                      font-light
                      max-w-[420px]
                    "
                  >
                    {project.description}
                  </p>
                </div>
              )}
            </section>
          ) : null}

          {/* ================================================= */}
          {/* FEATURES */}
          {/* ================================================= */}
          {featureImages.length > 0 ||
          (project.features && project.features.length > 0) ? (
            <section
              className="
                w-full
                lg:min-w-[2400px]
                h-auto
                lg:h-screen
                pt-0
                lg:pt-[68px]
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-[1fr_1fr_0.9fr]
              "
            >
              {/* FEATURE IMAGES */}
              {featureImages.map((image, index) => {
                const globalIndex = index + 4; // 4, 5
                return (
                  <div
                    key={index}
                    onClick={() => openLightbox(globalIndex)}
                    className="
                      overflow-hidden
                      h-[55vh]
                      sm:h-[70vh]
                      lg:h-full
                      cursor-pointer
                      group
                    "
                  >
                    <img
                      src={image?.imageUrl}
                      alt={`${project.project_name} feature ${index + 1}`}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.03]
                      "
                    />
                  </div>
                );
              })}

              {/* FEATURES */}
              {project.features && project.features.length > 0 && (
                <div
                  className="
                    bg-[#F4F0EA]
                    flex
                    flex-col
                    justify-start
                    pt-16
                    lg:pt-20
                    px-8
                    lg:px-16
                    pb-16
                  "
                >
                  <p
                    className="
                      uppercase
                      tracking-[0.28em]
                      text-[12px]
                      text-[#B58A52]
                      mb-8
                    "
                  >
                    Features
                  </p>

                  <div className="space-y-5">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="
                          border-b
                          border-[#D8D0C5]
                          pb-5
                        "
                      >
                        <p
                          className="
                            text-[16px]
                            lg:text-[19px]
                            leading-[1.9]
                            font-light
                          "
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ) : null}

          {/* ================================================= */}
          {/* REMAINING IMAGES */}
          {/* ================================================= */}
          {remainingImages.map((image, index) => {
            const globalIndex = index + 6; // 6, 7, 8...
            return (
              <section
                key={index}
                className="
                  w-full
                  lg:min-w-[1500px]
                  h-auto
                  lg:h-screen
                  pt-0
                  lg:pt-[68px]
                  bg-[#F4F0EA]
                  overflow-hidden
                  relative
                "
              >
                <div
                  onClick={() => openLightbox(globalIndex)}
                  className="
                    w-full
                    h-auto
                    lg:h-full
                    overflow-hidden
                    cursor-pointer
                    group
                  "
                >
                  <img
                    src={image?.imageUrl}
                    alt={`${project.project_name} gallery ${globalIndex + 1}`}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.02]
                    "
                  />
                </div>
              </section>
            );
          })}

          {/* ================================================= */}
          {/* VIDEO */}
          {/* ================================================= */}
          {embedUrl && (
            <section
              className="
                w-full
                lg:min-w-[1350px]
                h-auto
                lg:h-screen
                pt-12
                lg:pt-[160px]
                bg-[#F4F0EA]
                flex
                items-center
                justify-center
                px-6
                lg:px-16
                pb-16
              "
            >
              <div
                className="
                  relative
                  z-0
                  w-full
                  max-w-[1000px]
                  rounded-[10px]
                  overflow-hidden
                  bg-[#F4F0EA]
                  shadow-[0_10px_35px_rgba(0,0,0,0.05)]
                "
              >
                <div
                  className="
                    relative
                    aspect-video
                    overflow-hidden
                    rounded-[10px]
                    isolate
                  "
                >
                  <iframe
                    src={`${embedUrl}?rel=0&modestbranding=1&playsinline=1`}
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      border-0
                    "
                    allowFullScreen
                  />
                </div>
              </div>
            </section>
          )}
        </main>
      </HorizontalScrollContainer>

      {/* Fullscreen Lightbox Modal */}
      <ProjectImageLightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
        projectName={project.project_name}
      />
    </>
  );
}
