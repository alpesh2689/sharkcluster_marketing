import { useReveal } from "@/hooks/useReveal";

const logos = [
  "DigitalOcean",
  "Contabo",
  "OVH",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Docker",
  "Cloudflare",
];

export default function TrustBar() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="border-y border-ink-200/60 bg-white py-10">
      <div className="container-px">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-ink-400">
            Works with the tools you already use
          </p>
          <div className="relative mt-6 overflow-hidden">
            <div className="flex animate-marquee gap-12 whitespace-nowrap">
              {[...logos, ...logos].map((logo, i) => (
                <span
                  key={`${logo}-${i}`}
                  className="font-display text-lg font-bold text-ink-300 transition-colors hover:text-brand-400"
                >
                  {logo}
                </span>
              ))}
            </div>
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
