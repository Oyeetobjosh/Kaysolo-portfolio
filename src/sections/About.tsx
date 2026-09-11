import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../data";
import Reveal, { RevealWords } from "../components/Reveal";
import { useCountUp } from "../hooks";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const n = useCountUp(value, inView);
  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-display text-5xl font-bold tracking-tight text-white md:text-6xl">
        {n}
        <span className="text-gradient">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-white/50">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        {/* portrait */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="conic-border group relative overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-850">
                <img
                  src="/portrait.jpg"
                  alt="Kaysolo — Full-stack designer"
                  className="relative z-10 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = "1";
                      img.src = "/portrait.png";
                    } else {
                      img.style.display = "none";
                    }
                  }}
                />
                {/* fallback gradient (shows if image missing) */}
                <div className="absolute inset-0 -z-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(139,92,255,0.5),transparent),radial-gradient(50%_50%_at_70%_80%,rgba(56,245,227,0.4),transparent)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div className="glass rounded-2xl px-4 py-3">
                    <div className="font-display text-lg font-semibold">Kaysolo</div>
                    <div className="text-xs text-white/60">Full-stack Designer</div>
                  </div>
                  <div className="glass rounded-full px-3 py-2 font-mono text-xs text-neon-lime">
                    ● Online
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* text */}
        <div className="lg:col-span-7">
          <Reveal>
            <span className="font-mono text-sm text-neon-cyan">/ about</span>
          </Reveal>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <RevealWords text="Design that's equal parts" />{" "}
            <span className="text-gradient">
              <RevealWords text="beauty and armor." delay={0.15} />
            </span>
          </h2>
          <div className="mt-7 space-y-5 text-lg text-white/70">
            <p>
              I'm Kaysolo, a Lagos-based full-stack designer. I move fluidly between UI/UX, graphics
              and branding — and I go where most designers don't: security and anti-counterfeit design
              that protects the products people love.
            </p>
            <p>
              From crypto apps and web platforms to full brand systems and hologram-grade security
              artwork, I obsess over the details that make work feel intentional, premium and
              impossible to fake.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Figma", "Illustrator", "Photoshop", "After Effects", "Blender", "Framer"].map((t) => (
              <motion.span
                key={t}
                whileHover={{ y: -3, borderColor: "rgba(56,245,227,0.5)" }}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
