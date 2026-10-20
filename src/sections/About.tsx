import { motion } from "framer-motion";

const tools = ["Figma", "Illustrator", "Photoshop", "After Effects", "Blender", "Framer"];

export default function About() {
  return (
    <section id="about" className="page-wrap scroll-mt-24 py-24 md:py-32">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          whileHover={{ y: -4, rotateY: -1.5 }}
          style={{ transformStyle: "preserve-3d" }}
          className="lg:col-span-5 [perspective:1000px]"
        >
          <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
            <img
              src="/portrait.jpg"
              alt="Portrait artwork of Kaysolo"
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between border-t border-black/10 pt-3 text-xs text-black/55">
            <span>Kaysolo</span>
            <span>Nigeria</span>
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="lg:col-span-7"
        >
          <span className="section-kicker">A little about me</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl">
            Curious by nature.
            <br />
            <span className="font-serif font-normal italic">Thoughtful by design.</span>
          </h2>

          <div className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-black/65 md:text-lg">
            <p>
              I'm Kaysolo, a product and visual designer based in Nigeria. I work across digital products, brand identity and graphic design, helping people make their ideas clear and memorable.
            </p>
            <p>
              I care about more than how a screen or identity looks. I think about how it works, how it feels and the small details that make it useful.
            </p>
          </div>

          <a
            href="https://www.behance.net/odewolekehinde"
            target="_blank"
            rel="noreferrer"
            data-cursor="BEHANCE"
            className="mt-7 inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-semibold"
          >
            Explore the Behance portfolio <span aria-hidden="true">↗</span>
          </a>

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
