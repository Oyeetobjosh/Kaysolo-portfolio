import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "../components/Magnetic";
import { RevealWords } from "../components/Reveal";

const disciplines = ["UI/UX", "Graphics", "Branding", "Security"];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yTag = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-28 pb-16 md:px-8"
    >
      <motion.div style={{ opacity }} className="mx-auto w-full max-w-7xl">
        {/* status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-xs md:text-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-lime opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon-lime" />
          </span>
          <span className="text-white/80">Available for freelance & full-time</span>
          <span className="hidden text-white/30 sm:inline">·</span>
          <span className="hidden text-white/50 sm:inline">Lagos, Nigeria</span>
        </motion.div>

        <motion.h1
          style={{ y: yTitle, scale }}
          className="font-display text-[15vw] font-bold leading-[0.86] tracking-tight md:text-[10.5vw] lg:text-[9vw]"
        >
          <span className="block overflow-hidden">
            <RevealWords text="Full-stack" delay={0.1} />
          </span>
          <span className="block overflow-hidden">
            <span className="text-gradient">
              <RevealWords text="design." delay={0.22} />
            </span>
            <span className="ml-2 align-top text-[3vw] text-white/40 md:text-[1.4vw]">
              /keɪˈsoʊloʊ/
            </span>
          </span>
        </motion.h1>

        <motion.div
          style={{ y: yTag }}
          className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-lg text-white/70 md:text-xl">
            I'm <span className="text-white">Kaysolo</span> — a full-stack designer turning bold ideas
            into interfaces, brands and secure, counterfeit-proof design that people actually feel.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                data-cursor="explore"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink-950"
              >
                View the work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                data-cursor="true"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white/90 transition-colors hover:border-white/40"
              >
                Let's talk
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* discipline strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6"
        >
          {disciplines.map((d, i) => (
            <div key={d} className="flex items-center gap-3">
              <span className="font-mono text-xs text-neon-cyan">0{i + 1}</span>
              <span className="font-display text-base font-medium text-white/80 md:text-lg">{d}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-9 w-5 rounded-full border border-white/20 p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
