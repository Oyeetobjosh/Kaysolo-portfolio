import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 360, damping: 30, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 360, damping: 30, mass: 0.45 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = (event.target as HTMLElement | null)?.closest("a, button, [data-cursor]") as HTMLElement | null;
      const cursorLabel = target?.getAttribute("data-cursor");
      setActive(Boolean(target));
      setLabel(cursorLabel && cursorLabel !== "true" ? cursorLabel : null);
    };
    const leave = () => {
      setActive(false);
      setLabel(null);
    };
    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <span className="block h-1.5 w-1.5 rounded-full bg-[#615f43]" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.span
          animate={{
            width: active ? 72 : 36,
            height: active ? 72 : 36,
            borderColor: active ? "rgba(120, 111, 77, 0.7)" : "rgba(99, 97, 70, 0.38)",
            backgroundColor: active ? "rgba(188, 145, 91, 0.13)" : "rgba(188, 145, 91, 0)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="flex items-center justify-center rounded-full border"
          style={{ mixBlendMode: "multiply" }}
        >
          {label && <span className="px-2 font-mono text-[9px] uppercase tracking-[0.08em] text-black">{label}</span>}
        </motion.span>
      </motion.div>
    </>
  );
}
