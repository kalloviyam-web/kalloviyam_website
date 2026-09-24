"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const checkActiveSession = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.replace("/admin");
      }
    };
    checkActiveSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      if (data?.user) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F0EA] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 sm:p-10 border border-[#E8E2D8]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#4F6743]/10 text-[#4F6743] mb-4">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#1F1F1F] tracking-tight">
            Kalloviyam Admin
          </h1>
          <p className="text-xs uppercase tracking-[2px] text-[#8C8275] mt-1 font-medium">
            Management Portal
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[1.5px] text-[#555] font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8275]">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kalloviyam.com"
                className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-[#1F1F1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[1.5px] text-[#555] font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8275]">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-[#1F1F1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6743] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#4F6743] hover:bg-[#3E5234] text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#4F6743]/20 disabled:opacity-70 cursor-pointer mt-6"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-[#F0EBE1]">
          <p className="text-xs text-[#A0988D]">
            Protected Area • Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}
