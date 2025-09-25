// src/pages/FocusTimer.jsx
import React, { useEffect, useMemo, useState } from "react";

const DEFAULTS = {
  focus: 25 * 60,  // 25 min
  break: 5 * 60,   // 5  min
};

function format(t) {
  const m = Math.floor(t / 60).toString().padStart(2, "0");
  const s = (t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function notify(title, body) {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((p) => {
        if (p === "granted") new Notification(title, { body });
      });
    }
  }
}

export default function FocusTimer() {
  const [mode, setMode] = useState(() => localStorage.getItem("ft_mode") || "focus");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(() => {
    const v = Number(localStorage.getItem("ft_seconds"));
    return Number.isFinite(v) ? v : DEFAULTS.focus;
  });

  const label = mode === "focus" ? "🎯 Focus" : "☕ Break";
  const max = mode === "focus" ? DEFAULTS.focus : DEFAULTS.break;
  const pct = useMemo(() => Math.round(((max - seconds) / max) * 100), [seconds, max]);

  useEffect(() => {
    localStorage.setItem("ft_mode", mode);
    localStorage.setItem("ft_seconds", String(seconds));
  }, [mode, seconds]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1;
        // Changement d'état
        const next = mode === "focus" ? "break" : "focus";
        notify(next === "break" ? "Temps de pause" : "Retour au focus",
               next === "break" ? "Respire 5 minutes." : "On repart 25 minutes.");
        setMode(next);
        return next === "focus" ? DEFAULTS.focus : DEFAULTS.break;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);

  const startPause = () => setRunning((r) => !r);
  const reset = () => { setRunning(false); setSeconds(mode === "focus" ? DEFAULTS.focus : DEFAULTS.break); };
  const skip = () => { setMode((m) => (m === "focus" ? "break" : "focus")); setSeconds((m) => (mode === "focus" ? DEFAULTS.break : DEFAULTS.focus)); };

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">{label}</h2>
        <span className="text-sm opacity-70">{pct}%</span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded mb-4 overflow-hidden">
        <div className="h-3 bg-indigo-500" style={{ width: `${pct}%` }} />
      </div>

      <div className="text-5xl font-mono text-center mb-4">{format(seconds)}</div>

      <div className="flex gap-2 justify-center">
        <button onClick={startPause} className="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
          {running ? "⏸ Pause" : "▶️ Start"}
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
          🔁 Reset
        </button>
        <button onClick={skip} className="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
          ⏭ Skip
        </button>
      </div>

      <p className="mt-3 text-sm opacity-70 text-center">
        Astuce : 1 cycle = 25 min focus + 5 min pause (Pomodoro).
      </p>
    </div>
  );
}