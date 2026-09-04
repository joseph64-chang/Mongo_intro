"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "mango-visitor-name";

const VisitorNameContext = createContext<string>("");

export function useVisitorName() {
  return useContext(VisitorNameContext);
}

export default function VisitorNameProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [name, setName] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setName(saved);
    setHydrated(true);
  }, []);

  function commitName(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    window.localStorage.setItem(STORAGE_KEY, trimmed);
    setName(trimmed);
  }

  const showPrompt = hydrated && !name;

  return (
    <VisitorNameContext.Provider value={name}>
      {children}

      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass w-full max-w-sm rounded-[28px] bg-canvas px-8 py-10 text-center"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-4xl">🥭</div>
              <h3 className="mt-3 font-serif text-2xl text-ink">
                歡迎光臨芒果莊園
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                想怎麼稱呼您呢？
              </p>

              <form
                className="mt-6 flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  commitName(draft);
                }}
              >
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="請輸入您的稱呼"
                  autoFocus
                  maxLength={20}
                  className="w-full rounded-full border border-line bg-canvas px-5 py-3 text-center text-sm text-ink outline-none focus:border-accent-warm"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                >
                  進入芒果莊園
                </button>
                <button
                  type="button"
                  onClick={() => commitName("訪客")}
                  className="text-xs text-ink/50 underline-offset-2 hover:underline"
                >
                  先隨便逛逛
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </VisitorNameContext.Provider>
  );
}
