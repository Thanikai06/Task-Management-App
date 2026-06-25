import { useEffect, useMemo, useState } from 'react';
import api from '../utils/api';
import Button from '../components/Button';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = filterStatus ? task.status === filterStatus : true;
      const matchesPriority = filterPriority ? task.priority === filterPriority : true;
      const matchesSearch = search ? task.title.toLowerCase().includes(search.toLowerCase()) : true;
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, filterStatus, filterPriority, search]);

  const handleSaveTask = async (formValues) => {
    try {
      if (selectedTask) {
        const response = await api.put(`/tasks/${selectedTask._id}`, formValues);
        setTasks((prev) => prev.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await api.post('/tasks', formValues);
        setTasks((prev) => [response.data, ...prev]);
      }
      setSelectedTask(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete task');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tasks</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Create, update, and organize your work with ease.</p>
          </div>
          <Button onClick={() => setSelectedTask({})}>New Task</Button>
        </div>
      </div>

      {selectedTask !== null && (
        <TaskForm
          task={selectedTask._id ? selectedTask : null}
          onSave={handleSaveTask}
          onCancel={() => setSelectedTask(null)}
        />
      )}

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Search & filter</h2>
          <div className="mt-5 space-y-4">
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
              Search
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-700"
              />
            </label>
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
              Status
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-700"
              >
                <option value="">All statuses</option>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
              Priority
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-700"
              >
                <option value="">All priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <Button type="button" onClick={() => { setFilterPriority(''); setFilterStatus(''); setSearch(''); }} className="w-full">
              Reset filters
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{error}</p>}
          <div className="grid gap-4">
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">Loading tasks...</div>
            ) : filteredTasks.length ? (
              filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} onEdit={setSelectedTask} onDelete={handleDelete} />
              ))
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">No tasks match your search and filters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
