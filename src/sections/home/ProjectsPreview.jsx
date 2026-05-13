//src/sections/home/ProjectsPreview.jsx

import Link from "next/link";

import { getOptimizedImageUrl } from "@/utils/cloudinary";

import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";

export const revalidate = 30;

export default async function ProjectsPreview() {
  const projects = await client.fetch(allProjectsQuery);

  return (
    <section className="pb-24 md:pb-32">
      <div className="container">
        {/* TOP */}
        <div
          className="
            flex
            flex-col
            lg:flex-row

            lg:items-end
            lg:justify-between

            gap-8

            mb-8
            lg:mb-12
          "
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#C8862B]" />

              <p
                className="
                  uppercase
                  tracking-[2px]

                  text-[11px]

                  font-medium

                  text-[#C8862B]
                "
              >
                Our Work
              </p>
            </div>

            <h2
              className="
                text-[38px]
                sm:text-[54px]

                leading-[1.1]

                text-[#2A2A2A]

                font-[300]

                tracking-[1px]
              "
              style={{
                fontFamily: "serif",
              }}
            >
              Our Projects
            </h2>
          </div>

          {/* DESKTOP BUTTON */}
          <Link
            href="/projects"
            className="
              hidden
              lg:inline-flex

              h-[52px]
              px-8

              rounded-[10px]

              bg-[#C8862B]
              hover:bg-[#AA731F]

              font-medium

              items-center
              justify-center

              transition-all
              duration-300
            "
            style={{
              color: "#FFFFFF",
            }}
          >
            View Projects →
          </Link>
        </div>

        {/* PROJECT GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4

            gap-4
            lg:gap-5
          "
        >
          {projects.slice(0, 4).map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="
                group
                relative

                block

                overflow-hidden

                bg-black
              "
            >
              {/* IMAGE */}
              <div
                className="
                  relative

                  aspect-[5/4]

                  overflow-hidden

                  rounded-[4px]
                "
              >
                <img
                  src={getOptimizedImageUrl(
                    project.galleryImages?.[0]?.publicId,
                    1200
                  )}
                  alt={project.projectName}
                  className="
                    w-full
                    h-full

                    object-cover

                    transition-all
                    duration-[1600ms]

                    ease-out

                    group-hover:scale-110
                  "
                />

                {/* DARK OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0

                    bg-black/20

                    group-hover:bg-black/35

                    transition-all
                    duration-700
                  "
                />

                {/* CONTENT */}
                <div
                  className="
                    absolute
                    inset-0

                    flex
                    flex-col
                    justify-end

                    p-5
                    sm:p-6
                  "
                >
                  {/* PROJECT NAME */}
                  <h2
                    className="
                      text-white

                      text-[20px]
                      sm:text-[18px]

                      leading-[1.15]

                      font-[400]

                      tracking-[1px]

                      transition-all
                      duration-700

                      lg:group-hover:-translate-y-5
                    "
                    style={{
                      fontFamily: "serif",
                    }}
                  >
                    {project.projectName}
                  </h2>

                  {/* DESKTOP HOVER DETAILS */}
                  <div
                    className="
                      hidden
                      lg:block

                      absolute
                      left-6
                      bottom-6

                      pointer-events-none

                      overflow-hidden
                    "
                  >
                    <div
                      className="
                        translate-y-6
                        opacity-0

                        group-hover:translate-y-0
                        group-hover:opacity-100

                        transition-all
                        duration-700

                        ease-out
                      "
                    >
                      {/* LOCATION */}
                      <p
                        className="
                          text-[#FFFFFF]

                          uppercase

                          tracking-[3px]

                          text-[10px]

                          font-medium
                        "
                      >
                        {project.projectLocation}
                      </p>
                    </div>
                  </div>

                  {/* MOBILE DETAILS */}
                  <div
                    className="
                      mt-3

                      lg:hidden
                    "
                  >
                    <p
                      className="
                        text-[#FFFFFF]

                        uppercase

                        tracking-[2px]

                        text-[10px]

                        font-medium
                      "
                    >
                      {project.projectLocation}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <div
          className="
            flex
            justify-center

            mt-12

            lg:hidden
          "
        >
          <Link
            href="/projects"
            className="
              h-[52px]
              px-8

              rounded-[10px]

              bg-[#C8862B]

              font-medium

              inline-flex
              items-center
              justify-center
            "
            style={{
              color: "#FFFFFF",
            }}
          >
            View Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}