import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, X, Minus, TrendingUp, Shield, Server, Users, Zap, Wallet, Archive,
  Gauge, ArrowRight, Clock, ExternalLink, ChevronDown, HelpCircle, ShieldCheck,
  Scale,
} from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

/**
 * /compare — SharkCluster against Cloudways, RunCloud and ServerPilot.
 *
 * A comparison table that is wrong about a named competitor is a legal problem,
 * not a copy problem. Three rules hold this page together:
 *
 * 1. Every competitor cell states what that vendor publishes, in their words
 *    where possible, and is dated by VERIFIED_ON. The pages checked are listed
 *    in SOURCES and rendered on the page.
 * 2. "—" never means "they can't do it". It means exactly what the on-page
 *    legend says: it was not part of the published feature set we checked. Do
 *    not swap it for an X.
 * 3. Where a competitor is genuinely better — provider choice on RunCloud and
 *    ServerPilot, Cloudways' deliberately locked-down server — the row says so,
 *    and §"Where SharkCluster is not the right fit" says it again in prose. A
 *    comparison page that never concedes a point is not read as a comparison.
 *
 * SharkCluster cells come from the product docs in 2026/docs/, not from
 * marketing copy: server/ACCESS.md (root password, browser terminal),
 * server/BACKUP.md and the seven backup types, server/CACHING.md (VCL fetch and
 * replace, Live Configuration on Server), server/FIREWALL.md (UFW, rule sync),
 * server/CREATE-SERVER.md (side-by-side provider cards, who orders the server).
 *
 * TODO_CONFIRM — owner: support lead. Two rows in the "Support and services"
 * group restate site-wide claims that the marketing audit flagged as unverified:
 * the named DevOps engineer and included migrations. They are stated here
 * against three named competitors, which is the highest-risk place on the site
 * for them to be wrong. Confirm both, or cut both rows.
 */

/** The day every competitor cell below was last checked against SOURCES. */
const VERIFIED_ON = "21 August 2026";

const SOURCES = [
  { label: "Cloudways pricing", href: "https://www.cloudways.com/en/pricing.php" },
  { label: "Cloudways — root access", href: "https://support.cloudways.com/en/articles/5134090-why-can-t-i-have-root-access-to-my-server" },
  { label: "RunCloud pricing", href: "https://runcloud.io/pricing" },
  { label: "ServerPilot pricing", href: "https://serverpilot.io/pricing/" },
];

type VendorKey = "shark" | "cloudways" | "runcloud" | "serverpilot";

const vendors: { key: VendorKey; name: string; price: string; sub: string; highlighted?: boolean }[] = [
  { key: "shark", name: "SharkCluster", price: "Server price only", sub: "no separate panel fee", highlighted: true },
  { key: "cloudways", name: "Cloudways", price: "From $11/mo", sub: "server and platform in one price" },
  { key: "runcloud", name: "RunCloud", price: "From $9/mo", sub: "panel fee, you bring the VPS" },
  { key: "serverpilot", name: "ServerPilot", price: "From $5/server + $0.50/app", sub: "panel fee, you bring the VPS" },
];

/** `tone` colours the cell. "good" also draws a check, "bad" a cross. */
type Tone = "good" | "bad" | "neutral";
interface Cell { v: string; tone?: Tone }
type Row = { label: string; note: string } & Record<VendorKey, Cell>;

