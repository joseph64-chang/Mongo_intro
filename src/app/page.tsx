import Image from "next/image";
import Reveal from "./components/Reveal";
import Parallax from "./components/Parallax";
import LotteryButton from "./components/LotteryButton";
import WelcomeGreeting from "./components/WelcomeGreeting";
import NewsletterForm from "./components/NewsletterForm";

const stats = [
  { value: "30年", label: "芒果種植經驗" },
  { value: "5大", label: "人氣品種" },
  { value: "24hr", label: "產地直送出貨" },
  { value: "100%", label: "SGS 農藥檢驗合格" },
];

const mangoes = [
  {
    name: "愛文芒果",
    en: "Irwin Mango",
    origin: "台南 玉井",
    season: "5 – 8 月",
    desc: "果肉細緻多汁、香氣濃郁，是台灣夏天最具代表性的芒果品種，也是我們果園的招牌。",
    image: "/images/mango-1.jpg",
  },
  {
    name: "金煌芒果",
    en: "Jinhuang Mango",
    origin: "高雄 六龜",
    season: "6 – 8 月",
    desc: "果實碩大、纖維細滑，甜度極高，一顆常重達一台斤以上。",
    image: "/images/mango-3.jpg",
  },
  {
    name: "玉文芒果",
    en: "Yuwen Mango",
    origin: "台南 玉井",
    season: "6 – 8 月",
    desc: "愛文與凱特雜交選育，果肉扎實少纖維，甜中帶一絲清香。",
    image: "/images/mango-4.jpg",
  },
  {
    name: "凱特芒果",
    en: "Keitt Mango",
    origin: "屏東 枋山",
    season: "8 – 9 月",
    desc: "晚熟大果種，果皮翠綠不轉紅，果肉多汁細膩，是夏末最後的甜蜜。",
    image: "/images/mango-5.jpg",
  },
  {
    name: "四季蜜芒果",
    en: "Off-season Honey Mango",
    origin: "屏東 溫室",
    season: "全年皆產",
    desc: "溫室栽培、四季供應，讓芒果控一年到頭都能吃到當季鮮甜。",
    image: "/images/mango.jpg",
  },
];

const seasonCalendar = [
  { title: "春", range: "3 – 5 月", items: ["溫室四季蜜芒果", "玉文早生果"] },
  { title: "夏", range: "6 – 8 月", items: ["愛文芒果", "金煌芒果", "玉文芒果"] },
  { title: "秋", range: "9 – 11 月", items: ["凱特芒果", "四季蜜芒果"] },
  { title: "冬", range: "12 – 2 月", items: ["溫室四季蜜芒果"] },
];

const aboutStats = [
  { title: "30年", desc: "玉井芒果種植經驗" },
  { title: "5", desc: "大人氣品種" },
  { title: "100%", desc: "產地直送到府" },
  { title: "SGS", desc: "農藥檢驗合格" },
];

const otherFruits = [
  { name: "鳳梨", image: "/images/pineapple.jpg" },
  { name: "蓮霧", image: "/images/wax-apple.jpg" },
  { name: "芭樂", image: "/images/guava.jpg" },
  { name: "釋迦", image: "/images/sugar-apple.jpg" },
  { name: "荔枝", image: "/images/lychee.jpg" },
  { name: "文旦", image: "/images/pomelo.jpg" },
  { name: "火龍果", image: "/images/dragon-fruit.jpg" },
  { name: "香蕉", image: "/images/banana.jpg" },
  { name: "西瓜", image: "/images/watermelon.jpg" },
];

