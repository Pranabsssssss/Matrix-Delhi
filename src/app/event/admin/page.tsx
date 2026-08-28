"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimatedLogo from "@/components/AnimatedLogo";
import ThemeToggle from "@/components/ThemeToggle";

interface StudentData {
  id: number;
  name: string;
  email: string;
  team_name: string;
  qr_token: string;
  has_attended: number;
  scanned_at: string | null;
  created_at?: string;
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return "—";
  const str = String(dateString).trim();
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2}):(\d{2})/);
  if (match) {
    const [, y, m, d, hh, mm, ss] = match;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let hour = parseInt(hh, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    const formattedHour = String(hour).padStart(2, "0");
    return `${d} ${months[parseInt(m, 10) - 1]} ${y}, ${formattedHour}:${mm}:${ss} ${ampm} (GMT+5:30)`;
  }
  return str;
}

export default function AdminDashboardPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [students, setStudents] = useState<StudentData[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"attendance" | "submissions">("attendance");

  const [stats, setStats] = useState({
    totalRegistered: 0,
    totalPresent: 0,
    totalAbsent: 0,
    attendancePercentage: "0",
    totalSubmissions: 0,
  });

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "present" | "absent">("all");

  // 1. Check existing Admin session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/event/auth?role=admin");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthenticated(true);
          }
        }
      } catch (e) {}
    }
    checkAuth();
  }, []);

  // 2. Load Attendance & Submissions Dataset
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/event/admin");
      const data = await res.json();
      if (res.ok && data.success) {
        setStudents(data.students || []);
        setSubmissions(data.submissions || []);

        setStats(data.stats || { totalRegistered: 0, totalPresent: 0, totalAbsent: 0, attendancePercentage: "0", totalSubmissions: 0 });
      }
    } catch (e) {
      console.error("Dashboard data load error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadDashboardData();
    }
  }, [authenticated]);

  // 3. Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch("/api/event/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, role: "admin" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid admin password.");
      }

      setAuthenticated(true);
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  // 4. Toggle Attendance Status
  const handleToggleAttendance = async (token: string) => {
    try {
      const res = await fetch("/api/event/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_attendance", token }),
      });
      if (res.ok) {
        await loadDashboardData();
      }
    } catch (e) {}
  };

  // 5. Export CSV Report
  const handleExportCsv = () => {
    if (filteredStudents.length === 0) return;

    const headers = ["Student ID", "Real Name (Aadhaar)", "Email Address", "Team Name", "QR Token", "Attendance Status", "Attendance Value (0/1)", "Scanned Time"];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.team_name.replace(/"/g, '""')}"`,
      s.qr_token,
      s.has_attended === 1 ? "PRESENT" : "ABSENT",
      s.has_attended,
      s.scanned_at ? `"${formatDate(s.scanned_at)}"` : "N/A",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `matrix-delhi-attendance-report-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 6. Filter Students Dataset
  const filteredStudents = students.filter((s) => {
    // Search Filter (Name / Email)
    const matchesSearch =
      searchQuery.trim() === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.qr_token.toLowerCase().includes(searchQuery.toLowerCase());

    // Team Filter
    const matchesTeam = selectedTeam === "all" || s.team_name === selectedTeam;

    // Status Filter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "present" && s.has_attended === 1) ||
      (statusFilter === "absent" && s.has_attended === 0);

    return matchesSearch && matchesTeam && matchesStatus;
  });

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-500">
        <header className="border-b border-gray-200 dark:border-white/10 py-6 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <AnimatedLogo size="md" />
              <div className="flex flex-col">
                <span className="font-display font-black text-lg tracking-wider text-black dark:text-white leading-none">
                  MATRIX
                </span>
                <span className="text-[9px] font-bold text-[#ED1C24] tracking-[0.25em] leading-tight">
                  —DELHI—
                </span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-16 text-center flex-grow flex flex-col justify-center">
          <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/90 dark:border-white/15 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/60 text-[#ED1C24] flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>

            <span className="text-[10px] font-bold text-[#ED1C24] tracking-widest uppercase block mb-1">
              ORGANIZER CONTROL PANEL
            </span>
            <h2 className="font-display font-black text-2xl uppercase tracking-wide text-gray-950 dark:text-white mb-6">
              ADMIN DASHBOARD LOGIN
            </h2>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs font-semibold text-[#ED1C24] mb-4">
                ⚠️ {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Admin Master Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {authLoading ? "AUTHENTICATING..." : "ACCESS ADMIN DASHBOARD →"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-500 pb-16">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-white/10 py-5 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="sm" />
            <span className="font-display font-black text-lg text-gray-950 dark:text-white">
              ADMIN ATTENDANCE DASHBOARD
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV Report
            </button>

            <ThemeToggle />

            <button
              onClick={() => setAuthenticated(false)}
              className="text-xs font-bold text-gray-500 hover:text-red-500 uppercase tracking-wider"
            >
              Lock Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Live Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              TOTAL REGISTERED
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-3xl text-gray-950 dark:text-white">
                {stats.totalRegistered}
              </span>
              <span className="text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                Students
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
              PRESENT / CHECKED IN
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-3xl text-emerald-600 dark:text-emerald-400">
                {stats.totalPresent}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
                Attended
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
              ABSENT / PENDING
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-3xl text-amber-600 dark:text-amber-400">
                {stats.totalAbsent}
              </span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md">
                Pending
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-[#ED1C24] uppercase tracking-widest block mb-1">
              ATTENDANCE RATE
            </span>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-display font-black text-3xl text-[#ED1C24]">
                {stats.attendancePercentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ED1C24] transition-all duration-500"
                style={{ width: `${stats.attendancePercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest block mb-1">
              PROJECT SUBMISSIONS
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-3xl text-purple-600 dark:text-purple-400">
                {stats.totalSubmissions || 0}
              </span>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-md">
                Projects
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Tab Bar */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === "attendance"
                ? "bg-[#ED1C24] text-white shadow-md"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10"
            }`}
          >
            📋 Attendance Records ({students.length})
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === "submissions"
                ? "bg-[#ED1C24] text-white shadow-md"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10"
            }`}
          >
            🚀 Project Submissions ({submissions.length})
          </button>
        </div>

        {activeTab === "attendance" ? (
          <>
            {/* Filter Controls Bar */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 w-full md:w-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search by student name, email, or QR token..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#ED1C24]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none"
                >
                  <option value="all">All Teams</option>
                  {[...new Set(students.map((s) => s.team_name))].filter(Boolean).sort().map((tn) => (
                    <option key={tn} value={tn}>
                      {tn}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none"
                >
                  <option value="all">All Attendance</option>
                  <option value="present">Present Only (1)</option>
                  <option value="absent">Absent Only (0)</option>
                </select>

                <button
                  onClick={loadDashboardData}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-bold uppercase transition-all"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>

            {/* Dataset Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                    <tr>
                      <th className="py-3.5 px-4">ID</th>
                      <th className="py-3.5 px-4">Student Name (Aadhaar)</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Team</th>
                      <th className="py-3.5 px-4">QR Token</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Value</th>
                      <th className="py-3.5 px-4">Scanned Time</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-medium">
                    {loading ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-gray-500 font-bold">
                          Loading attendance records...
                        </td>
                      </tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-gray-500 font-bold">
                          No matching student attendance records found.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((s) => (
                        <tr
                          key={s.id || s.qr_token}
                          className="hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors"
                        >
                          <td className="py-3.5 px-4 text-gray-400 font-mono">{s.id}</td>
                          <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">
                            {s.name}
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{s.email}</td>
                          <td className="py-3.5 px-4 font-semibold text-gray-800 dark:text-gray-200">
                            {s.team_name}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500">{s.qr_token}</td>
                          <td className="py-3.5 px-4">
                            {s.has_attended === 1 ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                PRESENT
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                ABSENT
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold">
                            {s.has_attended}
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                            {formatDate(s.scanned_at)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleToggleAttendance(s.qr_token)}
                              className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase transition-all ${
                                s.has_attended === 1
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                  : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              }`}
                            >
                              {s.has_attended === 1 ? "Mark Absent" : "Mark Present"}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Project Submissions Table */
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Team Name</th>
                    <th className="py-3.5 px-4">Submitted By</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Live Vercel Link</th>
                    <th className="py-3.5 px-4">GitHub Repo</th>
                    <th className="py-3.5 px-4">Instagram</th>
                    <th className="py-3.5 px-4">Project Description</th>
                    <th className="py-3.5 px-4">Submitted Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-500 font-bold">
                        Loading project submissions...
                      </td>
                    </tr>
                  ) : submissions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-500 font-bold">
                        No project submissions recorded yet.
                      </td>
                    </tr>
                  ) : (
                    submissions.map((sub) => (
                      <tr key={sub.id || sub.team_name} className="hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">
                          {sub.team_name}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-gray-900 dark:text-white">{sub.submitter_name}</div>
                          <div className="text-[11px] text-gray-400 font-mono">{sub.submitter_email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            sub.submitter_role === "leader" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                          }`}>
                            {sub.submitter_role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono">
                          <a
                            href={sub.vercel_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ED1C24] hover:underline truncate max-w-[150px] inline-block"
                          >
                            {sub.vercel_url}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 font-mono">
                          <a
                            href={sub.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ED1C24] hover:underline truncate max-w-[150px] inline-block"
                          >
                            {sub.github_url}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-purple-600 dark:text-purple-400 font-bold">
                          {sub.instagram_id || "—"}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-gray-600 dark:text-gray-300 truncate" title={sub.description}>
                          {sub.description}
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                          {formatDate(sub.submitted_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
