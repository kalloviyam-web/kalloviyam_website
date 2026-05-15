// src/app/projects/[slug]/page.js

import { client } from "@/sanity/lib/client";
import { singleProjectQuery } from "@/sanity/lib/queries";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

function getYoutubeEmbedUrl(url) {
  if (!url) return "";

  if (url.includes("youtu.be")) {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  return url;
}

export default async function ProjectDetailsPage({
  params,
}) {
  const { slug } = await params;

  const project = await client.fetch(
    singleProjectQuery,
    { slug }
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F0EA]">
        Project not found
      </div>
    );
  }

  const embedUrl =
    project.videoUrl &&
    getYoutubeEmbedUrl(project.videoUrl);

  const heroImage =
    project.galleryImages?.[0];

  const descriptionImages =
    project.galleryImages?.slice(1, 4);

  const featureImages =
    project.galleryImages?.slice(4, 6);

  const remainingImages =
    project.galleryImages?.slice(6);

  return (
    <div
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
              ${cormorant.className}

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
              {project.projectName}
            </h1>

            {/* GOLDEN LINE */}

            <div
              className="
                w-[60px]
                h-[1px]

                bg-[#B58A52]

                mt-8
                mb-10
              "
            />

            {/* DETAILS */}

            <div className="space-y-8">
              {/* LOCATION */}

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
                  {project.projectLocation}
                </p>
              </div>

              {/* BHK */}

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

              {/* SQFT */}

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
            </div>
          </div>

          {/* HERO IMAGE */}

          <div
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
            "
          >
            <img
              src={heroImage?.imageUrl}
              alt={project.projectName}
              className="
                w-full
                h-full

                object-cover
              "
            />
          </div>
        </section>

        {/* ================================================= */}
        {/* DESCRIPTION */}
        {/* ================================================= */}

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

          {descriptionImages?.map(
            (image, index) => (
              <div
                key={index}
                className="
                  overflow-hidden

                  h-[55vh]
                  sm:h-[70vh]
                  lg:h-full
                "
              >
                <img
                  src={image?.imageUrl}
                  alt=""
                  className="
                    w-full
                    h-full

                    object-cover
                  "
                />
              </div>
            )
          )}

          {/* DESCRIPTION */}

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
        </section>

        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

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

          {featureImages?.map(
            (image, index) => (
              <div
                key={index}
                className="
                  overflow-hidden

                  h-[55vh]
                  sm:h-[70vh]
                  lg:h-full
                "
              >
                <img
                  src={image?.imageUrl}
                  alt=""
                  className="
                    w-full
                    h-full

                    object-cover
                  "
                />
              </div>
            )
          )}

          {/* FEATURES */}

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
              {project.features?.map(
                (feature, index) => (
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
                )
              )}
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* REMAINING IMAGES */}
        {/* ================================================= */}

        {remainingImages?.map(
          (image, index) => (
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
              "
            >
              <div
                className="
                  w-full

                  h-auto
                  lg:h-full

                  overflow-hidden
                "
              >
                <img
                  src={image?.imageUrl}
                  alt=""
                  className="
                    w-full
                    h-full

                    object-cover
                  "
                />
              </div>
            </section>
          )
        )}

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
              lg:pt-[68px]

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
                w-full

                max-w-[1200px]

                rounded-[10px]

                overflow-hidden

                bg-[#F4F0EA]

                shadow-[0_10px_35px_rgba(0,0,0,0.05)]
              "
            >
              <div className="aspect-video">
                <iframe
                  src={embedUrl}
                  title={project.projectName}
                  allowFullScreen
                  className="
                    w-full
                    h-full
                  "
                />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}