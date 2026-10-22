import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import InteractiveOrb from "../components/InteractiveOrb";
import Magnetic from "../components/Magnetic";

const disciplines = ["Product design", "Brand identity", "Graphic design"];

export default function Hero({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section id="top" ref={ref} className="scroll-mt-20 overflow-hidden">
      <div className="page-wrap flex min-h-screen flex-col pb-10 pt-28 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4"
        >
          <span className="section-kicker normal-case tracking-[0.12em]">Independent designer .</span>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-black/60">
            <motion.span
              animate={reduced ? undefined : { scale: [1, 1.65, 1], opacity: [0.85, 0.35, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-2 rounded-full bg-[#727653]"
              aria-hidden="true"
            />
            Available for select projects
          </span>
        </motion.div>

        <div className="relative flex flex-1 items-center py-8 md:py-10">
          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-6">
            <motion.div
              style={reduced ? undefined : { y: contentY }}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: reduced ? 0 : 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none relative z-20 md:col-span-5"
            >
              <h1 className="w-full font-display text-[clamp(2.55rem,5.35vw,5.25rem)] font-semibold leading-[0.9] tracking-[-0.07em] md:w-[138%] lg:w-[162%]">
                <span className="block lg:whitespace-nowrap">Bringing growth through</span>
                <span className="mt-1 block font-serif text-[1.1em] font-normal italic leading-[0.94] tracking-[-0.05em] lg:whitespace-nowrap">
                  outstanding design.
                </span>
              </h1>

              <p className="pointer-events-auto mt-6 max-w-md text-base leading-relaxed text-black/65 md:text-lg">
                I'm Kaysolo, a product and visual designer based in Nigeria. I turn good ideas into useful digital experiences and identities with clarity, character and care.
              </p>

              <Magnetic className="pointer-events-auto mt-7 w-fit" strength={0.24}>
                <a href="#work" data-cursor="EXPLORE" className="button-dark">
                  View selected work <span aria-hidden="true">↘</span>
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              style={reduced ? undefined : { y: orbY, scale: orbScale }}
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: reduced ? 0 : 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative z-10 h-[340px] w-full sm:h-[420px] md:col-span-7 md:-mr-4 md:h-[min(66vh,520px)] md:w-[calc(100%+1rem)] lg:-mr-8 lg:h-[min(70vh,600px)] lg:w-[calc(100%+2rem)] xl:h-[min(74vh,650px)]"
            >
              <InteractiveOrb />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-black/10 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((discipline, index) => (
            <motion.div
              key={discipline}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 + index * 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-[10px] text-black/40">0{index + 1}</span>
              <span className="text-sm font-medium">{discipline}</span>
            </motion.div>
          ))}
          <a href="#work" data-cursor="SCROLL" className="hidden items-center justify-end gap-2 text-xs font-medium text-black/55 transition-colors hover:text-black lg:flex">
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
