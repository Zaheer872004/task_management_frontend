import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { usersApi } from "../api/auth.api";
import {
  createTaskApi,
  deleteTaskApi,
  getTasksApi,
  updateTaskApi,
} from "../api/task.api";
import { useAuth } from "../context/AuthContext";
import { TASK_STATUS, TASK_TYPE } from "../utils/constants";
import { getEditableFields } from "../utils/taskPermissions";

const getId = (val) => (typeof val === "string" ? val : val?._id);

export default function useDashboardTasks() {
  const { userId } = useAuth();

  const [allTasks, setAllTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");
  const [ownershipFilter, setOwnershipFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [pageLoading, setPageLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizeStatus = (status) => {
    const s = String(status || "").trim().toLowerCase();
    if (s === "to do") return TASK_STATUS.TODO;
    if (s === "in progress") return TASK_STATUS.IN_PROGRESS;
    if (s === "completed") return TASK_STATUS.DONE;
    if ([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE].includes(s)) return s;
    return TASK_STATUS.TODO;
  };

  const toISODate = (dateValue) => {
    if (!dateValue) return undefined;
    if (String(dateValue).includes("T")) return dateValue;
    return new Date(`${dateValue}T00:00:00.000Z`).toISOString();
  };

  const loadData = async () => {
    setError("");
    try {
      const [taskRes, userRes] = await Promise.all([getTasksApi(), usersApi()]);
      const taskList = taskRes?.data?.data?.tasks ?? [];
      const userList = userRes?.data?.data?.users ?? [];

      setAllTasks(Array.isArray(taskList) ? taskList : []);
      setUsers(Array.isArray(userList) ? userList.filter((u) => u._id !== userId) : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch tasks");
      setAllTasks([]);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateOrUpdate = async (payload) => {
    setFormLoading(true);
    try {
      if (!selectedTask) {
        const hasAssignee = Boolean(payload.assignee);
        const createPayload = {
          title: payload.title?.trim(),
          description: payload.description?.trim() || "",
          status: normalizeStatus(payload.status),
          taskType: hasAssignee ? TASK_TYPE.ASSIGNED : TASK_TYPE.PERSONAL,
          ...(hasAssignee ? { assignee: payload.assignee } : {}),
        };

        const dueDateISO = toISODate(payload.dueDate);
        if (dueDateISO) createPayload.dueDate = dueDateISO;

        Object.keys(createPayload).forEach((k) => {
          if (createPayload[k] === undefined || createPayload[k] === null || createPayload[k] === "") {
            delete createPayload[k];
          }
        });

        await createTaskApi(createPayload);
        toast.success("Task created successfully");
      } else {
        const allowed = getEditableFields(selectedTask, userId);
        const filtered = Object.fromEntries(
          Object.entries(payload).filter(([k, v]) => allowed.includes(k) && v !== "")
        );

        if (filtered.status) filtered.status = normalizeStatus(filtered.status);
        if (filtered.dueDate) filtered.dueDate = toISODate(filtered.dueDate);

        if (!Object.keys(filtered).length) {
          toast.error("No permitted fields to update");
          return;
        }

        await updateTaskApi(selectedTask._id, filtered);
        toast.success("Task updated successfully");
      }

      closeModal();
      await loadData();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0] ||
          err?.message ||
          "Action failed"
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (task) => {
    try {
      await deleteTaskApi(task._id);
      toast.success("Task deleted successfully");
      await loadData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const createdByMeCount = useMemo(
    () => allTasks.filter((t) => getId(t?.createdBy) === userId).length,
    [allTasks, userId]
  );

  const assignedToMeCount = useMemo(
    () => allTasks.filter((t) => getId(t?.assignee) === userId).length,
    [allTasks, userId]
  );

  const tasks = useMemo(() => {
    let list = [...allTasks];

    if (ownershipFilter === "created_by_me") {
      list = list.filter((t) => getId(t?.createdBy) === userId);
    } else if (ownershipFilter === "assigned_to_me") {
      list = list.filter((t) => getId(t?.assignee) === userId);
    }

    if (statusFilter !== "all") {
      list = list.filter((t) => t.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t?.title?.toLowerCase().includes(q) ||
          t?.description?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allTasks, ownershipFilter, statusFilter, search, userId]);

  return {
    userId,
    users,
    tasks,
    selectedTask,
    isModalOpen,
    statusFilter,
    ownershipFilter,
    search,
    pageLoading,
    formLoading,
    error,
    createdByMeCount,
    assignedToMeCount,
    setStatusFilter,
    setOwnershipFilter,
    setSearch,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreateOrUpdate,
    handleDelete,
  };
}