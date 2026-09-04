"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="mt-4 text-sm font-semibold text-canvas">
        🥭 感謝訂閱！請等待我們送上好消息。
      </p>
    );
  }

  return (
    <form
      className="mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="輸入您的 Email"
        className="w-full rounded-full border border-canvas/25 bg-canvas/10 px-5 py-3 text-sm text-canvas placeholder:text-canvas/50 outline-none focus:border-accent-warm"
      />
      <button
        type="submit"
        className="rounded-full bg-accent-warm px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
      >
        訂閱芒果快訊
      </button>
    </form>
  );
}
