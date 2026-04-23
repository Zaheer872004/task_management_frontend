import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center p-4">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* Left panel */}
          <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-600/30 via-violet-600/20 to-fuchsia-600/20 p-10">
            <div>
              <h1 className="text-3xl font-bold">TaskMaster</h1>
              <p className="mt-3 text-slate-200/90">
                Organize personal and assigned tasks with secure role-based workflow.
              </p>
            </div>
            <div className="space-y-3 text-sm text-slate-200/90">
              <p>✅ JWT Auth + Refresh</p>
              <p>✅ Role-based task permissions</p>
              <p>✅ Clean productivity dashboard</p>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Login</h2>
              <p className="mt-2 text-slate-400">Access your workspace</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
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
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}