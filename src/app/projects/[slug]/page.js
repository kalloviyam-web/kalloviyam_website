// src/app/projects/[slug]/page.js

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Cormorant_Garamond } from "next/font/google";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

function getYoutubeEmbedUrl(url) {
  if (!url) return "";

  if (url.includes("youtu.be")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
}

// Generate dynamic hidden SEO meta tags in <head>
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    return {
      title: "Project Not Found | Kalloviyam",
    };
  }

  const title =
    project.meta_title || `${project.project_name} | Kalloviyam Constructions`;
  const description =
    project.meta_description ||
    project.description?.slice(0, 160) ||
    "Sustainable and breathable architecture crafted by Kalloviyam.";
  const coverImage = project.gallery_images?.[0]?.imageUrl;

  return {
    title,
    description,
    keywords: project.meta_keywords || undefined,
    openGraph: {
      title,
      description,
      url: `https://kalloviyam.com/projects/${project.slug}`,
      siteName: "Kalloviyam",
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 630,
              alt: project.project_name,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
  };
}

export const revalidate = 30;

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) {
    notFound();
  }

  const embedUrl = project.video_url && getYoutubeEmbedUrl(project.video_url);

  return (
    <ProjectDetailClient
      project={project}
      embedUrl={embedUrl}
      fontClassName={cormorant.className}
    />
  );
}