import { Calendar, UserCircle2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { formatDate } from "../utils/formatDate";
import { canDeleteTask, getEditableFields } from "../utils/taskPermissions";

function StatusBadge({ status }) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle2 size={12} />
        Done
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
        <Clock size={12} />
        In Progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
      <AlertCircle size={12} />
      To Do
    </span>
  );
}

const getId = (v) => (typeof v === "string" ? v : v?._id);

export default function TaskCard({ task, userId, onEdit, onDelete }) {
  const editable = getEditableFields(task, userId);
  const canEdit = editable.length > 0;
  const canDelete = canDeleteTask(task, userId);

  const createdById = getId(task?.createdBy);
  const assigneeId = getId(task?.assignee);

  const isAssignedToMe = !!assigneeId && assigneeId === userId;
  const isCreatedByMe = createdById === userId;

  let userText = "Personal task";

  if (isAssignedToMe) {
    userText = `Assigner: ${task?.createdBy?.fullName || "Unknown"}`;
  } else if (isCreatedByMe && assigneeId) {
    userText = `Assignee: ${task?.assignee?.fullName || "Unknown"}`;
  }

  return (
    <div className="group glass-panel rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full border border-slate-700/50 hover:border-indigo-500/30">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-lg text-white leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">
          {task.title}
        </h3>
        <div className="shrink-0">
          <StatusBadge status={task.status} />
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
        {task.description || "No description provided."}
      </p>

      <div className="mt-auto space-y-4">
        <div className="grid grid-cols-2 text-xs text-slate-300 gap-y-2">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-slate-500" />
            <span className={!task.dueDate ? "text-slate-600" : ""}>
              {task.dueDate ? formatDate(task.dueDate) : "No due date"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <UserCircle2 size={14} className="text-indigo-400/70" />
            <span className="truncate" title={userText}>
              {userText}
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        <div className="flex justify-end gap-2">
          {canDelete && (
            <button
              onClick={() => onDelete(task)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500 transition-all"
            >
              Delete
            </button>
          )}
          {canEdit && (
            <button
              onClick={() => onEdit(task)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-indigo-400 hover:text-white bg-slate-800 hover:bg-indigo-600 transition-all shadow-sm"
            >
              Edit Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}