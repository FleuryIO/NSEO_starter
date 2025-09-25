import React from "react";

export default function Navbar({ dark, setDark }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white dark:bg-gray-800">
      <div className="font-bold text-xl">NSEO</div>
      <button
        onClick={() => setDark(!dark)}
        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {dark ? "🌙 Mode Nuit" : "☀️ Mode Jour"}
      </button>
    </nav>
  );
}