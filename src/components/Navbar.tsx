import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, ChevronDown, ArrowRight,
  Server, Shield, GitBranch, RefreshCw, Activity, Zap,
  Cloud, Boxes, Cpu, Bot, Package, Receipt,
  Users, Globe, Building2, Handshake, ShoppingCart, Code,
  Database, Network, Layers, Radar,
  BookOpen, FileText, Video, Star, MessageSquareText, GraduationCap,
  Mail, Phone,
} from "lucide-react";

type IconType = React.ComponentType<{ className?: string }>;

interface MenuLink {
  label: string;
  to: string;
  desc?: string;
  icon: IconType;
  badge?: string;
}

interface MegaSection {
  label: string;
  groups: { title: string; links: MenuLink[] }[];
  rightPanel?: { title: string; items: { label: string; desc: string; icon: IconType; to: string }[] };
}

const megaSections: MegaSection[] = [
  {
    label: "Platform",
    groups: [
      {
        title: "Platform Capabilities",
        links: [
          { label: "Server Management", to: "/features/server-management", desc: "Full lifecycle control", icon: Server },
          { label: "Backups & Recovery", to: "/features/backups", desc: "7 backup types", icon: RefreshCw },
          { label: "Deployment", to: "/features/deployment", desc: "Git, ZIP & Docker", icon: GitBranch },
          { label: "Caching", to: "/features/caching", desc: "Redis & Varnish", icon: Zap },
          { label: "Monitoring", to: "/features/monitoring", desc: "Health alerts", icon: Activity },
          { label: "Firewall & Security", to: "/features/firewall", desc: "Closed by default", icon: Shield },
          { label: "Container Registry", to: "/features/container-registry", desc: "Private Docker images", icon: Package },
          { label: "Managed Databases", to: "/features/managed-databases", desc: "Clusters that outlive servers", icon: Database },
          { label: "Teams & Permissions", to: "/features/teams", desc: "Per-server, per-app access", icon: Users },
          { label: "Billing & Invoicing", to: "/features/billing", desc: "One invoice, every provider", icon: Receipt },
          { label: "Self-Hosted Supabase", to: "/features/self-hosted-supabase", desc: "Run your own on a VPS", icon: Boxes },
          { label: "InfraCaptain", to: "/features/infracaptain", desc: "Deeper infrastructure insight", icon: Radar },
        ],
      },
      {
        title: "Cloud Providers",
        links: [
          { label: "DigitalOcean", to: "/cloud-providers/digitalocean", desc: "12 datacenters", icon: Cloud },
          { label: "OVHcloud", to: "/cloud-providers/ovhcloud", desc: "Europe & beyond", icon: Cloud },
          { label: "Contabo", to: "/cloud-providers/contabo", desc: "Global, prepaid", icon: Cloud },
          { label: "Vultr", to: "/cloud-providers", desc: "23 locations", icon: Cloud, badge: "Coming Soon" },
          { label: "Hetzner", to: "/cloud-providers", desc: "EU & US", icon: Cloud, badge: "Coming Soon" },
        ],
      },
      {
        title: "Supported Apps",
        links: [
          { label: "Supported Apps", to: "/supported-apps", desc: "PHP, Node, Python, Ruby, .NET & Docker", icon: Layers },
          { label: "Cloud Providers Hub", to: "/cloud-providers", desc: "Compare all supported providers", icon: Cloud },
        ],
      },
    ],
    rightPanel: {
      title: "Platform Intelligence",
      items: [
        { label: "InfraCaptain", desc: "Connect your server to the InfraCaptain platform", icon: Radar, to: "/features/infracaptain" },
      ],
    },
  },
  {
    label: "Solutions",
    groups: [
      {
        title: "Who We Serve",
        links: [
          { label: "India", to: "/who-we-serve/india", desc: "Local data, local support", icon: Globe },
          { label: "Agencies", to: "/who-we-serve/agencies", desc: "Manage client sites", icon: Users },
          { label: "Global", to: "/who-we-serve/global", desc: "Worldwide infrastructure", icon: Globe },
          { label: "Developers", to: "/who-we-serve/developers", desc: "Git, Docker & browser SSH", icon: Code },
          { label: "SMBs", to: "/who-we-serve/smb", desc: "Run your business apps yourself", icon: Building2 },
          { label: "Ecommerce", to: "/who-we-serve/ecommerce", desc: "Handle the traffic spike", icon: ShoppingCart },
        ],
      },
      {
        title: "Partnership Programs",
        links: [
          { label: "Referral Program", to: "/partners", desc: "Earn recurring commission", icon: Handshake },
          { label: "Agency Partner Program", to: "/partners", desc: "Volume discounts & co-marketing", icon: Handshake, badge: "Coming Soon" },
        ],
      },
      {
        title: "Powerful Features",
        links: [
          { label: "Domains & SSL", to: "/features/domains-ssl", desc: "Free Let's Encrypt", icon: Cloud },
          { label: "Databases", to: "/features/databases", desc: "MySQL, PostgreSQL, MongoDB", icon: Database },
          { label: "Cronjobs", to: "/features/cronjobs", desc: "Scheduled tasks", icon: Network },
          { label: "Other Services", to: "/features/other-services", desc: "RabbitMQ, OpenSearch & more", icon: Boxes },
          { label: "Self-Hosted Apps", to: "/self-hosted-apps", desc: "ERP, helpdesk, invoicing", icon: Layers },
          { label: "Security", to: "/security", desc: "End-to-end protection", icon: Shield },
          { label: "Integrations", to: "/integrations", desc: "Verified connections only", icon: Network },
        ],
      },
    ],
    rightPanel: {
      title: "Services & Integrations",
      items: [
        { label: "Other Services", desc: "RabbitMQ, SMTP, Fail2Ban & more", icon: Boxes, to: "/features/other-services" },
        { label: "Integrations", desc: "Cloudflare, Git providers, registries", icon: Network, to: "/integrations" },
      ],
    },
  },
  {
    label: "Agencies",
    groups: [
      {
        title: "Agency Solutions",
        links: [
          { label: "Agency Hosting", to: "/who-we-serve/agencies", desc: "Unlimited client sites per server", icon: Server },
          { label: "Agency Partner Program", to: "/partners", desc: "Volume discounts & white-label", icon: Handshake, badge: "Coming Soon" },
          { label: "Agency Success Stories", to: "/case-studies", desc: "How agencies grow with us", icon: GraduationCap },
        ],
      },
    ],
  },
  {
    label: "Resources",
    groups: [
      {
        title: "Learn",
        links: [
          { label: "Documentation", to: "/docs", desc: "Complete reference guides", icon: BookOpen },
          { label: "API Reference", to: "/docs/api", desc: "Drive the platform from your own tooling", icon: Code },
          { label: "Product Updates", to: "/product-updates", desc: "Latest platform changes", icon: FileText },
        ],
      },
      {
        title: "Discover",
        links: [
          { label: "Blog", to: "/blog", desc: "Insights & tutorials", icon: FileText },
          { label: "Case Studies", to: "/case-studies", desc: "Real customer stories", icon: GraduationCap },
          { label: "Video Library", to: "/video-library", desc: "Watch & learn", icon: Video },
        ],
      },
      {
        title: "Why SharkCluster",
        links: [
          { label: "Compare", to: "/compare", desc: "vs other hosting platforms", icon: Activity },
          { label: "Community", to: "/community", desc: "Join the conversation", icon: Users },
          { label: "Reviews", to: "/reviews", desc: "What customers say", icon: Star },
          { label: "Demo", to: "/demo", desc: "See it in action", icon: Video },
        ],
      },
    ],
    rightPanel: {
      title: "Talk to Us",
      items: [
        { label: "Contact Sales", desc: "Get a personalized demo", icon: Mail, to: "/contact" },
        { label: "Schedule a Call", desc: "Book time with our team", icon: Phone, to: "/contact" },
      ],
    },
  },
];

