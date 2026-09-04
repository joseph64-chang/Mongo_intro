"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAME_DURATION = 15;
const BASKET_WIDTH_PERCENT = 16;
const CATCH_LINE = 88;
const BASKET_KEY_STEP = 5;

interface Mango {
  id: number;
  x: number;
  y: number;
  speed: number;
}

type Phase = "idle" | "playing" | "ended";

export default function MangoCatchGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [mangoes, setMangoes] = useState<Mango[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [best, setBest] = useState(0);

  const fieldRef = useRef<HTMLDivElement>(null);
  const basketXRef = useRef(50);
  const scoreRef = useRef(0);
  const mangoesRef = useRef<Mango[]>([]);
  const nextIdRef = useRef(0);
  const spawnAccRef = useRef(0);
  const nextSpawnRef = useRef(500);
  const rafRef = useRef<number | null>(null);

  const endGame = useCallback(() => {
    setPhase("ended");
    setBest((prev) => Math.max(prev, scoreRef.current));
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  function moveBasketTo(pct: number) {
    const half = BASKET_WIDTH_PERCENT / 2;
    const clamped = Math.min(100 - half, Math.max(half, pct));
    basketXRef.current = clamped;
    setBasketX(clamped);
  }

  function handlePointerMove(clientX: number) {
    const field = fieldRef.current;
    if (!field) return;
    const rect = field.getBoundingClientRect();
    moveBasketTo(((clientX - rect.left) / rect.width) * 100);
  }

  function startGame() {
    scoreRef.current = 0;
    mangoesRef.current = [];
    nextIdRef.current = 0;
    spawnAccRef.current = 0;
    nextSpawnRef.current = 400;
    setScore(0);
    setMangoes([]);
    setTimeLeft(GAME_DURATION);
    moveBasketTo(50);
    setPhase("playing");
  }

  useEffect(() => {
    if (phase !== "playing") return;

    let lastTime = performance.now();
    const startTime = lastTime;

    function loop(now: number) {
      const delta = now - lastTime;
      lastTime = now;

      const elapsed = (now - startTime) / 1000;
      const remaining = Math.max(0, GAME_DURATION - elapsed);
      setTimeLeft(Math.ceil(remaining));

      if (remaining <= 0) {
        endGame();
        return;
      }

      spawnAccRef.current += delta;
      if (spawnAccRef.current >= nextSpawnRef.current) {
        spawnAccRef.current = 0;
        nextSpawnRef.current = 400 + Math.random() * 450;
        mangoesRef.current = [
          ...mangoesRef.current,
          {
            id: nextIdRef.current++,
            x: 8 + Math.random() * 84,
            y: -6,
            speed: 30 + Math.random() * 24,
          },
        ];
      }

      const survivors: Mango[] = [];
      for (const m of mangoesRef.current) {
        const newY = m.y + (m.speed * delta) / 1000;
        if (newY >= CATCH_LINE) {
          const dx = Math.abs(m.x - basketXRef.current);
          if (dx <= BASKET_WIDTH_PERCENT / 2 + 4) {
            scoreRef.current += 1;
            setScore(scoreRef.current);
            continue;
          }
        }
        if (newY >= 112) continue;
        survivors.push({ ...m, y: newY });
      }
      mangoesRef.current = survivors;
      setMangoes(survivors);

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, endGame]);

  useEffect(() => {
    if (phase !== "playing") return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") moveBasketTo(basketXRef.current - BASKET_KEY_STEP);
      if (e.key === "ArrowRight") moveBasketTo(basketXRef.current + BASKET_KEY_STEP);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase]);

  return (
    <div
      ref={fieldRef}
      className="glass relative mx-auto h-[420px] w-full max-w-2xl touch-none overflow-hidden rounded-[28px] bg-gradient-to-b from-white/40 to-accent/10 select-none"
      onMouseMove={(e) => phase === "playing" && handlePointerMove(e.clientX)}
      onTouchMove={(e) => {
        if (phase !== "playing") return;
        const t = e.touches[0];
        if (t) handlePointerMove(t.clientX);
      }}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-4 text-sm font-semibold text-ink">
        <span>⏱ {timeLeft}s</span>
        <span>🥭 {score} 分</span>
      </div>

      {mangoes.map((m) => (
        <span
          key={m.id}
          className="absolute text-3xl"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          🥭
        </span>
      ))}

      {phase === "playing" && (
        <span
          className="absolute bottom-3 text-4xl"
          style={{ left: `${basketX}%`, transform: "translateX(-50%)" }}
        >
          🧺
        </span>
      )}

      {phase === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="text-5xl">🥭🧺</div>
          <p className="max-w-xs text-sm text-ink/65">
            滑鼠、手指或方向鍵左右移動籃子，
            <br />
            15 秒內盡量接住掉落的芒果！
          </p>
          {best > 0 && (
            <p className="text-xs text-ink/50">最高紀錄：{best} 分</p>
          )}
          <button
            type="button"
            onClick={startGame}
            className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-105"
          >
            開始遊戲
          </button>
        </div>
      )}

      {phase === "ended" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas/75 px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-accent-warm">
            TIME&apos;S UP
          </p>
          <h3 className="font-serif text-3xl text-ink">
            你接到了 {score} 顆芒果！
          </h3>
          <p className="text-xs text-ink/50">最高紀錄：{best} 分</p>
          <button
            type="button"
            onClick={startGame}
            className="mt-2 rounded-full bg-accent-warm px-8 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-105"
          >
            再玩一次
          </button>
        </div>
      )}
    </div>
  );
}
