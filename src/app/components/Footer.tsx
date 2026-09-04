const quickLinks = [
  { label: "首頁", href: "/#home" },
  { label: "芒果品種", href: "/#mangoes" },
  { label: "產期時歷", href: "/#season" },
  { label: "果園故事", href: "/#about" },
  { label: "芒果日誌", href: "/blog" },
  { label: "聯絡我們", href: "/#contact" },
];

const socials = [
  { emoji: "📘", label: "Facebook", href: "#" },
  { emoji: "📸", label: "Instagram", href: "#" },
  { emoji: "💬", label: "LINE 官方帳號", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-4 bg-ink px-4 pt-16 pb-8 text-canvas sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <a
          href="/#home"
          className="font-serif text-4xl tracking-tight sm:text-5xl"
        >
          芒果莊園
        </a>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-canvas/60">
              專注一件事：把台南玉井、屏東枋山最好的芒果，
              直接送到你手上。
            </p>
            <div className="mt-2 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-canvas/20 text-lg transition-transform hover:scale-110 hover:border-accent-warm"
                >
                  {social.emoji}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-canvas/40 uppercase">
              快速連結
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-canvas/70">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="transition-colors hover:text-accent-warm"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-canvas/40 uppercase">
              聯絡資訊
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-canvas/70">
              <li>台南市玉井區芒果路 123 號</li>
              <li>(06) 123-4567</li>
              <li>hello@mango-estate.tw</li>
              <li>週一至週六 09:00–18:00</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-canvas/40 uppercase">
              訂閱芒果快訊
            </h3>
            <p className="text-sm text-canvas/60">
              搶先掌握產季開賣消息與限定優惠。
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="輸入您的 Email"
                className="w-full rounded-full border border-canvas/20 bg-canvas/5 px-4 py-2 text-sm text-canvas placeholder:text-canvas/40 outline-none focus:border-accent-warm"
              />
              <button
                type="submit"
                className="rounded-full bg-accent-warm px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
              >
                訂閱
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-canvas/15 pt-6 text-xs text-canvas/50 sm:flex-row">
          <span>
            © {new Date().getFullYear()} 芒果莊園 Mango Estate. All rights
            reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent-warm">
              隱私權政策
            </a>
            <a href="#" className="hover:text-accent-warm">
              服務條款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
