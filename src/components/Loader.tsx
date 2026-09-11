import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-6xl font-bold tracking-tight md:text-8xl"
          >
            Kaysolo<span className="text-neon-cyan">.</span>
          </motion.div>
          <div className="mt-8 h-[2px] w-56 overflow-hidden rounded bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta"
              style={{ width: `${count}%` }}
            />
          </div>
          <div className="mt-4 font-mono text-sm text-white/50">
            {String(count).padStart(3, "0")} — loading the studio
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
