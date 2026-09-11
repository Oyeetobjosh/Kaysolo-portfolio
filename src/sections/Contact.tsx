import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "../components/Magnetic";
import { RevealWords } from "../components/Reveal";

const socials = [
  { label: "Behance", href: "https://www.behance.net/odewolekehinde" },
  { label: "Twitter / X", href: "https://twitter.com/Kaysolo_1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Email", href: "mailto:hello@kaysolo.design" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <section id="contact" ref={ref} className="relative scroll-mt-24 px-5 py-24 md:px-8 md:py-36">
      <motion.div
        style={{ y }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-900/60 p-8 md:p-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 0%, rgba(139,92,255,0.35), transparent 60%), radial-gradient(50% 60% at 90% 100%, rgba(56,245,227,0.25), transparent 60%)",
          }}
        />
        <div className="relative">
          <span className="font-mono text-sm text-neon-cyan">/ let's build</span>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl">
            <RevealWords text="Got a project" />
            <br />
            <span className="text-gradient">
              <RevealWords text="worth designing?" delay={0.15} />
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Whether it's a product, a full rebrand, or security design that can't be faked — let's make
            something people can't scroll past.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.4}>
              <a
                href="mailto:hello@kaysolo.design"
                data-cursor="email me"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-ink-950"
              >
                Start a project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.behance.net/odewolekehinde"
                target="_blank"
                rel="noreferrer"
                data-cursor="true"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-semibold transition-colors hover:border-white/50"
              >
                See full Behance
              </a>
            </Magnetic>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 border-t border-white/10 pt-10 md:grid-cols-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="true"
                className="group flex items-center justify-between rounded-2xl border border-white/10 px-5 py-4 transition-colors hover:border-white/30 hover:bg-white/5"
              >
                <span className="text-white/80">{s.label}</span>
                <span className="text-white/40 transition-all group-hover:translate-x-1 group-hover:text-neon-cyan">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/40 md:flex-row">
        <span>© {new Date().getFullYear()} Kaysolo. Designed with intent.</span>
        <span className="font-mono">Lagos · Nigeria — available worldwide</span>
      </footer>
    </section>
  );
}
