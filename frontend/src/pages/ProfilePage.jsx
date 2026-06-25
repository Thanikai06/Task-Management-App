import { useEffect, useState } from 'react';
import api from '../utils/api';
import Button from '../components/Button';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profile</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Your personal account details for TaskForge.</p>
          </div>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>

      {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{error}</p>}

      {profile ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Account</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Name:</span> {profile.name}
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Email:</span> {profile.email}
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Member since:</span> {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Tips</h2>
            <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">Use your dashboard to stay on top of pending tasks, then create focused task lists by priority and status.</p>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">Loading profile...</div>
      )}
    </div>
  );
};

export default ProfilePage;
