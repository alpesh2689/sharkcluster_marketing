import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Star, Quote, TrendingUp, Users, Globe } from "lucide-react";

type Review = {
  quote: string;
  author: string;
  role: string;
  rating: number;
  initials: string;
};

type Stat = {
  icon: typeof Star;
  value: string;
  label: string;
};

const reviews: Review[] = [];

const stats: Stat[] = [];

export default function ReviewsPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Reviews — What Customers Say About SharkCluster"
        description="Read real customer reviews of SharkCluster. See why agencies, developers, and businesses choose SharkCluster for managed cloud hosting."
        path="/reviews"
        keywords={["SharkCluster reviews", "cloud hosting reviews", "VPS hosting reviews", "managed hosting reviews", "customer testimonials"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]}
      />
      <PageHero
        eyebrow="Reviews"
        title="Loved by teams"
        highlight="worldwide"
        description="See why agencies, developers, and businesses choose SharkCluster for managed cloud hosting."
        icon={Star}
      />

      {stats.length > 0 && (
        <div className="container-px pb-8">
          <div className="mx-auto max-w-3xl grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-ink-200 bg-white p-5 text-center shadow-sm">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div className="mt-3 font-display text-2xl font-extrabold text-ink-900">{stat.value}</div>
                <div className="mt-1 text-sm text-ink-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="section pt-0">
        <div className="container-px">
          {reviews.length > 0 ? (
            <div ref={ref} className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
              {reviews.map((review, i) => (
                <div
                  key={review.author}
                  className={`reveal ${visible ? "is-visible" : ""} break-inside-avoid card-hover p-6`}
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                >
                  <div className="flex items-center gap-1 text-brand-500">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="mt-4 h-6 w-6 text-brand-200" />
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{review.quote}</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-700">
                      {review.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{review.author}</p>
                      <p className="text-xs text-ink-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-16 text-center`}>
              <Star className="mx-auto h-10 w-10 text-ink-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Reviews coming soon</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                We're collecting customer reviews and ratings. Check back shortly to read what teams say about their SharkCluster experience.
              </p>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
