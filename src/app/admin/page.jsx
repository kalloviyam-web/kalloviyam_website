"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  ExternalLink,
  LogOut,
  Edit,
  Trash2,
  Image as ImageIcon,
  Building,
  Search,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  Save,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  Terminal,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [projects, setProjects] = useState([]);
  const [originalProjects, setOriginalProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchError, setFetchError] = useState("");

  // Drag and Place Reordering States
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  // Missing Column Migration Modal State
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Drag references for reliable cross-browser tracking & auto-scroll
  const dragItemRef = useRef(null);
  const autoScrollRef = useRef({ animationId: null, speed: 0 });

  const startAutoScroll = useCallback((speed) => {
    autoScrollRef.current.speed = speed;
    if (!autoScrollRef.current.animationId) {
      const scrollStep = () => {
        if (autoScrollRef.current.speed !== 0) {
          window.scrollBy(0, autoScrollRef.current.speed);
          autoScrollRef.current.animationId = requestAnimationFrame(scrollStep);
        } else {
          autoScrollRef.current.animationId = null;
        }
      };
      autoScrollRef.current.animationId = requestAnimationFrame(scrollStep);
    }
  }, []);

  const stopAutoScroll = useCallback(() => {
    autoScrollRef.current.speed = 0;
    if (autoScrollRef.current.animationId) {
      cancelAnimationFrame(autoScrollRef.current.animationId);
      autoScrollRef.current.animationId = null;
    }
  }, []);

  // Global Auto-Scroll Listener when dragging near top/bottom of screen
  useEffect(() => {
    const handleGlobalDragOver = (e) => {
      if (dragItemRef.current === null) return;
      e.preventDefault();

      const topZone = 160; // Top threshold in px (below sticky navbar)
      const bottomZone = window.innerHeight - 130; // Bottom threshold in px

      if (e.clientY < topZone && e.clientY >= 0) {
        // Closer to top = faster upward scroll
        const intensity = Math.max(1, (topZone - e.clientY) / 12);
        const speed = -Math.min(28, Math.round(intensity * 4));
        startAutoScroll(speed);
      } else if (e.clientY > bottomZone && e.clientY <= window.innerHeight) {
        // Closer to bottom = faster downward scroll
        const intensity = Math.max(1, (e.clientY - bottomZone) / 12);
        const speed = Math.min(28, Math.round(intensity * 4));
        startAutoScroll(speed);
      } else {
        stopAutoScroll();
      }
    };

    const handleGlobalDragEnd = () => {
      stopAutoScroll();
      setDraggedIndex(null);
      setDragOverIndex(null);
      dragItemRef.current = null;
    };

    window.addEventListener("dragover", handleGlobalDragOver, { passive: false });
    window.addEventListener("dragend", handleGlobalDragEnd);
    window.addEventListener("drop", handleGlobalDragEnd);

    return () => {
      window.removeEventListener("dragover", handleGlobalDragOver);
      window.removeEventListener("dragend", handleGlobalDragEnd);
      window.removeEventListener("drop", handleGlobalDragEnd);
      stopAutoScroll();
    };
  }, [startAutoScroll, stopAutoScroll]);

  const fetchProjects = async () => {
    setLoading(true);
    setFetchError("");
    setIsOrderChanged(false);

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      setFetchError(
        "NEXT_PUBLIC_SUPABASE_URL is missing in .env.local. Please paste your Supabase Project URL and Anon Key into .env.local and restart your dev server."
      );
      setLoading(false);
      return;
    }

    try {
      // 1. Get current logged in user & enforce auth guard
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setUserEmail(user.email);

      // 2. Fetch all projects from Supabase ordered by display_order then created_at
      let fetchedData = [];
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) {
        // Fallback if display_order column doesn't exist yet
        const fallback = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (fallback.error) {
          console.error("Error fetching projects:", fallback.error.message || fallback.error);
          setFetchError(fallback.error.message || "Failed to fetch projects");
          return;
        }
        fetchedData = fallback.data || [];
      } else {
        fetchedData = data || [];
      }

      // Sort client-side ensuring strict display_order placement
      const sorted = [...fetchedData].sort((a, b) => {
        const orderA =
          typeof a.display_order === "number" && !isNaN(a.display_order)
            ? a.display_order
            : Infinity;
        const orderB =
          typeof b.display_order === "number" && !isNaN(b.display_order)
            ? b.display_order
            : Infinity;
        if (orderA !== orderB) return orderA - orderB;
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      });

      setProjects(sorted);
      setOriginalProjects(sorted);
    } catch (err) {
      console.error("Error fetching projects:", err?.message || err);
      setFetchError(
        err?.message || "Unexpected error occurred while fetching projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  // --- DRAG AND PLACE REORDER HANDLERS ---
  const handleDragStart = (e, index) => {
    dragItemRef.current = index;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragEnter = (e, targetIndex) => {
    e.preventDefault();
    if (dragItemRef.current === null || dragItemRef.current === targetIndex) return;
    setDragOverIndex(targetIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    stopAutoScroll();

    const sourceIndex = dragItemRef.current !== null ? dragItemRef.current : draggedIndex;

    if (sourceIndex === null || sourceIndex === undefined || sourceIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      dragItemRef.current = null;
      return;
    }

    const updated = [...projects];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);

    const reordered = updated.map((item, idx) => ({
      ...item,
      display_order: idx,
    }));

    setProjects(reordered);
    setIsOrderChanged(true);
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragItemRef.current = null;
  };

  const handleDragEnd = () => {
    stopAutoScroll();
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragItemRef.current = null;
  };

  // Move project left/right (earlier/later) via button click
  const moveProject = (index, direction) => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    const reordered = updated.map((item, idx) => ({
      ...item,
      display_order: idx,
    }));

    setProjects(reordered);
    setIsOrderChanged(true);
  };

  // Reset to original order before saving
  const handleResetOrder = () => {
    setProjects([...originalProjects]);
    setIsOrderChanged(false);
  };

  // Save new custom order to Supabase
  const handleSaveOrder = async () => {
    setSavingOrder(true);
    try {
      // Update each project's display_order in Supabase
      const updatePromises = projects.map((p, idx) =>
        supabase
          .from("projects")
          .update({ display_order: idx })
          .eq("id", p.id)
      );

      const results = await Promise.all(updatePromises);
      const failed = results.find((r) => r.error);

      if (failed && failed.error) {
        const errorMsg = failed.error.message || failed.error.details || "";
        // If column display_order is missing in DB, open the clear 1-click migration helper modal
        if (
          errorMsg.toLowerCase().includes("display_order") ||
          failed.error.code === "42703" ||
          failed.error.hint?.toLowerCase().includes("display_order")
        ) {
          setShowMigrationModal(true);
          return;
        }
        throw failed.error;
      }

      setOriginalProjects([...projects]);
      setIsOrderChanged(false);
      setMessage("Project sequence saved! Live website will display projects in this custom order.");
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.error("Failed to save project order:", err);
      const errMsg = err?.message || "Failed to save project order.";
      if (errMsg.toLowerCase().includes("display_order")) {
        setShowMigrationModal(true);
      } else {
        alert(errMsg);
      }
    } finally {
      setSavingOrder(false);
    }
  };

  const copyMigrationSql = () => {
    const sql = `ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;\nCREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects(display_order ASC);`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const projectToDelete = projects.find((p) => p.id === id);

      // 1. Purge all images belonging to this project from Cloudinary
      if (
        projectToDelete?.gallery_images &&
        Array.isArray(projectToDelete.gallery_images)
      ) {
        const publicIds = projectToDelete.gallery_images
          .map((img) => img.publicId)
          .filter(Boolean);

        if (publicIds.length > 0) {
          try {
            await fetch("/api/cloudinary/delete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ publicIds }),
            });
          } catch (cloudErr) {
            console.warn("Failed to delete some Cloudinary assets:", cloudErr);
          }
        }
      }

      // 2. Delete the project row from Supabase
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      const remaining = projects.filter((p) => p.id !== id);
      setProjects(remaining);
      setOriginalProjects(originalProjects.filter((p) => p.id !== id));
      setDeleteId(null);
      setMessage("Project and its Cloudinary images were deleted successfully.");
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      alert(err.message || "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  const filteredProjects = projects.filter((p) =>
    (p.project_name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim()) ||
    (p.project_location || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim())
  );

  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1F1F1F]">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E8E2D8] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4F6743]/10 text-[#4F6743] flex items-center justify-center font-serif font-bold text-lg">
              K
            </div>
            <div>
              <h1 className="text-lg font-serif font-semibold text-[#1F1F1F] leading-tight">
                Kalloviyam Admin
              </h1>
              <p className="text-[11px] text-[#8C8275] flex items-center gap-1 font-mono">
                <ShieldCheck size={12} className="text-[#4F6743]" />
                {userEmail || "Authenticated"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DDD6CC] hover:bg-[#FAF8F5] text-xs font-medium text-[#555] transition-all"
            >
              <span>View Live Projects</span>
              <ExternalLink size={14} />
            </Link>

            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F6743] hover:bg-[#3E5234] text-white text-xs font-medium tracking-wide transition-all shadow-md shadow-[#4F6743]/20"
            >
              <Plus size={16} />
              <span>New Project</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="p-2 rounded-xl border border-[#DDD6CC] hover:bg-red-50 hover:border-red-200 text-[#777] hover:text-red-600 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Success message banner */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
            <CheckCircle size={18} />
            <span>{message}</span>
          </div>
        )}

        {/* Error message banner */}
        {fetchError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Database Notice:</p>
              <p className="mt-0.5">{fetchError}</p>
              {fetchError.includes("does not exist") || fetchError.includes("42P01") ? (
                <p className="mt-1 text-xs text-red-600">
                  Please open Supabase SQL Editor and run the script in <code>supabase/schema.sql</code> to create the <code>projects</code> table.
                </p>
              ) : null}
            </div>
          </div>
        )}

        {/* Unsaved Display Order Change Bar */}
        {isOrderChanged && (
          <div className="mb-6 p-4 rounded-2xl bg-[#F0EBE1] border-2 border-[#4F6743] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4F6743] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1F1F1F]">
                  Display Order Modified!
                </h4>
                <p className="text-xs text-[#665D50]">
                  You reordered the project cards. Click &ldquo;Save Display Order&rdquo; to update the live website portfolio.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleResetOrder}
                disabled={savingOrder}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#DDD6CC] hover:bg-[#FAF8F5] text-xs font-medium text-[#555] transition-all cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>

              <button
                onClick={handleSaveOrder}
                disabled={savingOrder}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#4F6743] hover:bg-[#3E5234] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#4F6743]/20 disabled:opacity-50 cursor-pointer"
              >
                {savingOrder ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                <span>{savingOrder ? "Saving..." : "Save Display Order"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Stats & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-serif text-[#1F1F1F]">
                Projects Portfolio
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4F6743]/10 text-[#4F6743] text-[11px] font-semibold">
                Drag &amp; Place Enabled
              </span>
            </div>
            <p className="text-xs text-[#8C8275] mt-1">
              Drag and drop cards or use the arrow buttons to position projects in your exact desired sequence on the live website. Auto-scrolls smoothly as you drag upwards or downwards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search
                size={16}
                className="absolute inset-y-0 left-3.5 my-auto text-[#8C8275]"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects by name, location..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#DDD6CC] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#4F6743]"
              />
            </div>
            <button
              onClick={fetchProjects}
              className="p-2.5 bg-white border border-[#DDD6CC] hover:bg-[#FAF8F5] rounded-xl text-[#555] transition-all cursor-pointer"
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Notice when searching */}
        {isSearching && (
          <div className="mb-4 text-xs text-[#8C8275] bg-[#FAF8F5] px-4 py-2 rounded-xl border border-[#E8E2D8] flex items-center justify-between">
            <span>
              🔍 Filtering by &ldquo;{searchTerm}&rdquo; ({filteredProjects.length} results). Clear search to reorder full project list.
            </span>
            <button
              onClick={() => setSearchTerm("")}
              className="text-[#4F6743] hover:underline font-semibold cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Projects Table / Card Grid */}
        {loading ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-2xl border border-[#E8E2D8] p-8 text-center">
            <div className="w-8 h-8 border-3 border-[#4F6743]/20 border-t-[#4F6743] rounded-full animate-spin mb-3" />
            <p className="text-xs text-[#8C8275]">Loading your projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-2xl border border-[#E8E2D8] p-12 text-center">
            <Building size={48} className="text-[#DDD6CC] mb-3" />
            <h3 className="text-lg font-serif text-[#1F1F1F]">
              {searchTerm ? "No matching projects found" : "No projects published yet"}
            </h3>
            <p className="text-xs text-[#8C8275] max-w-sm mt-1 mb-6">
              {searchTerm
                ? "Try searching with a different term or clear the search input."
                : "Create your first project to showcase on Kalloviyam's portfolio."}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F6743] text-white text-xs font-medium tracking-wide shadow-md shadow-[#4F6743]/20"
              >
                <Plus size={16} />
                <span>Create First Project</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const coverImg = project.gallery_images?.[0]?.imageUrl;
              const imageCount = project.gallery_images?.length || 0;
              const isFirst = idx === 0;
              const isLast = idx === filteredProjects.length - 1;
              const isDragging = draggedIndex === idx;
              const isDragOver = dragOverIndex === idx;

              return (
                <div
                  key={project.id}
                  draggable={!isSearching}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragEnter={(e) => handleDragEnter(e, idx)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between group relative overflow-hidden select-none ${
                    isDragging
                      ? "opacity-30 scale-95 border-dashed border-[#4F6743] ring-2 ring-[#4F6743]/30"
                      : isDragOver
                      ? "border-2 border-[#4F6743] ring-4 ring-[#4F6743]/20 scale-102 shadow-lg"
                      : "border-[#E8E2D8] hover:border-[#C5BDAF] hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Top Reorder Bar / Drag Handle */}
                    <div className="px-4 py-2.5 bg-[#FAF8F5] border-b border-[#E8E2D8] flex items-center justify-between gap-2">
                      <div
                        className={`flex items-center gap-2 ${
                          !isSearching ? "cursor-grab active:cursor-grabbing" : ""
                        }`}
                        title={!isSearching ? "Click and drag to reorder" : ""}
                      >
                        {!isSearching && (
                          <GripVertical
                            size={16}
                            className="text-[#8C8275] group-hover:text-[#4F6743] transition-colors"
                          />
                        )}
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-[#4F6743] text-white text-[10px] font-mono font-bold tracking-wider">
                          #{idx + 1}
                        </span>
                        <span className="text-[11px] font-medium text-[#777]">
                          Position on Website
                        </span>
                      </div>

                      {/* 1-Click Move Left/Right Buttons */}
                      {!isSearching && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveProject(idx, "left")}
                            disabled={isFirst}
                            className="w-7 h-7 rounded-lg border border-[#DDD6CC] bg-white hover:bg-[#F0EBE1] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[#555] transition-all cursor-pointer"
                            title="Move Earlier / Up"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProject(idx, "right")}
                            disabled={isLast}
                            className="w-7 h-7 rounded-lg border border-[#DDD6CC] bg-white hover:bg-[#F0EBE1] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[#555] transition-all cursor-pointer"
                            title="Move Later / Down"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] bg-black overflow-hidden">
                      {coverImg ? (
                        <img
                          src={coverImg}
                          alt={project.project_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8C8275]">
                          <ImageIcon size={32} />
                        </div>
                      )}

                      {/* Listing Type Tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-medium">
                        {project.listing_type === "new" ? "New Listing" : "Old Listing"}
                      </div>

                      {/* Image Count */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1">
                        <ImageIcon size={12} />
                        <span>{imageCount} photos</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-serif font-semibold text-[#1F1F1F] leading-snug line-clamp-1">
                          {project.project_name}
                        </h3>
                      </div>

                      <p className="text-xs text-[#8C8275] mb-3">
                        📍 {project.project_location || "Location not specified"}
                      </p>

                      <div className="flex items-center gap-3 text-xs font-mono text-[#555] pt-3 border-t border-[#F0EBE1]">
                        {project.bhk && (
                          <span className="bg-[#FAF8F5] px-2 py-1 rounded border border-[#E8E2D8]">
                            {project.bhk}
                          </span>
                        )}
                        {project.sqft && (
                          <span className="bg-[#FAF8F5] px-2 py-1 rounded border border-[#E8E2D8]">
                            {project.sqft}
                          </span>
                        )}
                        <span className="text-[11px] text-[#A0988D] ml-auto">
                          /{project.slug}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-5 py-3.5 bg-[#FAF8F5] border-t border-[#E8E2D8] flex items-center justify-between gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-[#4F6743] hover:underline font-medium"
                    >
                      <span>Live View</span>
                      <ExternalLink size={12} />
                    </Link>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-2 rounded-lg bg-white border border-[#DDD6CC] text-[#555] hover:text-[#4F6743] hover:border-[#4F6743] transition-all"
                        title="Edit Project"
                      >
                        <Edit size={14} />
                      </Link>

                      <button
                        onClick={() => setDeleteId(project.id)}
                        className="p-2 rounded-lg bg-white border border-[#DDD6CC] text-[#777] hover:text-red-600 hover:border-red-300 transition-all cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* SQL Migration Modal (Shown if Supabase is missing display_order column) */}
      {showMigrationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-[#E8E2D8] animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#4F6743]/15 text-[#4F6743] flex items-center justify-center shrink-0">
                <Terminal size={22} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-[#1F1F1F]">
                  Supabase Setup: Add &lsquo;display_order&rsquo; Column
                </h3>
                <p className="text-xs text-[#8C8275]">
                  Run this 1-line SQL query in your Supabase SQL Editor to enable order saving:
                </p>
              </div>
            </div>

            {/* SQL Code Box */}
            <div className="relative mb-5 bg-[#1E1E1E] text-green-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-[#333]">
              <pre className="whitespace-pre-wrap leading-relaxed">
{`ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_projects_display_order 
ON public.projects(display_order ASC);`}
              </pre>
              <button
                onClick={copyMigrationSql}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedSql ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                <span>{copiedSql ? "Copied!" : "Copy SQL"}</span>
              </button>
            </div>

            {/* Instructions */}
            <div className="space-y-2 text-xs text-[#555] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E2D8] mb-6">
              <p className="font-semibold text-[#333]">Quick Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-[#666]">
                <li>Click <strong>Copy SQL</strong> above.</li>
                <li>Open your <strong>Supabase Dashboard &rarr; SQL Editor</strong>.</li>
                <li>Paste the query and click <strong>Run</strong>.</li>
                <li>Come back here and click <strong>Retry Saving</strong>.</li>
              </ol>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowMigrationModal(false)}
                className="px-4 py-2.5 rounded-xl border border-[#DDD6CC] hover:bg-[#FAF8F5] text-xs font-medium text-[#555] transition-all cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setShowMigrationModal(false);
                  handleSaveOrder();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F6743] hover:bg-[#3E5234] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#4F6743]/20 cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>Retry Saving</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#E8E2D8] text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} />
            </div>
            <h4 className="text-lg font-serif font-semibold text-[#1F1F1F]">
              Delete Project?
            </h4>
            <p className="text-xs text-[#8C8275] mt-1 mb-6">
              Are you sure you want to delete this project? This will permanently remove it from the live website.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#DDD6CC] hover:bg-[#FAF8F5] text-xs font-medium text-[#555] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-all shadow-md shadow-red-600/20 disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
