import { compressImage } from "./imageCompression";

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dtmclm31h";
const UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "kalloviyam_unsigned";

/**
 * Uploads a single file to Cloudinary with automatic pre-compression.
 *
 * @param {File} rawFile - File to upload
 * @param {Function} onProgress - Callback (progressPercent: number) => void
 * @returns {Promise<{ imageUrl: string, publicId: string }>}
 */
export async function uploadSingleImageToCloudinary(rawFile, onProgress) {
  // 1. Compress image in browser first
  if (onProgress) onProgress(10);
  const compressedFile = await compressImage(rawFile);
  if (onProgress) onProgress(30);

  // 2. Prepare FormData
  const formData = new FormData();
  formData.append("file", compressedFile);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "kalloviyam_projects");

  // 3. Upload via XMLHttpRequest for progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        // Map upload phase to 30% - 95%
        const percent = Math.round(30 + (event.loaded / event.total) * 65);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (onProgress) onProgress(100);
          resolve({
            imageUrl: response.secure_url,
            publicId: response.public_id,
          });
        } catch (err) {
          reject(new Error("Failed to parse Cloudinary response"));
        }
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          reject(
            new Error(
              errorResponse.error?.message || "Cloudinary upload failed"
            )
          );
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during Cloudinary upload"));
    };

    xhr.send(formData);
  });
}
