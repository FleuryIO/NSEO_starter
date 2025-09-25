import { useEffect } from 'react';
export default function Snackbar({ open, message, actionLabel, onAction, duration = 5000, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);
  if (!open) return null;
  return (
    <div role="status" className="fixed bottom-5 right-5 z-50">
      <div className="rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-3 flex items-center gap-3">
        <span className="text-sm">{message}</span>
        {onAction && (
          <button onClick={onAction} className="text-sm px-3 py-1 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800">{actionLabel || 'Annuler'}</button>
        )}
      </div>
    </div>
  );
}