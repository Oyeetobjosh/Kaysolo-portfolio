import { motion } from "framer-motion";
import { services } from "../data";
import Reveal, { RevealWords } from "../components/Reveal";

function Glyph({ type, color }: { type: string; color: string }) {
  const common = { stroke: color, strokeWidth: 1.6, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8">
      {type === "ui" && (
        <>
          <rect x="6" y="8" width="36" height="32" rx="4" {...common} />
          <path d="M6 16h36M12 24h14M12 30h20" {...common} />
        </>
      )}
      {type === "graphics" && (
        <>
          <circle cx="18" cy="18" r="9" {...common} />
          <rect x="24" y="24" width="16" height="16" rx="3" {...common} />
        </>
      )}
      {type === "brand" && (
        <>
          <path d="M24 6l6 12 13 2-9.5 9 2.5 13L24 38l-12 4 2.5-13L5 20l13-2z" {...common} />
        </>
      )}
      {type === "security" && (
        <>
          <path d="M24 5l15 6v9c0 10-6.5 17-15 20C15.5 37 9 30 9 20v-9z" {...common} />
          <path d="M18 23l4 4 8-9" {...common} />
        </>
      )}
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="max-w-3xl">
        <Reveal>
          <span className="font-mono text-sm text-neon-cyan">/ what I do</span>
        </Reveal>
        <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          <RevealWords text="One designer," />
          <br />
          <span className="text-gradient">
            <RevealWords text="four superpowers." delay={0.15} />
          </span>
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 p-8 md:p-10"
          >
            {/* hover glow */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: s.accent }}
            />
            <div className="relative flex items-start justify-between">
              <div
                className="grid h-16 w-16 place-items-center rounded-2xl border"
                style={{ borderColor: `${s.accent}44`, background: `${s.accent}12` }}
              >
                <Glyph type={s.glyph} color={s.accent} />
              </div>
              <span className="font-display text-6xl font-bold text-white/5 transition-colors duration-500 group-hover:text-white/10">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-7 font-display text-3xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-3 max-w-md text-white/60">{s.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.bullets.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
