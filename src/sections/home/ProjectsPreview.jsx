//src/sections/home/ProjectsPreview.jsx
import Link from "next/link";

import { getOptimizedImageUrl } from "@/utils/cloudinary";

import { MapPin } from "lucide-react";

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
lg:mb-14
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
                  font-semibold
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

                leading-[1.2]

                text-[#1F1F1F]

                mb-4
              "
            >
              Our{" "}

              <span className="italic text-[#C8862B]">
                Projects
              </span>
            </h2>

            <p
              className="
                text-[#666]

                max-w-[620px]

                leading-[1.9]
              "
            >
              Explore our portfolio of sustainable mud block homes across Tamil Nadu.
            </p>

          </div>

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
  View More Projects →
</Link>

        </div>

        {/* PROJECT GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3

            gap-8
          "
        >

          {projects.slice(0, 3).map((project) => (

            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group"
            >

              <article
                className="
                  bg-white

                  rounded-[18px]

                  overflow-hidden

                  border
                  border-[#ECECEC]

                  shadow-[0_8px_28px_rgba(0,0,0,0.06)]

                  hover:-translate-y-2
                  hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]

                  transition-all
                  duration-500
                "
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">

                  {project.listingType === "new" && (

                    <div
                      className="
                        absolute
                        top-5
                        right-5
                        z-20

                        bg-[#D57F00]

                        text-white

                        px-5
                        py-[6px]

                        rounded-full

                        text-[11px]
                        tracking-[1px]
                      "
                    >
                      NEW LISTING
                    </div>

                  )}

                  <img
                    src={getOptimizedImageUrl(
  project.galleryImages?.[0]?.publicId,
  900
)}
                    alt={project.projectName}
                    className="
                      w-full
                      h-[340px]

                      object-cover

                      transition-transform
                      duration-700

                      group-hover:scale-105
                    "
                  />

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h3
                    className="
                      text-[20px]

                      font-semibold

                      text-[#222]

                      leading-[1.4]

                      mb-3
                    "
                  >
                    {project.projectName}
                  </h3>

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-[#555]

                      mb-5
                    "
                  >

                    <MapPin size={16} />

                    <p>{project.projectLocation}</p>

                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-4

                      mb-6
                    "
                  >

                    <div
                      className="
                        px-4
                        py-2

                        rounded-full

                        bg-white

                        rounded-full

                        shadow-[0_2px_10px_rgba(0,0,0,0.10)]

                        text-[#565656]

                        text-[14px]
                        font-medium
                      "
                    >
                      🏠 {project.bhk}
                    </div>

                    <div
                      className="
                        px-4
                        py-2

                        rounded-full

                        bg-white

                        rounded-full

                        shadow-[0_2px_10px_rgba(0,0,0,0.10)]

                        text-[#565656]

                        text-[14px]
                        font-medium
                      "
                    >
                      📐 {project.sqft}
                    </div>

                  </div>

                  <button
                    className="
                      w-full
                      h-[50px]

                      bg-[#D9963A]
                      hover:bg-[#BC812F]

                      text-white
                      font-medium

                      transition-all
                      duration-300
                    "
                  >
                    VIEW DETAILS
                  </button>

                </div>

              </article>

            </Link>

          ))}

        </div>
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
    View More Projects →
  </Link>

</div>

      </div>

    </section>
  );
}