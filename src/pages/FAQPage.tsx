import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "react-router-dom";

// NOTE: answers below restate the trial terms in prose. If src/content/trial.ts
// changes, re-read these — they will not update themselves.
const faqs = [
  {
    q: "What exactly is included for free?",
    a: "Free local backups, free SSL certificates, unlimited free migrations, unlimited applications per server, free self-hosted business apps (ERP, helpdesk, ticketing, invoicing), and a dedicated DevOps manager on Business and Enterprise plans. You only pay for your cloud provider's server costs and any optional add-ons, such as offsite backup storage, which is billed per GB.",
  },
  {
    q: "Where does my data actually live?",
    a: "Your data lives entirely on the VPS you choose at server creation. We never store your application data, databases, or files on our own infrastructure. The panel communicates with your server over SSH to manage it — your data stays on your server, period.",
  },
  {
    q: "Which cloud providers can I use?",
    a: "SharkCluster supports multiple cloud providers including DigitalOcean, Contabo, and OVHcloud, with Vultr and Hetzner coming soon. You can compare plans side-by-side at server creation time, and each provider's billing model (hourly, prepaid, or usage-based) is handled transparently.",
  },
  {
    q: "Can I migrate my existing site for free?",
    a: "Yes. Unlimited free migrations are included on every plan. Our team handles the migration of your sites, applications, and databases from your current host — as many times as you need, at no cost.",
  },
  {
    q: "What kind of self-hosted apps can I run?",
    a: "Any PHP, Node.js, Python, or Docker application. This includes ERP systems like ERPNext and Odoo, helpdesk tools like Zammad and osTicket, invoicing apps like Invoice Ninja, and anything else you can deploy. Each app gets its own domain, SSL, database, and staging environment.",
  },
  {
    q: "What happens if my server goes down?",
    a: "Health alerts monitor CPU, memory, disk, and failed services — you're notified before things break, not after. Uptime monitoring pings your application URLs on your chosen interval. If something goes wrong, your dedicated DevOps manager (Business and Enterprise plans) and our expert support team are available to help.",
  },
  {
    q: "How do backups work?",
    a: "SharkCluster offers seven backup types: auto backups, snapshots, server images, custom path backups, portable backups, full server backups, and cloning. Local backups are free. Offsite backup storage (object storage) is billed per GB — and it's the only type that survives the loss of the server itself.",
  },
  {
    q: "Is there really no credit card required to start?",
    a: "Correct. You can sign up and explore the panel with no credit card required. There are no lock-in contracts — you can cancel anytime. Cloud provider costs are billed separately at provider rates.",
  },
  {
    q: "Can I scale my server later?",
    a: "Yes. You can resize your server at any time from the Scaling section, with the new price shown before you commit. Note that scaling triggers a provider-required reboot and billing change. Scale-down may be provider-restricted once disk space is allocated.",
  },
  {
    q: "Do you offer staging environments?",
    a: "Yes. Every application can be cloned into a staging environment with one click — a full copy to test changes before touching production. You can also clone applications across servers.",
  },
  {
    q: "What databases are supported?",
    a: "MySQL, PostgreSQL, MongoDB, and SQLite are supported natively. The panel creates the database, a user, and a password, and wires them into your application's configuration automatically. For databases that need to outlive a server or be shared, we also offer Managed Database clusters as a separate product.",
  },
  {
    q: "How does the dedicated DevOps manager work?",
    a: "On Business and Enterprise plans, every account gets a dedicated DevOps manager — a real human engineer who knows your setup and helps with architecture, scaling, troubleshooting, and best practices. They're your go-to contact, not a tier-1 support agent reading from a script.",
  },
  {
    q: "Can I host private Docker images?",
    a: "Yes. SharkCluster includes private container registries with repositories, tags, robot accounts for CI pipelines, scoped tokens, storage quotas, and retention policies — everything you need to store and manage private Docker images alongside your deployments.",
    link: { href: "/features/container-registry", label: "Learn more about Container Registry" },
  },
  {
    q: "Do you offer managed database clusters?",
    a: "Yes. Managed Database clusters are a separate product from the per-app databases that ship with every application. Clusters come with parameter groups, managed backups, and the ability to outlive a server or be shared across applications.",
    link: { href: "/features/managed-databases", label: "Learn more about Managed Databases" },
  },
  {
    q: "Can my team access servers without sharing my login?",
    a: "Yes. SharkCluster supports organizations, teams, and per-server and per-app permissions, so each teammate gets their own login with access scoped to exactly what they need — no shared credentials.",
    link: { href: "/features/teams", label: "Learn more about Teams & Permissions" },
  },
  {
    q: "Do you provide GST-compliant invoices in India?",
    a: "Yes. Indian customers receive GST-compliant invoices with CGST/SGST/IGST breakdowns and TDS handling built in.",
    link: { href: "/who-we-serve/india", label: "Learn more about billing in India" },
  },
];

function FaqItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string; link?: { href: string; label: string } }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-semibold text-ink-900">{faq.q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen ? "bg-brand-500 text-white rotate-180" : "bg-ink-100 text-ink-500"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{faq.a}</p>
          {faq.link && (
            <a href={faq.link.href} className="ml-5 mb-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
              {faq.link.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Seo
        title="FAQ — Frequently Asked Questions"
        description="Answers to common questions about SharkCluster: pricing, contracts, data security, migrations, backups, self-hosted apps, supported providers, scaling, and dedicated DevOps support."
        path="/faq"
        keywords={["SharkCluster FAQ", "cloud hosting questions", "VPS hosting help", "self-hosted apps FAQ", "server management questions"]}
        faqSchema={faqs}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you need to know about SharkCluster — pricing, features, security, migrations, and more. Can't find what you're looking for? Our team is happy to help."
        icon={HelpCircle}
      />

      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl space-y-3`}>
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}

            {/* Still have questions */}
            <div className="mt-8 rounded-2xl border border-ink-200 bg-ink-50/50 p-8 text-center">
              <h3 className="font-display text-xl font-bold text-ink-900">Still have questions?</h3>
              <p className="mt-2 text-body-sm">Our team is ready to help you find the answers you need.</p>
              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary">
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://cloud.sharkcluster.com/register" className="btn-secondary">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
