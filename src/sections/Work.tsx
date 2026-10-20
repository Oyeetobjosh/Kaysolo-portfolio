import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data";
import ProjectCard from "../components/ProjectCard";

const filters = ["All projects", "Product design", "Brand identity", "Visual design"];

export default function Work() {
  const [active, setActive] = useState("All projects");
  const list = useMemo(
    () => (active === "All projects" ? projects : projects.filter((project) => project.category === active)),
    [active]
  );

  return (
    <section id="work" className="page-wrap scroll-mt-24 py-24 md:py-32">
      <div className="grid grid-cols-1 items-end gap-7 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="section-kicker">Selected work</span>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-7xl">
            A selection of good ideas.
          </h2>
        </div>
        <div className="max-w-md lg:col-span-5 lg:justify-self-end">
          <p className="text-base leading-relaxed text-black/60 md:text-lg">
            Each image belongs to the project it opens. Browse the full design on Kaysolo's Behance profile.
          </p>
          <a
            href="https://www.behance.net/odewolekehinde"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-semibold"
          >
            Visit Behance profile <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto pb-2">
        <div role="group" aria-label="Filter projects" className="flex min-w-max gap-2">
          {filters.map((filter) => {
            const selected = active === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter)}
                className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-black/65 hover:border-black hover:text-black"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="mt-9 grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 md:gap-y-16">
        <AnimatePresence mode="popLayout">
          {list.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
