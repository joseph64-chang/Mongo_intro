"use client";

import { useState } from "react";

const navLinks = [
  { label: "首頁", href: "/#home" },
  { label: "芒果品種", href: "/#mangoes" },
  { label: "產期時歷", href: "/#season" },
  { label: "果園故事", href: "/#about" },
  { label: "芒果日誌", href: "/blog" },
  { label: "小遊戲", href: "/game" },
  { label: "聯絡我們", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <nav className="glass mx-auto flex max-w-6xl flex-col rounded-[28px] bg-canvas/60 px-5 py-3">
        <div className="flex items-center justify-between">
          <a
            href="/#home"
            className="font-serif text-xl font-bold tracking-tight text-ink"
          >
            芒果莊園
            <span className="ml-2 align-super text-[10px] font-sans font-semibold tracking-[0.2em] text-accent-warm">
              MANGO
            </span>
          </a>

          <ul className="hidden gap-6 text-sm text-ink/70 md:flex lg:gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="relative pb-1 transition-colors hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent-warm after:transition-all after:content-[''] hover:after:w-full"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-canvas transition-transform hover:scale-105 sm:inline-block"
            >
              立即選購
            </a>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="開啟選單"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg md:hidden"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <ul className="mt-4 flex flex-col gap-3 border-t border-line pt-4 text-sm text-ink/80 md:hidden">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="block transition-colors hover:text-accent-warm"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent px-5 py-2 text-center font-semibold text-canvas"
              >
                立即選購
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
