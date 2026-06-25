# TaskForge

TaskForge is a full-stack task management application built with React, Vite, Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- User registration and login with JWT authentication
- Dashboard with task counts and recent task summary
- Create, edit, delete, and update task status
- Search and filter tasks by priority and status
- Responsive UI with light/dark mode
- Profile page with user information
- REST API with clean folder structure
- Input validation and error handling

## Project Structure

- `backend/`: Express API server and MongoDB models
- `frontend/`: React app powered by Vite and Tailwind CSS

## Setup

### Backend

1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from `.env.example` and set your values:
   ```bash
   cp .env.example .env
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from `.env.example` and update if needed:
   ```bash
   cp .env.example .env
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/profile` - Get current user profile

### Tasks

- `GET /api/tasks` - Get tasks for current user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Notes

- Ensure MongoDB is running locally or provide a remote MongoDB URI.
- The frontend uses `VITE_API_URL` to connect to the backend API.
- JWT token is stored in `localStorage` and automatically included in API requests.

## License

MIT
