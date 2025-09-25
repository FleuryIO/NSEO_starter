import { NavLink } from 'react-router-dom';
import { Rocket, NotebookPen, Moon, Sun } from 'lucide-react';

function toggleDark() {
  const html = document.documentElement;
  const next = !html.classList.contains('dark');
  html.classList.toggle('dark', next);
  localStorage.setItem('theme', next ? 'dark' : 'light');
}

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('theme');
  const preferDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', saved ? saved === 'dark' : preferDark);
}

const linkBase = 'px-3 py-2 rounded-xl text-sm font-medium transition-colors';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/50 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/40 backdrop-blur">
      <nav className="mx-auto max-w-6xl flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <Rocket className="size-5" />
          <span className="text-sm opacity-80">NSEO / Ashaya</span>
        </div>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Accueil</NavLink>
          <NavLink to="/intention" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <span className="inline-flex items-center gap-2"><NotebookPen className="size-4" /> Intention</span>
          </NavLink>
        </div>
        <button onClick={toggleDark} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border text-sm hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800">
          <Sun className="hidden dark:inline-block size-4" />
          <Moon className="inline-block dark:hidden size-4" />
          <span>Mode</span>
        </button>
      </nav>
    </header>
  );
}