import { useEffect, useState } from 'react';
import api from '../utils/api';
import Button from '../components/Button';
import TaskCard from '../components/TaskCard';

const DashboardPage = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setStats({ total: response.data.total, completed: response.data.completed, pending: response.data.pending });
      setTasks(response.data.tasks.slice(0, 5));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load dashboard');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Review your task progress and manage what matters most.</p>
          </div>
          <Button onClick={loadTasks}>Refresh</Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total Tasks</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Completed</p>
            <p className="mt-4 text-4xl font-semibold text-emerald-600 dark:text-emerald-300">{stats.completed}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Pending</p>
            <p className="mt-4 text-4xl font-semibold text-amber-600 dark:text-amber-300">{stats.pending}</p>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent tasks</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Your latest items are listed below.</p>
          </div>
          <Button onClick={loadTasks}>Reload</Button>
        </div>

        {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{error}</p>}

        <div className="grid gap-4">
          {tasks.length ? tasks.map((task) => <TaskCard key={task._id} task={task} onEdit={() => {}} onDelete={() => {}} />) : <p className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">No tasks yet. Create one in Tasks.</p>}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
