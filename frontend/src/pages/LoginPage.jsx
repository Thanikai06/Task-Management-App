import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      login({ name: response.data.name, email: response.data.email }, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sign in to manage your tasks in TaskForge.</p>

      {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-200">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" className="w-full">Login</Button>
      </form>

      <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
        Don&apos;t have an account? <Link to="/register" className="font-semibold text-slate-900 underline decoration-slate-200 dark:text-slate-100">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
