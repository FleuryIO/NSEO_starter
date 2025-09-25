import { motion } from "framer-motion";
import { Rocket, Moon, Sun } from "lucide-react";

// Dark mode toggle function
function toggleDark() {
  const html = document.documentElement;
  const next = !html.classList.contains("dark");
  html.classList.toggle("dark", next);
  localStorage.setItem("theme", next ? "dark" : "light");
}

// Initialize dark mode on load
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("theme");
  const preferDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", saved ? saved === "dark" : preferDark);
}

export default function App() {
  return (
    <main className="min-h-screen grid place-items-center p-8 bg-white dark:bg-gray-900">
      <motion.div
        className="rounded-2xl px-6 py-4 shadow-lg border
                   bg-gradient-to-r from-slate-100 to-slate-200
                   dark:from-slate-800 dark:to-slate-900
                   dark:border-slate-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          NSEO Starter ✨ (Hot Reload Test)
        </h1>
        <p className="text-sm opacity-70 text-gray-700 dark:text-gray-300">
          Tailwind, Motion, Lucide → OK
        </p>

        {/* Lucide Icons Test */}
        <div className="mt-3 flex items-center gap-3 opacity-80 text-gray-800 dark:text-gray-200">
          <Rocket size={20} />
          <span>lucide-react OK 🚀</span>
        </div>

        {/* Framer Motion Button */}
        <motion.button
          className="mt-4 rounded-xl px-4 py-2 border
                     bg-white dark:bg-slate-800
                     border-slate-300 dark:border-slate-600
                     text-gray-800 dark:text-gray-200
                     hover:bg-slate-50 dark:hover:bg-slate-700"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          framer-motion OK 🌀
        </motion.button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDark}
          className="ml-3 rounded-lg px-3 py-1 border text-sm
                     bg-white dark:bg-slate-800
                     border-slate-300 dark:border-slate-600
                     text-gray-800 dark:text-gray-200
                     hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <span className="inline-flex items-center gap-2">
            <Sun className="hidden dark:inline-block" size={16} />
            <Moon className="inline-block dark:hidden" size={16} />
            Toggle dark
          </span>
        </button>
      </motion.div>
    </main>
  );
}