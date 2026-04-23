export const TASK_STATUS = Object.freeze({
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
});

export const TASK_TYPE = Object.freeze({
  PERSONAL: "personal",
  ASSIGNED: "assigned",
});

export const STATUS_TABS = [
  { key: "all", label: "All Tasks" },
  { key: TASK_STATUS.TODO, label: "To Do" },
  { key: TASK_STATUS.IN_PROGRESS, label: "In Progress" },
  { key: TASK_STATUS.DONE, label: "Completed" },
];

