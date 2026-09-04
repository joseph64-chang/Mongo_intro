import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import { getPostBySlug, posts } from "../data";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | 芒果日誌`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = posts.filter((p) => p.slug !== post.slug);

  return (
    <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-14 px-4 pt-16 pb-28 sm:px-6 sm:pt-24 lg:px-10">
      <Reveal className="flex flex-col gap-6">
        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink/60 transition-colors hover:text-accent-warm"
        >
          ← 回芒果日誌
        </Link>

        <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent-warm">
          <span className="h-px w-8 bg-accent-warm" />
          {post.tag.toUpperCase()}
        </div>
        <h1 className="font-serif text-3xl leading-snug text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-xs text-ink/50">
          {post.date} · {post.readTime}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px]">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 768px, 90vw"
          className="object-cover"
          priority
        />
      </Reveal>

      <article className="flex flex-col gap-10">
        {post.sections.map((section, i) => (
          <Reveal key={section.heading} delay={i * 0.06} className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-ink">{section.heading}</h2>
            {section.body.map((paragraph, j) => (
              <p key={j} className="leading-relaxed text-ink/70">
                {paragraph}
              </p>
            ))}
          </Reveal>
        ))}
      </article>

      {otherPosts.length > 0 && (
        <Reveal className="border-t border-line pt-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-ink/40 uppercase">
            繼續閱讀
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="glass group flex flex-col overflow-hidden rounded-[24px] bg-white/35 transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 640px) 320px, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base text-ink">{p.title}</h3>
                  <p className="mt-1 text-xs text-ink/50">{p.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal className="relative overflow-hidden rounded-[32px] bg-ink px-8 py-12 text-center text-canvas">
        <p className="text-xs font-semibold tracking-[0.3em] text-accent-warm">
          GET IN TOUCH
        </p>
        <h2 className="mt-3 font-serif text-2xl">想吃到當季新鮮芒果嗎？</h2>
        <Link
          href="/#contact"
          className="mt-6 inline-flex rounded-full bg-accent-warm px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
        >
          前往選購
        </Link>
      </Reveal>
    </main>
  );
}
