// src/pages/Priorities3.jsx
import React, { useEffect, useState } from "react";

function todayKey() {
  const d = new Date();
  const k = d.toISOString().slice(0,10); // YYYY-MM-DD
  return `p3_${k}`;
}

export default function Priorities3() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(todayKey()) || "[]"); } catch { return []; }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem(todayKey(), JSON.stringify(items.slice(0,3)));
  }, [items]);

  const add = () => {
    if (!text.trim()) return;
    if (items.length >= 3) return;
    setItems([...items, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText("");
  };

  const toggle = (id) => setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const remove = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-3">⭐ Top-3 aujourd'hui</h2>
      <div className="flex gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Ajouter une priorité (max 3)"
          className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        <button onClick={add} className="px-3 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
          ➕
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} />
              <span className={i.done ? "line-through opacity-60" : ""}>{i.text}</span>
            </label>
            <button onClick={() => remove(i.id)} className="text-sm opacity-70 hover:opacity-100">✖</button>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm opacity-70">
        Garde le cap : pas plus de trois priorités / jour.
      </p>
    </div>
  );
}