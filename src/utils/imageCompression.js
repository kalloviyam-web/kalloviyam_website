import imageCompression from "browser-image-compression";

/**
 * Compresses an image file in the browser before uploading.
 * Reduces 15MB+ camera/phone photos to ~800KB - 1.2MB without noticeable visual loss.
 *
 * @param {File} file - The original File object from <input type="file">
 * @param {Object} customOptions - Optional overrides
 * @returns {Promise<File>} - Compressed File object
 */
export async function compressImage(file, customOptions = {}) {
  // If the file is already small (under 1.2 MB), skip heavy compression
  if (file.size <= 1.2 * 1024 * 1024) {
    return file;
  }

  const options = {
    maxSizeMB: 1.0, // target maximum file size in MB
    maxWidthOrHeight: 2560, // keeps 2K/4K sharpness while eliminating redundant pixels
    useWebWorker: true,
    fileType: file.type === "image/png" ? "image/webp" : "image/jpeg",
    initialQuality: 0.86,
    ...customOptions,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(
      `Compressed ${file.name}: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`
    );
    return compressedFile;
  } catch (error) {
    console.warn("Image compression failed, using original file:", error);
    return file;
  }
}
