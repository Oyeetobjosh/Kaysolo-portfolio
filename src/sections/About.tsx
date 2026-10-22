import { motion } from "framer-motion";

const tools = ["Figma", "Illustrator", "Photoshop", "After Effects", "Blender", "Framer"];

export default function About() {
  return (
    <section id="about" className="page-wrap scroll-mt-24 py-24 md:py-32">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65 }}
        whileHover={{ y: -3 }}
        className="w-full"
      >
        <div className="aspect-[1181/393] w-full overflow-hidden bg-[#06242a]">
          <img
            src="/about-banner.jpg"
            alt="Kaysolo visual design banner — Let's give your project or brand the visuals it deserves"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
          />
        </div>
        <figcaption className="mt-3 flex items-center justify-between border-t border-black/10 pt-3 text-xs text-black/55">
          <span>Kaysolo</span>
          <span>Nigeria</span>
        </figcaption>
      </motion.figure>

      <div className="mt-12 grid grid-cols-1 items-start gap-8 md:mt-16 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.06 }}
          className="lg:col-span-5"
        >
          <span className="section-kicker">A little about me</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl">
            Curious by nature.
            <br />
            <span className="font-serif font-normal italic">Thoughtful by design.</span>
          </h2>

          <a
            href="https://www.behance.net/odewolekehinde"
            target="_blank"
            rel="noreferrer"
            data-cursor="BEHANCE"
            className="mt-7 inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-semibold"
          >
            Explore the Behance portfolio <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="lg:col-span-7"
        >
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-black/65 md:text-lg">
            <p>
              I'm Kaysolo, a product and visual designer based in Nigeria. I work across digital products, brand identity and graphic design, helping people make their ideas clear and memorable.
            </p>
            <p>
              I care about more than how a screen or identity looks. I think about how it works, how it feels and the small details that make it useful.
            </p>
          </div>

          <div className="mt-10 border-t border-black/10 pt-5">
            <span className="section-kicker">Tools I use</span>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {tools.map((tool) => (
                <span key={tool} className="text-sm text-black/65">{tool}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
