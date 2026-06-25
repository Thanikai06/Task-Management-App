const Input = ({ label, as = 'input', ...props }) => {
  const sharedClass =
    'mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-700';

  return (
    <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
      {label}
      {as === 'textarea' ? (
        <textarea className={sharedClass} {...props} />
      ) : (
        <input className={sharedClass} {...props} />
      )}
    </label>
  );
};

export default Input;
