"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectSubmissionPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vercelUrl, setVercelUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your Full Name as registered in attendance.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid registered Email address.");
      return;
    }

    if (!vercelUrl.trim()) {
      setError("Please enter your Project Live Link / Vercel URL.");
      return;
    }

    if (!githubUrl.trim()) {
      setError("Please enter your GitHub Repository Link.");
      return;
    }

    if (!description.trim() || description.trim().length < 10) {
      setError("Please write a detailed project description (at least 10 characters).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/event/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          vercelUrl: vercelUrl.trim(),
          githubUrl: githubUrl.trim(),
          instagramId: instagramId.trim(),
          description: description.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit project.");
      }

      setSuccessData(data.submission);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-[#ED1C24] selection:text-white relative overflow-hidden flex flex-col justify-between">
      <Navbar />

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ED1C24]/15 blur-[140px] rounded-full pointer-events-none" />

      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full z-10">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ED1C24]/10 border border-[#ED1C24]/30 text-[#ED1C24] text-xs font-bold uppercase tracking-widest mb-4">
            🚀 MATRIX DELHI 2026
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-none mb-4">
            PROJECT <span className="text-[#ED1C24]">SUBMISSION</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Submit your hackathon project details below. Verification will check your event attendance in real time.
          </p>
        </div>

        {/* Guidelines Box */}
        <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-xs space-y-2 text-gray-300">
          <div className="font-extrabold uppercase tracking-wider text-[#ED1C24] text-[11px] flex items-center gap-2">
            <span>🛡️</span> SUBMISSION RULES &amp; ELIGIBILITY
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-300 opacity-90 leading-relaxed text-[11px]">
            <li>
              <strong>Team Leader:</strong> Must submit from their registered email if present at the event today.
            </li>
            <li>
              <strong>Team Member:</strong> Authorized to submit <em>only if</em> the Team Leader is marked absent today.
            </li>
            <li>
              <strong>Verification:</strong> Your name and email must match your registered attendance pass in the database.
            </li>
          </ul>
        </div>

        {/* Submission Form or Success View */}
        {successData ? (
          <div className="bg-gray-900/90 border border-green-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h2 className="font-display font-black text-2xl uppercase text-white">
                PROJECT SUBMITTED SUCCESSFULLY!
              </h2>
              <p className="text-xs text-gray-400">
                Your hackathon project has been recorded in the Matrix Delhi database.
              </p>
            </div>

            <div className="space-y-3 bg-black/40 p-5 rounded-2xl border border-white/10 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400 font-bold uppercase">Team Name:</span>
                <span className="font-extrabold text-white">{successData.team_name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400 font-bold uppercase">Submitted By:</span>
                <span className="font-bold text-white">{successData.submitter_name} ({successData.submitter_role})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400 font-bold uppercase">Email:</span>
                <span className="font-mono text-gray-300">{successData.submitter_email}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400 font-bold uppercase">Live Vercel Link:</span>
                <a
                  href={successData.vercel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ED1C24] hover:underline font-mono truncate max-w-[200px] sm:max-w-[300px]"
                >
                  {successData.vercel_url}
                </a>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400 font-bold uppercase">GitHub Repo:</span>
                <a
                  href={successData.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ED1C24] hover:underline font-mono truncate max-w-[200px] sm:max-w-[300px]"
                >
                  {successData.github_url}
                </a>
              </div>
              {successData.instagram_id && (
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400 font-bold uppercase">Instagram Handle:</span>
                  <span className="font-mono text-purple-400 font-bold">{successData.instagram_id}</span>
                </div>
              )}
              <div className="pt-1">
                <span className="text-gray-400 font-bold uppercase block mb-1">Description:</span>
                <p className="text-gray-300 leading-relaxed italic bg-white/5 p-3 rounded-xl border border-white/5">
                  "{successData.description}"
                </p>
              </div>
            </div>

            <button
              onClick={() => setSuccessData(null)}
              className="w-full py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              EDIT / RESUBMIT PROJECT →
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/80 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5"
          >
            {error && (
              <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800 text-xs font-semibold text-[#ED1C24] flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">⚠️</span>
                <div>{error}</div>
              </div>
            )}

            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                1. Full Name <span className="text-[#ED1C24]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Must match your registered attendance name"
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all placeholder:text-gray-500"
              />
            </div>

            {/* 2. Registered Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                2. Registered Email Address <span className="text-[#ED1C24]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Must match your registered email address"
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all placeholder:text-gray-500"
              />
            </div>

            {/* 3. Live Demo / Vercel Link */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                3. Project Live Link (Vercel / Hosted Demo) <span className="text-[#ED1C24]">*</span>
              </label>
              <input
                type="url"
                required
                value={vercelUrl}
                onChange={(e) => setVercelUrl(e.target.value)}
                placeholder="https://my-matrix-project.vercel.app"
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all placeholder:text-gray-500 font-mono"
              />
            </div>

            {/* 4. GitHub Repo */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                4. GitHub Repository Link <span className="text-[#ED1C24]">*</span>
              </label>
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/project-repo"
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all placeholder:text-gray-500 font-mono"
              />
            </div>

            {/* 5. Instagram Handle / ID */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                5. Instagram Handle / ID
              </label>
              <input
                type="text"
                value={instagramId}
                onChange={(e) => setInstagramId(e.target.value)}
                placeholder="e.g. @your_instagram_handle"
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all placeholder:text-gray-500 font-mono"
              />
            </div>

            {/* 6. Project Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                6. Project Description <span className="text-[#ED1C24]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what your project does, the tech stack used, and the problem it solves..."
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all placeholder:text-gray-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "VERIFYING & SUBMITTING..." : "SUBMIT PROJECT →"}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
