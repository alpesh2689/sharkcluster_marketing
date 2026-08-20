import { Link } from "react-router-dom";
import {
  Cloud, Server, Shield, GitBranch, Globe, Lock, ArrowRight, Check,
  ChevronRight, Activity, FileCode, RefreshCw, AlertTriangle, Settings,
  Network,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const domainFeatures = [
  { icon: Globe, title: "Custom Domains", desc: "Point your domain with DNS records, get Let's Encrypt SSL" },
  { icon: Cloud, title: "Free Subdomains", desc: "Every app gets a *.sharkcluster.com subdomain with edge HTTPS" },
  { icon: Lock, title: "Free SSL", desc: "Let's Encrypt certificates issued and renewed automatically" },
  { icon: Shield, title: "Cloudflare", desc: "Per-domain add-on: WAF, caching, origin protection, analytics" },
  { icon: Activity, title: "Live URL Status", desc: "Four checks per domain — see which variant actually responds" },
  { icon: FileCode, title: "VHost Editing", desc: "Raw nginx/Apache config, syntax-checked before applying" },
];

const featureRows = [
  {
    icon: Lock,
    tag: "SSL",
    title: "Free SSL certificates, automatic",
    desc: "Let's Encrypt certificates are issued automatically on the server. A certbot fallback retries with the canonical name alone if an alias doesn't resolve yet, so you still get a certificate. Auto-renewal means certificates renew without you.",
    points: [
      "Free Let's Encrypt certificates for custom domains",
      "Auto-renewal — certificates renew without you",
      "Certbot fallback for partially-pointed domains",
      "Apex redirect vhost created for www domains with Cloudflare",
    ],
    mock: "ssl",
    reverse: false,
  },
  {
    icon: Shield,
    tag: "Cloudflare",
    title: "Cloudflare integration — beyond SSL",
    desc: "Cloudflare is wired into the panel as a per-domain add-on covering far more than certificates: security rules, performance tuning, origin protection, redirect management, and per-domain analytics — all configured without leaving SharkCluster.",
    points: [
      "Per-domain subscription with trial period",
      "Three badge states: Disable, Pending, Enable",
      "Auto-validating — badge updates every 20 seconds",
      "DCV Delegation TXT record for SSL auto-renewal",
      "Security rules, WAF, caching, origin protection, analytics",
    ],
    mock: "cloudflare",
    reverse: true,
  },
  {
    icon: Activity,
    tag: "Status",
    title: "Live URL status — know what responds",
    desc: "Four independent checks per domain — non-www HTTP/HTTPS and www HTTP/HTTPS — laid out as a small grid. This column tells you at a glance which variant a visitor can actually reach.",
    points: [
      "Green — responded with status below 400",
      "Red — 4xx, 5xx, timed out, or connection failed",
      "Grey — not checked yet",
      "Re-checked on every list fetch — never stops looking",
    ],
    mock: "status",
    reverse: false,
  },
  {
    icon: FileCode,
    tag: "VHost",
    title: "Virtual host config editing",
    desc: "The raw web server configuration for any domain is editable in the panel. The configuration is tested before it's applied — a syntax error is rejected rather than taking your web server down.",
    points: [
      "Full nginx or Apache config in a Monaco editor",
      "TEST & SAVE CHANGES — syntax-checked before applying",
      "Copy Primary Virtual Host when changing primary domains",
      "Custom rewrites, proxy rules, header settings, per-domain PHP values",
    ],
    mock: "vhost",
    reverse: true,
  },
];

const stats = [
  { value: "Free", label: "Let's Encrypt SSL" },
  { value: "4", label: "URL variants checked" },
  { value: "20s", label: "Cloudflare badge refresh" },
  { value: "1", label: "Subdomain per app, unlimited custom" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Deployment", path: "/features/deployment", icon: GitBranch },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
  { title: "Caching", path: "/features/caching", icon: Cloud },
];

function MockPanel({ type }: { type: string }) {
  if (type === "domains") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Globe className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Domains</span>
          </div>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">3 Domains</span>
        </div>
        <div className="space-y-2">
          {[
            { domain: "myapp.sharkcluster.com", ssl: "Edge", sslColor: "bg-emerald-100 text-emerald-700", status: "ok" },
            { domain: "www.example.com", ssl: "Let's Encrypt", sslColor: "bg-blue-100 text-blue-700", status: "ok" },
            { domain: "api.example.com", ssl: "Pending", sslColor: "bg-amber-100 text-amber-700", status: "warn" },
          ].map((d) => (
            <div key={d.domain} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-ink-400" />
                <p className="text-sm font-semibold text-ink-900">{d.domain}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${d.sslColor}`}>{d.ssl}</span>
                <span className={`h-2 w-2 rounded-full ${d.status === "ok" ? "bg-emerald-500" : "bg-amber-500"}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">All domains reachable</span>
        </div>
      </div>
    );
  }

  if (type === "ssl") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Lock className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">SSL Certificate</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Active</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-xs font-semibold text-ink-500">Issuer</p>
            <p className="text-sm font-bold text-ink-900">Let's Encrypt</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-xs font-semibold text-ink-500">Expires</p>
            <p className="text-sm font-bold text-ink-900">Jan 14, 2026</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-xs font-semibold text-ink-500">Auto-renew</p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
              <Check className="h-3.5 w-3.5" /> Enabled
            </span>
          </div>
        </div>
        <div className="mt-3 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
          <p className="text-xs font-semibold text-ink-500">Covers</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {["example.com", "www.example.com"].map((d) => (
              <span key={d} className="rounded-md bg-brand-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-700">{d}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "cloudflare") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Shield className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Cloudflare</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
            <RefreshCw className="h-3 w-3" /> Pending
          </span>
        </div>
        <div className="mb-3 flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
          <p className="text-xs font-semibold text-ink-500">Domain</p>
          <p className="text-sm font-bold text-ink-900">www.example.com</p>
        </div>
        <div className="space-y-2">
          {[
            { label: "WAF", state: "Enable", color: "text-emerald-600" },
            { label: "Caching", state: "Enable", color: "text-emerald-600" },
            { label: "Analytics", state: "Enable", color: "text-emerald-600" },
            { label: "Origin Protection", state: "Pending", color: "text-amber-600" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <span className="text-sm font-semibold text-ink-800">{f.label}</span>
              <span className={`text-xs font-bold ${f.color}`}>{f.state}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <RefreshCw className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">Badge updates every 20 seconds</span>
        </div>
      </div>
    );
  }

  if (type === "status") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Activity className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">URL Status</span>
          </div>
          <span className="text-xs font-semibold text-ink-400">example.com</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { url: "http://example.com", state: "green", code: "301" },
            { url: "https://example.com", state: "green", code: "200" },
            { url: "http://www.example.com", state: "green", code: "301" },
            { url: "https://www.example.com", state: "red", code: "525" },
          ].map((s) => (
            <div key={s.url} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${s.state === "green" ? "bg-emerald-500" : s.state === "red" ? "bg-red-500" : "bg-ink-300"}`} />
                <span className="font-mono text-[10px] font-semibold text-ink-700">{s.url}</span>
              </div>
              <p className={`mt-1.5 text-xs font-bold ${s.state === "green" ? "text-emerald-600" : s.state === "red" ? "text-red-600" : "text-ink-400"}`}>
                {s.state === "green" ? `OK · ${s.code}` : s.state === "red" ? `Fail · ${s.code}` : "Not checked"}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-2">
          <span className="flex items-center gap-1 text-[10px] font-medium text-ink-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> OK</span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-ink-500"><span className="h-2 w-2 rounded-full bg-red-500" /> Fail</span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-ink-500"><span className="h-2 w-2 rounded-full bg-ink-300" /> Pending</span>
        </div>
      </div>
    );
  }

  // vhost
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
      <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono text-xs text-ink-400">example.com · nginx</span>
        <Settings className="ml-auto h-3.5 w-3.5 text-ink-500" />
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed">
        <p className="text-ink-400">server {"{"}</p>
        <p className="text-ink-300 pl-4">listen 443 ssl http2;</p>
        <p className="text-ink-300 pl-4">server_name example.com;</p>
        <p className="text-ink-300 pl-4">ssl_certificate /etc/letsencrypt/...</p>
        <p className="text-ink-300 pl-4">root /var/www/example;</p>
        <p className="text-ink-300 pl-4">location / {"{"}</p>
        <p className="text-emerald-400 pl-8">try_files $uri $uri/ /index.php;</p>
        <p className="text-ink-300 pl-4">{"}"}</p>
        <p className="text-ink-400">{"}"}</p>
      </div>
      <div className="flex items-center gap-2 border-t border-ink-700 bg-ink-800 px-4 py-2.5">
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-400">
          <Check className="h-3 w-3" /> Syntax OK
        </span>
        <button className="ml-auto rounded-md bg-brand-500 px-3 py-1 text-[10px] font-bold uppercase text-white">Test &amp; Save</button>
      </div>
    </div>
  );
}

export default function DomainsSslPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Domains & SSL — Free Let's Encrypt + Cloudflare Integration"
        description="Point domains, issue free SSL certificates, route through Cloudflare, and check reachability with live URL status. Auto-redirect, bulk actions, and virtual host config editing."
        path="/features/domains-ssl"
        keywords={["domain management", "SSL certificates", "Let's Encrypt", "Cloudflare integration", "DNS management", "free SSL", "domain hosting"]}
        faqSchema={[
          { q: "Does SharkCluster offer free SSL certificates?", a: "Yes, SharkCluster provides free Let's Encrypt SSL certificates for custom domains. SharkCluster subdomains get HTTPS terminated at the edge via Cloudflare." },
          { q: "Can I use Cloudflare with SharkCluster?", a: "Yes, Cloudflare integration is available as a per-domain add-on. It registers a Cloudflare custom hostname, provides advanced caching and security, and manages SSL automatically." },
          { q: "How do I add a custom domain?", a: "Add your domain in the Domain tab, create the DNS records at your registrar (CNAME to proxy.sharkcluster.com), confirm the DNS checkbox, and save. The panel validates automatically." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Domains & SSL", path: "/features/domains-ssl" },
        ]}
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
                <Globe className="h-4 w-4" />
                Domains & SSL
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Domains and SSL <br />
                <span className="gradient-text">made simple</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Point your domain, issue free SSL, route through Cloudflare, and verify reachability — all from one
                tab. Live URL status tells you which of the four variants actually responds.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Add Your Domain
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="domains" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-ink-200 bg-ink-50/50">
        <div className="container-px py-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-extrabold text-brand-600 sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-ink-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain features grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Globe className="h-4 w-4" />
              Domain Management
            </span>
            <h2 className="mt-5 heading-lg">Two kinds of domain, one tab</h2>
            <p className="mt-4 text-body">
              SharkCluster subdomains are managed for you with HTTPS terminated at the edge. Custom domains need DNS
              records at your registrar and get Let's Encrypt certificates or Cloudflare integration.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domainFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating feature rows with mockups */}
      {featureRows.map((row) => (
        <section key={row.title} className="section pt-0">
          <div className="container-px">
            <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${row.reverse ? "lg:grid-flow-col-dense" : ""}`}>
              <div className={row.reverse ? "lg:col-start-2" : ""}>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  <row.icon className="h-3.5 w-3.5" />
                  {row.tag}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{row.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-600">{row.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {row.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-ink-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative ${row.reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/20 to-blue-200/10 blur-2xl" />
                <MockPanel type={row.mock} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Free subdomains highlight */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <Cloud className="h-3.5 w-3.5" />
                  Free Subdomains
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Reachable before any DNS is configured</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Every application gets a free *.sharkcluster.com subdomain automatically, with HTTPS terminated at
                  the edge via Cloudflare. A new app is reachable before any DNS is configured — no domain, no
                  registrar, no waiting.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Automatic subdomain for every application", "HTTPS terminated at the edge — no certificate setup", "Upgrade to a custom domain anytime"].map((point) => (
                    <div key={point} className="rounded-xl border border-ink-200/80 bg-white/80 p-3">
                      <Check className="h-4 w-4 text-brand-600" />
                      <p className="mt-2 text-xs font-semibold leading-snug text-ink-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Domain Types</span>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-emerald-700">SharkCluster Subdomain</span>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <p className="mt-1.5 font-mono text-[10px] text-ink-600">myapp.sharkcluster.com</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">Edge HTTPS</span>
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">Auto DNS</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-brand-200 bg-brand-50/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-brand-700">Custom Domain</span>
                      <Globe className="h-3.5 w-3.5 text-brand-600" />
                    </div>
                    <p className="mt-1.5 font-mono text-[10px] text-ink-600">www.example.com</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[9px] font-semibold text-brand-700">Let's Encrypt</span>
                      <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[9px] font-semibold text-brand-700">Cloudflare</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Network className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your domains</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair domain management with the tools that keep your applications fast, secure, and resilient.</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFeatures.map((rf) => (
                <Link
                  key={rf.title}
                  to={rf.path}
                  className="group rounded-2xl border border-ink-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white"><rf.icon className="h-4 w-4" /></span>
                    <ChevronRight className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-ink-800">{rf.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
