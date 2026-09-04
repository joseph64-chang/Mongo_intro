import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import MangoCatchGame from "../components/MangoCatchGame";

export const metadata: Metadata = {
  title: "接芒果小遊戲 | 芒果莊園",
  description: "15 秒限時接芒果，純娛樂小遊戲，看看你能接到幾顆！",
};

export default function GamePage() {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-10 px-4 pt-16 pb-28 sm:px-6 sm:pt-24 lg:px-10">
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent-warm">
          <span className="h-px w-8 bg-accent-warm" />
          JUST FOR FUN
        </div>
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">
          接芒果小遊戲
        </h1>
        <p className="max-w-md text-sm text-ink/60">
          限時 15 秒，移動籃子接住掉落的芒果，單純娛樂，來看看手速如何！
        </p>
      </Reveal>

      <Reveal delay={0.1} className="w-full">
        <MangoCatchGame />
      </Reveal>
    </main>
  );
}
