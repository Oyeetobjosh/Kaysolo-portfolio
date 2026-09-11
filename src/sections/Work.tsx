import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data";
import ProjectCard from "../components/ProjectCard";
import Reveal, { RevealWords } from "../components/Reveal";

const filters = ["All", "UI/UX", "Branding", "Graphics", "Security"];

export default function Work() {
  const [active, setActive] = useState("All");
  const list = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="work" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Reveal>
            <span className="font-mono text-sm text-neon-cyan">/ selected work</span>
          </Reveal>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            <RevealWords text="Work that" />
            <br />
            <span className="text-gradient">
              <RevealWords text="ships & sticks." delay={0.15} />
            </span>
          </h2>
        </div>
        <Reveal delay={0.2}>
          <p className="max-w-sm text-white/60">
            A slice of recent projects across product, brand and security design. Tap any card to open
            the full case on Behance.
          </p>
        </Reveal>
      </div>

      {/* filters */}
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              data-cursor="true"
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active === f ? "text-ink-950" : "text-white/70 hover:text-white"
              }`}
            >
              {active === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* grid */}
      <motion.div layout className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
