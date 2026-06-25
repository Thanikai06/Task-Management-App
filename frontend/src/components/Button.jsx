const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
