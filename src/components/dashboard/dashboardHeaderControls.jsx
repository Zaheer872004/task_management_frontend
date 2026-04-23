import { Plus } from "lucide-react";

export default function DashboardHeaderControls({
  onCreate,
  ownershipFilter,
  setOwnershipFilter,
  totalCount,
  createdByMeCount,
  assignedToMeCount,
}) {
  const cardClass = (active, activeClasses) =>
    `rounded-xl border px-4 py-3 text-left transition ${
      active ? activeClasses : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
    }`;

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Workspace</h1>
          <p className="text-slate-400">Manage your projects and collaborate with your team.</p>
        </div>

        <button
          onClick={onCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus size={18} />
          Create Task
        </button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setOwnershipFilter("all")}
          className={cardClass(
            ownershipFilter === "all",
            "border-indigo-500 bg-indigo-500/10"
          )}
        >
          <p className="text-sm text-slate-400">All Related Tasks</p>
          <p className="text-lg font-semibold text-white">{totalCount}</p>
        </button>

        <button
          onClick={() => setOwnershipFilter("created_by_me")}
          className={cardClass(
            ownershipFilter === "created_by_me",
            "border-violet-500 bg-violet-500/10"
          )}
        >
          <p className="text-sm text-slate-400">Created by me</p>
          <p className="text-lg font-semibold text-white">{createdByMeCount}</p>
        </button>

        <button
          onClick={() => setOwnershipFilter("assigned_to_me")}
          className={cardClass(
            ownershipFilter === "assigned_to_me",
            "border-emerald-500 bg-emerald-500/10"
          )}
        >
          <p className="text-sm text-slate-400">Assigned to me</p>
          <p className="text-lg font-semibold text-white">{assignedToMeCount}</p>
        </button>
      </section>
    </>
  );
}