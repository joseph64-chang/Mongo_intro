"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBlobs() {
  const { scrollYProgress } = useScroll();
  const yWarm = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const yCool = useTransform(scrollYProgress, [0, 1], [0, 260]);

  return (
    <>
      <motion.div
        style={{ y: yWarm }}
        className="blob animate-float-slow -top-24 -left-24 h-[30rem] w-[30rem] bg-amber-200"
      />
      <motion.div
        style={{ y: yCool }}
        className="blob animate-float-slower top-1/2 -right-32 h-[26rem] w-[26rem] bg-emerald-900/20"
      />
    </>
  );
}
