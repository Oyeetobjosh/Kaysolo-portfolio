import { motion } from "framer-motion";
import Magnetic from "../components/Magnetic";

const socials = [
  { label: "Behance", href: "https://www.behance.net/odewolekehinde" },
  { label: "X / Twitter", href: "https://twitter.com/Kaysolo_1" },
  { label: "Email", href: "mailto:hello@kaysolo.design" },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-black/10 py-20 md:py-28">
      <div className="page-wrap">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-8"
          >
            <span className="section-kicker">Have a project in mind?</span>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.93] tracking-[-0.06em] md:text-8xl">
              Let's make
              <br />
              <span className="font-serif font-normal italic">something meaningful.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="max-w-sm lg:col-span-4 lg:justify-self-end"
          >
            <p className="text-base leading-relaxed text-black/60 md:text-lg">
              Looking for a thoughtful designer for your next idea? Send a note or explore the work on Behance.
            </p>
            <Magnetic className="mt-6 w-fit" strength={0.2}>
              <a href="mailto:hello@kaysolo.design" data-cursor="EMAIL" className="button-dark">
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 border-y border-black/10 sm:grid-cols-3">
          {socials.map((social, index) => {
            const external = social.href.startsWith("http");
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                data-cursor={social.label.toUpperCase()}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ x: 5 }}
                className="group flex items-center justify-between border-b border-black/10 py-4 text-sm font-medium transition-colors hover:text-black/55 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
              >
                {social.label}
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
              </motion.a>
            );
          })}
        </div>

        <footer className="mt-8 flex flex-col justify-between gap-3 text-xs text-black/45 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Kaysolo. Designed with intent.</span>
          <span>Lagos, Nigeria · Available worldwide</span>
        </footer>
      </div>
    </section>
  );
}
