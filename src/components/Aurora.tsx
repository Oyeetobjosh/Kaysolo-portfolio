import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks";

/** Fixed animated aurora / mesh-gradient background that also reacts to pointer + scroll */
export default function Aurora() {
  const reduced = usePrefersReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth - 0.5) * 2;
        const py = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty("--px", String(px * 30));
        el.style.setProperty("--py", String(py * 30));
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={wrap} className="fixed inset-0 -z-10 overflow-hidden bg-ink-950" aria-hidden>
      {/* base gradient */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: reduced ? "none" : "blur(0px)", rotate: hue }}
      />
      <div
        className="absolute inset-0 opacity-[0.9]"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 20%, rgba(139,92,255,0.28), transparent 60%), radial-gradient(50% 50% at 85% 15%, rgba(56,245,227,0.20), transparent 60%), radial-gradient(60% 60% at 70% 90%, rgba(255,61,240,0.18), transparent 60%)",
          transform: "translate3d(calc(var(--px,0)*1px), calc(var(--py,0)*1px), 0)",
          transition: "transform 0.3s ease-out",
        }}
      />
      {/* floating blobs */}
      {!reduced && (
        <>
          <motion.div
            className="absolute -left-32 top-10 h-[42vw] w-[42vw] rounded-full bg-neon-violet/25 blur-[110px]"
            animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 top-1/3 h-[38vw] w-[38vw] rounded-full bg-neon-cyan/20 blur-[120px]"
            animate={{ x: [0, -50, 30, 0], y: [0, -40, 40, 0], scale: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 h-[34vw] w-[34vw] rounded-full bg-neon-magenta/15 blur-[120px]"
            animate={{ x: [0, 40, -40, 0], y: [0, 30, -20, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
    </div>
  );
}
