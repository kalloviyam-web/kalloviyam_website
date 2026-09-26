// src/app/projects/page.js
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import { getOptimizedImageUrl } from "@/utils/cloudinary";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const revalidate = 30;

export const metadata = {
  title: "Projects | Kalloviyam - The Breathable Homes",
  description:
    "Explore our portfolio of sustainable, traditional, and breathable architecture projects crafted by Kalloviyam in Erode and across Tamil Nadu.",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  
  let rawProjects = [];
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });
    
    if (error) {
      // Fallback if display_order column isn't created in Supabase yet
      const fallback = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      rawProjects = fallback.data || [];
    } else {
      rawProjects = data || [];
    }
  } catch (err) {
    const fallback = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    rawProjects = fallback.data || [];
  }

  // Resilient JS sorting ensuring strict display_order placement
  const projects = [...rawProjects].sort((a, b) => {
    const orderA =
      typeof a.display_order === "number" && !isNaN(a.display_order)
        ? a.display_order
        : Infinity;
    const orderB =
      typeof b.display_order === "number" && !isNaN(b.display_order)
        ? b.display_order
        : Infinity;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });

  return (
    <section
      className="
        bg-[#F8F7F4]
        min-h-screen
        pt-[90px]
        sm:pt-[96px]
        md:pt-[102px]
        pb-10
        sm:pb-12
        md:pb-16
      "
    >
      <div
        className="
          w-full
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
        "
      >
        {/* PROJECTS GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-1.5
            sm:gap-2
            lg:gap-2.5
            overflow-hidden
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
                        duration-[1400ms]
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* BASE MINUTE BLACK SHADE (Always subtle for depth & elegance) */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-black/20
                        bg-gradient-to-t
                        from-black/45
                        via-black/15
                        to-black/5
                        pointer-events-none
                        transition-opacity
                        duration-500
                      "
                    />

                    {/* HOVER / ACTIVE DARK OVERLAY (Deepens on hover to make text crystal clear) */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/90
                        via-black/55
                        to-black/10
                        opacity-85
                        lg:opacity-0
                        lg:group-hover:opacity-100
                        transition-all
                        duration-500
                        pointer-events-none
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
                        p-4
                        sm:p-5
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
                          className={`
                            ${cormorant.className}
                            text-white
                            text-[19px]
                            leading-[1.2]
                            font-[500]
                            tracking-[0.6px]
                          `}
                        >
                          {project.project_name}
                        </h2>

                        {/* TAGLINE (if available) */}
                        {project.tagline && (
                          <p
                            className={`
                              ${montserrat.className}
                              text-[#D7B27A]
                              text-[11px]
                              font-medium
                              tracking-[0.2px]
                              mt-1
                              line-clamp-2
                            `}
                          >
                            {project.tagline}
                          </p>
                        )}

                        {/* LOCATION */}
                        {project.project_location && (
                          <p
                            className={`
                              ${montserrat.className}
                              text-white/80
                              uppercase
                              tracking-[2px]
                              text-[9px]
                              font-medium
                              mt-1.5
                            `}
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
                          className={`
                            ${cormorant.className}
                            text-white
                            text-[17px]
                            sm:text-[18px]
                            leading-[1.2]
                            font-[500]
                            tracking-[0.6px]
                          `}
                        >
                          {project.project_name}
                        </h2>

                        {/* TAGLINE (if available) */}
                        {project.tagline && (
                          <p
                            className={`
                              ${montserrat.className}
                              text-[#D7B27A]
                              text-[10.5px]
                              sm:text-[11px]
                              font-medium
                              tracking-[0.2px]
                              mt-1
                              line-clamp-2
                            `}
                          >
                            {project.tagline}
                          </p>
                        )}

                        {/* LOCATION */}
                        {project.project_location && (
                          <p
                            className={`
                              ${montserrat.className}
                              text-white/80
                              uppercase
                              tracking-[1.8px]
                              text-[8.5px]
                              sm:text-[9px]
                              font-medium
                              mt-1
                            `}
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
