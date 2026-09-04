"use client";

import { useVisitorName } from "./VisitorNameProvider";

export default function WelcomeGreeting() {
  const name = useVisitorName();

  if (!name) return null;

  return (
    <p className="mb-3 text-sm font-medium text-ink/70">
      哈囉，<span className="font-semibold text-accent-warm">{name}</span>
      ，歡迎光臨芒果莊園 🥭
    </p>
  );
}
