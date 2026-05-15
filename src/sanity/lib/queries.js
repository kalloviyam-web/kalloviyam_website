//src/sanity/lib/queries.js
import { groq } from "next-sanity";

export const allProjectsQuery = groq`
  *[_type == "project"]{
    _id,
    projectName,
    slug,
    projectLocation,
    listingType,
    description,
    features,
    bhk,
    sqft,
    videoUrl,

    galleryImages[]{
      imageUrl,
      publicId
    }
  }
`;

export const singleProjectQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    projectName,
    slug,
    projectLocation,
    listingType,
    description,
    features,
    bhk,
    sqft,
    videoUrl,

    galleryImages[]{
      imageUrl,
      publicId
    }
  }
`;