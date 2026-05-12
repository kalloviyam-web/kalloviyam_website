// src/sanity/schemaTypes/cloudinaryImageType.js
import CloudinaryUploadInput from "../components/CloudinaryUploadInput";

export const cloudinaryImageType = {
  name: "cloudinaryImage",
  title: "Cloudinary Image",
  type: "object",

  fields: [
    {
      name: "imageUrl",
      title: "Image URL",
      type: "url",
    },

    {
      name: "publicId",
      title: "Public ID",
      type: "string",
    },
  ],

  components: {
    input: CloudinaryUploadInput,
  },
};