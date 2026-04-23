const getId = (v) => (typeof v === "string" ? v : v?._id);

export function getTaskRole(task, userId) {
  const createdBy = getId(task?.createdBy);
  const assignee = getId(task?.assignee);

  if (!assignee && createdBy === userId) return "personal_owner";
  if (assignee && createdBy === userId) return "assigner";
  if (assignee && assignee === userId) return "assignee";
  return "none";
}

export function getEditableFields(task, userId) {
  const role = getTaskRole(task, userId);
  if (role === "personal_owner") return ["title", "description", "status", "dueDate"];
  if (role === "assigner") return ["title", "description","dueDate"];
  if (role === "assignee") return ["status"];
  return [];
}

export function canDeleteTask(task, userId) {
  const role = getTaskRole(task, userId);
  return role === "personal_owner" || role === "assigner";
}