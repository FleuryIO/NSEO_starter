import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Intention from './pages/Intention.jsx';

function Home() {
  return (
    <main className="min-h-[calc(100vh-56px)] grid place-items-center p-8">
      <div className="max-w-xl w-full rounded-2xl px-6 py-4 shadow-lg bg-white/70 dark:bg-slate-900/60 backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight">Bienvenue dans NSEO_starter ✨</h1>
        <p className="mt-2 text-sm opacity-80">Navigation + Intention persistée. Utilise la barre du haut pour explorer.</p>
      </div>
    </main>
  );
}

export default function Root() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intention" element={<Intention />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}