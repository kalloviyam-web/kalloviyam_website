import { useState } from "react";

import { PatchEvent, set } from "sanity";

export default function CloudinaryUploadInput(props) {
  const { value, onChange } = props;

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      formData.append("upload_preset", "kalloviyam_unsigned");

      const cloudName = "dtmclm31h";

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      console.log("Cloudinary Response:", data);

      if (data.error) {
        console.error(data.error);

        alert(data.error.message);

        setUploading(false);

        return;
      }

      onChange(
        PatchEvent.from(
          set({
            _key: crypto.randomUUID(),

            _type: "cloudinaryImage",

            imageUrl: data.secure_url,

            publicId: data.public_id,
          }),
        ),
      );
    } catch (error) {
      console.error(error);

      alert("Image upload failed");
    }

    setUploading(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "10px",
      }}
    >
      <input type="file" accept="image/*" onChange={handleUpload} />

      {uploading && <p style={{ marginTop: "10px" }}>Uploading image...</p>}

      {value?.imageUrl && (
        <div style={{ marginTop: "16px" }}>
          <img
            src={value.imageUrl}
            alt="Uploaded"
            style={{
              width: "220px",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
}
