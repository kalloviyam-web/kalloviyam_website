//src/app/projects/page.js

import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { getOptimizedImageUrl } from "@/utils/cloudinary";

export const revalidate = 30;

export default async function ProjectsPage() {
  const projects = await client.fetch(allProjectsQuery);

  return (
    <section
      className="
        bg-[#F8F7F4]

        min-h-screen

        pt-[95px]
        sm:pt-[100px]
        md:pt-[110px]

        pb-10
        md:pb-16
      "
    >
      <div
        className="
    w-full

    px-5
    sm:px-5
    lg:px-10
  "
      >
        {/* PROJECTS GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4

            gap-3
            sm:gap-4
            lg:gap-4

            overflow-hidden

            mt-2
            sm:mt-4
          "
        >
          {projects.map((project) => (
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
                "
              >
                <img
                  src={getOptimizedImageUrl(
                    project.galleryImages?.[0]?.publicId,
                    1200,
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

                    bg-black/35

                    group-hover:bg-black/45

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
                      sm:text-[21px]

                      leading-[1.15]

                      font-[400]

                      tracking-[1px]

                      transition-all
                      duration-700

                      lg:group-hover:-translate-y-6
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
        text-white/75

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
                        text-white/75

                        uppercase

                        tracking-[2px]

                        text-[10px]

                        font-medium

                        mb-2
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
      </div>
    </section>
  );
}
