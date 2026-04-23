import NavBar from "../components/Navbar.jsx";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Modal from "../components/ui/Modal";
import { STATUS_TABS } from "../utils/constants.js";
import { getEditableFields } from "../utils/taskPermissions.js";
import DashboardHeaderControls from "../components/dashboard/dashboardHeaderControls.jsx";
import useDashboardTasks from "../hooks/useDashboardTasks.js";

export default function DashboardPage() {
  const {
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
  } = useDashboardTasks();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <NavBar />

      <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 space-y-6">
        <DashboardHeaderControls
          onCreate={openCreateModal}
          ownershipFilter={ownershipFilter}
          setOwnershipFilter={setOwnershipFilter}
          totalCount={tasks.length}
          createdByMeCount={createdByMeCount}
          assignedToMeCount={assignedToMeCount}
        />

        {error && (
          <div className="rounded-xl border border-rose-500/50 bg-rose-500/10 px-4 py-3 text-rose-300">
            {error}
          </div>
        )}

        <TaskFilters
          tabs={STATUS_TABS}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
          search={search}
          onSearchChange={setSearch}
        />

        <TaskList
          loading={pageLoading}
          tasks={tasks}
          userId={userId}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedTask ? "Update Task" : "Create New Task"}
      >
        <TaskForm
          users={users}
          selectedTask={selectedTask}
          editableFields={selectedTask ? getEditableFields(selectedTask, userId) : null}
          onSubmit={handleCreateOrUpdate}
          onCancelEdit={closeModal}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
}