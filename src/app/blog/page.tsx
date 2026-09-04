import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { posts } from "./data";

export const metadata: Metadata = {
  title: "芒果日誌 | 芒果莊園",
  description: "挑選、產地故事、吃法提案——關於台灣芒果的三篇小文章。",
};

export default function BlogIndexPage() {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-4 pt-16 pb-28 sm:px-6 sm:pt-24 lg:px-10">
      <Reveal className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent-warm">
          <span className="h-px w-8 bg-accent-warm" />
          MANGO JOURNAL
        </div>
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">芒果日誌</h1>
        <p className="max-w-md text-sm text-ink/60">
          關於挑選、產地與吃法，三篇跟芒果有關的小文章。
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link
              href={`/blog/${post.slug}`}
              className="glass group flex h-full flex-col overflow-hidden rounded-[28px] bg-white/35 transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="glass absolute top-3 left-3 rounded-full bg-canvas/80 px-3 py-1 text-xs font-semibold text-ink/70">
                  {post.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-ink/50">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="mt-2 font-serif text-lg leading-snug text-ink">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-warm">
                  閱讀全文
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
