import React, { useState, useEffect } from "react";

export default function Intention() {
  const [intention, setIntention] = useState("");

  // Charger l'intention stockée
  useEffect(() => {
    const saved = localStorage.getItem("intention");
    if (saved) setIntention(saved);
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    if (intention) {
      localStorage.setItem("intention", intention);
    }
  }, [intention]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-2xl shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">🧘 Intention du jour</h2>
      <textarea
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
        placeholder="Pose ton intention ici..."
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        rows={4}
      />
      {intention && (
        <p className="mt-4 italic text-indigo-600 dark:text-indigo-400">
          🌱 {intention}
        </p>
      )}
    </div>
  );
}