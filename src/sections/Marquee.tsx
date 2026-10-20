const items = ["Product design", "Brand identity", "Graphic design", "Digital experiences"];

export default function Marquee() {
  return (
    <section aria-label="Areas of practice" className="overflow-hidden border-y border-black/10 py-6 md:py-8">
      <p className="sr-only">Product design, brand identity, graphic design and digital experiences.</p>
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none" aria-hidden="true">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="mx-5 flex items-center gap-5 font-display text-2xl font-semibold tracking-tight text-black/75 md:mx-8 md:gap-8 md:text-4xl">
            {item}
            <span className="font-sans text-xl font-normal text-black/35 md:text-2xl">✳</span>
          </span>
        ))}
      </div>
    </section>
  );
}
