const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const getOptimizedImageUrl = (
  publicId,
  width = 1200
) => {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${width}/${publicId}`;
};
