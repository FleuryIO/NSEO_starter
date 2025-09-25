// src/Root.jsx
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Intention from './pages/Intention.jsx'
import ArchiveExplorer from './ArchiveExplorer.jsx'
import FocusTimer from './pages/FocusTimer.jsx'
import Priorities3 from './pages/Priorities3.jsx'
import QuickCapture from './pages/QuickCapture.jsx'

export default function Root() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const cls = document.documentElement.classList
    dark ? cls.add('dark') : cls.remove('dark')
  }, [dark])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.querySelector('input[placeholder^="Noter une idée"]')?.focus(); // QuickCapture
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        document.querySelector('textarea[placeholder^="Pose ton intention"]')?.focus(); // Intention
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar dark={dark} setDark={setDark} />

      <main className="p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🚀 NSEO Starter</h1>
          <p className="text-lg opacity-80">React 19 + Vite + Tailwind 4</p>
        </header>

        <section className="space-y-8 max-w-5xl mx-auto">
          {/* Déjà présent */}
          <Intention />
          <ArchiveExplorer />

          {/* Nouveaux modules "Focus Pack" */}
          <Priorities3 />
          <FocusTimer />
          <QuickCapture />
        </section>
      </main>
    </div>
  )
}