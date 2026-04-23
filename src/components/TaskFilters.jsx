import { Search } from "lucide-react";

export default function TaskFilters({
  tabs,
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-panel p-2 rounded-2xl">
      {/* Tabs / Segmented Control */}
      <div className="flex items-center w-full md:w-auto p-1 bg-slate-900/50 rounded-xl">
        {tabs.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        />
      </div>
    </div>
  );
}