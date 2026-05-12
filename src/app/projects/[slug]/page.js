//src/app/projects/[slug]/page.js
import { client } from "@/sanity/lib/client";
import { singleProjectQuery } from "@/sanity/lib/queries";

import ProjectGallery from "./ProjectGallery";

function getYoutubeEmbedUrl(url) {

  if (!url) return "";

  // youtu.be format
  if (url.includes("youtu.be")) {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // youtube watch format
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  // already embed format
  if (url.includes("/embed/")) {
    return url;
  }

  return "";
}

export default async function ProjectDetailsPage({ params }) {

  const { slug } = await params;

  const project = await client.fetch(
    singleProjectQuery,
    { slug }
  );

  if (!project) {
    return (
      <div
        className="
          min-h-screen
          bg-white
          text-black

          flex
          items-center
          justify-center
        "
      >
        <h1
          className="
            text-3xl
            font-semibold
          "
        >
          Project not found
        </h1>
      </div>
    );
  }

  const embedUrl =
    project.videoUrl &&
    getYoutubeEmbedUrl(project.videoUrl);

  return (
    <div className="min-h-screen bg-white text-black">

      {/* TOP IMAGE SECTION */}
      <ProjectGallery
        images={project.galleryImages}
        projectName={project.projectName}
      />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-5 py-14">

        {/* Title */}
        <h1
          className="
            text-4xl
            md:text-5xl

            font-bold

            mb-4

            text-black
          "
        >
          {project.projectName}
        </h1>

        {/* Info */}
        <div
          className="
            flex
            flex-wrap

            gap-6

            text-zinc-700

            mb-8
          "
        >

          <p>
            📍 {project.projectLocation}
          </p>

          <p>
            🏠 {project.bhk}
          </p>

          <p>
            📐 {project.sqft}
          </p>

          <p>
            {project.listingType === "new"
              ? "🟢 New Listing"
              : "⚪ Old Listing"}
          </p>

        </div>

        {/* Description */}
        <p
          className="
            text-zinc-700

            leading-8

            mb-12
          "
        >
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-14">

          <h2
            className="
              text-3xl
              font-semibold

              mb-6
            "
          >
            Features
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2

              gap-5
            "
          >

            {project.features?.map((feature, index) => (

              <div
                key={index}
                className="
                  bg-white

                  border
                  border-[#F1F1F1]

                  rounded-[18px]

                  p-5

                  text-black

                  shadow-[0_10px_30px_rgba(0,0,0,0.08)]

                  transition-all
                  duration-300

                  hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]

                  hover:-translate-y-1
                "
              >
                ✓ {feature}
              </div>

            ))}

          </div>

        </div>

        {/* Video Section */}
        {project.videoUrl && embedUrl && (

          <div>

            <h2
              className="
                text-3xl
                font-semibold

                mb-6
              "
            >
              Project Video
            </h2>

            <div
              className="
                aspect-video

                rounded-[24px]

                overflow-hidden

                shadow-[0_15px_50px_rgba(0,0,0,0.10)]
              "
            >

              <iframe
                src={embedUrl}
                title={project.projectName}

                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture
                "

                allowFullScreen

                className="
                  w-full
                  h-full
                "
              />

            </div>

          </div>

        )}

      </div>

    </div>
  );
}