export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  image: string;
  href: string;
};

const behanceCovers = "https://mir-s3-cdn-cf.behance.net/projects/404";

export const projects: Project[] = [
  {
    id: "seer",
    title: "Seer Rebrand",
    category: "Brand identity",
    year: "2026",
    blurb: "A new visual identity for Seer, built around a distinct mark and a clear brand language.",
    image: `${behanceCovers}/f6b752253579443.Y3JvcCw2NTgxLDUxNDgsOTEyLDA.png`,
    href: "https://www.behance.net/gallery/253579443/Seer-Rebrand",
  },
  {
    id: "prezopt",
    title: "Prezopt WebAPP",
    category: "Product design",
    year: "2026",
    blurb: "A presentation design product shaped into a clear, focused web app experience.",
    image: `${behanceCovers}/ed5f23249455679.Y3JvcCwyMTU4LDE2ODgsNDgsMA.png`,
    href: "https://www.behance.net/gallery/249455679/Prezopt-WebAPP",
  },
  {
    id: "crypto-app-two",
    title: "Crypto Mobile App 2",
    category: "Product design",
    year: "2026",
    blurb: "A mobile interface for crypto tools, balances and portfolio activity.",
    image: `${behanceCovers}/b790e5249455587.Y3JvcCwxNjU2LDEyOTUsMCw0NTQ.png`,
    href: "https://www.behance.net/gallery/249455587/Crypto-Mobile-App-2",
  },
  {
    id: "omegaball",
    title: "OMEGABALL Nigeria",
    category: "Visual design",
    year: "2026",
    blurb: "A bold sports identity and campaign visuals for Omegaball Nigeria.",
    image: `${behanceCovers}/4cf953249455539.Y3JvcCwyNjg0LDIxMDAsNTksMA.png`,
    href: "https://www.behance.net/gallery/249455539/OMEGABALL-NIGERIA",
  },
  {
    id: "save-this-event",
    title: "Save This Event webApp",
    category: "Product design",
    year: "2026",
    blurb: "A digital experience for discovering events and making ticket bookings with ease.",
    image: `${behanceCovers}/7d864f249455359.Y3JvcCwyODc2LDIyNTAsNjQsMA.png`,
    href: "https://www.behance.net/gallery/249455359/Save-This-Event-webApp",
  },
  {
    id: "eleos-kouture",
    title: "Eleos Kouture Branding",
    category: "Brand identity",
    year: "2026",
    blurb: "A refined identity for a fashion label, shaped around its couture sensibility.",
    image: `${behanceCovers}/46b949249455183.Y3JvcCwxODAwLDE0MDcsMCwxOTY.png`,
    href: "https://www.behance.net/gallery/249455183/Eleos-Kouture-Branding",
  },
  {
    id: "crypto-app",
    title: "Crypto Mobile App",
    category: "Product design",
    year: "2026",
    blurb: "A mobile crypto interface that brings everyday wallet actions into a focused screen.",
    image: `${behanceCovers}/59884f249454367.Y3JvcCwyMTU4LDE2ODgsNDgsMA.png`,
    href: "https://www.behance.net/gallery/249454367/Crypto-Mobile-App",
  },
  {
    id: "virtual-card",
    title: "Virtual Card Design",
    category: "Visual design",
    year: "2026",
    blurb: "A visual exploration of virtual card design, with attention to form, finish and detail.",
    image: `${behanceCovers}/c52514249452979.Y3JvcCwyODc2LDIyNTAsNjQsMA.png`,
    href: "https://www.behance.net/gallery/249452979/Virtual-Card-design",
  },
  {
    id: "app-guide",
    title: "App Guide Thread Design",
    category: "Visual design",
    year: "2026",
    blurb: "A visual guide that turns app features into a clear, easy to follow social thread.",
    image: `${behanceCovers}/d2128b249452009.Y3JvcCwxNTM0LDEyMDAsMTMyLDA.png`,
    href: "https://www.behance.net/gallery/249452009/App-guide-thread-design",
  },
  {
    id: "fedrok-thread",
    title: "Thread Design for Fedrok Blockchain",
    category: "Visual design",
    year: "2025",
    blurb: "A social thread for Fedrok Blockchain, designed to make its story easier to understand.",
    image: `${behanceCovers}/0e1679236760593.Y3JvcCwzMjIwLDI1MTksMjc5LDA.png`,
    href: "https://www.behance.net/gallery/236760593/Thread-Design-for-Fedrok-Blockchain",
  },
  {
    id: "taikai",
    title: "Taikai Design",
    category: "Visual design",
    year: "2025",
    blurb: "A visual identity and promotional direction for Taikai.",
    image: `${behanceCovers}/9855ea228845651.Y3JvcCwxNDA4LDExMDIsMjQwLDA.png`,
    href: "https://www.behance.net/gallery/228845651/Taikai-Design",
  },
];

export type Service = {
  title: string;
  desc: string;
};

export const services: Service[] = [
  {
    title: "Digital product design",
    desc: "Research, user journeys and interfaces that make digital tools feel clear and easy to use.",
  },
  {
    title: "Brand identity",
    desc: "A distinctive visual identity, from the first mark to a consistent system.",
  },
  {
    title: "Graphic design",
    desc: "Campaign visuals, social content and visual storytelling, made with care.",
  },
];

export const process = [
  {
    n: "01",
    title: "Discover",
    desc: "We start with the people, the ambition and the real problem to solve.",
  },
  {
    n: "02",
    title: "Explore",
    desc: "Ideas take shape through sketches, visual directions and quick prototypes.",
  },
  {
    n: "03",
    title: "Refine",
    desc: "The strongest direction becomes a clear system, polished through thoughtful detail.",
  },
  {
    n: "04",
    title: "Deliver",
    desc: "A considered final experience, ready to share with the people it was made for.",
  },
];
