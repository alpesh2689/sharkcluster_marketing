import { Link } from "react-router-dom";
import {
  ShieldCheck, Lock, KeyRound, Eye, Network, Server, AlertTriangle,
  FileWarning, Check, ArrowRight, Fingerprint, Users, ChevronRight,
  Shield, Settings, Activity, RefreshCw,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const securityFeatures = [
  { icon: Network, title: "Closed-by-Default Firewall", desc: "UFW rules, country-based filtering, CIDR ranges, rule sync" },
  { icon: KeyRound, title: "Scoped Deploy Keys", desc: "Per-repo SSH deploy keys, masked public keys, generate or upload" },
  { icon: Lock, title: "Localhost-Bound Services", desc: "Redis, RabbitMQ, OpenSearch — localhost by default with credential separation" },
  { icon: Eye, title: "Security Audit Log", desc: "Every request parsed — status, method, path, IP, user agent" },
  { icon: FileWarning, title: "Sandboxed File Manager", desc: "Server-enforced app root boundary, htdocs-only editing, Monaco editor" },
  { icon: Fingerprint, title: "Account Security", desc: "2FA, passkeys (WebAuthn), SSO, failed-login tracking with lockout" },
];

const featureRows = [
  {
    icon: Network,
    tag: "Firewall",
    title: "Closed-by-default firewall",
    desc: "Nothing is reachable unless you explicitly open it. UFW rules are written in the panel and pushed to the actual machine. The panel and the live machine can drift — Sync Rules reconciles them. Country-based rules are approximate and labeled as such.",
    points: [
      "Inbound and outbound rules with Rule Name, Type, Protocol, Port, Source/Destination",
      "Presets: HTTP, HTTPS, MySQL, PostgreSQL, DNS, or Custom",
      "Source: single IP, CIDR, 0.0.0.0/0, all IPv6, or country-based",
      "Action: Allow or Deny (deny carves exceptions out of broader allows)",
      "Status: Enabled/Disabled per rule (disable without losing config)",
    ],
    mock: "firewall",
    reverse: false,
  },
  {
    icon: KeyRound,
    tag: "SSH Keys",
    title: "Scoped deploy keys, masked SSH keys",
    desc: "Panel-generated deploy keys are scoped to a single repository — safer than a full-account access token. Three independently-gated permissions let admins grant terminal access without granting key management. Public keys are masked in the UI to prevent shoulder-surfing.",
    points: [
      "Access_Keys — view and manage keys",
      "Access_Upload — add a key",
      "Access_Console — browser terminal access",
      "Generate keypairs — private key shown once, copy immediately",
      "Upload existing public keys — private key never touches the panel",
    ],
    mock: "ssh",
    reverse: true,
  },
  {
    icon: Eye,
    tag: "Audit Log",
    title: "Security audit log — see every request",
    desc: "Every request that reaches your application is parsed into readable entries — who asked for what, what they got back, and what they were using. This is where you see scanning, probing, and brute-force attempts. A 2xx on a probe path is the real signal — someone succeeded.",
    points: [
      "Status code, method, path, IP, timestamp, user agent, referer",
      "Color-coded status: green (2xx), blue (3xx), amber (4xx), red (5xx)",
      "Filter by level and search by IP, path, status, or user agent",
      "A 2xx on a probe path is the real signal — someone succeeded",
    ],
    mock: "audit",
    reverse: false,
  },
  {
    icon: Fingerprint,
    tag: "Account",
    title: "Account security — 2FA, passkeys, SSO",
    desc: "Protecting the server is half the job — the panel account that controls it needs the same care. SharkCluster supports app-based two-factor authentication, passkeys, and single sign-on, with failed-login tracking and automatic lockout.",
    points: [
      "TOTP two-factor authentication",
      "Passkeys (WebAuthn) — phishing-resistant",
      "SSO via Google, GitHub, LinkedIn and DigitalOcean",
      "Failed-login tracking with automatic lockout",
    ],
    mock: "account",
    reverse: true,
  },
];

const stats = [
  { value: "0", label: "Ports open by default" },
  { value: "7", label: "Security layers" },
  { value: "3", label: "Account auth methods (2FA, passkeys, SSO)" },
  { value: "100%", label: "Data on your VPS" },
];

const relatedFeatures = [
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
  { title: "Health Alerts & Monitoring", path: "/features/monitoring", icon: AlertTriangle },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Teams & Permissions", path: "/features/teams", icon: Users },
];

const securityLayers = [
  { icon: Network, label: "Firewall", desc: "UFW, closed by default" },
  { icon: KeyRound, label: "SSH Keys", desc: "Scoped, masked, managed" },
  { icon: Lock, label: "Services", desc: "Localhost-bound by default" },
  { icon: FileWarning, label: "File Access", desc: "Sandboxed to app root" },
  { icon: Activity, label: "Monitoring", desc: "Health alerts & audit logs" },
  { icon: Shield, label: "SSL/TLS", desc: "Free Let's Encrypt + Cloudflare" },
  { icon: Fingerprint, label: "Account", desc: "2FA, passkeys, SSO, lockout" },
];

const highlightPoints = [
  "Your data lives entirely on the VPS you choose",
  "Panel communicates over SSH — your data never touches our infrastructure",
  "Full server control — root access, SSH keys, firewall, file manager",
];

function MockPanel({ type }: { type: string }) {
  if (type === "layers") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Security Layers</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">7 active</span>
        </div>
        <div className="space-y-2">
          {securityLayers.map((layer, i) => (
            <div key={layer.label} className="flex items-center gap-3 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <layer.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink-900">{layer.label}</p>
                <p className="truncate text-[11px] text-ink-500">{layer.desc}</p>
              </div>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-[10px] font-mono text-ink-400">L{7 - i}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "firewall") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Network className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Firewall Rules</span>
          </div>
          <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold uppercase text-ink-600">UFW</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "HTTP", proto: "TCP", port: "80", src: "0.0.0.0/0", action: "Allow", color: "bg-emerald-100 text-emerald-700", on: true },
            { name: "HTTPS", proto: "TCP", port: "443", src: "0.0.0.0/0", action: "Allow", color: "bg-emerald-100 text-emerald-700", on: true },
            { name: "SSH", proto: "TCP", port: "22", src: "10.0.0.0/8", action: "Allow", color: "bg-emerald-100 text-emerald-700", on: true },
            { name: "MySQL", proto: "TCP", port: "3306", src: "0.0.0.0/0", action: "Deny", color: "bg-red-100 text-red-700", on: false },
          ].map((rule) => (
            <div key={rule.name} className="flex items-center gap-2 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink-900">{rule.name}</p>
                <p className="font-mono text-[10px] text-ink-400">{rule.proto} · :{rule.port} · {rule.src}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${rule.color}`}>{rule.action}</span>
              <span className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${rule.on ? "bg-emerald-500" : "bg-ink-200"}`}>
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${rule.on ? "translate-x-3.5" : "translate-x-0.5"}`} />
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Closed by default — open only what you need</p>
      </div>
    );
  }

  if (type === "ssh") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <KeyRound className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Deploy Keys</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Scoped</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "prod-deploy", repo: "acme/web", perm: "Access_Keys", color: "bg-emerald-100 text-emerald-700" },
            { name: "ci-pipeline", repo: "acme/api", perm: "Access_Upload", color: "bg-blue-100 text-blue-700" },
            { name: "dev-terminal", repo: "acme/web", perm: "Access_Console", color: "bg-amber-100 text-amber-700" },
          ].map((key) => (
            <div key={key.name} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-900">{key.name}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${key.color}`}>{key.perm}</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-ink-400">ssh-ed25519 ••••••••••••••••••••••••••</p>
              <p className="mt-0.5 text-[10px] text-ink-400">repo: {key.repo}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Public keys masked to prevent shoulder-surfing</p>
      </div>
    );
  }

  if (type === "audit") {
    return (
      <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
        <div className="flex items-center justify-between border-b border-ink-700 bg-ink-800 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-ink-200">Audit Log</span>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-400">Live</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed">
          {[
            { code: "200", method: "GET", path: "/", color: "text-emerald-400" },
            { code: "404", method: "GET", path: "/.env", color: "text-amber-400" },
            { code: "401", method: "POST", path: "/api/login", color: "text-amber-400" },
            { code: "200", method: "GET", path: "/wp-admin", color: "text-emerald-400" },
            { code: "500", method: "GET", path: "/api/users", color: "text-red-400" },
            { code: "301", method: "GET", path: "/old", color: "text-blue-400" },
          ].map((entry, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <span className={`font-bold ${entry.color}`}>{entry.code}</span>
              <span className="text-ink-400">{entry.method}</span>
              <span className="truncate text-ink-300">{entry.path}</span>
              <span className="ml-auto text-[10px] text-ink-500">203.0.113.{i + 4}</span>
            </div>
          ))}
          <p className="mt-2 text-emerald-400">$ <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" /></p>
        </div>
      </div>
    );
  }

  // account
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Fingerprint className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Account Security</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Hardened</span>
      </div>
      <div className="space-y-2.5">
        {[
          { label: "Two-Factor (TOTP)", status: "Enabled", color: "bg-emerald-100 text-emerald-700", icon: ShieldCheck },
          { label: "Passkey (WebAuthn)", status: "Enabled", color: "bg-emerald-100 text-emerald-700", icon: Fingerprint },
          { label: "SSO (Google)", status: "Linked", color: "bg-blue-100 text-blue-700", icon: Users },
          { label: "Failed logins", status: "0 / lockout", color: "bg-ink-100 text-ink-600", icon: Activity },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <item.icon className="h-4 w-4 text-ink-400" />
              <span className="text-sm font-semibold text-ink-900">{item.label}</span>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Phishing-resistant authentication by default</p>
    </div>
  );
}

export default function SecurityPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Security — Firewall, SSH Keys, Encryption & Monitoring"
        description="Security baked into every layer: closed-by-default firewall, scoped deploy keys, localhost-bound services, sandboxed file manager, proactive health alerts, and free SSL. Your data stays on your VPS."
        path="/security"
        keywords={["server security", "firewall management", "SSH key management", "VPS security", "cloud hosting security", "UFW firewall", "server hardening"]}
        faqSchema={[
          { q: "How does SharkCluster secure my server?", a: "SharkCluster uses a closed-by-default firewall posture, scoped SSH deploy keys, localhost-bound services by default, a sandboxed file manager restricted to your application root, and proactive health alerts for CPU, memory, disk, and failed services." },
          { q: "Does SharkCluster have access to my data?", a: "No. Your data lives entirely on the VPS you choose. The panel communicates with your server over SSH to manage it, but your application data, databases, and files never touch SharkCluster's own infrastructure." },
          { q: "Is the firewall configured by default?", a: "Yes, the firewall is closed by default. Nothing is reachable unless you explicitly open it. The panel provides built-in security guidance, including warnings against exposing database ports to 0.0.0.0/0." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
        ]}
      />

      {/* Split hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-300/15 blur-3xl" />
        </div>
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-sm font-semibold text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                Security First
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Security baked into <br />
                <span className="gradient-text">every layer</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                We don't just expose the security switch — we tell you which way to flip it. From firewall defaults to
                credential separation, SharkCluster ships with opinionated security guidance at every step.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Start Securely
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-emerald-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="layers" />
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
                <p className="font-display text-3xl font-extrabold text-emerald-600 sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-ink-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security features grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <ShieldCheck className="h-4 w-4" />
              Security Layers
            </span>
            <h2 className="mt-5 heading-lg">Seven layers of security</h2>
            <p className="mt-4 text-body">
              From the firewall to the file manager, every layer is designed with a closed-by-default posture. The
              panel doesn't just expose the switch — it tells you which way to flip it.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
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
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <row.icon className="h-3.5 w-3.5" />
                  {row.tag}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{row.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-600">{row.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {row.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-ink-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative ${row.reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-emerald-200/20 to-blue-200/10 blur-2xl" />
                <MockPanel type={row.mock} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Highlight section */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
                  <Server className="h-3.5 w-3.5" />
                  Your VPS
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Your VPS. Your data. Your rules.</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Every application, database, and file lives on your server. We never have access to your data — only
                  you do. The panel communicates with your server over SSH to manage it, but your application data,
                  databases, and files never touch SharkCluster's own infrastructure.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {highlightPoints.map((point) => (
                    <div key={point} className="rounded-xl border border-ink-200/80 bg-white/80 p-3">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <p className="mt-2 text-xs font-semibold leading-snug text-ink-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-bold text-ink-900">Security Layers</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">7 total</span>
                </div>
                <div className="mt-4 space-y-2">
                  {securityLayers.map((layer, i) => (
                    <div key={layer.label} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-2.5 py-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                        <layer.icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-ink-900">{layer.label}</p>
                        <p className="truncate text-[10px] text-ink-500">{layer.desc}</p>
                      </div>
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-[9px] font-mono text-ink-400">L{7 - i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Shield className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your security</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair security with the tools that keep your applications resilient and your team in control.</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFeatures.map((rf) => (
                <Link
                  key={rf.title}
                  to={rf.path}
                  className="group rounded-2xl border border-ink-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white"><rf.icon className="h-4 w-4" /></span>
                    <ChevronRight className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-500" />
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
