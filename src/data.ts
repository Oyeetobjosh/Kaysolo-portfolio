export type Project = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  blurb: string;
  image: string;
  href: string;
  accent: string; // css color
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "seer",
    title: "Seer Rebrand",
    category: "Branding",
    tags: ["Identity", "Logo", "Art Direction"],
    year: "2025",
    blurb:
      "A full visual rebrand — new mark, palette and system built to make Seer feel sharp, modern and unmistakably its own.",
    image: "/works/seer-rebrand.png",
    href: "https://www.behance.net/gallery/253579443/Seer-Rebrand",
    accent: "#ff3df0",
    featured: true,
  },
  {
    id: "prezopt",
    title: "Prezopt WebApp",
    category: "UI/UX",
    tags: ["Product", "Dashboard", "SaaS"],
    year: "2025",
    blurb:
      "Product design for a presentation-optimisation web app — flows, dashboard and a component system that scales.",
    image: "/works/prezopt.png",
    href: "https://www.behance.net/gallery/249455679/Prezopt-WebAPP",
    accent: "#8b5cff",
    featured: true,
  },
  {
    id: "crypto",
    title: "Crypto Mobile App",
    category: "UI/UX",
    tags: ["Fintech", "Mobile", "Wallet"],
    year: "2025",
    blurb:
      "A sleek crypto wallet experience — balances, charts and trading flows designed to feel calm and trustworthy.",
    image: "/works/crypto-app.png",
    href: "https://www.behance.net/gallery/249455587/Crypto-Mobile-App-2",
    accent: "#38f5e3",
    featured: true,
  },
  {
    id: "security",
    title: "Anti-Counterfeit Security Design",
    category: "Security",
    tags: ["Holograms", "Authentication", "Print"],
    year: "2025",
    blurb:
      "Tamper-evident labels, guilloche patterns and hologram seals engineered to protect products from counterfeiting.",
    image: "/works/security.png",
    href: "https://www.behance.net/odewolekehinde",
    accent: "#c6ff3d",
    featured: true,
  },
  {
    id: "omegaball",
    title: "OMEGABALL Nigeria",
    category: "Branding",
    tags: ["Sports", "Identity", "Campaign"],
    year: "2025",
    blurb:
      "High-energy identity and marketing visuals for a Nigerian football platform.",
    image: "/works/omegaball.png",
    href: "https://www.behance.net/gallery/249455539/OMEGABALL-NIGERIA",
    accent: "#c6ff3d",
  },
  {
    id: "save-event",
    title: "Save This Event",
    category: "UI/UX",
    tags: ["Web App", "Booking", "Events"],
    year: "2025",
    blurb:
      "An event discovery and ticketing web app with a clean, joyful booking flow.",
    image: "/works/save-this-event.png",
    href: "https://www.behance.net/gallery/249455359/Save-This-Event-webApp",
    accent: "#8b5cff",
  },
  {
    id: "eleos",
    title: "Eleos Kouture Branding",
    category: "Branding",
    tags: ["Fashion", "Luxury", "Identity"],
    year: "2025",
    blurb:
      "A luxury fashion identity — refined typography, tags and a lookbook system with couture attitude.",
    image: "/works/eleos-kouture.png",
    href: "https://www.behance.net/gallery/249455183/Eleos-Kouture-Branding",
    accent: "#ff3df0",
  },
  {
    id: "virtual-card",
    title: "Virtual Card Design",
    category: "Graphics",
    tags: ["Fintech", "3D", "Card"],
    year: "2025",
    blurb:
      "A holographic virtual card concept — glassy, iridescent and premium to the last pixel.",
    image: "/works/virtual-card.png",
    href: "https://www.behance.net/gallery/249452979/Virtual-Card-design",
    accent: "#38f5e3",
  },
  {
    id: "web3",
    title: "Web3 Design",
    category: "UI/UX",
    tags: ["Web3", "Landing", "3D"],
    year: "2025",
    blurb:
      "A futuristic web3 landing experience with 3D geometry and crisp data storytelling.",
    image: "/works/web3.png",
    href: "https://www.behance.net/gallery/249451561/Web3-Design",
    accent: "#8b5cff",
  },
  {
    id: "fedrok",
    title: "Fedrok Blockchain Threads",
    category: "Graphics",
    tags: ["Social", "Carousel", "Marketing"],
    year: "2024",
    blurb:
      "Scroll-stopping social thread and carousel design for a green blockchain brand.",
    image: "/works/fedrok-thread.png",
    href: "https://www.behance.net/gallery/236760593/Thread-Design-for-Fedrok-Blockchain",
    accent: "#c6ff3d",
  },
];

export type Service = {
  title: string;
  desc: string;
  bullets: string[];
  glyph: string;
  accent: string;
};

export const services: Service[] = [
  {
    title: "UI/UX Design",
    desc: "End-to-end product design — from research and flows to pixel-tight interfaces and design systems.",
    bullets: ["Product & App design", "Design systems", "Prototyping", "User flows"],
    glyph: "ui",
    accent: "#38f5e3",
  },
  {
    title: "Graphics Design",
    desc: "Bold, scroll-stopping visuals for social, campaigns and everything in between.",
    bullets: ["Social & thread design", "Marketing visuals", "3D mockups", "Motion-ready assets"],
    glyph: "graphics",
    accent: "#8b5cff",
  },
  {
    title: "Branding",
    desc: "Identities with backbone — logo, palette, type and the full system that makes a brand unforgettable.",
    bullets: ["Logo & identity", "Brand systems", "Guidelines", "Art direction"],
    glyph: "brand",
    accent: "#ff3df0",
  },
  {
    title: "Security & Anti-Counterfeit",
    desc: "Design that protects — holograms, guilloche, microtext and tamper-evident authentication.",
    bullets: ["Hologram seals", "Guilloche patterns", "Secure labels", "Authentication QR"],
    glyph: "security",
    accent: "#c6ff3d",
  },
];

export const stats = [
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 4, suffix: "", label: "Design disciplines" },
  { value: 12, suffix: "+", label: "Brands crafted" },
  { value: 2, suffix: "yrs", label: "Studio momentum" },
];

export const process = [
  {
    n: "01",
    title: "Discover",
    desc: "I dig into the brief, the users and the market until the problem is crystal clear.",
  },
  {
    n: "02",
    title: "Design",
    desc: "Concepts, flows and high-fidelity screens — iterated fast, refined obsessively.",
  },
  {
    n: "03",
    title: "Systemise",
    desc: "Reusable components, tokens and guidelines so the work scales beyond the handoff.",
  },
  {
    n: "04",
    title: "Deliver",
    desc: "Polished, developer-ready files and assets — plus the story behind every decision.",
  },
];
