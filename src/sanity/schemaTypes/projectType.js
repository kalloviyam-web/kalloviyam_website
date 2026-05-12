//src/sanity/schemaTypes/projectType.js
export const projectType = {
  name: "project",
  title: "Projects",
  type: "document",

  fields: [
    {
      name: "projectName",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: "projectName",
        maxLength: 96,
      },

      validation: (Rule) => Rule.required(),
    },

    {
      name: "projectLocation",
      title: "Project Location",
      type: "string",
    },

    {
      name: "listingType",
      title: "Listing Type",
      type: "string",

      options: {
        list: [
          { title: "New Listing", value: "new" },
          { title: "Old Listing", value: "old" },
        ],

        layout: "dropdown",
      },
    },

    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
    },

    {
      name: "features",
      title: "Features",
      type: "array",

      of: [
        {
          type: "string",
        },
      ],
    },

    {
      name: "bhk",
      title: "BHK",
      type: "string",
    },

    {
      name: "sqft",
      title: "Sq.ft",
      type: "string",
    },

    {
      name: "videoUrl",
      title: "Project Video URL",
      type: "url",
      description: "Upload video to Cloudinary and paste URL here",
    },

    {
      name: "galleryImages",
      title: "Project Images",
      type: "array",

      of: [
        {
          type: "image",

          options: {
            hotspot: true,
          },
        },
      ],

      validation: (Rule) =>
        Rule.min(1).error("At least one image is required"),
    },
  ],
};