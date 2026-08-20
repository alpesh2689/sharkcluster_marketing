import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Shield, Headset } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const highlights = [
  { icon: Zap, text: "No lock-in contracts" },
  { icon: Shield, text: "No credit card required" },
  { icon: Headset, text: "Dedicated DevOps manager" },
];

export default function FinalCTA() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-20 lg:py-28">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-brand-900 to-ink-950" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-600/15 blur-3xl" />
      </div>

      <div className="container-px relative z-10">
        <div
          ref={ref}
          className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl text-center`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-300 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Start your journey today
          </span>

          <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to take control
            <br />
            <span className="bg-gradient-to-r from-brand-300 via-brand-200 to-brand-400 bg-clip-text text-transparent">
              of your hosting?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-200">
            Deploy servers, run self-hosted business apps, and keep your data on your own VPS —
            with a dedicated DevOps manager by your side.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://cloud.sharkcluster.com/register"
              className="group btn btn-lg w-full bg-white px-7 py-4 text-brand-700 shadow-xl shadow-brand-500/20 hover:bg-brand-50 active:scale-[0.98] sm:w-auto"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/contact"
              className="btn btn-lg w-full border border-white/20 bg-white/5 px-7 py-4 text-white backdrop-blur-sm hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              Talk to Us
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
            {highlights.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm font-medium text-ink-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-brand-300">
                  <item.icon className="h-4 w-4" />
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
