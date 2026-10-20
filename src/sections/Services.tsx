import { motion } from "framer-motion";
import { services } from "../data";

export default function Services() {
  return (
    <section id="services" className="page-wrap scroll-mt-24 py-24 md:py-32">
      <div className="grid grid-cols-1 items-end gap-7 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="section-kicker">How I can help</span>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-7xl">
            Good thinking, made visible.
          </h2>
        </div>
        <p className="max-w-md text-base leading-relaxed text-black/60 md:text-lg lg:col-span-5 lg:justify-self-end">
          A flexible creative practice for people building useful products, memorable brands and clear visual stories.
        </p>
      </div>

      <div className="mt-12 border-b border-black/10">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ x: 6 }}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 border-t border-black/10 py-6 md:grid-cols-[4rem_1fr_1.1fr_auto] md:items-center md:gap-6 md:py-8"
          >
            <span className="font-mono text-xs text-black/40">0{index + 1}</span>
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{service.title}</h3>
            <p className="col-start-2 text-sm leading-relaxed text-black/60 md:col-start-auto md:text-base">
              {service.desc}
            </p>
            <span className="row-span-2 row-start-1 text-lg text-black/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#7c7657] md:row-span-1 md:row-start-auto" aria-hidden="true">↗</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
