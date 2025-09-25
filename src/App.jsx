import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Intention from "./Intention.jsx";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar dark={dark} setDark={setDark} />

      <main className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">🚀 NSEO Starter</h1>
        <p className="text-lg mb-8">
          Ton environnement React + Vite + Tailwind est prêt.
        </p>

        <Intention />
      </main>
    </div>
  );
}