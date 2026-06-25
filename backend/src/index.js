const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();

const startServer = async () => {
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({ message: 'TaskForge API is running' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
