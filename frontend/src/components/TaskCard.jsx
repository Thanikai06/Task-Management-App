const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusClass = {
    pending: 'bg-amber-100 text-amber-900',
    'in progress': 'bg-sky-100 text-sky-900',
    completed: 'bg-emerald-100 text-emerald-900',
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{task.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{task.description || 'No description added yet.'}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[task.status]}`}>
            {task.status}
          </span>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {task.priority}
          </span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        {task.dueDate && <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>}
        <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => onEdit(task)}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:border-red-700 dark:bg-red-950/20 dark:text-red-200 dark:hover:bg-red-900/50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
