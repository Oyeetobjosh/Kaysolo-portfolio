import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import InteractiveOrb from "./InteractiveOrb";

type IntroLoaderProps = {
  open: boolean;
  onComplete: () => void;
};

export default function IntroLoader({ open, onComplete }: IntroLoaderProps) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const duration = reduced ? 900 : 2400;
    const start = performance.now();
    let frame = 0;
    let timeoutId = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      timeoutId = window.setTimeout(onComplete, reduced ? 120 : 260);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const linear = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - linear, 2.2);
      setProgress(Math.round(eased * 100));

      if (linear < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    frame = window.requestAnimationFrame(tick);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeoutId);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onComplete, reduced]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading Kaysolo portfolio"
          initial={{ y: 0, opacity: 1 }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.3 } }
              : {
                  y: "-100%",
                  transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
                }
          }
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-white px-6 py-7 text-ink-950 md:py-9"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5"
          >
            <span className="h-2 w-2 rounded-full bg-[#727653]" aria-hidden="true" />
            <span className="section-kicker">Kaysolo Portfolio</span>
          </motion.div>

          <div className="flex w-full flex-col items-center justify-center">
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="h-[240px] w-[min(92vw,480px)] sm:h-[270px] sm:w-[540px] lg:h-[305px] lg:w-[620px]"
            >
              <InteractiveOrb />
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 text-center font-display text-[clamp(2.15rem,4.4vw,3.75rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
            >
              <span className="block">Let's make</span>
              <span className="block font-serif text-[1.12em] font-normal italic tracking-[-0.04em]">
                something meaningful.
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex w-56 flex-col items-center gap-2.5 sm:w-64"
          >
            <div className="h-px w-full overflow-hidden bg-black/10">
              <div
                style={{ transform: `scaleX(${progress / 100})` }}
                className="h-full w-full origin-left bg-ink-950 transition-transform duration-75 ease-out"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.22em] text-black/50">
              {String(progress).padStart(3, "0")}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
