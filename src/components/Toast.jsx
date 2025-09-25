export default function Toast({ open, message, actions = [], onClose }) {
  if (!open) return null;
  return (
    <div role="alert" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-3 flex items-center gap-3">
        <span className="text-sm">{message}</span>
        <div className="flex items-center gap-2">
          {actions.map(({ label, onClick, variant = 'default' }) => (
            <button key={label} onClick={onClick} className={`text-sm px-3 py-1 rounded-lg border ${variant === 'primary' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'}`}>
              {label}
            </button>
          ))}
          {onClose && (
            <button onClick={onClose} className="text-sm px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800">Fermer</button>
          )}
        </div>
      </div>
    </div>
  );
}