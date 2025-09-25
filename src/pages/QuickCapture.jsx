// src/pages/QuickCapture.jsx
import React, { useEffect, useState } from "react";

export default function QuickCapture() {
  const [inbox, setInbox] = useState(() => {
    try { return JSON.parse(localStorage.getItem("qc_inbox") || "[]"); } catch { return []; }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("qc_inbox", JSON.stringify(inbox));
  }, [inbox]);

  const add = () => {
    if (!text.trim()) return;
    setInbox([{ id: crypto.randomUUID(), text: text.trim(), ts: Date.now() }, ...inbox]);
    setText("");
  };
  const remove = (id) => setInbox(inbox.filter(i => i.id !== id));
  const clearAll = () => setInbox([]);

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-3">📝 Capture rapide</h2>
      <div className="flex gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Noter une idée / tâche… (Entrée pour ajouter)"
          className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        <button onClick={add} className="px-3 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">Add</button>
        <button onClick={clearAll} className="px-3 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">Clear</button>
      </div>

      <ul className="space-y-2 max-h-64 overflow-auto">
        {inbox.map(i => (
          <li key={i.id} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
            <span>{i.text}</span>
            <button onClick={() => remove(i.id)} className="text-sm opacity-70 hover:opacity-100">✖</button>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm opacity-70">
        Conseil : vide la tête ici, tu trieras plus tard (zéro friction).
      </p>
    </div>
  );
}