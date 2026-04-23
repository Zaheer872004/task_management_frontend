import { useEffect, useMemo, useState } from "react";
import { User, Calendar, FileText, Type, CheckCircle } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  status: "todo",
  dueDate: "",
  assignee: "",
};

export default function TaskForm({
  users,
  selectedTask,
  editableFields,
  onSubmit,
  onCancelEdit,
  loading,
}) {
  const [form, setForm] = useState(initialForm);

  const isEdit = !!selectedTask;

  useEffect(() => {
    if (!selectedTask) {
      setForm(initialForm);
      return;
    }
    setForm({
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      status: selectedTask?.status || "todo",
      dueDate: selectedTask?.dueDate ? selectedTask.dueDate.slice(0, 10) : "",
      assignee: selectedTask?.assignee?._id || selectedTask?.assignee || "",
    });
  }, [selectedTask]);

  const canEditField = (field) => {
    if (!isEdit) return true;
    return editableFields?.includes(field);
  };

  const handleChange = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...form };
    if (!payload.description) delete payload.description;
    if (!payload.dueDate) delete payload.dueDate;
    if (!payload.assignee) delete payload.assignee;

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Type size={16} className="text-indigo-400" />
          Task Title
        </label>
        <input
          className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="e.g. Design new landing page"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          disabled={!canEditField("title")}
          required={!isEdit || canEditField("title")}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <CheckCircle size={16} className="text-indigo-400" />
            Status
          </label>
          <select
            className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            disabled={!canEditField("status")}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Calendar size={16} className="text-indigo-400" />
            Due Date
          </label>
          <input
            type="date"
            className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            value={form.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            disabled={!canEditField("dueDate")}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <FileText size={16} className="text-indigo-400" />
          Description
        </label>
        <textarea
          className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed min-h-[100px] resize-none"
          placeholder="Add details about this task..."
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          disabled={!canEditField("description")}
        />
      </div>

      {/* Assignment / Permissions */}
      {!isEdit && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <User size={16} className="text-indigo-400" />
              Assign User
            </label>
            <span className="text-xs text-slate-500 font-medium bg-slate-800 px-2 py-0.5 rounded-full">
              Permissions edit
            </span>
          </div>
          <select
            className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
            value={form.assignee}
            onChange={(e) => handleChange("assignee", e.target.value)}
          >
            <option value="">Personal task (Only you can edit)</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.fullName} ({u.email}) - Will have permission to update status
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">
            Assigning a user grants them permission to edit the task's status.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 flex gap-3 justify-end items-center border-t border-slate-700/50">
        {isEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-2.5 text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
        >
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
