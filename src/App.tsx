import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import IntroLoader from "./components/IntroLoader";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import Work from "./sections/Work";
import Services from "./sections/Services";
import Process from "./sections/Process";
import About from "./sections/About";
import Contact from "./sections/Contact";
import { usePrefersReducedMotion } from "./hooks";

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [loading, setLoading] = useState(true);
  const handleLoaderComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute("href");
      if (!id || id === "#") return;

      const section = document.querySelector<HTMLElement>(id);
      if (!section) return;

      event.preventDefault();
      lenis.scrollTo(section, { offset: -80 });
    };

    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <div className="min-h-screen bg-white text-ink-950">
      <Cursor />
      <IntroLoader open={loading} onComplete={handleLoaderComplete} />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <Work />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
    </div>
  );
}
