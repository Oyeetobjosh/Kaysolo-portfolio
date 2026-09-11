import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks";

export default function Cursor() {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!canHover) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const interactive = el.closest("a,button,[data-cursor]");
      setHovering(!!interactive);
      const l = interactive?.getAttribute("data-cursor");
      setLabel(l && l !== "true" ? l : null);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [canHover, x, y]);

  if (!canHover) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[100] hidden md:flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: hovering ? 64 : 34,
            height: hovering ? 64 : 34,
            borderColor: hovering ? "rgba(56,245,227,0.9)" : "rgba(139,92,255,0.5)",
            backgroundColor: hovering ? "rgba(56,245,227,0.08)" : "rgba(139,92,255,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="rounded-full border flex items-center justify-center"
        >
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-neon-cyan">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
