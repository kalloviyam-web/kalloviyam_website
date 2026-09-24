"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchError, setFetchError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setFetchError("");

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

      // 2. Fetch all projects from Supabase
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error.message || error);
        setFetchError(error.message || "Failed to fetch projects");
        return;
      }
      setProjects(data || []);
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

      setProjects(projects.filter((p) => p.id !== id));
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
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DDD6CC] hover:bg-[#FAF8F5] text-xs font-medium text-[#555] transition-all"
            >
              <span>View Website</span>
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

        {/* Dashboard Stats & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-serif text-[#1F1F1F]">
              Projects Management
            </h2>
            <p className="text-xs text-[#8C8275] mt-0.5">
              Total <strong>{projects.length}</strong> active projects on live website
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
              className="p-2.5 bg-white border border-[#DDD6CC] hover:bg-[#FAF8F5] rounded-xl text-[#555] transition-all"
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

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
            {filteredProjects.map((project) => {
              const coverImg = project.gallery_images?.[0]?.imageUrl;
              const imageCount = project.gallery_images?.length || 0;

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] bg-black overflow-hidden">
                      {coverImg ? (
                        <img
                          src={coverImg}
                          alt={project.project_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
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
