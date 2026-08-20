import { Link } from "react-router-dom";
import { Handshake, TrendingUp, Check, ArrowRight, Link2, UserPlus, Repeat, Wallet, CircleAlert as AlertCircle, Users, Server } from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

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

const pendingDetails = [
  { label: "Commission rate", value: "TODO_CONFIRM" },
  { label: "Cookie / attribution window", value: "TODO_CONFIRM" },
  { label: "Payout schedule", value: "TODO_CONFIRM" },
  { label: "Minimum payout threshold", value: "TODO_CONFIRM" },
];

function ReferralMock() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <TrendingUp className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Referral Dashboard</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Referrals", val: "24", color: "bg-brand-50 text-brand-600" },
          { label: "Active", val: "18", color: "bg-emerald-50 text-emerald-600" },
          { label: "This month", val: "$342", color: "bg-amber-50 text-amber-600" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3 text-center">
            <p className={`font-display text-lg font-extrabold ${m.color.split(" ")[1]}`}>{m.val}</p>
            <p className="mt-0.5 text-[10px] font-medium text-ink-500">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {[
          { name: "Acme Corp", status: "Active", earned: "$28/mo", color: "bg-emerald-100 text-emerald-700" },
          { name: "Globex LLC", status: "Active", earned: "$19/mo", color: "bg-emerald-100 text-emerald-700" },
          { name: "Initech", status: "Trial", earned: "—", color: "bg-amber-100 text-amber-700" },
        ].map((ref) => (
          <div key={ref.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Users className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-semibold text-ink-900">{ref.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${ref.color}`}>{ref.status}</span>
              <span className="font-mono text-xs font-bold text-ink-700">{ref.earned}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Recurring commission — earn as long as they stay active</p>
    </div>
  );
}

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

      {/* Split hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl" />
        </div>
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
                <Handshake className="h-4 w-4" />
                Partnership Programs
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Grow together <br />
                <span className="gradient-text">with SharkCluster</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Join our Referral Program for recurring commission, or the Agency Partner Program for volume
                discounts, co-marketing, and a dedicated partner manager. Build revenue while you build your
                business.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary btn-lg w-full sm:w-auto">
                  Join the waitlist
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/who-we-serve/agencies" className="btn-secondary btn-lg w-full sm:w-auto">
                  For Agencies
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <ReferralMock />
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
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
                Four steps from sharing your link to getting paid. The referral programme is opening soon — tell us
                where to send your link.
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
                    This page cannot convert without the numbers below. They are flagged as blocking and must be
                    confirmed before launch.
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
