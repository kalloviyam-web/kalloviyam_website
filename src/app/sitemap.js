export default function sitemap() {
  return [
    {
      url: "https://kalloviyam.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kalloviyam.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://kalloviyam.com/services",
      lastModified: new Date(),
    },
    {
      url: "https://kalloviyam.com/projects",
      lastModified: new Date(),
    },
    {
      url: "https://kalloviyam.com/contact",
      lastModified: new Date(),
    },
  ];
}