const groups: { title: string; icon: React.ComponentType<{ className?: string }>; rows: Row[] }[] = [
  {
    title: "What you actually pay",
    icon: Wallet,
    rows: [
      {
        label: "Fee for the management panel",
        note: "The charge for the software layer itself, before any server cost.",
        shark: { v: "No separate fee", tone: "good" },
        cloudways: { v: "Bundled into the server price", tone: "neutral" },
        runcloud: { v: "$9–$49/mo by plan", tone: "neutral" },
        serverpilot: { v: "$5–$20 per server / mo", tone: "neutral" },
      },
      {
        label: "Charge per application",
        note: "Whether adding an app to a server you already pay for costs more.",
        shark: { v: "None — unlimited apps", tone: "good" },
        cloudways: { v: "None", tone: "neutral" },
        runcloud: { v: "None", tone: "neutral" },
        serverpilot: { v: "$0.50–$2 per app / mo", tone: "bad" },
      },
      {
        label: "Who invoices the server",
        note: "One bill, or a panel bill plus a provider bill you reconcile yourself.",
        shark: { v: "SharkCluster — every provider on one invoice", tone: "good" },
        cloudways: { v: "Cloudways", tone: "neutral" },
        runcloud: { v: "Your provider, billed separately", tone: "neutral" },
        serverpilot: { v: "Your provider, billed separately", tone: "neutral" },
      },
      {
        label: "Servers at the entry price",
        note: "How far the cheapest plan stretches before you have to upgrade.",
        shark: { v: "Pay per server, no plan ceiling", tone: "good" },
        cloudways: { v: "One server per plan price", tone: "neutral" },
        runcloud: { v: "1 on Essentials, 50 on Professional", tone: "neutral" },
        serverpilot: { v: "Priced per server, hourly", tone: "neutral" },
      },
      {
        label: "Team access",
        note: "Giving a colleague their own login instead of sharing yours.",
        shark: { v: "Organizations, teams, per-server and per-app permissions", tone: "good" },
        cloudways: { v: "Team members with role-based access", tone: "neutral" },
        runcloud: { v: "Seats capped by plan — 10 on Business", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
    ],
  },
  {
    title: "Control of the machine",
    icon: Server,
    rows: [
      {
        label: "Root access",
        note: "Whether you can install a system package or run a background process.",
        shark: { v: "Yes — root password and SSH keys", tone: "good" },
        cloudways: { v: "No — master SSH only, root not given", tone: "bad" },
        runcloud: { v: "Yes — it is your own VPS", tone: "neutral" },
        serverpilot: { v: "Yes — it is your own VPS", tone: "neutral" },
      },
      {
        label: "Providers you can use",
        note: "RunCloud and ServerPilot win here: any Ubuntu box you already own.",
        shark: { v: "DigitalOcean, OVHcloud, Contabo — Vultr and Hetzner next", tone: "neutral" },
        cloudways: { v: "DigitalOcean, Vultr, Linode, AWS, Google Cloud", tone: "neutral" },
        runcloud: { v: "Any Ubuntu VPS", tone: "good" },
        serverpilot: { v: "Any Ubuntu VPS", tone: "good" },
      },
      {
        label: "Compare providers before you build",
        note: "The same specification priced across providers, side by side, at creation.",
        shark: { v: "Yes — matching plans from every provider on one screen", tone: "good" },
        cloudways: { v: "Provider and size chosen inside their own catalogue", tone: "neutral" },
        runcloud: { v: "Not applicable — you bring the server", tone: "neutral" },
        serverpilot: { v: "Not applicable — you bring the server", tone: "neutral" },
      },
      {
        label: "Browser terminal",
        note: "A shell without a local SSH client, for the five-minute check.",
        shark: { v: "Yes — session-scoped, expiring tokens", tone: "good" },
        cloudways: { v: "Yes — SSH terminal in the platform", tone: "neutral" },
        runcloud: { v: "—", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
    ],
  },
  {
    title: "Backups, and leaving with your data",
    icon: Archive,
    rows: [
      {
        label: "Local backups",
        note: "Backups kept on the server itself — the fast, everyday restore.",
        shark: { v: "Free", tone: "good" },
        cloudways: { v: "Included", tone: "neutral" },
        runcloud: { v: "Included, storage quota by plan", tone: "neutral" },
        serverpilot: { v: "Not provided", tone: "bad" },
      },
      {
        label: "Offsite backup storage",
        note: "The only kind that survives losing the server. Metered everywhere.",
        shark: { v: "Optional, billed per GB", tone: "neutral" },
        cloudways: { v: "$0.033 per GB per server", tone: "neutral" },
        runcloud: { v: "2–30GB by plan, or your own S3 / SFTP", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
      {
        label: "Backup types",
        note: "Different failures need different mechanisms — a snapshot is not a file restore.",
        shark: { v: "Seven — auto, snapshot, image, custom path, portable, full server, clone", tone: "good" },
        cloudways: { v: "Server and application backups", tone: "neutral" },
        runcloud: { v: "Application and database backups", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
      {
        label: "Built to move to another provider",
        note: "Lock-in is measured on the way out, not on the way in.",
        shark: { v: "Portable backups — a movable copy designed to leave", tone: "good" },
        cloudways: { v: "Backup download, then a manual rebuild", tone: "neutral" },
        runcloud: { v: "Backups to your own S3 or SFTP", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
    ],
  },
  {
    title: "Caching and configuration",
    icon: Gauge,
    rows: [
      {
        label: "Varnish and Redis in the panel",
        note: "HTTP caching in front, application caching behind.",
        shark: { v: "Both, with eviction-policy and grace guidance", tone: "good" },
        cloudways: { v: "Both, plus Memcached", tone: "neutral" },
        runcloud: { v: "Redis and Nginx FastCGI caching", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
      {
        label: "Custom VCL",
        note: "Real caching rules — cookie handling, path exclusions, device variation.",
        shark: { v: "Fetch the running VCL, upload your own default.vcl", tone: "good" },
        cloudways: { v: "Cookie and page exclusions from the platform", tone: "neutral" },
        runcloud: { v: "—", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
      {
        label: "Live configuration drift detection",
        note: "Reads what the machine is running now, not what the panel last saved.",
        shark: { v: "Yes — running state read back from the server", tone: "good" },
        cloudways: { v: "—", tone: "neutral" },
        runcloud: { v: "—", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
    ],
  },
  {
    title: "Security",
    icon: ShieldCheck,
    rows: [
      {
        label: "Firewall in the panel",
        note: "Rules written in the panel and pushed to the actual machine.",
        shark: { v: "Closed by default — UFW, CIDR and country rules, rule sync", tone: "good" },
        cloudways: { v: "Managed by Cloudways, no root-level rules", tone: "neutral" },
        runcloud: { v: "Firewall manager, fail2ban, ModSecurity", tone: "neutral" },
        serverpilot: { v: "Firewall included on every plan", tone: "neutral" },
      },
      {
        label: "Scoped deploy keys",
        note: "A key that reaches one repository, not a token that reaches the account.",
        shark: { v: "Yes — generated per repository, public keys masked", tone: "good" },
        cloudways: { v: "Git deployment with SSH keys", tone: "neutral" },
        runcloud: { v: "Git deployment keys", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
      {
        label: "Request-level audit log",
        note: "Status, method, path, IP and user agent for every request that lands.",
        shark: { v: "Yes — parsed and filterable in the panel", tone: "good" },
        cloudways: { v: "Application and access logs", tone: "neutral" },
        runcloud: { v: "—", tone: "neutral" },
        serverpilot: { v: "Log viewer on Business and above", tone: "neutral" },
      },
    ],
  },
  {
    title: "Support and services",
    icon: Users,
    rows: [
      {
        label: "A named engineer on your account",
        note: "Someone who already knows your setup before the ticket is opened.",
        shark: { v: "Business and Enterprise plans", tone: "good" },
        cloudways: { v: "24/7 platform support", tone: "neutral" },
        runcloud: { v: "Email and chat support", tone: "neutral" },
        serverpilot: { v: "Email support, priority by tier", tone: "neutral" },
      },
      {
        label: "Migration help",
        note: "Moving existing sites in, without a weekend of downtime.",
        shark: { v: "Included with every plan", tone: "good" },
        cloudways: { v: "Free migrations — promotional terms apply", tone: "neutral" },
        runcloud: { v: "Migration tooling in the panel", tone: "neutral" },
        serverpilot: { v: "—", tone: "neutral" },
      },
    ],
  },
];

const headToHead = [
  {
    name: "vs Cloudways",
    bestFor: "Teams who want the server and the panel from one vendor and never intend to touch root.",
    strong: [
      "Mature platform with 24/7 support and a long track record",
      "Five providers including AWS and Google Cloud",
      "Staging, cloning and a CDN add-on in the same console",
    ],
    differs: [
      "You get root — the root password and SSH keys are yours, not withheld",
      "OVHcloud and Contabo capacity, which Cloudways does not resell",
      "Live configuration drift detection instead of a locked-down server",
      "Seven backup types, local ones free, rather than server plus app backups",
    ],
  },
  {
    name: "vs RunCloud",
    bestFor: "Developers who already run their own VPS fleet and want the thinnest panel over it.",
    strong: [
      "Works on any Ubuntu VPS, anywhere — the widest provider choice here",
      "fail2ban and ModSecurity wired in at the server level",
      "Generous server ceilings on the higher plans",
    ],
    differs: [
      "No panel subscription stacked on top of your provider bill",
      "The server is bought, provisioned and invoiced in one place",
      "Varnish with custom VCL, not Nginx caching alone",
      "Snapshots, images, clones and portable backups, not app and database only",
    ],
  },
  {
    name: "vs ServerPilot",
    bestFor: "Someone running a handful of PHP apps who wants the smallest possible management layer.",
    strong: [
      "Minimal and quick — hourly billing, very cheap for one app",
      "Any Ubuntu VPS, app isolation, free SSL",
      "Nothing to learn beyond adding an app",
    ],
    differs: [
      "Apps do not carry their own line item — put as many on a server as it holds",
      "Backups exist at all, in seven forms, with local ones free",
      "Caching, container registry and managed database clusters are in the panel",
      "Metrics and log analysis are not gated behind a higher tier",
    ],
  },
];

const notAFit = [
  {
    title: "You want to keep buying servers on your own provider account",
    body: "SharkCluster orders the server at the provider and bills it on your invoice. If your DigitalOcean or Hetzner account has to stay yours — committed spend, existing credits, a procurement rule — RunCloud or ServerPilot fit that model and we do not.",
  },
  {
    title: "You need a provider we have not launched yet",
    body: "DigitalOcean, OVHcloud and Contabo are live. Vultr and Hetzner are next. AWS and Google Cloud are not on the roadmap, and Cloudways resells both today.",
  },
  {
    title: "You want root access to be impossible",
    body: "Cloudways withholding root is a deliberate design, and for some teams it is the right one — nothing can drift if nobody can log in. SharkCluster hands you the keys and detects drift instead. Granting root also means the panel stops guaranteeing the configuration.",
  },
  {
    title: "You are shopping for shared hosting",
    body: "Mailboxes, a cPanel bundle, a site builder — none of that is here. SharkCluster manages VPS infrastructure, which is a different product from a $4 shared plan.",
  },
];

const differentiators = [
  { icon: Wallet, title: "No fee for the panel", desc: "There is no plan line on the invoice. You pay the catalogue price for the servers you run — the platform is in that price, not stacked on top of it.", to: "/pricing", cta: "See what an invoice looks like" },
  { icon: Shield, title: "Security that is on by default", desc: "Closed-by-default firewall, per-repo deploy keys, localhost-bound services, 2FA and passkeys on the account. None of it is an upsell.", to: "/security", cta: "How security works" },
  { icon: Server, title: "Your data, your VPS, your root", desc: "Application data never touches our infrastructure. The panel manages the machine over SSH, and the root password is yours.", to: "/features/server-management", cta: "Server management" },
  { icon: Zap, title: "Drift caught before the outage", desc: "Live Configuration reads what the server is actually running and shows it against what the panel last saved. Manual edits stop being a surprise.", to: "/features/caching", cta: "Caching and configuration" },
];

const faqs = [
  {
    q: "Is SharkCluster cheaper than Cloudways or RunCloud?",
    a: "It depends on the shape of your setup, and the honest answer is to add up the whole bill rather than compare headline prices. SharkCluster charges no separate panel fee — the platform is inside the server price — so the comparison is your server cost here against a panel subscription plus a provider bill there. For one small app, a $9 panel on a $5 VPS is hard to beat. Across several servers, or once per-app charges and backup storage are counted, the gap usually closes or reverses.",
    link: { href: "/pricing", label: "See current server pricing" },
  },
  {
    q: "Do I pay a subscription for the panel?",
    a: "No. Invoices carry server charges and any optional add-ons you actually used, such as offsite backup storage. There is no plan fee line.",
  },
  {
    q: "Can I bring my own DigitalOcean or Hetzner account?",
    a: "Not today. Servers are ordered at the provider by SharkCluster and appear on your SharkCluster invoice, which is what puts every provider on one bill. If keeping your own provider account is a requirement, a bring-your-own-VPS panel is the better fit.",
  },
  {
    q: "Which providers can I actually deploy to?",
    a: "DigitalOcean, OVHcloud and Contabo are live, and you can compare matching plans across all three side by side before you build. Vultr and Hetzner are next. AWS and Google Cloud are not supported.",
    link: { href: "/cloud-providers", label: "Compare cloud providers" },
  },
  {
    q: "How current is this comparison?",
    a: `Every competitor cell was checked against those vendors' own published pricing and documentation on ${VERIFIED_ON}, and the pages we read are linked under the table. Vendors change plans without notice — confirm anything decision-critical directly with them.`,
  },
  {
    q: "If I move to SharkCluster, can I move away again?",
    a: "Yes, and the tooling is built for it. Portable backups produce a movable copy of the server designed to leave for another provider, you have root and the root password throughout, and there are no lock-in contracts.",
    link: { href: "/features/backups", label: "How backups work" },
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function CellValue({ cell }: { cell: Cell }) {
  if (cell.v === "—") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-ink-400">
        <Minus className="h-3.5 w-3.5" />
        <span className="sr-only">Not part of the published feature set we checked</span>
      </span>
    );
  }
  const tone = cell.tone ?? "neutral";
  const Icon = tone === "good" ? Check : tone === "bad" ? X : null;
  return (
    <span
      className={`inline-flex items-start justify-center gap-1.5 text-sm leading-snug ${
        tone === "good" ? "font-medium text-ink-900" : tone === "bad" ? "text-ink-500" : "text-ink-600"
      }`}
    >
      {Icon && (
        <span
          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
            tone === "good" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
      )}
      <span>{cell.v}</span>
    </span>
  );
}

function FaqItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string; link?: { href: string; label: string } }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="card overflow-hidden">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-5 text-left" aria-expanded={isOpen}>
        <span className="font-display text-base font-semibold text-ink-900">{faq.q}</span>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-180 bg-brand-500 text-white" : "bg-ink-100 text-ink-500"}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{faq.a}</p>
          {faq.link && (
            <Link to={faq.link.href} className="ml-5 mb-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
              {faq.link.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Seo
        title="SharkCluster vs Cloudways, RunCloud and ServerPilot — Compared"
        description="A dated, sourced comparison of SharkCluster against Cloudways, RunCloud and ServerPilot: what the panel costs, root access, backups, caching, security — and where each competitor is the better choice."
        path="/compare"
        keywords={["SharkCluster vs Cloudways", "cloud hosting comparison", "RunCloud alternative", "ServerPilot alternative", "VPS management panel comparison", "Cloudways alternative"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }]}
        faqSchema={faqs.map(({ q, a }) => ({ q, a }))}
      />
      <PageHero
        eyebrow="Compare"
        title="SharkCluster vs"
        highlight="the alternatives"
        description="Three panels come up most often when teams are choosing: Cloudways, RunCloud and ServerPilot. Here is how each one bills, what it lets you do to the machine, and where it beats us — checked against their own published pages and dated."
        icon={TrendingUp}
      />

      {/* Three billing models — the difference most comparisons skip */}
      <section className="section pt-4">
        <div className="container-px">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">
              <Scale className="h-4 w-4" />
              Start here
            </span>
            <h2 className="mt-5 heading-lg">These are three different products</h2>
            <p className="mt-4 text-body">
              Comparing monthly prices across them is misleading until you know what the price buys. There are really
              three models on this page, and the cheapest headline number belongs to the one that includes the least.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Server,
                tag: "Panel only",
                who: "RunCloud · ServerPilot",
                body: "You buy the VPS yourself and point the panel at it. You pay a subscription for the software and a separate bill to your provider. Widest provider choice, two invoices, and the server is entirely your problem.",
              },
              {
                icon: Shield,
                tag: "Managed host",
                who: "Cloudways",
                body: "You buy the server through them, at their price, from their five providers. One bill, a great deal handled for you — and no root access, by design, because the fleet is centrally orchestrated.",
              },
              {
                icon: Zap,
                tag: "Both, without the panel fee",
                who: "SharkCluster",
                body: "The server is ordered and invoiced through us, so it is one bill — and you still get the root password, SSH keys and a firewall you control. There is no plan fee on top: the platform sits inside the server price.",
                highlighted: true,
              },
            ].map((model, i) => (
              <Reveal key={model.tag} delay={i * 80}>
                <div
                  className={`h-full rounded-2xl border p-6 ${
                    model.highlighted ? "border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white" : "border-ink-200 bg-white"
                  }`}
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${model.highlighted ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-600"}`}>
                    <model.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{model.tag}</h3>
                  <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${model.highlighted ? "text-brand-600" : "text-ink-400"}`}>{model.who}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{model.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The matrix */}
      <section className="section pt-0">
        <div className="container-px">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="heading-lg">Feature by feature</h2>
            <p className="mt-4 text-body">
              Every competitor column states what that vendor publishes. Where they are ahead of us, the row says so.
            </p>
          </Reveal>

          <Reveal className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[26%] p-4 align-bottom text-sm font-bold text-ink-900">Feature</th>
                  {vendors.map((v) => (
                    <th key={v.key} className={`p-4 align-bottom text-center ${v.highlighted ? "rounded-t-xl bg-brand-50" : ""}`}>
                      <span className={`block font-display text-base font-bold ${v.highlighted ? "text-brand-700" : "text-ink-900"}`}>{v.name}</span>
                      <span className={`mt-0.5 block text-sm font-semibold ${v.highlighted ? "text-brand-600" : "text-ink-600"}`}>{v.price}</span>
                      <span className="mt-0.5 block text-xs font-normal text-ink-400">{v.sub}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              {groups.map((group) => (
                <tbody key={group.title}>
                  <tr>
                    <td colSpan={vendors.length + 1} className="pt-8">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-400">
                        <group.icon className="h-4 w-4" />
                        {group.title}
                      </span>
                    </td>
                  </tr>
                  {group.rows.map((row, i) => (
                    <tr key={row.label} className={`border-t border-ink-100 ${i % 2 === 0 ? "bg-ink-50/30" : ""}`}>
                      <td className="p-4 align-top">
                        <span className="block text-sm font-semibold text-ink-900">{row.label}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-500">{row.note}</span>
                      </td>
                      {vendors.map((v) => (
                        <td key={v.key} className={`p-4 text-center align-top ${v.highlighted ? "bg-brand-50/50" : ""}`}>
                          <CellValue cell={row[v.key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </Reveal>

          {/* Legend + verification */}
          <Reveal className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border border-ink-200 bg-ink-50/50 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">
                    Verified as of <span className="text-brand-600">{VERIFIED_ON}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">
                    Competitor columns were read from these pages on that date. Vendors change plans, prices and
                    features without notice — confirm anything decision-critical with them directly before you buy.
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {SOURCES.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:text-brand-600"
                        >
                          {s.label}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-5">
              <p className="text-sm font-semibold text-ink-900">Reading the table</p>
              <dl className="mt-3 space-y-2.5 text-xs text-ink-500">
                <div className="flex items-start gap-2.5">
                  <dt className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </dt>
                  <dd>A clear advantage for that vendor on that row.</dd>
                </div>
                <div className="flex items-start gap-2.5">
                  <dt className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                    <X className="h-3.5 w-3.5" />
                  </dt>
                  <dd>A documented limitation, in that vendor's own words.</dd>
                </div>
                <div className="flex items-start gap-2.5">
                  <dt className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-ink-400">
                    <Minus className="h-3.5 w-3.5" />
                  </dt>
                  <dd>Not part of the published feature set we checked — not proof it cannot be done.</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Head to head */}
      <section className="section bg-ink-50/50 pt-0">
        <div className="container-px pt-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="heading-lg">One at a time</h2>
            <p className="mt-4 text-body">
              Each of these is a good product with a real audience. Here is who each one suits, and where we go a
              different way.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {headToHead.map((c, i) => (
              <Reveal key={c.name} delay={i * 80}>
                <div className="card h-full p-6">
                  <h3 className="font-display text-xl font-bold text-ink-900">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.bestFor}</p>

                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-400">Where they are strong</p>
                  <ul className="mt-2 space-y-2">
                    {c.strong.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-ink-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-600">Where SharkCluster differs</p>
                  <ul className="mt-2 space-y-2">
                    {c.differs.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-ink-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honest disqualifiers */}
      <section className="section">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <Reveal>
              <span className="eyebrow">
                <Scale className="h-4 w-4" />
                Straight answer
              </span>
              <h2 className="mt-5 heading-lg">Where SharkCluster is not the right fit</h2>
              <p className="mt-4 text-body">
                Four cases where one of the others is the better buy. Finding this out in week one is worse for both of
                us than reading it here.
              </p>
              <Link to="/contact" className="btn-secondary mt-6">
                Tell us your setup
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <div className="space-y-4">
              {notAFit.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="rounded-2xl border border-ink-200 bg-white p-5">
                    <h3 className="font-display text-base font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section pt-0">
        <div className="container-px">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="heading-lg">What we would pick us for</h2>
            <p className="mt-4 text-body">Four things that are hard to get from the others at the same time.</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="card-hover group flex h-full flex-col p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-base font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                  <Link to={item.to} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
                    {item.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <Reveal>
              <span className="eyebrow">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </span>
              <h2 className="mt-5 heading-lg">Before you switch</h2>
              <p className="mt-4 text-body">
                The questions people actually ask when they are comparing us against a panel they already use.
              </p>
              <Link to="/pricing" className="btn-secondary mt-6">
                See pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FaqItem key={faq.q} faq={faq} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
