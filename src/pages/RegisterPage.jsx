import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center p-4">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* Left panel */}
          <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-fuchsia-600/25 via-violet-600/20 to-indigo-600/25 p-10">
            <div>
              <h1 className="text-3xl font-bold">Join TaskMaster</h1>
              <p className="mt-3 text-slate-200/90">
                Build momentum with structured tasks, clear ownership, and role-safe updates.
              </p>
            </div>
            <div className="space-y-3 text-sm text-slate-200/90">
              <p>🔐 Secure authentication</p>
              <p>📌 Personal + assigned task flows</p>
              <p>⚡ Smooth and responsive interface</p>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
              <p className="mt-2 text-slate-400">Start managing tasks smarter</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-300">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}