const topNav: { label: string; to?: string; megaIndex?: number }[] = [
  { label: "Platform", megaIndex: 0 },
  { label: "Solutions", megaIndex: 1 },
  { label: "Agencies", megaIndex: 2 },
  { label: "Resources", megaIndex: 3 },
  { label: "Pricing", to: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location.pathname]);

  const activeSection = activeMega !== null ? megaSections[activeMega] : null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen || activeMega !== null
          ? "border-b border-ink-200/70 bg-white/85 backdrop-blur-lg shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
      onMouseLeave={() => setActiveMega(null)}
    >
      <nav className="container-px flex h-16 items-center justify-between lg:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="SharkCluster home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/30">
            <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
              <path d="M9 10.5c0-1.1.9-2 2-2h6.5c2.5 0 4.5 1.8 4.5 4.2 0 1.7-1 2.8-2.3 3.4 1.6.5 2.8 1.7 2.8 3.6 0 2.5-2 4.3-4.8 4.3H11c-1.1 0-2-.9-2-2V10.5z" fill="white" />
              <circle cx="14" cy="13" r="1.3" fill="#565ADD" />
              <circle cx="14" cy="18.5" r="1.3" fill="#565ADD" />
            </svg>
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-ink-900">SharkCluster</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {topNav.map((link) =>
            link.megaIndex !== undefined ? (
              <button
                key={link.label}
                className="btn-ghost flex items-center gap-1 text-sm"
                onMouseEnter={() => setActiveMega(link.megaIndex!)}
              >
                {link.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${activeMega === link.megaIndex ? "rotate-180" : ""}`} />
              </button>
            ) : (
              <Link key={link.label} to={link.to!} className="btn-ghost text-sm">
                {link.label}
              </Link>
            ),
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href="https://cloud.sharkcluster.com" className="btn-ghost text-sm">Login</a>
          <a href="https://cloud.sharkcluster.com/register" className="btn-primary text-sm">
            Start Free
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="btn-ghost lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mega menu dropdown */}
      {activeSection && (
        <div
          className="absolute inset-x-0 top-full hidden border-t border-ink-100 bg-white shadow-xl lg:block"
          onMouseEnter={() => setActiveMega(activeMega)}
        >
          <div className="container-px py-6">
            <div className={`grid gap-6 ${activeSection.rightPanel ? "lg:grid-cols-[1fr_1fr_1fr_280px]" : "lg:grid-cols-3"}`}>
              {activeSection.groups.map((group) => (
                <div key={group.title}>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-400">{group.title}</h4>
                  <div className="space-y-1">
                    {group.links.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50"
                        onClick={() => setActiveMega(null)}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-ink-900">{item.label}</span>
                            {item.badge && (
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          {item.desc && <span className="block text-xs text-ink-500">{item.desc}</span>}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Right panel */}
              {activeSection.rightPanel && (
                <div className="rounded-2xl border border-brand-200 bg-gradient-to-b from-brand-50 to-white p-5">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-700">{activeSection.rightPanel.title}</h4>
                  <div className="space-y-2">
                    {activeSection.rightPanel.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white"
                        onClick={() => setActiveMega(null)}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white shadow-sm">
                          <item.icon className="h-4.5 w-4.5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink-900">{item.label}</span>
                          <span className="block text-xs text-ink-500">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div className="container-px max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ink-200 bg-white py-4">
            {megaSections.map((section) => (
              <div key={section.label} className="mb-3">
                <span className="block px-4 py-2 text-sm font-bold text-ink-400">{section.label}</span>
                {section.groups.map((group) => (
                  <div key={group.title} className="mb-1">
                    <span className="block px-4 py-1 text-xs font-semibold text-ink-300">{group.title}</span>
                    {group.links.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-brand-50"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="flex items-center gap-2">
                            <span className="block text-sm font-semibold text-ink-900">{item.label}</span>
                            {item.badge && (
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          {item.desc && <span className="block text-xs text-ink-500">{item.desc}</span>}
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}
                {section.rightPanel && (
                  <div className="mx-4 mb-2 rounded-xl border border-brand-200 bg-brand-50 p-3">
                    <span className="block text-xs font-bold uppercase tracking-wider text-brand-700">{section.rightPanel.title}</span>
                    {section.rightPanel.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="mt-2 flex items-center gap-2.5"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-white">
                          <item.icon className="h-3.5 w-3.5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink-900">{item.label}</span>
                          <span className="block text-xs text-ink-500">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-2 border-t border-ink-200 pt-3">
              <Link to="/pricing" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-brand-50">
                Pricing
              </Link>
            </div>
            <div className="mt-4 space-y-2 border-t border-ink-200 pt-4">
              <a href="https://cloud.sharkcluster.com" className="btn-secondary w-full">Login</a>
              <a href="https://cloud.sharkcluster.com/register" className="btn-primary w-full">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
