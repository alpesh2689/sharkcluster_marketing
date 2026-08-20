import { Boxes, Receipt, Ticket, FileSpreadsheet, Lock, Server, ArrowRight, Check } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const apps = [
  {
    icon: Boxes,
    name: "ERP Systems",
    desc: "Run your entire business — inventory, HR, accounting, CRM — on your own VPS. Your operational data never leaves your server.",
    examples: ["ERPNext", "Odoo", "Frappe"],
  },
  {
    icon: Ticket,
    name: "Helpdesk & Ticketing",
    desc: "Customer support, ticket routing, and SLA management — self-hosted and fully under your control. No per-agent pricing.",
    examples: ["Zammad", "osTicket", "FreeScout"],
  },
  {
    icon: FileSpreadsheet,
    name: "Invoicing & Billing",
    desc: "Generate invoices, track payments, and manage clients with open-source invoicing apps. Your financial data stays private.",
    examples: ["Invoice Ninja", "Crater", "InvoicePlane"],
  },
  {
    icon: Receipt,
    name: "Business Apps",
    desc: "Project management, wikis, CRMs, and more — deploy any self-hosted business application on a supported stack, with the database created and wired in automatically.",
    examples: ["WordPress", "Nextcloud", "BookStack"],
  },
];

export default function SelfHosted() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="self-hosted" className="section relative overflow-hidden bg-ink-50/50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-300/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />
      </div>

      <div className="container-px">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
          <span className="eyebrow">
            <Lock className="h-4 w-4" />
            Self-Hosted & Secure
          </span>
          <h2 className="mt-5 heading-lg">
            Free self-hosted business apps.
            <br />
            <span className="gradient-text">Your data stays on your VPS.</span>
          </h2>
          <p className="mt-4 text-body">
            ERP, helpdesk, ticketing, invoicing — run the tools your business depends on, on infrastructure you control.
            No third-party SaaS holding your data. No per-seat licensing. Everything lives on your server, encrypted and private.
          </p>
        </div>

        {/* Security banner */}
        <div className={`reveal ${visible ? "is-visible" : ""} mx-auto mt-10 max-w-3xl`}>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-white p-5 text-center sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
              <Server className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-base font-bold text-ink-900">
                Your data never touches a third-party server
              </h3>
              <p className="mt-1 text-sm text-ink-600">
                Every app runs on your VPS. Files, databases, credentials — all on your server, not ours.
              </p>
            </div>
          </div>
        </div>

        {/* App cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app, i) => (
            <div
              key={app.name}
              className={`reveal ${visible ? "is-visible" : ""} card-hover group flex flex-col p-6`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all group-hover:bg-brand-500 group-hover:text-white">
                <app.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-ink-900">{app.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{app.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {app.examples.map((ex) => (
                  <span
                    key={ex}
                    className="inline-flex items-center gap-1 rounded-lg bg-ink-100 px-2 py-1 text-xs font-medium text-ink-600"
                  >
                    <Check className="h-3 w-3 text-brand-500" />
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`reveal ${visible ? "is-visible" : ""} mt-12 text-center`}>
          <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg">
            Deploy Your First App
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-3 text-sm text-ink-400">All apps included free with every server plan</p>
        </div>
      </div>
    </section>
  );
}
