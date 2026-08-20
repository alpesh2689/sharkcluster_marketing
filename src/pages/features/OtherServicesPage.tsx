import { Link } from "react-router-dom";
import {
  Boxes, Server, Shield, Activity, Network, Mail, Search, FileVideo,
  Terminal, ArrowRight, Check, ChevronRight, Settings, AlertTriangle,
  RefreshCw, HardDrive, Zap, Package, Archive,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const serviceCategories = [
  { icon: Mail, title: "Message Brokers", desc: "RabbitMQ for queues, Mosquitto for IoT/MQTT pub-sub" },
  { icon: Search, title: "Search & Analytics", desc: "OpenSearch and Elasticsearch for full-text search and logs" },
  { icon: Shield, title: "Mail & Security", desc: "SMTP relay, Fail2Ban, ClamAV, ModSecurity" },
  { icon: FileVideo, title: "Media & Documents", desc: "FFmpeg, ImageMagick, LibreOffice, Zip-Unzip for processing and archives" },
  { icon: Package, title: "Custom Packages", desc: "Install anything outside the catalogue — tracked like any other service" },
];

const featureRows = [
  {
    icon: Mail,
    tag: "Brokers",
    title: "Message brokers — RabbitMQ & Mosquitto",
    desc: "RabbitMQ for background jobs and queues (Laravel, Celery, Sidekiq-style). Mosquitto for IoT/MQTT pub-sub. RabbitMQ is the most configurable service in the catalogue.",
    points: [
      "RabbitMQ — separate admin vs app credentials, virtual host isolation, clustering",
      "Protective limits: Max Message Size, VM memory high watermark",
      "Optional protocol plugins: AMQP 1.0, MQTT, STOMP, Federation, Shovel",
      "Mosquitto — IoT/MQTT pub-sub messaging",
    ],
    mock: "brokers",
    reverse: false,
  },
  {
    icon: Search,
    tag: "Search",
    title: "Search & analytics — OpenSearch & Elasticsearch",
    desc: "OpenSearch and Elasticsearch for full-text search and log analytics. Both support cluster identity, node roles, dedicated data/log paths, and five distinct log types.",
    points: [
      "Cluster identity — cluster/node name, node roles (master/data/ingest)",
      "Network binding controls and dedicated data/log paths",
      "Security: admin/app credentials + TLS",
      "Five log types: main, slow, GC, deprecation, audit",
      "Slow log is the starting point for performance issues",
    ],
    mock: "search",
    reverse: true,
  },
  {
    icon: Shield,
    tag: "Security",
    title: "Mail & security tools",
    desc: "SMTP relay for sending mail through an external provider. Fail2Ban for login-attempt banning. ClamAV for upload antivirus scanning. ModSecurity for web app firewall.",
    points: [
      "SMTP relay — full relay config with My Networks control (prevents open relay)",
      "Fail2Ban — pairs with Failed Logins panel in Monitoring",
      "ClamAV — recommended for any server accepting public uploads",
      "ModSecurity — needs tuning post-install (strict ruleset blocks some traffic)",
    ],
    mock: "security",
    reverse: false,
  },
  {
    icon: FileVideo,
    tag: "Media",
    title: "Media & document processing",
    desc: "FFmpeg for video/audio processing, ImageMagick for image manipulation, and LibreOffice for server-side document conversion.",
    points: [
      "FFmpeg — video and audio processing",
      "ImageMagick — image manipulation",
      "LibreOffice — server-side document conversion",
      "Zip-Unzip — archive extraction and creation on the server",
    ],
    mock: "media",
    reverse: true,
  },
  {
    icon: Package,
    tag: "Custom",
    title: "Custom packages — when the catalogue runs out",
    desc: "The catalogue covers what most servers need. When yours needs something else, install it from the panel rather than dropping to a shell — the install is tracked like any other service, so the next person to look at the server can see what was added and why. A custom package is yours to maintain — SharkCluster does not manage its configuration or updates the way it does a catalogue service.",
    points: [
      "Install packages outside the catalogue",
      "Tracked alongside catalogue services",
      "No SSH session required",
      "Available on every supported provider",
    ],
    mock: "custom",
    reverse: false,
  },
];

const stats = [
  { value: "13+", label: "Services in catalogue" },
  { value: "5", label: "Log types (OpenSearch)" },
  { value: "0", label: "SSH required" },
  { value: "1", label: "Click to install" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
  { title: "Health Alerts & Monitoring", path: "/features/monitoring", icon: Activity },
  { title: "Cronjobs", path: "/features/cronjobs", icon: Network },
];

function MockPanel({ type }: { type: string }) {
  if (type === "catalogue") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Boxes className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Service Catalogue</span>
          </div>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">13+ services</span>
        </div>
        <div className="space-y-2.5">
          {[
            { icon: Mail, name: "Message Brokers", desc: "RabbitMQ · Mosquitto", color: "bg-blue-100 text-blue-700" },
            { icon: Search, name: "Search & Analytics", desc: "OpenSearch · Elasticsearch", color: "bg-emerald-100 text-emerald-700" },
            { icon: Shield, name: "Mail & Security", desc: "SMTP · Fail2Ban · ClamAV · ModSec", color: "bg-amber-100 text-amber-700" },
            { icon: FileVideo, name: "Media & Documents", desc: "FFmpeg · ImageMagick · LibreOffice · Zip-Unzip", color: "bg-purple-100 text-purple-700" },
          ].map((cat) => (
            <div key={cat.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${cat.color}`}>
                  <cat.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{cat.name}</p>
                  <p className="text-[10px] text-ink-500">{cat.desc}</p>
                </div>
              </div>
              <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[10px] font-bold uppercase text-white">Install</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "brokers") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Mail className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">RabbitMQ Configuration</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Running</span>
        </div>
        <div className="space-y-2.5">
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">Admin Credentials</p>
            <p className="mt-1 font-mono text-xs text-ink-700">admin ••••••••</p>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">App Credentials</p>
            <p className="mt-1 font-mono text-xs text-ink-700">app_user ••••••••</p>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">Virtual Host</p>
            <p className="mt-1 font-mono text-xs text-ink-700">/production</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="mb-2 text-[10px] font-semibold uppercase text-ink-400">Protocol Plugins</p>
          <div className="flex flex-wrap gap-1.5">
            {["AMQP 1.0", "MQTT", "STOMP", "Federation", "Shovel"].map((plugin) => (
              <span key={plugin} className="rounded-md bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700">{plugin}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "search") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Search className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">OpenSearch Cluster</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Running</span>
        </div>
        <div className="space-y-2.5">
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">Cluster Name</p>
            <p className="mt-1 font-mono text-xs text-ink-700">prod-search-cluster</p>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">Node Roles</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {["master", "data", "ingest"].map((role) => (
                <span key={role} className="rounded-md bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700">{role}</span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">Security</p>
            <p className="mt-1 text-xs text-ink-700">Admin/app credentials + TLS enabled</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="mb-2 text-[10px] font-semibold uppercase text-ink-400">Log Types</p>
          <div className="flex flex-wrap gap-1.5">
            {["main", "slow", "GC", "deprecation", "audit"].map((log) => (
              <span key={log} className="rounded-md bg-ink-100 px-2 py-1 text-[10px] font-semibold text-ink-600">{log}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "security") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Shield className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Security Tools</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "SMTP Relay", desc: "External provider · My Networks configured", status: "Active", color: "bg-emerald-100 text-emerald-700" },
            { name: "Fail2Ban", desc: "Login-attempt banning enabled", status: "Active", color: "bg-emerald-100 text-emerald-700" },
            { name: "ClamAV", desc: "Upload antivirus scanning", status: "Active", color: "bg-emerald-100 text-emerald-700" },
            { name: "ModSecurity", desc: "WAF · needs tuning post-install", status: "Tuning", color: "bg-amber-100 text-amber-700" },
          ].map((tool) => (
            <div key={tool.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-ink-900">{tool.name}</p>
                <p className="text-[10px] text-ink-500">{tool.desc}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${tool.color}`}>{tool.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "custom") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Package className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Custom Package</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Tracked</span>
        </div>
        <div className="space-y-2.5">
          <div>
            <label className="text-xs font-semibold text-ink-500">Package name</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2">
              <Package className="h-3.5 w-3.5 text-ink-400" />
              <span className="font-mono text-xs text-ink-700">custom-monitoring-agent</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-500">Install command</label>
            <div className="mt-1 rounded-lg border border-ink-700 bg-ink-900 px-3 py-2 font-mono text-xs">
              <span className="text-emerald-400">$</span> <span className="text-ink-300">apt-get install -y custom-agent</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-ink-400" />
              <span className="text-xs font-semibold text-ink-900">Tracked alongside catalogue services</span>
            </div>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
            <span className="text-[10px] text-amber-700">Yours to maintain — configuration and updates not managed by SharkCluster</span>
          </div>
        </div>
      </div>
    );
  }

  // media
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <FileVideo className="h-4 w-4" />
        </span>
        <span className="text-sm font-semibold text-ink-900">Media & Documents</span>
      </div>
      <div className="space-y-2.5">
        {[
          { icon: FileVideo, name: "FFmpeg", desc: "Video & audio processing", status: "Installed", color: "bg-emerald-100 text-emerald-700" },
          { icon: Zap, name: "ImageMagick", desc: "Image manipulation", status: "Installed", color: "bg-emerald-100 text-emerald-700" },
          { icon: FileVideo, name: "LibreOffice", desc: "Server-side document conversion", status: "Installed", color: "bg-emerald-100 text-emerald-700" },
          { icon: Archive, name: "Zip-Unzip", desc: "Archive extraction and creation", status: "Installed", color: "bg-emerald-100 text-emerald-700" },
        ].map((tool) => (
          <div key={tool.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-100 text-ink-600">
                <tool.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{tool.name}</p>
                <p className="text-[10px] text-ink-500">{tool.desc}</p>
              </div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${tool.color}`}>{tool.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OtherServicesPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Other Services — RabbitMQ, OpenSearch, SMTP, Security & Media Tools"
        description="Managed-install catalogue of supporting software: message brokers, search engines, mail relay, security tools, and media/document processing — all installed and managed from the panel without SSH."
        path="/features/other-services"
        keywords={["RabbitMQ hosting", "OpenSearch hosting", "Elasticsearch hosting", "SMTP relay", "Fail2Ban", "ClamAV", "FFmpeg hosting", "managed services"]}
        faqSchema={[
          { q: "What services can I install from the SharkCluster panel?", a: "SharkCluster offers a managed catalogue including RabbitMQ, Mosquitto, OpenSearch, Elasticsearch, SMTP relay, Fail2Ban, ClamAV, ModSecurity, FFmpeg, ImageMagick, LibreOffice, and custom packages." },
          { q: "Can I install software not in the catalogue?", a: "Yes, the Custom Package option lets you install software outside the standard catalogue via a custom install/run command." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Other Services", path: "/features/other-services" },
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
                <Boxes className="h-4 w-4" />
                Other Services
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Supporting software <br />
                <span className="gradient-text">managed from the panel</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Message brokers, search engines, mail relay, security tools, and media processing — all installed,
                configured, and log-accessible from the panel without SSH. Every install failure produces an
                attached log.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Install a Service
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="catalogue" />
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

      {/* Service categories grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Boxes className="h-4 w-4" />
              Service Catalogue
            </span>
            <h2 className="mt-5 heading-lg">Five categories, one consistent lifecycle</h2>
            <p className="mt-4 text-body">
              Every service follows the same lifecycle: Install (with success/failure + log) → Status →
              Restart/Stop/Enable/Disable → Configure → Logs → Upgrade → Uninstall. Nothing fails silently.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat, i) => (
              <div
                key={cat.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex flex-col items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <cat.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{cat.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{cat.desc}</p>
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

      {/* Highlight section — lifecycle */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <Activity className="h-3.5 w-3.5" />
                  Lifecycle
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Consistent lifecycle across all services</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Every service follows the same lifecycle: Install (with success/failure + log) → Status →
                  Restart/Stop/Enable/Disable → Configure → Logs → Upgrade → Uninstall. Nothing fails silently —
                  every install failure produces an attached log.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Install with explicit success/failure + attached log on failure",
                    "Configure with Basic/Advanced split",
                    "Logs with source picker, fetch, filter, and log level",
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
                    <RefreshCw className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Service Lifecycle</span>
                  </div>
                </div>
                <div className="mt-5 space-y-2.5">
                  {[
                    { step: "Install", icon: Settings, status: "Success / Failure + Log", color: "bg-emerald-100 text-emerald-700" },
                    { step: "Status", icon: Activity, status: "Active / Inactive / Failed", color: "bg-blue-100 text-blue-700" },
                    { step: "Configure", icon: Settings, status: "Basic / Advanced", color: "bg-brand-100 text-brand-700" },
                    { step: "Logs", icon: Terminal, status: "Source picker + filter", color: "bg-ink-100 text-ink-700" },
                    { step: "Upgrade", icon: RefreshCw, status: "Upgrade log attached", color: "bg-amber-100 text-amber-700" },
                    { step: "Uninstall", icon: AlertTriangle, status: "Confirmation required", color: "bg-red-100 text-red-700" },
                  ].map((stage) => (
                    <div key={stage.step} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <stage.icon className="h-3.5 w-3.5 text-ink-500" />
                        <span className="text-xs font-semibold text-ink-800">{stage.step}</span>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${stage.color}`}>{stage.status}</span>
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
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair managed services with the tools that keep your applications fast, secure, and resilient.</p>
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
