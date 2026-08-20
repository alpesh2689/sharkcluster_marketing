import { Star, Quote } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  {
    quote:
      "We migrated 14 client sites from a cPanel reseller account to SharkCluster in a weekend. The migration was free, the panel is genuinely better, and our clients' data is finally on servers we control.",
    author: "Marcus Chen",
    role: "Founder, BrightPixel Agency",
    initials: "MC",
  },
  {
    quote:
      "The dedicated DevOps manager is not a gimmick. I had a real engineer on a call helping me tune our Varnish VCL for a Black Friday traffic spike. That kind of support doesn't exist at this price point.",
    author: "Sarah Williams",
    role: "CTO, ShopFlow Commerce",
    initials: "SW",
  },
  {
    quote:
      "Running our ERP and helpdesk on our own VPS means our customer data never touches a third party. For a company handling sensitive client information, that's the entire reason we chose SharkCluster.",
    author: "David Okonkwo",
    role: "Operations Lead, Helix Consulting",
    initials: "DO",
  },
  {
    quote:
      "The config drift detection caught a manual Redis edit that would have caused session loss in production. The panel reads the actual running config and tells you when it doesn't match. That's next-level.",
    author: "Priya Nair",
    role: "Senior DevOps Engineer, DataForge",
    initials: "PN",
  },
  {
    quote:
      "Seven backup types, each solving a different problem. Most hosts give you one button and call it a day. SharkCluster actually explains what each one is for and when to use it.",
    author: "Tom Becker",
    role: "Infrastructure Manager, ScaleUp SaaS",
    initials: "TB",
  },
  {
    quote:
      "We compared DigitalOcean, Contabo, and Hetzner plans side-by-side in the panel itself. Saved us 40% on our monthly bill by picking the right provider for each workload.",
    author: "Elena Rossi",
    role: "Founder, Nimbus Labs",
    initials: "ER",
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="section relative overflow-hidden bg-ink-50/50">
      <div className="container-px">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
          <span className="eyebrow">
            <Star className="h-4 w-4" />
            Loved by Teams
          </span>
          <h2 className="mt-5 heading-lg">Trusted by businesses that take hosting seriously</h2>
          <p className="mt-4 text-body">
            From agencies to SaaS companies, teams choose SharkCluster for the control, security, and support
            that managed hosting should have always offered.
          </p>
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`reveal ${visible ? "is-visible" : ""} break-inside-avoid card-hover p-6`}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="flex items-center gap-1 text-brand-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <Quote className="mt-4 h-6 w-6 text-brand-200" />
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-700">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{t.author}</p>
                  <p className="text-xs text-ink-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
