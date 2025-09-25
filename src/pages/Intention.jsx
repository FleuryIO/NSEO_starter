import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "../lib/useLocalStorage.js";
import { motion } from "framer-motion";
import { CheckCircle2, History, Trash2 } from "lucide-react";

const STORAGE_KEY = "nseo:intentions";

export default function Intention() {
  const [intentions, setIntentions] = useLocalStorage(STORAGE_KEY, []);
  const [text, setText] = useState("");

  function addIntention() {
    const value = text.trim();
    if (!value) return;
    const item = {
      id: crypto.randomUUID?.() || String(Date.now()),
      value,
      at: new Date().toISOString(),
    };
    setIntentions([item, ...intentions]);
    setText("");
  }

  function clearAll() {
    if (confirm("Effacer toutes les intentions ?")) setIntentions([]);
  }

  const today = useMemo(() => new Date().toLocaleDateString(), []);

  // focus auto champ
  useEffect(() => {
    document.getElementById("intent-input")?.focus();
  }, []);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <motion.section
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white/70 dark:bg-slate-900/60 backdrop-blur"
      >
        <h1 className="text-xl font-semibold tracking-tight">Intention du jour — {today}</h1>
        <p className="text-sm opacity-70">Pose une intention claire, courte, actionnable. Elle sera enregistrée localement.</p>

        <div className="mt-4 flex items-center gap-2">
          <input
            id="intent-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIntention()}
            placeholder="Ex: Avancer calmement 1h sur NSEO"
            className="flex-1 rounded-xl border px-3 py-2 bg-white/80 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-slate-400/40"
          />
          <button
            onClick={addIntention}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border text-sm hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800"
          >
            <CheckCircle2 className="size-4" />
            Enregistrer
          </button>
        </div>
      </motion.section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-wide opacity-60 inline-flex items-center gap-2">
            <History className="size-4" /> Historique
          </h2>
          {intentions?.length > 0 && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border text-xs hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800"
            >
              <Trash2 className="size-4" />
              Tout effacer
            </button>
          )}
        </div>

        <ul className="space-y-2">
          {intentions?.length === 0 && (
            <li className="text-sm opacity-60">Aucune intention encore. Commence ci-dessus ✨</li>
          )}

          {intentions.map((it) => (
            <li key={it.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white/70 dark:bg-slate-900/60">
              <p className="text-[15px] leading-relaxed">{it.value}</p>
              <p className="mt-1 text-xs opacity-60">{new Date(it.at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}