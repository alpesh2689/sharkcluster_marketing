import { Link } from "react-router-dom";
import {
  Shield, Server, Network, Lock, KeyRound, Eye, AlertTriangle, FileWarning,
  Check, ArrowRight, ChevronRight, HardDrive, RefreshCw, FileCode, Settings,
  Globe, Fingerprint, ShieldCheck, Users, Activity,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const securityLayers = [
  { icon: Shield, title: "UFW Firewall", desc: "Inbound/outbound rules, presets, country-based filtering" },
  { icon: KeyRound, title: "SSH Key Management", desc: "Generate, upload, mask — three independent permissions" },
  { icon: FileWarning, title: "Audit Log", desc: "Every request parsed — status, method, path, IP, user agent" },
  { icon: Eye, title: "Sandboxed File Manager", desc: "Server-enforced root boundary, editing only in htdocs" },
  { icon: Lock, title: "Localhost-Bound Services", desc: "Database and internal services bound to localhost by default" },
];

const featureRows = [
  {
    icon: Shield,
    tag: "Firewall",
    title: "Closed-by-default firewall",
    desc: "Nothing is reachable unless you explicitly open it. UFW rules are written in the panel and pushed to the actual machine. The panel and the live machine can drift — Sync Rules reconciles them.",
    points: [
      "Inbound and outbound rules with Rule Name, Type, Protocol, Port, Source/Destination",
      "Presets: HTTP, HTTPS, MySQL, PostgreSQL, DNS, or Custom",
      "Protocol: TCP, UDP, ICMP",
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
    title: "SSH key management, built secure",
    desc: "Three independently-gated permissions let admins grant terminal access without granting key management. Public keys are masked in the UI to prevent shoulder-surfing.",
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
    icon: FileWarning,
    tag: "Audit Log",
    title: "Security audit log",
    desc: "Every request that reaches your application is parsed into readable entries — who asked for what, what they got back, and what they were using. This is where you see scanning, probing, and brute-force attempts.",
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
    title: "Account security — the other half of the job",
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
  {
    icon: Eye,
    tag: "File Manager",
    title: "Sandboxed file manager",
    desc: "Edit files in the browser — scoped to your application root, with editing restricted to htdocs. The server refuses any path outside it, enforced on the machine, not just hidden in the interface.",
    points: [
      "Server-enforced application root boundary",
      "Editing only enabled inside htdocs",
      "Monaco editor (VS Code engine) with syntax highlighting",
      "Team members cannot delete — create, edit, upload only",
    ],
    mock: "files",
    reverse: true,
  },
];

const stats = [
  { value: "0", label: "Ports open by default" },
  { value: "3", label: "Independent SSH permissions" },
  { value: "6", label: "Rule presets" },
  { value: "1", label: "Click to sync rules" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Security", path: "/security", icon: Shield },
  { title: "Health Alerts & Monitoring", path: "/features/monitoring", icon: AlertTriangle },
  { title: "Backups & Recovery", path: "/features/backups", icon: Check },
  { title: "Deployment", path: "/features/deployment", icon: KeyRound },
];

function MockPanel({ type }: { type: string }) {
  if (type === "firewall") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Shield className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Firewall Rules</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Active</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "HTTP", proto: "TCP", port: "80", source: "0.0.0.0/0", action: "Allow", color: "bg-emerald-100 text-emerald-700", enabled: true },
            { name: "HTTPS", proto: "TCP", port: "443", source: "0.0.0.0/0", action: "Allow", color: "bg-emerald-100 text-emerald-700", enabled: true },
            { name: "MySQL", proto: "TCP", port: "3306", source: "127.0.0.1", action: "Deny", color: "bg-red-100 text-red-700", enabled: true },
            { name: "SSH", proto: "TCP", port: "22", source: "10.0.0.0/8", action: "Allow", color: "bg-emerald-100 text-emerald-700", enabled: false },
          ].map((rule) => (
            <div key={rule.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${rule.action === "Allow" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                  <Network className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{rule.name}</p>
                  <p className="font-mono text-[10px] text-ink-400">{rule.proto}:{rule.port} · {rule.source}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${rule.color}`}>{rule.action}</span>
                <span className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${rule.enabled ? "bg-brand-500" : "bg-ink-200"}`}>
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${rule.enabled ? "translate-x-3.5" : "translate-x-1"}`} />
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Closed by default — nothing reachable unless you open it</p>
      </div>
    );
  }

  if (type === "ssh") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">SSH Keys</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "prod-deploy-key", perm: "Full access", color: "bg-emerald-100 text-emerald-700" },
            { name: "ci-pipeline", perm: "Deploy only", color: "bg-blue-100 text-blue-700" },
            { name: "dev-terminal", perm: "Console only", color: "bg-amber-100 text-amber-700" },
          ].map((key) => (
            <div key={key.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <KeyRound className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{key.name}</p>
                  <p className="font-mono text-[10px] text-ink-400">ssh-rsa AAAA••••••••••</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${key.color}`}>{key.perm}</span>
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
        <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-xs text-ink-400">audit.log</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed">
          <p className="flex items-center gap-2">
            <span className="font-bold text-emerald-400">200</span>
            <span className="text-blue-400">GET</span>
            <span className="text-ink-300">/index.html</span>
            <span className="ml-auto text-ink-500">192.168.1.10</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-bold text-blue-400">301</span>
            <span className="text-blue-400">GET</span>
            <span className="text-ink-300">/old-blog</span>
            <span className="ml-auto text-ink-500">10.0.0.4</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-bold text-amber-400">404</span>
            <span className="text-blue-400">GET</span>
            <span className="text-ink-300">/.env</span>
            <span className="ml-auto text-ink-500">185.2.x.x</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-bold text-amber-400">401</span>
            <span className="text-blue-400">POST</span>
            <span className="text-ink-300">/api/login</span>
            <span className="ml-auto text-ink-500">45.9.x.x</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-bold text-red-400">500</span>
            <span className="text-blue-400">GET</span>
            <span className="text-ink-300">/api/health</span>
            <span className="ml-auto text-ink-500">10.0.0.4</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-bold text-emerald-400">200</span>
            <span className="text-blue-400">GET</span>
            <span className="text-ink-300">/wp-login.php</span>
            <span className="ml-auto text-ink-500">185.2.x.x</span>
          </p>
          <p className="mt-2 flex items-center gap-2 text-ink-500">
            <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" />
            <span>tail -f audit.log</span>
          </p>
        </div>
      </div>
    );
  }

  if (type === "account") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
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

  // files
  return (
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-lg">
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/50 px-4 py-2.5">
        <FileCode className="h-4 w-4 text-brand-600" />
        <span className="text-sm font-semibold text-ink-900">File Manager</span>
        <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">htdocs only</span>
      </div>
      <div className="grid grid-cols-3 gap-0">
        <div className="border-r border-ink-100 bg-ink-50/30 p-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-ink-400">Files</p>
          <div className="space-y-1.5 font-mono text-xs">
            <p className="flex items-center gap-1.5 text-ink-700"><FolderIcon /> /var/www</p>
            <p className="ml-3 flex items-center gap-1.5 text-ink-700"><FolderIcon /> htdocs</p>
            <p className="ml-6 flex items-center gap-1.5 rounded bg-brand-50 px-1 text-brand-700"><FileIcon /> index.php</p>
            <p className="ml-6 flex items-center gap-1.5 text-ink-500"><FileIcon /> .htaccess</p>
            <p className="ml-6 flex items-center gap-1.5 text-ink-500"><FileIcon /> config.php</p>
            <p className="ml-3 flex items-center gap-1.5 text-ink-400"><FolderIcon /> logs</p>
            <p className="ml-3 flex items-center gap-1.5 text-ink-400"><FolderIcon /> .ssh</p>
          </div>
        </div>
        <div className="col-span-2 p-3">
          <div className="mb-2 flex items-center gap-2 rounded bg-ink-900 px-2 py-1.5">
            <span className="font-mono text-[10px] text-ink-300">htdocs/index.php</span>
            <span className="ml-auto text-[10px] text-emerald-400">● saved</span>
          </div>
          <div className="font-mono text-[11px] leading-relaxed">
            <p className="text-ink-500">&lt;?php</p>
            <p className="text-ink-800"><span className="text-brand-600">echo</span> <span className="text-emerald-600">"Hello"</span>;</p>
            <p className="text-ink-500">// boundary enforced on server</p>
            <p className="text-ink-800"><span className="text-brand-600">require</span> <span className="text-emerald-600">"./config.php"</span>;</p>
            <p className="mt-1 inline-block h-3 w-1.5 animate-pulse bg-brand-500 align-middle" />
          </div>
        </div>
      </div>
      <div className="border-t border-ink-100 bg-ink-50/30 px-4 py-2">
        <p className="text-[10px] text-ink-400">Server-enforced root boundary — editing restricted to htdocs</p>
      </div>
    </div>
  );
}

function FolderIcon() {
  return (
    <svg className="h-3 w-3 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="h-3 w-3 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

export default function FirewallPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Firewall & Security — Closed-by-Default UFW Management"
        description="Panel-driven UFW firewall management with inbound/outbound rules, country-based filtering, CIDR ranges, and a closed-by-default posture. SSH key management, security audit logs, and sandboxed file manager."
        path="/features/firewall"
        keywords={["firewall management", "UFW", "server security", "firewall rules", "SSH security", "server hardening", "network security"]}
        faqSchema={[
          { q: "Is the SharkCluster firewall enabled by default?", a: "Yes, the firewall is closed by default. Nothing is reachable unless you explicitly open it. The panel provides built-in security guidance, including warnings against exposing database ports to 0.0.0.0/0." },
          { q: "Can I filter firewall rules by country?", a: "Yes, SharkCluster supports country-based firewall rules. However, country rules are approximate (based on IP registration and defeatable by VPN) and should be used as a narrowing tool, never a sole control." },
          { q: "Can I manage SSH keys from the panel?", a: "Yes, SharkCluster provides full SSH key management with masked public keys, generate-or-upload options, and granular permissions for view, upload, and console access." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Firewall & Security", path: "/features/firewall" },
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
                <Shield className="h-4 w-4" />
                Firewall & Security
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Security baked into <br />
                <span className="gradient-text">every layer</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Closed-by-default firewall, scoped deploy keys, masked SSH keys, localhost-bound services, sandboxed
                file manager, and security audit logs. We don't just expose the switch — we tell you which way to flip it.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Secure Your Servers
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="firewall" />
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

      {/* Security layers grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Lock className="h-4 w-4" />
              Security Layers
            </span>
            <h2 className="mt-5 heading-lg">Security at every layer</h2>
            <p className="mt-4 text-body">
              From the firewall to the file manager, every layer is designed with a closed-by-default posture. The panel
              doesn't just expose the switch — it tells you which way to flip it.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {securityLayers.map((layer, i) => (
              <div
                key={layer.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <layer.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{layer.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{layer.desc}</p>
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

      {/* Hardening highlight section */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <Shield className="h-3.5 w-3.5" />
                  Hardening
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Security guidance built in</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  The panel doesn't just expose the controls — it tells you what to do with them. Warnings against
                  exposing database ports to 0.0.0.0/0. Country rules labeled as approximate. Alert-fatigue guidance for
                  thresholds. We tell you which way to flip the switch.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Warnings against exposing database ports to 0.0.0.0/0",
                    "Country rules labeled as approximate — narrowing tool, not sole control",
                    "Quick Activation for diagnostics, Reset for recovery from tangled rulesets",
                  ].map((point) => (
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
                    <Settings className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">UFW Controls</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Enabled</span>
                </div>
                <div className="mt-5 space-y-2.5">
                  {[
                    { label: "Sync Rules", icon: RefreshCw, desc: "Push panel state to server" },
                    { label: "Enable / Disable", icon: Shield, desc: "Toggle UFW entirely" },
                    { label: "Quick Activation", icon: HardDrive, desc: "Temporarily allow all" },
                    { label: "Reset", icon: AlertTriangle, desc: "Clear all rules" },
                    { label: "View Logs", icon: FileCode, desc: "Blocked & allowed traffic" },
                  ].map((ctrl) => (
                    <div key={ctrl.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                          <ctrl.icon className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-ink-900">{ctrl.label}</p>
                          <p className="text-[10px] text-ink-400">{ctrl.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Network className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your server</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair firewall & security with the tools that keep your applications fast, secure, and resilient.</p>
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
