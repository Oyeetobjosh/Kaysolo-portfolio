import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Magnetic from "./Magnetic";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta"
        style={{ scaleX: bar }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <a
            href="#top"
            className={`group flex items-center gap-2.5 transition-all ${
              scrolled ? "scale-95" : ""
            }`}
            data-cursor="home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-magenta font-display text-lg font-bold text-ink-950">
              K
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Kaysolo<span className="text-neon-cyan">.</span>
            </span>
          </a>

          <nav
            className={`hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex ${
              scrolled ? "glass" : ""
            }`}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="true"
                className="relative rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic>
              <a
                href="#contact"
                data-cursor="let's talk"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform"
              >
                <span className="relative z-10">Start a project</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-[80] grid h-11 w-11 place-items-center rounded-xl glass md:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-white"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-5 bg-white"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-white"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[66] bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                  className="font-display text-5xl font-semibold tracking-tight text-white/90"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink-950"
              >
                Start a project →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
