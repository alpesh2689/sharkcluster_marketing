import { Link } from "react-router-dom";
import {
  GitBranch, Server, Database, Boxes, Terminal, Shield, Cloud,
  Layers, Zap, Code, Package, ArrowRight, Check, Cpu, HardDrive,
  Copy, ChevronRight, GitCommit, Play, FileCode,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const deploymentMethods = [
  { icon: Cloud, title: "Fresh Install", desc: "Choose frontend, backend, database & web server" },
  { icon: GitBranch, title: "Git Deploy", desc: "Clone & deploy from GitHub, GitLab, or Bitbucket" },
  { icon: HardDrive, title: "Upload ZIP", desc: "Upload existing source code directly" },
  { icon: Layers, title: "Custom Migration", desc: "Bring an existing site from another host" },
  { icon: Cpu, title: "Docker Host", desc: "Run containers with CPU, memory & registry config" },
  { icon: Terminal, title: "Blank Server", desc: "Configure everything manually" },
];

const featureRows = [
  {
    icon: GitBranch,
    tag: "Git Deploy",
    title: "Git deploy with scoped deploy keys",
    desc: "The panel generates an SSH deploy key scoped to a single repository — safer than a full-account access token. The key must be added at your Git provider before creating the application, and the panel tells you if generation fails rather than silently continuing.",
    points: [
      "Supports GitHub, GitLab, and Bitbucket",
      "Deploy keys scoped to one repo (not your whole account)",
      "Choose branch — defaults include main and Master",
      "Auto dependency install and build step execution",
    ],
    mock: "git",
    reverse: false,
  },
  {
    icon: Cpu,
    tag: "Docker",
    title: "Docker host with full control",
    desc: "Run containers instead of a managed stack. Configure the image name, tag, container port, max CPU cores (fractional allowed), memory limit, and private registry credentials. A port mismatch produces a container that starts but is unreachable — the panel tells you this.",
    points: [
      "Configurable image name and tag (defaults to latest)",
      "Container port must match the image's listening port",
      "Max CPU cores (fractional allowed) and memory limits",
      "Private registry credentials supported",
    ],
    mock: "docker",
    reverse: true,
  },
  {
    icon: Boxes,
    tag: "Containers",
    title: "Container management, beyond one container",
    desc: "Manage images, containers, and Docker Compose stacks from the panel. Pull from public registries or from your own private registry with stored credentials.",
    points: [
      "Docker Compose stack creation",
      "Container lifecycle — start, stop, restart, logs",
      "Private registry credentials",
      "Per-container CPU and memory limits",
    ],
    mock: "containers",
    reverse: false,
  },
  {
    icon: Terminal,
    tag: "Scripts",
    title: "Per-app deployment scripts",
    desc: "Each application has its own deployment script with build, migration, and cache steps that run automatically on every deploy. This is where you configure what happens when you push to production.",
    points: [
      "Build steps (npm install, composer install, etc.)",
      "Migration steps (php artisan migrate, etc.)",
      "Cache clearing steps",
      "Custom commands per deployment",
    ],
    mock: "scripts",
    reverse: false,
  },
  {
    icon: Copy,
    tag: "Staging",
    title: "One-click staging environments",
    desc: "Create a full copy of any application to test changes before touching production. Clone applications across servers. Each staging environment gets its own domain, SSL, and database.",
    points: [
      "One-click staging — full copy of production app",
      "Clone applications to the same server or another",
      "Independent domains, SSL, and databases",
      "Test deployments before going live",
    ],
    mock: "staging",
    reverse: true,
  },
];

const stats = [
  { value: "3", label: "Git providers" },
  // TODO_CONFIRM — owner: product. Stack list is admin-managed (technologies
  // table); re-check this count when it changes. Must match /supported-apps.
  { value: "14", label: "Stacks supported" },
  { value: "1", label: "Click to staging" },
  { value: "0", label: "Config files to touch" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Backups & Recovery", path: "/features/backups", icon: Database },
  { title: "Container Registry", path: "/features/container-registry", icon: Package },
  { title: "Caching (Redis & Varnish)", path: "/features/caching", icon: Zap },
];

// A sample for the panel below — not the full catalogue. The complete list
// lives in src/pages/SupportedAppsPage.tsx (allApps) and drives the stat above.
const supportedStacks = [
  "Laravel 9–13",
  "WordPress",
  "Magento",
  "Node.js / Express",
  "Next.js",
  "MERN",
  "Angular",
  "Svelte",
  "Django",
  "Flask",
];

function MockPanel({ type }: { type: string }) {
  if (type === "git") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <GitBranch className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Git Deploy</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Ready</span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-ink-500">Repository URL</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2">
              <GitBranch className="h-3.5 w-3.5 text-ink-400" />
              <span className="font-mono text-xs text-ink-700">github.com/acme/api</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-500">Branch</label>
            <div className="mt-1 flex items-center justify-between rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2">
              <span className="font-mono text-xs text-ink-700">main</span>
              <ChevronRight className="h-3.5 w-3.5 text-ink-400" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">Deploy key added</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-600">ssh-rsa AAAA••••</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "docker") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Docker Host</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-semibold text-ink-500">Image</span>
            <span className="font-mono text-xs font-bold text-ink-900">nginx:1.25</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <p className="text-xs font-semibold text-ink-500">Port</p>
              <p className="text-sm font-bold text-ink-900">8080:80</p>
            </div>
            <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <p className="text-xs font-semibold text-ink-500">CPU</p>
              <p className="text-sm font-bold text-ink-900">1.5 cores</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-semibold text-ink-500">Memory</span>
            <span className="text-sm font-bold text-ink-900">512 MB</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
            <Check className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Private registry credentials stored</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "containers") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Boxes className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Containers</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">3 running</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "web", image: "nginx:1.25", status: "Running", color: "bg-emerald-100 text-emerald-700", cpu: "0.5", mem: "256 MB" },
            { name: "api", image: "acme/api:2.4", status: "Running", color: "bg-emerald-100 text-emerald-700", cpu: "1.0", mem: "512 MB" },
            { name: "worker", image: "redis:7", status: "Stopped", color: "bg-ink-100 text-ink-500", cpu: "0.25", mem: "128 MB" },
          ].map((c) => (
            <div key={c.name} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-md ${c.status === "Running" ? "bg-emerald-50 text-emerald-600" : "bg-ink-100 text-ink-400"}`}>
                    <Play className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{c.name}</p>
                    <p className="font-mono text-[10px] text-ink-400">{c.image}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${c.color}`}>{c.status}</span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-[10px] text-ink-500">
                <span><span className="font-semibold text-ink-700">CPU</span> {c.cpu}</span>
                <span><span className="font-semibold text-ink-700">Mem</span> {c.mem}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Private registry credentials stored</span>
        </div>
      </div>
    );
  }

  if (type === "scripts") {
    return (
      <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
        <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-xs text-ink-400">deploy.sh</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed">
          <p className="text-ink-500"># Deployment script</p>
          <p className="mt-1 text-emerald-400">$ <span className="text-ink-300">npm install</span></p>
          <p className="text-ink-400">added 312 packages in 4s</p>
          <p className="mt-1 text-emerald-400">$ <span className="text-ink-300">npm run build</span></p>
          <p className="text-ink-400">✓ Building for production...</p>
          <p className="text-ink-400">✓ Generated static files</p>
          <p className="mt-1 text-emerald-400">$ <span className="text-ink-300">php artisan migrate</span></p>
          <p className="text-ink-400">Migration complete.</p>
          <p className="mt-1 text-emerald-400">$ <span className="text-ink-300">php artisan cache:clear</span></p>
          <p className="text-emerald-400">Application cache cleared!</p>
          <p className="mt-2 text-emerald-400">✓ Deploy successful <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" /></p>
        </div>
      </div>
    );
  }

  if (type === "staging") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Copy className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Staging Clone</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-ink-500">Production</p>
              <p className="font-mono text-xs font-bold text-ink-900">acme.com</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
          </div>
          <div className="flex justify-center">
            <ArrowRight className="h-4 w-4 text-brand-500" />
          </div>
          <div className="flex items-center justify-between rounded-lg border-2 border-brand-500 bg-brand-50 px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-brand-600">Staging</p>
              <p className="font-mono text-xs font-bold text-ink-900">staging.acme.com</p>
            </div>
            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">Clone</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-2 py-2 text-center">
              <p className="text-[10px] font-semibold text-ink-500">SSL</p>
              <Check className="mx-auto mt-0.5 h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-2 py-2 text-center">
              <p className="text-[10px] font-semibold text-ink-500">DB</p>
              <Check className="mx-auto mt-0.5 h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-2 py-2 text-center">
              <p className="text-[10px] font-semibold text-ink-500">Domain</p>
              <Check className="mx-auto mt-0.5 h-3.5 w-3.5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function DeploymentPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Git & Docker Deployment — Deploy from Git, ZIP, or Docker"
        description="Connect GitHub, GitLab, or Bitbucket with scoped deploy keys. Upload a ZIP, pull a Docker image, or start fresh. Per-app deployment scripts and one-click staging environments."
        path="/features/deployment"
        keywords={["git deployment", "docker deployment", "GitHub deployment", "deploy from git", "Docker hosting", "CI/CD deployment", "staging environment"]}
        faqSchema={[
          { q: "Can I deploy from a Git repository on SharkCluster?", a: "Yes, SharkCluster supports deploying from GitHub, GitLab, and Bitbucket repositories using either personal access tokens or panel-generated deploy keys scoped to a single repository." },
          { q: "Does SharkCluster support Docker containers?", a: "Yes, SharkCluster supports Docker host deployment with configurable container images, tags, ports, CPU limits, memory limits, and private registry credentials." },
          { q: "Can I create a staging environment?", a: "Yes, every application can be cloned into a staging environment with one click — a full copy to test changes before touching production." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Deployment", path: "/features/deployment" },
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
                <GitBranch className="h-4 w-4" />
                Deployment
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Deploy from Git, ZIP, <br />
                <span className="gradient-text">or Docker</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Connect GitHub, GitLab, or Bitbucket with scoped deploy keys. Upload a ZIP, pull a Docker image, or
                start fresh. Per-app deployment scripts and one-click staging environments.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Deploy Your App
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="git" />
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

      {/* Deployment methods grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Cloud className="h-4 w-4" />
              Deployment
            </span>
            <h2 className="mt-5 heading-lg">Five ways to deploy a server</h2>
            <p className="mt-4 text-body">
              Whether you're starting fresh, bringing existing code, or running containers, SharkCluster has a
              deployment method for you. Each configures the stack automatically — you don't touch a config file.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deploymentMethods.map((method, i) => (
              <div
                key={method.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <method.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{method.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{method.desc}</p>
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

      {/* Highlight section — supported technologies */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <Code className="h-3.5 w-3.5" />
                  Supported Technologies
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">One server, many stacks</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Fresh installation supports a wide range of stacks. PHP version is selectable per application —
                  two apps on the same server can run different PHP versions.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "PHP: Laravel (9–13), WordPress, Magento — PHP 7.3 through 8.3",
                    "JavaScript: Node.js, Next.js, MERN, Angular, Svelte — Node 16–20",
                    "Python: Django, Flask — Python 3.11, 3.12, 3.13",
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
                    <Boxes className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Supported Stacks</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Popular stacks</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {supportedStacks.map((stack) => (
                    <span key={stack} className="rounded-lg border border-ink-200 bg-ink-50/50 px-2.5 py-1 text-xs font-semibold text-ink-700">
                      {stack}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-ink-100 pt-3">
                  <FileCode className="h-3.5 w-3.5 text-brand-600" />
                  <span className="text-xs font-medium text-ink-500">PHP version selectable per application</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><GitCommit className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around deployment</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair deployment with the tools that keep your applications fast, secure, and resilient.</p>
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
