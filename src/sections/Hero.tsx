import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import InteractiveOrb from "../components/InteractiveOrb";
import Magnetic from "../components/Magnetic";

const disciplines = ["Product design", "Brand identity", "Graphic design"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -68]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 88]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section id="top" ref={ref} className="scroll-mt-20 overflow-hidden">
      <div className="page-wrap flex min-h-screen flex-col pb-10 pt-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

        <div className="relative flex flex-1 flex-col justify-center py-12 md:py-16">
          <motion.div
            style={reduced ? undefined : { y: orbY, scale: orbScale }}
            className="pointer-events-auto absolute right-[-18%] top-[3%] z-0 h-[82vw] max-h-[560px] w-[82vw] max-w-[560px] md:right-[-3%] md:top-[1%] md:h-[52vw] md:w-[52vw]"
          >
            <InteractiveOrb />
          </motion.div>

          <motion.h1
            style={reduced ? undefined : { y: titleY }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-full font-display text-[clamp(3.25rem,10.6vw,10rem)] font-semibold leading-[0.86] tracking-[-0.075em] md:max-w-[88%]"
          >
            <span className="block">Design should</span>
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.055em]">
              feel like you.
            </span>
          </motion.h1>

          <motion.div
            style={reduced ? undefined : { y: copyY }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 mt-8 ml-auto w-full max-w-md lg:mr-[3%] lg:mt-[-1rem]"
          >
            <p className="text-lg leading-relaxed text-black/65 md:text-xl">
              I'm Kaysolo, a product and visual designer based in Nigeria. I turn good ideas into useful digital experiences and identities with clarity, character and care.
            </p>
            <Magnetic className="mt-7 w-fit" strength={0.24}>
              <a href="#work" data-cursor="EXPLORE" className="button-dark">
                View selected work <span aria-hidden="true">↘</span>
              </a>
            </Magnetic>
          </motion.div>
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
