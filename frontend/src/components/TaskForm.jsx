import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormValues({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      });
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{task ? 'Edit Task' : 'New Task'}</h2>
      <Input label="Title" name="title" value={formValues.title} onChange={handleChange} required />
      <Input
        label="Description"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        as="textarea"
        rows="4"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
          Priority
          <select
            name="priority"
            value={formValues.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
          Status
          <select
            name="status"
            value={formValues.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-700"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <Input label="Due Date" name="dueDate" type="date" value={formValues.dueDate} onChange={handleChange} />
      <div className="flex flex-wrap gap-3">
        <Button type="submit">Save Task</Button>
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
