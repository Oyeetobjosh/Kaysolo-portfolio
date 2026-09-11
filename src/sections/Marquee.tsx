const items = [
  "UI/UX Design",
  "Branding",
  "Graphics",
  "Anti-Counterfeit",
  "Design Systems",
  "Product Design",
  "Motion",
  "Web3",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex whitespace-nowrap">
      <div className={`flex shrink-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="mx-6 flex items-center gap-6 font-display text-4xl font-semibold md:text-6xl">
            <span className={i % 2 ? "text-white/20" : "text-white/80"}>{t}</span>
            <span className="text-neon-cyan">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative border-y border-white/10 py-8 md:py-10">
      <Row />
    </section>
  );
}