function Kicker({
  index,
  label,
  title,
  align = "left",
}: {
  index: string;
  label: string;
  title: string;
  align?: "left" | "right" | "center";
}) {
  const alignClass =
    align === "right"
      ? "items-end text-right"
      : align === "center"
        ? "items-center text-center"
        : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent-warm">
        <span className="font-serif text-base tracking-normal text-ink/30">
          {index}
        </span>
        <span className="h-px w-8 bg-accent-warm" />
        {label}
      </div>
      <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative z-10 flex flex-1 flex-col gap-32 px-4 pt-16 pb-28 sm:px-6 sm:pt-24 lg:px-10">
      {/* Hero */}
      <section id="home" className="relative mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <WelcomeGreeting />
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent-warm">
              <span className="h-px w-8 bg-accent-warm" />
              TASTE OF TAIWAN MANGO
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.15] text-ink sm:text-6xl lg:text-7xl">
              臺灣的夏天，
              <br />
              藏在<span className="text-accent-warm">一顆芒果666</span>裡
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
              我們專注一件事：把台南玉井、屏東枋山最好的芒果，
              從果園直送到你手上。愛文、金煌、玉文、凱特，
              五大品種，一次吃遍台灣芒果的甜。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a
                href="#mangoes"
                className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-105"
              >
                探索芒果品種
              </a>
              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                我們的果園
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <LotteryButton />
            </div>
          </Reveal>

          {/* Hero photo */}
          <Reveal
            delay={0.15}
            className="relative mx-auto h-72 w-full max-w-xs sm:h-96 sm:max-w-sm md:h-[30rem] md:max-w-md lg:h-[26rem] lg:max-w-none"
          >
            <div className="glass absolute inset-0 overflow-hidden rounded-[2.5rem] rotate-2">
              <Parallax range={50} className="absolute inset-0">
                <Image
                  src="/images/mango-2.jpg"
                  alt="新鮮台灣芒果"
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 448px, (min-width: 640px) 384px, 90vw"
                  className="scale-110 object-cover"
                  priority
                />
              </Parallax>
            </div>
            <div className="glass absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-canvas/80 px-5 py-3">
              <span className="text-2xl">🥭</span>
              <div>
                <p className="text-sm font-bold text-ink">100% 產地直送</p>
                <p className="text-xs text-ink/60">玉井 · 枋山</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee */}
        <div className="glass mt-20 -rotate-1 overflow-hidden rounded-full bg-ink py-3">
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
            {[0, 1].map((copy) => (
              <span key={copy} className="flex items-center gap-10 pr-10">
                {mangoes.map((mango) => (
                  <span
                    key={mango.name}
                    className="flex items-center gap-2 text-sm font-semibold text-canvas"
                  >
                    🥭 {mango.name}
                    <span className="text-canvas/25">/</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink/50">
          {stats.map((stat) => (
            <span key={stat.label}>
              <strong className="font-semibold text-ink/70">
                {stat.value}
              </strong>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      </section>

      {/* Mango varieties */}
      <section id="mangoes" className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Kicker index="01" label="SIGNATURE MANGOES" title="芒果品種精選" />
          <p className="mt-4 max-w-md text-sm text-ink/60">
            五大人氣品種，各有各的甜，來自台灣最會種芒果的產地。
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {mangoes.map((mango, i) => (
            <Reveal key={mango.name} delay={(i % 5) * 0.08}>
              <div className="glass group flex h-full flex-col overflow-hidden rounded-[28px] bg-white/35 transition-transform hover:-translate-y-1">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Parallax range={24} className="absolute inset-0">
                    <Image
                      src={mango.image}
                      alt={mango.name}
                      fill
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 45vw, 90vw"
                      className="scale-110 object-cover transition-transform duration-500 group-hover:scale-[1.18]"
                    />
                  </Parallax>
                  <span className="glass absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-canvas/70 font-serif text-xs text-ink/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-lg text-ink">{mango.name}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-accent-warm">
                    {mango.origin} · {mango.season}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {mango.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Season calendar */}
      <section id="season" className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Kicker
            index="02"
            label="MANGO CALENDAR"
            title="芒果產期時歷"
            align="right"
          />
          <p className="mt-4 text-right text-sm text-ink/60">
            有些芒果限定盛夏，有些四季都在，先看什麼時候該吃什麼。
          </p>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {seasonCalendar.map((season, i) => (
            <Reveal key={season.title} delay={i * 0.08}>
              <div
                className="glass w-full max-w-[15rem] shrink-0 rounded-[28px] bg-white/30 p-7 transition-transform hover:-translate-y-2 hover:rotate-0"
                style={{ transform: `rotate(${[-3, 2, -2, 3][i]}deg)` }}
              >
                <span className="font-serif text-5xl text-ink">
                  {season.title}
                </span>
                <p className="mt-1 text-xs font-semibold tracking-widest text-accent-warm">
                  {season.range}
                </p>
                <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-4">
                  {season.items.map((item) => (
                    <li key={item} className="text-sm text-ink/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Kicker
            index="03"
            label="OUR ORCHARD"
            title="在玉井山坡上，我們只種芒果"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal delay={0.1} className="space-y-6">
            <p className="font-serif text-2xl leading-relaxed text-ink/90">
              「專注一件事，把它做到最好——這是我們對芒果的堅持。」
            </p>
            <p className="leading-relaxed text-ink/65">
              三十年來，我們的果園只種芒果。從台南玉井的山坡地到屏東枋山的向陽果園，
              我們依循節氣採收、當日冷鏈配送，讓每一顆芒果都在最甜的時刻送到你手上。
            </p>
            <p className="leading-relaxed text-ink/65">
              我們也持續與 SGS 合作進行農藥殘留檢驗，並推動友善耕作，
              希望台灣芒果的甜，能被更多人看見、也能繼續種下去。
            </p>
          </Reveal>
          <Reveal delay={0.2} className="grid grid-cols-2 gap-x-8 gap-y-10">
            {aboutStats.map((item) => (
              <div key={item.title} className="border-t border-line pt-4">
                <div className="font-serif text-4xl text-accent-warm">
                  {item.title}
                </div>
                <div className="mt-1 text-xs text-ink/60">{item.desc}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Other seasonal fruits from the same orchard */}
      <section className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-ink/40 uppercase">
            Also From Our Farm
          </p>
          <h3 className="mt-2 font-serif text-xl text-ink">
            同一片果園，也照顧著這些台灣好水果
          </h3>
        </Reveal>
        <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2">
          {otherFruits.map((fruit) => (
            <div
              key={fruit.name}
              className="flex w-20 shrink-0 snap-start flex-col items-center gap-2 sm:w-24"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-line sm:h-24 sm:w-24">
                <Image
                  src={fruit.image}
                  alt={fruit.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-ink/60">{fruit.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative -mx-4 sm:-mx-6 lg:mx-auto lg:w-full lg:max-w-6xl lg:px-0"
      >
        <div className="relative overflow-hidden bg-ink px-6 py-20 text-canvas sm:px-16 sm:py-24 lg:rounded-[40px]">
          <div className="blob -top-24 -right-24 h-72 w-72 bg-accent-warm/50" />
          <Reveal className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-accent-warm">
              GET IN TOUCH
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl">
              想吃到最新鮮的台灣芒果嗎？
            </h2>
            <p className="text-sm text-canvas/70 sm:text-base">
              留下您的聯絡方式，我們將為您送上當季最鮮甜的芒果箱，
              或加入 LINE 好友掌握每年產季開賣消息。
            </p>
            <NewsletterForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
