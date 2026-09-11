import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { process } from "../data";
import { RevealWords } from "../components/Reveal";
import { useMediaQuery } from "../hooks";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // translate track: show 4 panels across
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!isDesktop) {
    return (
      <section id="process" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24">
        <span className="font-mono text-sm text-neon-cyan">/ how I work</span>
        <h2 className="mt-4 font-display text-5xl font-bold tracking-tight">
          <span className="text-gradient">The process.</span>
        </h2>
        <div className="mt-10 space-y-5">
          {process.map((p) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-white/10 bg-ink-900/60 p-7"
            >
              <span className="font-mono text-sm text-neon-cyan">{p.n}</span>
              <h3 className="mt-2 font-display text-3xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-white/60">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="process" ref={ref} className="relative h-[320vh] scroll-mt-24">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-7xl px-8">
          <span className="font-mono text-sm text-neon-cyan">/ how I work</span>
          <h2 className="mt-3 font-display text-6xl font-bold tracking-tight lg:text-7xl">
            <RevealWords text="The" /> <span className="text-gradient">process.</span>
          </h2>
          {/* progress line */}
          <div className="mt-6 h-[2px] w-full max-w-md overflow-hidden rounded bg-white/10">
            <motion.div style={{ width: line }} className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta" />
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-8">
          {process.map((p, i) => (
            <div
              key={p.n}
              className="relative w-[70vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/60 p-12 lg:w-[46vw]"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
                style={{ background: ["#38f5e3", "#8b5cff", "#ff3df0", "#c6ff3d"][i] }}
              />
              <span className="font-display text-[9rem] font-bold leading-none text-white/5">{p.n}</span>
              <h3 className="mt-4 font-display text-5xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-5 max-w-md text-lg text-white/60">{p.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
