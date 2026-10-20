import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import type { Project } from "../data";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [6.5, -6.5]), { stiffness: 150, damping: 21 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-7, 7]), { stiffness: 150, damping: 21 });

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set(x);
    pointerY.set(y);
    ref.current.style.setProperty("--spot-x", `${x * 100}%`);
    ref.current.style.setProperty("--spot-y", `${y * 100}%`);
  };

  const reset = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    ref.current?.style.removeProperty("--spot-x");
    ref.current?.style.removeProperty("--spot-y");
  };

  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1200px]"
    >
      <motion.a
        ref={ref}
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} on Behance`}
        data-cursor="VIEW"
        onPointerMove={move}
        onPointerLeave={reset}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={reduced ? undefined : { y: -5, scale: 1.006 }}
        className="group block"
      >
        <figure className="relative aspect-[4/3] overflow-hidden border border-black/10 bg-[#f3f0e8]" style={{ transform: "translateZ(14px)", transformStyle: "preserve-3d" }}>
          {imageFailed ? (
            <div className="flex h-full w-full items-center justify-center bg-[#f3f0e8] px-8 text-center">
              <span className="font-display text-2xl font-semibold text-black/45">{project.title}</span>
            </div>
          ) : (
            <motion.img
              src={project.image}
              alt={`${project.title} project cover from Behance`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              sizes="(max-width: 767px) 100vw, 50vw"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.055]"
            />
          )}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(190, 151, 103, 0.24), transparent 42%)" }}
          />
          <span className="absolute left-4 top-4 z-20 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-black shadow-sm">
            {project.category}
          </span>
          <span
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white text-lg text-black shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-black group-hover:text-white"
            aria-hidden="true"
          >
            ↗
          </span>
        </figure>

        <div className="relative pt-5" style={{ transform: "translateZ(24px)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-kicker mb-2">{number} <span aria-hidden="true">·</span> {project.category}</p>
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {project.title}
              </h3>
            </div>
            <span className="pt-1 text-sm text-black/45">{project.year}</span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/60 md:text-base">
            {project.blurb}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-3 text-xs font-medium text-black/50">
            <span>View on Behance</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}
