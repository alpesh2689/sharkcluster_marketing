import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Handshake, TrendingUp, Check, ArrowRight, Link2, UserPlus, Repeat, Wallet, AlertCircle } from "lucide-react";

const programs = [
  {
    icon: TrendingUp,
    title: "Referral Program",
    desc: "Earn recurring commission for every customer you refer to SharkCluster. Get a unique referral link, share it, and earn as long as your referral stays active.",
    benefits: ["Recurring monthly commission", "Unique referral dashboard", "Real-time tracking", "No cap on earnings"],
    cta: "Start Referring",
    comingSoon: false,
  },
  {
    icon: Handshake,
    title: "Agency Partner Program",
    desc: "For agencies managing multiple client sites. Get volume discounts, co-marketing opportunities, and a dedicated partner manager.",
    benefits: ["Volume discounts on all plans", "Co-marketing opportunities", "Dedicated partner manager", "Priority migration support", "White-label hosting option"],
    cta: "Get Notified",
    comingSoon: true,
  },
];

const howItWorks = [
  {
    icon: Link2,
    title: "Get your referral link",
    desc: "Sign up and grab your unique referral link from the dashboard. Share it anywhere — email, social, your website, a client proposal.",
  },
  {
    icon: UserPlus,
    title: "Tracked signups",
    desc: "When someone signs up through your link, the referral is tracked to your account. You'll see them appear in your dashboard in real time.",
  },
  {
    icon: Repeat,
    title: "Recurring commission",
    desc: "You earn commission every month for as long as your referral stays an active paying customer — not just on the first invoice.",
  },
  {
    icon: Wallet,
    title: "Payout",
    desc: "Once you hit the minimum payout threshold, withdraw your earnings on the payout schedule. Manage everything from your referral dashboard.",
  },
];

// TODO_CONFIRM — LAUNCH BLOCKER for this page. A referral page without a commission rate does not convert. Owner: partnerships.
const pendingDetails = [
  { label: "Commission rate", value: "TODO_CONFIRM" },
  { label: "Cookie / attribution window", value: "TODO_CONFIRM" },
  { label: "Payout schedule", value: "TODO_CONFIRM" },
  { label: "Minimum payout threshold", value: "TODO_CONFIRM" },
];

export default function PartnersPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Partners — Referral & Agency Partner Programs"
        description="Join the SharkCluster Referral Program for recurring commission, or the Agency Partner Program for volume discounts, co-marketing, and a dedicated partner manager."
        path="/partners"
        keywords={["SharkCluster partners", "referral program", "agency partner program", "hosting affiliate", "cloud hosting partnership", "reseller hosting"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Partners", path: "/partners" }]}
      />
      <PageHero
        eyebrow="Partnership Programs"
        title="Grow together"
        highlight="with SharkCluster"
        description="Join our Referral Program for recurring commission, or the Agency Partner Program for volume discounts, co-marketing, and a dedicated partner manager. Build revenue while you build your business."
        icon={Handshake}
      />

      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className="grid gap-6 lg:grid-cols-2">
            {programs.map((program, i) => (
              <div
                key={program.title}
                className={`reveal ${visible ? "is-visible" : ""} card-hover group p-8`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all group-hover:bg-brand-500 group-hover:text-white">
                    <program.icon className="h-7 w-7" />
                  </div>
                  {program.comingSoon && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-ink-900">{program.title}</h3>
                <p className="mt-2 text-body-sm">{program.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {program.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                        <Check className="h-3 w-3" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a
                  href={program.comingSoon ? "/contact" : "https://cloud.sharkcluster.com/register"}
                  className="btn-secondary mt-6"
                >
                  {program.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — Referral Program */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-4xl`}>
            <div className="mb-10 text-center">
              <span className="eyebrow">
                <TrendingUp className="h-4 w-4" />
                Referral Program
              </span>
              <h2 className="mt-5 heading-lg">How it works</h2>
              <p className="mt-4 text-body">
                Four steps from sharing your link to getting paid. The referral programme is opening soon — tell us where to send your link.
              </p>
              <div className="mt-6 flex justify-center">
                <Link to="/contact" className="btn-primary">
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step, i) => (
                <div
                  key={step.title}
                  className={`reveal ${visible ? "is-visible" : ""} relative rounded-2xl border border-ink-200 bg-white p-6`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="absolute right-4 top-4 font-display text-2xl font-extrabold text-ink-100">
                    {i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Blocking: specifics must be confirmed before this page can convert */}
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <AlertCircle className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-amber-900">
                    Specifics pending confirmation
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-amber-800">
                    This page cannot convert without the numbers below. They are flagged as blocking and must be confirmed before launch.
                  </p>
                  <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                    {pendingDetails.map((detail) => (
                      <div key={detail.label} className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                        <dt className="text-sm font-medium text-ink-600">{detail.label}</dt>
                        <dd className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-700">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
