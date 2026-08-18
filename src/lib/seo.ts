import { identity } from "@/data/portfolio";

// Configure NEXT_PUBLIC_SITE_URL when the final production domain is known.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const SITE_NAME = "Yash Mane — Full-Stack Developer & Computer Science Engineer";
export const SEO_DESCRIPTION =
  "Portfolio of Yash Mane, a final-year Computer Science Engineering student building full-stack applications, AI-powered systems, and practical software projects using Java, React, Node.js, and modern web technologies.";

export const SEO_KEYWORDS = [
  "Yash Mane", "Full-Stack Developer", "Computer Science Engineering",
  "Java Developer", "React Developer", "Node.js", "Express.js",
  "PostgreSQL", "MongoDB", "Prisma ORM", "AI Integration",
  "Gemini API", "Data Structures and Algorithms", "Mumbai", "India", "Portfolio",
];

export function personJsonLd() {
  return {
    "@context": "https://schema.org", "@type": "Person",
    name: identity.name, url: SITE_URL, image: `${SITE_URL}/opengraph-image`,
    jobTitle: identity.role, email: `mailto:${identity.email}`,
    description: identity.summary,
    alumniOf: { "@type": "EducationalOrganization", name: "Computer Science Engineering degree program" },
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
    sameAs: [identity.links.github, identity.links.linkedin, identity.links.twitter],
    knowsAbout: ["Java", "JavaScript", "React", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Prisma ORM", "REST APIs", "AI Integration", "Data Structures and Algorithms"],
  };
}

export function websiteJsonLd() {
  return { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, author: { "@type": "Person", name: identity.name } };
}
