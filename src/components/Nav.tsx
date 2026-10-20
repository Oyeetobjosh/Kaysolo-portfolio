import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] border-b border-black/10 bg-white/95 backdrop-blur-md">
        <div className="page-wrap flex h-[76px] items-center justify-between">
          <a href="#top" aria-label="Kaysolo home" data-cursor="HOME" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-black font-display text-lg font-bold text-white transition-transform duration-300 group-hover:rotate-6">
              K
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Kaysolo</span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="true"
                className="text-sm font-medium text-black/60 transition-colors hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <Magnetic>
              <a href="#contact" data-cursor="SAY HI" className="button-dark min-h-10 px-5 py-2 text-xs">
                Let's talk <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </div>

          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            data-cursor="MENU"
            onClick={() => setOpen((value) => !value)}
            className="relative z-[70] grid h-11 w-11 place-items-center rounded-full border border-black/15 md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="flex w-4 flex-col gap-[5px]">
              <motion.span
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                className="block h-px w-full bg-black"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-full bg-black"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                className="block h-px w-full bg-black"
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-white px-5 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="page-wrap flex h-full flex-col">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  data-cursor="true"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                  className="thin-rule flex items-center justify-between py-5 font-display text-4xl font-semibold tracking-tight"
                >
                  {link.label}
                  <span className="font-sans text-xl font-normal" aria-hidden="true">↗</span>
                </motion.a>
              ))}
              <a href="https://www.behance.net/odewolekehinde" target="_blank" rel="noreferrer" data-cursor="BEHANCE" className="mt-auto text-sm font-medium text-black/55">
                View the Behance profile ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
