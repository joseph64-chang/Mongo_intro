"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WIN_RATE = 0.1;

function makeCouponCode() {
  return `MANGO90-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

type DrawState = "idle" | "drawing" | "win" | "lose";

export default function LotteryButton() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<DrawState>("idle");
  const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);

  function closeModal() {
    setOpen(false);
    setState("idle");
    setCopied(false);
  }

  function draw() {
    setState("drawing");
    setCopied(false);
    window.setTimeout(() => {
      const won = Math.random() < WIN_RATE;
      if (won) {
        setCoupon(makeCouponCode());
        setState("win");
      } else {
        setState("lose");
      }
    }, 900);
  }

  async function copyCoupon() {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-accent-warm px-8 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-105"
      >
        🥭 抽獎拿優惠券
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="glass relative w-full max-w-sm rounded-[28px] bg-canvas px-8 py-10 text-center"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="關閉"
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-line text-sm text-ink/60 hover:text-ink"
              >
                ✕
              </button>

              <p className="text-xs font-semibold tracking-[0.3em] text-accent-warm">
                LUCKY DRAW
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ink">
                芒果幸運抽獎
              </h3>

              {state === "idle" && (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">
                    按下按鈕試試手氣，有 10% 機會抽中
                    <br />
                    <strong className="text-ink">芒果 9 折優惠券</strong>！
                  </p>
                  <motion.div
                    className="mt-8 text-5xl"
                    aria-hidden
                  >
                    🥭
                  </motion.div>
                  <button
                    type="button"
                    onClick={draw}
                    className="mt-8 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-105"
                  >
                    開始抽獎
                  </button>
                </>
              )}

              {state === "drawing" && (
                <>
                  <p className="mt-4 text-sm text-ink/65">抽獎中，手氣正在集氣……</p>
                  <motion.div
                    className="mt-8 text-5xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
                  >
                    🥭
                  </motion.div>
                  <button
                    type="button"
                    disabled
                    className="mt-8 w-full rounded-full bg-ink/40 px-6 py-3 text-sm font-semibold text-canvas"
                  >
                    抽獎中……
                  </button>
                </>
              )}

              {state === "win" && (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">
                    🎉 恭喜中獎！你抽中了
                  </p>
                  <p className="mt-1 font-serif text-xl text-accent-warm">
                    芒果 9 折優惠券
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-dashed border-accent-warm bg-accent-warm/10 px-5 py-4">
                    <span className="font-mono text-sm tracking-wider text-ink">
                      {coupon}
                    </span>
                    <button
                      type="button"
                      onClick={copyCoupon}
                      className="shrink-0 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-canvas transition-transform hover:scale-105"
                    >
                      {copied ? "已複製" : "複製"}
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-ink/50">
                    請於結帳時輸入此代碼即可享 9 折優惠。
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-6 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-105"
                  >
                    太好了！
                  </button>
                </>
              )}

              {state === "lose" && (
                <>
                  <div className="mt-8 text-5xl">🍃</div>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">
                    銘謝惠顧，這次與 9 折優惠券擦身而過。
                  </p>
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={draw}
                      className="flex-1 rounded-full bg-accent-warm px-6 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-105"
                    >
                      再抽一次
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
                    >
                      關閉
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
