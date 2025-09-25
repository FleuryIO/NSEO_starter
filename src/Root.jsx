// src/Root.jsx
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Intention from './pages/Intention.jsx'
import ArchiveExplorer from './ArchiveExplorer.jsx'

export default function Root() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const cls = document.documentElement.classList
    dark ? cls.add('dark') : cls.remove('dark')
  }, [dark])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar dark={dark} setDark={setDark} />

      <main className="p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🚀 NSEO Starter</h1>
          <p className="text-lg opacity-80">React 19 + Vite + Tailwind 4</p>
        </header>

        <section className="space-y-8 max-w-5xl mx-auto">
          <Intention />
          <ArchiveExplorer />
        </section>
      </main>
    </div>
  )
}