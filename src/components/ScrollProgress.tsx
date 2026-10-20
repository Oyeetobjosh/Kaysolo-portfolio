import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const smoothedProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 32, restDelta: 0.001 });
  const progress = reduced ? scrollYProgress : smoothedProgress;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(Math.round(progress.get() * 100));
  }, [progress]);

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.round(value * 100);
    setPercent((current) => (current === next ? current : next));
  });

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={`${percent} percent page progress`}
      className="pointer-events-none fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border border-black/10 bg-white/90 px-4 py-2 shadow-[0_8px_28px_rgba(34,32,25,0.12)] backdrop-blur-md"
    >
      <span className="font-mono text-[9px] font-bold tracking-[0.14em] text-black/50">PAGE</span>
      <div aria-hidden="true" className="h-1 w-20 overflow-hidden rounded-full bg-black/10">
        <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-[#857653]" />
      </div>
      <span className="min-w-[2.7rem] text-right font-mono text-[10px] font-bold tabular-nums text-black">
        {String(percent).padStart(2, "0")}%
      </span>
    </div>
  );
}
