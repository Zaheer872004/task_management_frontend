import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-800 bg-slate-900/70">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-indigo-400">TaskMaster</h1>
        <div className="flex items-center gap-3">
          <span className="text-slate-300">Welcome, {user?.fullName || "User"}</span>
          <button
            onClick={logout}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}