"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { uploadSingleImageToCloudinary } from "@/utils/cloudinaryUpload";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Globe,
  Sparkles,
  Save,
  CheckCircle,
  AlertCircle,
  Film,
  Building,
  Image as ImageIcon,
  Star,
  ChevronLeft,
  ChevronRight,
  GripVertical,
} from "lucide-react";

export default function ProjectForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const supabase = createClient();

  // Form States
  const [projectName, setProjectName] = useState(
    initialData?.project_name || ""
  );
  const [tagline, setTagline] = useState(
    initialData?.tagline || initialData?.tag_line || ""
  );
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [projectLocation, setProjectLocation] = useState(
    initialData?.project_location || ""
  );
  const [listingType, setListingType] = useState(
    initialData?.listing_type || "new"
  );
  const [bhk, setBhk] = useState(initialData?.bhk || "");
  const [sqft, setSqft] = useState(initialData?.sqft || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [features, setFeatures] = useState(
    Array.isArray(initialData?.features)
      ? initialData.features
      : [""]
  );

  // SEO States
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.meta_description || ""
  );
  const [metaKeywords, setMetaKeywords] = useState(
    initialData?.meta_keywords || ""
  );

  // Gallery Images Array [{ imageUrl, publicId }]
  const [galleryImages, setGalleryImages] = useState(
    Array.isArray(initialData?.gallery_images)
      ? initialData.gallery_images
      : []
  );

  // Track deleted image publicIds to purge from Cloudinary on save
  const [deletedPublicIds, setDeletedPublicIds] = useState([]);

  // Upload Queue [{ id, name, originalSizeMB, progress, status, error }]
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Form submission status
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cover Strip Carousel Ref & Scroll Handler
  const coverStripRef = useRef(null);
  const scrollCoverStrip = (direction) => {
    if (coverStripRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      coverStripRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Slug generator
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setProjectName(val);
    if (!isEdit || !slug) {
      setSlug(generateSlug(val));
    }
  };

  // Feature handling
  const addFeature = () => setFeatures([...features, ""]);
  const updateFeature = (index, value) => {
    const next = [...features];
    next[index] = value;
    setFeatures(next);
  };
  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Drag & Drop Reordering States
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e, index) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === undefined) return;
    if (draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...galleryImages];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setGalleryImages(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Set As Cover Image (moves the selected image to index 0 without duplicate upload)
  const setAsCover = (index) => {
    if (index === 0 || index >= galleryImages.length) return;
    const updated = [...galleryImages];
    const [selectedCover] = updated.splice(index, 1);
    updated.unshift(selectedCover);
    setGalleryImages(updated);
  };

  const removeImage = (index) => {
    const targetImage = galleryImages[index];
    if (targetImage?.publicId) {
      setDeletedPublicIds((prev) => [...prev, targetImage.publicId]);
    }
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Bulk Image Upload Handler with Auto Pre-Compression
  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsUploading(true);
    setErrorMessage("");

    const queueItems = files.map((file, idx) => ({
      id: `${Date.now()}_${idx}`,
      file,
      name: file.name,
      originalSizeMB: (file.size / (1024 * 1024)).toFixed(1),
      progress: 0,
      status: "compressing", // 'compressing' | 'uploading' | 'completed' | 'failed'
    }));

    setUploadQueue((prev) => [...prev, ...queueItems]);

    // Process files concurrently in batches of 3
    const batchSize = 3;
    const newlyUploaded = [];

    for (let i = 0; i < queueItems.length; i += batchSize) {
      const batch = queueItems.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (item) => {
          try {
            setUploadQueue((prev) =>
              prev.map((q) =>
                q.id === item.id ? { ...q, status: "compressing & uploading" } : q
              )
            );

            const result = await uploadSingleImageToCloudinary(
              item.file,
              (progress) => {
                setUploadQueue((prev) =>
                  prev.map((q) =>
                    q.id === item.id ? { ...q, progress } : q
                  )
                );
              }
            );

            newlyUploaded.push(result);

            setUploadQueue((prev) =>
              prev.map((q) =>
                q.id === item.id
                  ? { ...q, progress: 100, status: "completed" }
                  : q
              )
            );
          } catch (err) {
            console.error(`Failed to upload ${item.name}:`, err);
            setUploadQueue((prev) =>
              prev.map((q) =>
                q.id === item.id
                  ? {
                      ...q,
                      status: "failed",
                      error: err.message || "Upload failed",
                    }
                  : q
              )
            );
          }
        })
      );
    }

    if (newlyUploaded.length > 0) {
      setGalleryImages((prev) => [...prev, ...newlyUploaded]);
    }

    setIsUploading(false);
    // Reset the input so the user can select more files if needed
    e.target.value = "";
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!projectName.trim()) {
      setErrorMessage("Project Name is required.");
      setSaving(false);
      return;
    }

    if (!slug.trim()) {
      setErrorMessage("Slug is required.");
      setSaving(false);
      return;
    }

    if (galleryImages.length === 0) {
      setErrorMessage("Please upload at least one image for the project.");
      setSaving(false);
      return;
    }

    const cleanFeatures = features.map((f) => f.trim()).filter(Boolean);

    const projectPayload = {
      project_name: projectName.trim(),
      tagline: tagline.trim(),
      slug: slug.trim(),
      project_location: projectLocation.trim(),
      listing_type: listingType,
      bhk: bhk.trim(),
      sqft: sqft.trim(),
      video_url: videoUrl.trim(),
      description: description.trim(),
      features: cleanFeatures,
      gallery_images: galleryImages,
      meta_title: metaTitle.trim() || `${projectName.trim()} | Kalloviyam`,
      meta_description:
        metaDescription.trim() ||
        description.slice(0, 160).trim() ||
        "Kalloviyam - Sustainable & Breathable Homes.",
      meta_keywords: metaKeywords.trim(),
      display_order:
        typeof initialData?.display_order === "number"
          ? initialData.display_order
          : 0,
    };

    try {
      // 0. Verify active authentication session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setErrorMessage(
          "Your admin session has expired. Please refresh and log in again."
        );
        setSaving(false);
        return;
      }

      // 1. Purge any deleted images from Cloudinary to free up storage
      if (deletedPublicIds.length > 0) {
        try {
          await fetch("/api/cloudinary/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicIds: deletedPublicIds }),
          });
          setDeletedPublicIds([]);
        } catch (cloudErr) {
          console.warn("Failed to delete removed Cloudinary assets:", cloudErr);
        }
      }

      let saveError = null;

      if (isEdit && initialData?.id) {
        const res = await supabase
          .from("projects")
          .update(projectPayload)
          .eq("id", initialData.id);
        saveError = res.error;
      } else {
        const res = await supabase
          .from("projects")
          .insert([projectPayload]);
        saveError = res.error;
      }

      // Automatic Fallback: If 'tagline' or 'display_order' column doesn't exist in Supabase yet, retry without them
      if (
        saveError &&
        (saveError.message?.toLowerCase().includes("tagline") ||
          saveError.message?.toLowerCase().includes("display_order") ||
          saveError.details?.toLowerCase().includes("tagline") ||
          saveError.details?.toLowerCase().includes("display_order") ||
          saveError.hint?.toLowerCase().includes("tagline") ||
          saveError.hint?.toLowerCase().includes("display_order") ||
          saveError.message?.includes("schema cache"))
      ) {
        const { tagline: _t, display_order: _do, ...fallbackPayload } = projectPayload;
        if (isEdit && initialData?.id) {
          const res = await supabase
            .from("projects")
            .update(fallbackPayload)
            .eq("id", initialData.id);
          saveError = res.error;
        } else {
          const res = await supabase
            .from("projects")
            .insert([fallbackPayload]);
          saveError = res.error;
        }
      }

      if (saveError) {
        throw saveError;
      }

      setSuccessMessage(
        isEdit ? "Project updated successfully!" : "Project created successfully!"
      );

      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error("Save error details:", {
        message: err?.message,
        details: err?.details,
        hint: err?.hint,
        code: err?.code,
        raw: err,
      });

      const displayError =
        err?.message ||
        err?.details ||
        err?.hint ||
        (typeof err === "string" ? err : null) ||
        "Failed to save project. Please check if the slug is unique.";

      setErrorMessage(displayError);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1F1F1F] pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8E2D8] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 rounded-xl border border-[#DDD6CC] hover:bg-[#F4F0EA] text-[#555] transition-all"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif text-[#1F1F1F]">
                {isEdit ? "Edit Project" : "Create New Project"}
              </h1>
              <p className="text-xs text-[#8C8275]">
                {isEdit ? `Editing ${initialData?.project_name}` : "Add project to live website & portfolio"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={saving || isUploading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4F6743] hover:bg-[#3E5234] text-white text-sm font-medium transition-all shadow-md shadow-[#4F6743]/20 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            <span>{isEdit ? "Update Project" : "Publish Project"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Notifications */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
            <AlertCircle size={20} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-3">
            <CheckCircle size={20} className="shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: BASIC INFORMATION */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#F0EBE1]">
              <Building className="text-[#4F6743]" size={22} />
              <h2 className="text-lg font-serif font-medium text-[#1F1F1F]">
                Project Overview
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Project Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555] mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={handleNameChange}
                  placeholder="e.g. Gogul Residence - Eco Living"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>

              {/* Tagline / Subheading (Optional) */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555]">
                    Project Tagline / Subheading
                  </label>
                  <span className="text-xs text-[#8C8275] font-medium">
                    (Optional)
                  </span>
                </div>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Traditional Craftsmanship for Modern Sustainable Living"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>

              {/* Slug */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555]">
                    URL Slug * (Unique Website Path)
                  </label>
                  <span className="text-xs text-[#8C8275]">
                    /projects/<strong>{slug || "slug-preview"}</strong>
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="gogul-residence-eco-living"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555] mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                  placeholder="e.g. Veerappanchatram, Erode"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>

              {/* Listing Type */}
              <div>
                <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555] mb-2">
                  Listing Type
                </label>
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                >
                  <option value="new">New Listing</option>
                  <option value="old">Old Listing</option>
                </select>
              </div>

              {/* BHK */}
              <div>
                <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555] mb-2">
                  BHK
                </label>
                <input
                  type="text"
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  placeholder="e.g. 4 BHK"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>

              {/* Sq.ft */}
              <div>
                <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555] mb-2">
                  Square Feet (Sq.ft)
                </label>
                <input
                  type="text"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  placeholder="e.g. 3,200 Sq.ft"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>

              {/* Video URL (Optional) */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555]">
                    Project Video URL
                  </label>
                  <span className="text-xs text-[#8C8275] font-medium">
                    (Optional)
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8275]">
                    <Film size={18} />
                  </div>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... (Leave blank if no video)"
                    className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555] mb-2">
                  Project Story / Description
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A detailed description of the architectural design, sustainable interlock structure, ventilation, and heritage aesthetics..."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: KEY FEATURES */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-2">
                <Sparkles className="text-[#4F6743]" size={22} />
                <h2 className="text-lg font-serif font-medium text-[#1F1F1F]">
                  Key Architectural Features
                </h2>
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4F6743]/10 text-[#4F6743] hover:bg-[#4F6743]/20 text-xs font-semibold tracking-wider transition-all"
              >
                <Plus size={14} />
                <span>Add Feature</span>
              </button>
            </div>

            <div className="space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs text-[#8C8275] font-mono w-6 text-right">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(idx, e.target.value)}
                    placeholder="e.g. Handcrafted Athangudi Tile Flooring"
                    className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: PROJECT COVER IMAGE (SELECT FROM UPLOADED GALLERY IMAGES) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-2">
                <ImageIcon className="text-[#4F6743]" size={22} />
                <div>
                  <h2 className="text-lg font-serif font-medium text-[#1F1F1F]">
                    Project Cover Image
                  </h2>
                  <p className="text-xs text-[#8C8275] mt-0.5">
                    Selected directly from uploaded gallery images to prevent duplicate storage.
                  </p>
                </div>
              </div>
              {galleryImages.length > 0 && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#4F6743]/10 text-[#4F6743] text-xs font-semibold">
                  <Star size={13} className="fill-[#4F6743]" />
                  <span>Cover Selected</span>
                </div>
              )}
            </div>

            {galleryImages.length === 0 ? (
              <div className="p-8 rounded-xl border border-dashed border-[#DDD6CC] bg-[#FAF8F5] text-center">
                <ImageIcon className="mx-auto text-[#AAA] mb-2" size={32} />
                <p className="text-sm font-medium text-[#555]">
                  No images uploaded yet
                </p>
                <p className="text-xs text-[#8C8275] mt-1 max-w-sm mx-auto">
                  Upload images in the <strong>Project Gallery</strong> section below. You can then pick any uploaded image with 1-click as the main project cover.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Active Cover Preview Card */}
                <div className="flex flex-col md:flex-row gap-6 items-center p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
                  <div className="relative w-full md:w-64 aspect-[16/10] rounded-xl overflow-hidden bg-black shadow-md border-2 border-[#4F6743] shrink-0">
                    <img
                      src={galleryImages[0].imageUrl}
                      alt="Selected Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#4F6743] text-white text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-sm">
                      <Star size={11} className="fill-white" />
                      MAIN COVER
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#1F1F1F] mb-1">
                      Active Website Cover Image
                    </h4>
                    <p className="text-xs text-[#666] mb-3">
                      This image will appear on the main <strong>/projects</strong> showcase grid, homepage cards, and social share previews.
                    </p>
                    <p className="text-[11px] text-[#8C8275] font-medium">
                      💡 To switch the cover, click any uploaded photo from the selector below.
                    </p>
                  </div>
                </div>

                {/* Quick Cover Selector Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-xs uppercase tracking-[1.5px] font-semibold text-[#555]">
                        Select Cover from Uploaded Photos ({galleryImages.length} available):
                      </p>
                      {/* Left & Right Arrow Buttons on the right side */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => scrollCoverStrip("left")}
                          className="w-8 h-8 rounded-lg border border-[#DDD6CC] bg-[#FAF8F5] hover:bg-[#EAE4D9] hover:border-[#BDB4A4] active:scale-95 text-[#444] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                          title="Scroll Left"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollCoverStrip("right")}
                          className="w-8 h-8 rounded-lg border border-[#DDD6CC] bg-[#FAF8F5] hover:bg-[#EAE4D9] hover:border-[#BDB4A4] active:scale-95 text-[#444] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                          title="Scroll Right"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>

                    <div
                      ref={coverStripRef}
                      className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-hide scroll-smooth"
                    >
                      {galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAsCover(idx)}
                          className={`relative shrink-0 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                            idx === 0
                              ? "ring-3 ring-[#4F6743] border-[#4F6743] scale-105 shadow-md"
                              : "border-[#DDD6CC] opacity-75 hover:opacity-100 hover:border-[#4F6743] hover:scale-102"
                          }`}
                          style={{ width: "96px", height: "64px" }}
                        >
                          <img
                            src={img.imageUrl}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {idx === 0 && (
                            <div className="absolute inset-0 bg-[#4F6743]/25 flex items-center justify-center">
                              <span className="bg-[#4F6743] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                                COVER
                              </span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 4: BULK IMAGE UPLOAD & GALLERY (AUTO COMPRESSION) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0EBE1]">
              <div>
                <div className="flex items-center gap-2">
                  <Upload className="text-[#4F6743]" size={22} />
                  <h2 className="text-lg font-serif font-medium text-[#1F1F1F]">
                    Project Gallery ({galleryImages.length} Images)
                  </h2>
                </div>
                <p className="text-xs text-[#8C8275] mt-1">
                  Upload 20 to 30+ high-res images. Click &quot;Set as Cover&quot; on any image to make it the main project cover.
                </p>
              </div>

              {/* Compression Badge */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF1E8] border border-[#C5D9BE] text-[#365A2C] text-xs font-medium">
                <span>⚡ Auto-Compression: 15MB ➔ ~1MB</span>
              </div>
            </div>

            {/* Dropzone */}
            <div className="border-2 border-dashed border-[#DDD6CC] hover:border-[#4F6743] rounded-2xl p-8 text-center bg-[#FAF8F5] transition-all cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesSelected}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex flex-col items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-2xl bg-[#4F6743]/10 text-[#4F6743] flex items-center justify-center mb-3">
                  <Upload size={26} />
                </div>
                <p className="text-sm font-medium text-[#1F1F1F]">
                  Click or Drag & Drop bulk images here
                </p>
                <p className="text-xs text-[#8C8275] mt-1 max-w-sm">
                  Supports multiple 15MB+ camera/mobile photos. Our system will automatically compress and upload directly to Cloudinary.
                </p>
              </div>
            </div>

            {/* Upload Queue Progress */}
            {uploadQueue.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#555]">
                  <span>Upload Queue</span>
                  <span>
                    {uploadQueue.filter((q) => q.status === "completed").length} / {uploadQueue.length} Done
                  </span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {uploadQueue.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded-lg border border-[#EDE7DC] flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="truncate font-medium text-[#333]">
                            {item.name} ({item.originalSizeMB} MB)
                          </p>
                          <span
                            className={`capitalize text-[11px] font-semibold ${
                              item.status === "completed"
                                ? "text-green-600"
                                : item.status === "failed"
                                ? "text-red-600"
                                : "text-[#B58A52]"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="w-full bg-[#EEE8DF] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              item.status === "failed"
                                ? "bg-red-500"
                                : item.status === "completed"
                                ? "bg-green-500"
                                : "bg-[#4F6743]"
                            }`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Thumbnails & Drag-and-Drop Reordering */}
            {galleryImages.length > 0 && (
              <div className="mt-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-[#F0EBE1]">
                  <div>
                    <h3 className="text-xs uppercase tracking-[1.5px] font-semibold text-[#555]">
                      Manage Image Order & Cover
                    </h3>
                    <p className="text-xs text-[#8C8275] mt-0.5">
                      ✦ <strong>Drag and drop</strong> images to reorder. Image <strong>#1</strong> is automatically your main cover.
                    </p>
                  </div>
                  <span className="text-xs text-[#8C8275] font-mono bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E8E2D8] self-start sm:self-auto">
                    {galleryImages.length} {galleryImages.length === 1 ? "Image" : "Images"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {galleryImages.map((img, idx) => {
                    const isDragging = draggedIndex === idx;
                    const isDragOver = dragOverIndex === idx && draggedIndex !== idx;

                    return (
                      <div
                        key={img.publicId || `${img.imageUrl}_${idx}`}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragLeave={(e) => handleDragLeave(e, idx)}
                        onDrop={(e) => handleDrop(e, idx)}
                        onDragEnd={handleDragEnd}
                        className={`relative group rounded-xl overflow-hidden border aspect-[4/3] cursor-grab active:cursor-grabbing select-none transition-all duration-200 ${
                          isDragging
                            ? "opacity-30 scale-95 border-dashed border-[#4F6743] ring-2 ring-[#4F6743]/50 bg-[#FAF8F5]"
                            : isDragOver
                            ? "scale-105 ring-3 ring-[#4F6743] border-[#4F6743] shadow-xl z-20"
                            : idx === 0
                            ? "border-[#4F6743] ring-2 ring-[#4F6743]/50 shadow-md bg-black"
                            : "border-[#E8E2D8] hover:border-[#4F6743]/70 hover:shadow-md bg-black"
                        }`}
                      >
                        <img
                          src={img.imageUrl}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover pointer-events-none"
                        />

                        {/* Top-Left Cover Badge / Set Cover Button */}
                        {idx === 0 ? (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#4F6743] text-white text-[10px] font-semibold tracking-wider shadow-md flex items-center gap-1 z-10 pointer-events-none">
                            <Star size={10} className="fill-white" />
                            COVER
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAsCover(idx);
                            }}
                            className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 hover:bg-[#4F6743] text-white text-[10px] font-medium tracking-wider shadow-md transition-all flex items-center gap-1 opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                            title="Make this the Cover Image"
                          >
                            <Star size={10} />
                            Set Cover
                          </button>
                        )}

                        {/* Top-Right Delete Action */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(idx);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-white shadow-md transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                          title="Delete Image"
                        >
                          <Trash2 size={13} />
                        </button>

                        {/* Card Bottom Indicator & Drag Grip */}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono font-medium flex items-center gap-1 shadow">
                            <GripVertical size={12} className="text-white/70" />
                            #{idx + 1}
                          </span>
                          {idx === 0 ? (
                            <span className="px-1.5 py-0.5 rounded bg-[#4F6743] text-white text-[9px] font-bold shadow">
                              MAIN
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded bg-black/60 text-white/80 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                              Drag to move
                            </span>
                          )}
                        </div>

                        {/* Hover Overlay Hint */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4: SEO & META TAGS (HIDDEN ON WEBSITE, ACTIVE IN <HEAD>) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
            <div className="flex items-center gap-2 mb-2 pb-4 border-b border-[#F0EBE1]">
              <Globe className="text-[#4F6743]" size={22} />
              <div>
                <h2 className="text-lg font-serif font-medium text-[#1F1F1F]">
                  SEO & Search Engine Meta Tags
                </h2>
                <p className="text-xs text-[#8C8275]">
                  These tags are directly injected into Google's HTML <code className="bg-[#FAF8F5] px-1 py-0.5 rounded">&lt;head&gt;</code> and will <strong>not</strong> show on the website design.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555]">
                    Meta Title (Browser Tab & Google Search Title)
                  </label>
                  <span
                    className={`text-xs ${
                      metaTitle.length > 60 ? "text-amber-600" : "text-[#8C8275]"
                    }`}
                  >
                    {metaTitle.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. Luxury Breathable Home in Erode | Kalloviyam Architecture"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555]">
                    Meta Description (Google Snippet)
                  </label>
                  <span
                    className={`text-xs ${
                      metaDescription.length > 160
                        ? "text-amber-600"
                        : "text-[#8C8275]"
                    }`}
                  >
                    {metaDescription.length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="e.g. Explore this 4 BHK eco-friendly home constructed with traditional interlocking mud blocks, lime plastering, and Athangudi tiles in Erode."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-xs uppercase tracking-[1.5px] font-semibold text-[#555] mb-2">
                  Search Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  placeholder="e.g. eco friendly construction, interlock mud house, breathable homes, erode architecture, kalloviyam"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
                />
              </div>
            </div>
          </div>

          {/* Bottom Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/admin"
              className="px-6 py-3 rounded-xl border border-[#DDD6CC] hover:bg-[#FAF8F5] text-sm font-medium text-[#555] transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || isUploading}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#4F6743] hover:bg-[#3E5234] text-white text-sm font-medium transition-all shadow-lg shadow-[#4F6743]/20 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span>{isEdit ? "Update Project" : "Publish Project"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
