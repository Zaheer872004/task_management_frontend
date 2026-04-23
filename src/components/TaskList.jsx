import TaskCard from "./TaskCard";

export default function TaskList({ loading, tasks, userId, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400">
        Loading tasks...
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-12 text-center">
        <p className="text-2xl font-semibold text-slate-200">No tasks found</p>
        <p className="text-slate-400 mt-2">Create a new task or adjust filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          userId={userId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}