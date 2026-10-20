import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { process } from "../data";

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-48%"]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" ref={ref} className="scroll-mt-20">
      <div className="page-wrap py-24 lg:hidden">
        <span className="section-kicker">A considered process</span>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">
          From first thought to final detail.
        </h2>
        <div className="mt-10 space-y-4">
          {process.map((step, index) => (
            <motion.article
              key={step.n}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="relative overflow-hidden border border-black/10 bg-[#f5f2ec] p-6"
            >
              <span className="absolute right-5 top-3 font-display text-6xl font-semibold text-black/[0.06]">{step.n}</span>
              <span className="section-kicker">Step {step.n}</span>
              <h3 className="relative mt-3 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="relative mt-2 max-w-lg text-sm leading-relaxed text-black/60">{step.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="relative hidden h-[250vh] lg:block">
        <div className="sticky top-[76px] flex h-[calc(100vh-76px)] flex-col justify-center overflow-hidden">
          <div className="page-wrap relative z-10 mb-8">
            <div className="flex items-end justify-between gap-8">
              <div>
                <span className="section-kicker">A considered process</span>
                <h2 className="mt-3 font-display text-6xl font-semibold leading-[0.96] tracking-[-0.06em] xl:text-7xl">
                  From first thought to final detail.
                </h2>
              </div>
              <span className="hidden pb-2 font-mono text-xs text-black/45 xl:block">Scroll to move through each stage</span>
            </div>
            <div className="mt-6 h-px max-w-lg bg-black/10">
              <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-[#8a7959]" />
            </div>
          </div>

          <motion.div style={{ x: trackX }} className="flex w-max gap-8 pl-[max(2rem,calc((100vw-1480px)/2+3rem))] pr-12">
            {process.map((step, index) => (
              <motion.article
                key={step.n}
                whileHover={{ y: -7, rotateZ: index % 2 === 0 ? -0.3 : 0.3 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="relative flex h-[47vh] w-[46vw] max-w-[700px] shrink-0 flex-col justify-between overflow-hidden border border-black/10 bg-[#f5f2ec] p-9 xl:p-12"
              >
                <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(172,139,92,0.2),transparent_68%)] blur-2xl" />
                <div className="relative flex items-start justify-between">
                  <span className="section-kicker">Step {step.n}</span>
                  <span className="font-mono text-xs text-black/40">0{index + 1} / 04</span>
                </div>
                <div className="relative">
                  <span className="font-display text-[8rem] font-semibold leading-none tracking-[-0.08em] text-black/[0.06] xl:text-[10rem]">{step.n}</span>
                  <h3 className="mt-3 font-display text-4xl font-semibold tracking-[-0.05em] xl:text-6xl">{step.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-black/60 xl:text-lg">{step.desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
