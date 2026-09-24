// src/app/projects/page.js

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getOptimizedImageUrl } from "@/utils/cloudinary";

export const revalidate = 30;

export const metadata = {
  title: "Projects | Kalloviyam - The Breathable Homes",
  description:
    "Explore our portfolio of sustainable, traditional, and breathable architecture projects crafted by Kalloviyam in Erode and across Tamil Nadu.",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects = [] } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

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
          {projects && projects.length > 0 ? (
            projects.map((project) => {
              const coverImage =
                project.gallery_images?.[0]?.imageUrl ||
                (project.gallery_images?.[0]?.publicId
                  ? getOptimizedImageUrl(project.gallery_images[0].publicId, 1200)
                  : "/assets/about-home.png");

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
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
                      src={coverImage}
                      alt={project.project_name}
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
                        bg-gradient-to-t
                        from-black/85
                        via-black/40
                        to-transparent
                        lg:from-black/60
                        lg:via-black/30
                        lg:to-transparent
                        opacity-90
                        lg:opacity-0
                        lg:group-hover:opacity-100
                        transition-all
                        duration-500
                      "
                    />

                    {/* CONTENT CONTAINER */}
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
                      {/* DESKTOP & LAPTOP HOVER VIEW (Hidden by default, shown on mouse hover) */}
                      <div
                        className="
                          hidden
                          lg:flex
                          flex-col
                          justify-end
                          opacity-0
                          translate-y-4
                          group-hover:opacity-100
                          group-hover:translate-y-0
                          transition-all
                          duration-500
                          ease-out
                        "
                      >
                        {/* PROJECT NAME */}
                        <h2
                          className="
                            text-white
                            text-[22px]
                            leading-[1.2]
                            font-[400]
                            tracking-[1px]
                          "
                          style={{
                            fontFamily: "serif",
                          }}
                        >
                          {project.project_name}
                        </h2>

                        {/* TAGLINE (if available) */}
                        {project.tagline && (
                          <p className="text-[#D7B27A] text-[12px] font-medium tracking-wide mt-1.5 line-clamp-2">
                            {project.tagline}
                          </p>
                        )}

                        {/* LOCATION */}
                        {project.project_location && (
                          <p
                            className="
                              text-white/75
                              uppercase
                              tracking-[2.5px]
                              text-[10px]
                              font-medium
                              mt-2
                            "
                          >
                            {project.project_location}
                          </p>
                        )}
                      </div>

                      {/* MOBILE & TABLET VIEW (Always Visible) */}
                      <div
                        className="
                          flex
                          lg:hidden
                          flex-col
                          justify-end
                        "
                      >
                        {/* PROJECT NAME */}
                        <h2
                          className="
                            text-white
                            text-[19px]
                            sm:text-[21px]
                            leading-[1.2]
                            font-[400]
                            tracking-[1px]
                          "
                          style={{
                            fontFamily: "serif",
                          }}
                        >
                          {project.project_name}
                        </h2>

                        {/* TAGLINE (if available) */}
                        {project.tagline && (
                          <p className="text-[#D7B27A] text-[11px] sm:text-[12px] font-medium tracking-wide mt-1 line-clamp-2">
                            {project.tagline}
                          </p>
                        )}

                        {/* LOCATION */}
                        {project.project_location && (
                          <p
                            className="
                              text-white/75
                              uppercase
                              tracking-[2px]
                              text-[10px]
                              font-medium
                              mt-1.5
                            "
                          >
                            {project.project_location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 text-[#8C8275]">
              <p className="text-lg font-serif">No projects added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
