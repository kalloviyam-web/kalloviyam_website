//src/app/projects/page.js

import Link from "next/link";
import { MapPin } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { getOptimizedImageUrl } from "@/utils/cloudinary";

export const revalidate = 30;

export default async function ProjectsPage() {
  const projects = await client.fetch(allProjectsQuery);

  return (
    <section
      className="
        bg-[#F5F5F5]
        min-h-screen

        pt-[95px]
        sm:pt-[100px]
        md:pt-[110px]

        pb-16
        md:pb-24
      "
    >
      <div className="container">
        {/* Heading */}
        <div
          className="
            flex
            flex-col
            items-center
            text-center

            mb-8
            md:mb-10
          "
        >
          <h1
            className="
              text-[34px]
              sm:text-[40px]
              md:text-[52px]

              font-semibold

              text-[#9A5C01]

              leading-tight
            "
          >
            Our Projects
          </h1>

          <p
            className="
              mt-4

              text-[13px]
              sm:text-[14px]
              md:text-[15px]

              text-[#E78300]

              max-w-[760px]

              leading-7

              px-4
            "
          >
            Experience a curated selection of the world’s most architectural
            masterpieces.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3

            gap-8
            lg:gap-10

            justify-items-center
          "
        >
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group block w-full max-w-[485px]"
            >
              <article
                className="
                  bg-white

                  rounded-[16px]

                  overflow-hidden

                  border
                  border-[#ECECEC]

                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]

                  transition-all
                  duration-500

                  hover:-translate-y-2
                  hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
                "
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  {/* NEW LISTING Badge */}
                  {project.listingType === "new" && (
                    <div
                      className="
      absolute
      top-5
      right-5
      z-20

      bg-[#D57F00]

      text-white

      px-6
      py-[7px]

      rounded-full

      text-[11px]
      font-medium

      tracking-[0.5px]

      font-['Inter']

      shadow-[0_6px_16px_rgba(0,0,0,0.18)]
    "
                    >
                      NEW LISTING
                    </div>
                  )}
                  {/* Image */}
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

                {/* Content */}
                <div
                  className="
                    px-5
                    pt-3
                    pb-6
                  "
                >
                  {/* Project Name */}
                  <h2
                    className="
                      text-[20px]
                      md:text-[24px]

                      leading-tight

                      text-[#1C1B1B]

                      font-semibold

                      font-['Manrope']
                    "
                  >
                    {project.projectName}
                  </h2>

                  {/* Location */}
                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      mt-2

                      text-[#444748]
                    "
                  >
                    <MapPin size={16} />

                    <p
                      className="
                        text-[16px]

                        font-medium

                        font-['Work_Sans']
                      "
                    >
                      {project.projectLocation}
                    </p>
                  </div>

                  {/* Features */}
                  <div
                    className="
                      flex
                      items-center
                      gap-4
                      flex-wrap

                      mt-3
                    "
                  >
                    {/* BHK */}
                    <div
                      className="
                        flex
                        items-center
                        gap-2

                        px-4
                        py-2

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

                    {/* Sq.ft */}
                    <div
                      className="
                        flex
                        items-center
                        gap-2

                        px-4
                        py-2

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

                  {/* Button */}
                  <button
                    className="
                      w-full

                      mt-6

                      py-2

                      bg-[#DF9C43]

                      text-white

                      text-[15px]
                      font-medium

                      tracking-[1px]

                      uppercase

                      transition-all
                      duration-300

                      hover:bg-[#C9872C]
                    "
                  >
                    View Details
                  </button>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
