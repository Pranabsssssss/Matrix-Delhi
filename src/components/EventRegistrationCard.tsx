"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventRegistrationCard() {
  const router = useRouter();

  const [mode, setMode] = useState<"register" | "lookup">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your Real Name as per Aadhaar.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {


      const res = await fetch("/api/event/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Registration failed.");
      }

      // Redirect to student QR page
      router.push(`/event/qr?token=${encodeURIComponent(data.student.qr_token)}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/event/student?email=${encodeURIComponent(email.trim().toLowerCase())}`);
      const data = await res.json();

      if (!res.ok || !data.success || !data.student) {
        throw new Error("No registration record found for this email address.");
      }

      router.push(`/event/qr?token=${encodeURIComponent(data.student.qr_token)}`);
    } catch (err: any) {
      setError(err.message || "Record not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all">
      {/* Tab Switcher */}
      <div className="flex items-center justify-center p-1 bg-gray-100 dark:bg-white/10 rounded-2xl mb-6">
        <button
          onClick={() => {
            setMode("register");
            setError(null);
          }}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
            mode === "register"
              ? "bg-[#ED1C24] text-white shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          }`}
        >
          STUDENT REGISTRATION
        </button>
        <button
          onClick={() => {
            setMode("lookup");
            setError(null);
          }}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
            mode === "lookup"
              ? "bg-[#ED1C24] text-white shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          }`}
        >
          LOOKUP QR PASS
        </button>
      </div>

      {mode === "register" ? (
        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
          <div className="text-center mb-3">
            <span className="text-[10px] font-bold text-[#ED1C24] tracking-widest uppercase block mb-1">
              ATTENDANCE &amp; QR GATEWAY
            </span>
            <h3 className="font-display font-black text-xl text-gray-950 dark:text-white uppercase">
              STUDENT CHECK-IN PASS
            </h3>
          </div>

          {/* Limited Seats Urgency Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 text-xs font-semibold leading-relaxed shadow-xs">
            <div className="flex items-start gap-2.5">
              <span className="text-base flex-shrink-0">⚡</span>
              <div>
                <span className="font-extrabold uppercase tracking-wide block text-[#ED1C24] dark:text-red-400 text-[11px] mb-0.5">
                  LIMITED SEATS — ONLY FIRST 120 CAN REGISTER!
                </span>
                <p className="text-[11px] opacity-90 leading-snug">
                  Only the first 120 students will be able to register and claim their attendance pass. Hurry up, we have limited seats! After that, this form will be closed for registration.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs font-semibold text-[#ED1C24]">
              ⚠️ {error}
            </div>
          )}

          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
              Full Name <span className="text-[#ED1C24] font-black">(Real Name as per Aadhaar)</span> *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aarav@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "GENERATING QR PASS..." : "GET MY ATTENDANCE QR PASS →"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLookupSubmit} className="space-y-4 text-left">
          <div className="text-center mb-4">
            <span className="text-[10px] font-bold text-[#ED1C24] tracking-widest uppercase block mb-1">
              EXISTING ATTENDEE LOOKUP
            </span>
            <h3 className="font-display font-black text-xl text-gray-950 dark:text-white uppercase">
              RETRIEVE MY QR PASS
            </h3>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs font-semibold text-[#ED1C24]">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
              Registered Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aarav@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "SEARCHING..." : "VIEW MY QR PASS →"}
          </button>
        </form>
      )}
    </div>
  );
}
