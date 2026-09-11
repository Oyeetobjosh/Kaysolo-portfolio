import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "../data";
import { useMediaQuery } from "../hooks";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!canHover || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
    setHover(false);
  };

  const big = index % 5 === 0 || index % 5 === 3;

  return (
    <motion.a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="view case"
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group perspective relative block ${big ? "lg:col-span-7" : "lg:col-span-5"}`}
    >
      <motion.div
        style={{ rotateX: canHover ? rx : 0, rotateY: canHover ? ry : 0, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-850"
      >
        {/* image */}
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/11]">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            animate={{ scale: hover ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
          {/* glow following accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(40% 40% at ${hover ? "var(--gx,50%)" : "50%"} 30%, ${project.accent}33, transparent 70%)`,
            }}
          />
          {/* category tag */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider backdrop-blur"
              style={{ background: `${project.accent}22`, color: project.accent, border: `1px solid ${project.accent}55` }}
            >
              {project.category}
            </span>
          </div>
          <span className="absolute right-4 top-4 font-mono text-xs text-white/50">{project.year}</span>
        </div>

        {/* content */}
        <div className="relative p-6 md:p-7" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {project.title}
            </h3>
            <motion.span
              animate={{ rotate: hover ? 45 : 0, backgroundColor: hover ? project.accent : "rgba(255,255,255,0.06)" }}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg"
              style={{ color: hover ? "#05010d" : "#fff" }}
            >
              ↗
            </motion.span>
          </div>
          <p className="mt-3 max-w-lg text-sm text-white/60 md:text-base">{project.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}
