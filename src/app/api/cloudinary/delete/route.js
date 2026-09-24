import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@/lib/supabase/server";

// Configure Cloudinary with server-side environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dtmclm31h",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    // 1. Verify that the requester is an authenticated admin via Supabase session
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    // 2. Parse payload: { publicIds: string[] } or { publicId: string }
    const body = await request.json();
    const publicIds = Array.isArray(body.publicIds)
      ? body.publicIds.filter(Boolean)
      : body.publicId
      ? [body.publicId]
      : [];

    if (publicIds.length === 0) {
      return NextResponse.json(
        { success: true, message: "No publicIds provided to delete." },
        { status: 200 }
      );
    }

    // If Cloudinary API Secret is not configured, warn gracefully but don't crash
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.warn(
        "CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET is missing. Skipping remote Cloudinary asset deletion."
      );
      return NextResponse.json(
        {
          success: false,
          warning:
            "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET not set in environment variables.",
          skippedIds: publicIds,
        },
        { status: 200 }
      );
    }

    // 3. Delete resources in batch from Cloudinary
    const result = await cloudinary.api.delete_resources(publicIds);

    return NextResponse.json({
      success: true,
      result,
      deletedCount: Object.keys(result.deleted || {}).length,
    });
  } catch (error) {
    console.error("Error deleting Cloudinary image(s):", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete Cloudinary asset(s)" },
      { status: 500 }
    );
  }
}
