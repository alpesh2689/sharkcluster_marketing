import { Star, Quote } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

// TODO_CONFIRM — real quotes only, with the customer's permission.
// Source: the testimonials table in the product (backend model/testimonial.model.js,
// controller/testimonials.js) — not copy written here.
const testimonials: {
  quote: string;
  author: string;
  role: string;
  initials: string;
}[] = [];

export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  // An empty testimonial wall looks broken; no section at all looks intentional.
  if (testimonials.length === 0) return null;

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
