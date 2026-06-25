const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, search } = req.query;
  const filter = { user: req.user._id };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === 'completed').length;
  const pending = tasks.filter((task) => task.status !== 'completed').length;

  res.json({ total, completed, pending, tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Title is required');
  }

  const task = await Task.create({
    title,
    description,
    priority: priority || 'medium',
    status: status || 'pending',
    dueDate,
    user: req.user._id,
  });

  res.status(201).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const { title, description, priority, status, dueDate } = req.body;

  task.title = title || task.title;
  task.description = description !== undefined ? description : task.description;
  task.priority = priority || task.priority;
  task.status = status || task.status;
  task.dueDate = dueDate || task.dueDate;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.remove();
  res.json({ message: 'Task removed' });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
