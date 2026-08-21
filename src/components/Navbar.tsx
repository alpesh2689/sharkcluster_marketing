import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SharkLogo from "@/components/SharkLogo";
import {
  Menu, X, ChevronDown, ArrowRight,
  Server, Shield, GitBranch, RefreshCw, Activity, Zap,
  Cloud, Boxes, Package, Receipt,
  Users, Globe, Building2, Handshake, ShoppingCart, Code,
  Database, Network, Layers, Radar,
  BookOpen, FileText, Video, Star, GraduationCap,
  Mail, Phone,
} from "lucide-react";

type IconType = React.ComponentType<{ className?: string }>;

interface MenuLink {
  label: string;
  /** Ignored when `disabled` — the item is rendered, not linked. */
  to: string;
  desc?: string;
  icon: IconType;
  badge?: string;
  /**
   * Shown in the menu but not navigable yet. Distinct from `badge` alone:
   * Vultr and Hetzner carry a "Coming Soon" badge and still link to a real
   * page, whereas these have nothing to open.
   */
  disabled?: boolean;
}

interface MenuGroup {
  title: string;
  links: MenuLink[];
  /**
   * Lay this group out over two columns of the mega menu, with its links in a
   * 2-up grid, and stack the section's remaining groups in the last content
   * column. Platform Capabilities needs it: eleven items in one column made the
   * dropdown nearly 800px tall with two near-empty columns beside it.
   *
   * The grid template does not change either way — a wide group plus one
   * stacked column is the same four tracks as three plain groups.
   */
  wide?: boolean;
}

interface MegaSection {
  label: string;
  groups: MenuGroup[];
  rightPanel?: { title: string; items: { label: string; desc: string; icon: IconType; to: string }[] };
}

const megaSections: MegaSection[] = [
  {
    label: "Platform",
    groups: [
      {
        title: "Platform Capabilities",
        wide: true,
        // Ordered in pairs, because the wide layout reads across a row before
        // it reads down: run the server, protect it, then the things that hang
        // off it — data, people, money.
        links: [
          { label: "Server Management", to: "/features/server-management", desc: "Full lifecycle control", icon: Server },
          { label: "Deployment", to: "/features/deployment", desc: "Git, ZIP & Docker", icon: GitBranch },
          { label: "Backups & Recovery", to: "/features/backups", desc: "7 backup types", icon: RefreshCw },
          { label: "Monitoring", to: "/features/monitoring", desc: "Health alerts", icon: Activity },
          { label: "Firewall & Security", to: "/features/firewall", desc: "Closed by default", icon: Shield },
          { label: "Caching", to: "/features/caching", desc: "Redis & Varnish", icon: Zap },
          { label: "Managed Databases", to: "/features/managed-databases", desc: "Clusters that outlive servers", icon: Database },
          { label: "Container Registry", to: "/features/container-registry", desc: "Private Docker images", icon: Package },
          { label: "Teams & Permissions", to: "/features/teams", desc: "Per-server, per-app access", icon: Users },
          { label: "Billing & Invoicing", to: "/features/billing", desc: "One invoice, every provider", icon: Receipt },
          { label: "Self-Hosted Supabase", to: "/features/self-hosted-supabase", desc: "Run your own on a VPS", icon: Boxes },
          // InfraCaptain is not listed here on purpose - it has the Platform
          // Intelligence panel to itself on the right of this menu, and listing
          // it twice in one dropdown reads as two different things.
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
          { label: "Supported Apps", to: "/supported-apps", desc: "PHP, Node, Python & Docker", icon: Layers },
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
          { label: "Referral Program", to: "/partners", desc: "Earn recurring commission", icon: Handshake, badge: "Coming Soon", disabled: true },
          { label: "Agency Partner Program", to: "/partners", desc: "Volume discounts & co-marketing", icon: Handshake, badge: "Coming Soon", disabled: true },
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
          { label: "Agency Partner Program", to: "/partners", desc: "Volume discounts & white-label", icon: Handshake, badge: "Coming Soon", disabled: true },
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
          { label: "Community", to: "/community", desc: "Join the conversation", icon: Users, badge: "Coming Soon", disabled: true },
          { label: "Reviews", to: "/reviews", desc: "What customers say", icon: Star, badge: "Coming Soon", disabled: true },
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

/** One row of a mega-menu column: icon, label, optional badge, description. */
function MegaMenuItem({ item, onNavigate }: { item: MenuLink; onNavigate: () => void }) {
  const body = (
    <>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          item.disabled
            ? "bg-ink-100 text-ink-400"
            : "bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white"
        }`}
      >
        <item.icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${item.disabled ? "text-ink-400" : "text-ink-900"}`}>
            {item.label}
          </span>
          {item.badge && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
              {item.badge}
            </span>
          )}
        </span>
        {item.desc && (
          <span className={`block truncate text-xs ${item.disabled ? "text-ink-300" : "text-ink-500"}`}>
            {item.desc}
          </span>
        )}
      </span>
    </>
  );

  // A disabled item is shown so people know it is coming, but there is nothing
  // to open — so it is not a link and is skipped by keyboard navigation.
  if (item.disabled) {
    return (
      <div aria-disabled="true" title="Coming soon" className="flex cursor-not-allowed items-start gap-3 rounded-xl p-2.5 opacity-70">
        {body}
      </div>
    );
  }

  return (
    <Link
      to={item.to}
      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50"
      onClick={onNavigate}
    >
      {body}
    </Link>
  );
}

/** One titled column of the mega menu — two columns wide when `wide` is set. */
function MegaMenuGroup({ group, onNavigate }: { group: MenuGroup; onNavigate: () => void }) {
  return (
    <div className={group.wide ? "lg:col-span-2" : undefined}>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-400">{group.title}</h4>
      <div className={group.wide ? "grid gap-x-4 gap-y-0.5 lg:grid-cols-2" : "space-y-1"}>
        {group.links.map((item) => (
          <MegaMenuItem key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

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
  // A wide group takes two tracks and the rest share the last one, so the
  // dropdown keeps the same four-track shape either way.
  const wideGroup = activeSection?.groups.find((g) => g.wide);
  const stackedGroups = activeSection?.groups.filter((g) => !g.wide) ?? [];

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
          {/* The mark carries its own colour, so it sits on the page rather than
              inside a filled tile — a square tile would letterbox 51x38 artwork. */}
          <SharkLogo className="h-8 w-auto text-brand-500" />
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
            Get Started
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
              {wideGroup && <MegaMenuGroup group={wideGroup} onNavigate={() => setActiveMega(null)} />}

              {wideGroup ? (
                <div className="space-y-6">
                  {stackedGroups.map((group) => (
                    <MegaMenuGroup key={group.title} group={group} onNavigate={() => setActiveMega(null)} />
                  ))}
                </div>
              ) : (
                stackedGroups.map((group) => (
                  <MegaMenuGroup key={group.title} group={group} onNavigate={() => setActiveMega(null)} />
                ))
              )}

              {/* Right panel. self-start so a one-item panel hugs its content
                  instead of stretching to the tallest column's height. */}
              {activeSection.rightPanel && (
                <div className="self-start rounded-2xl border border-brand-200 bg-gradient-to-b from-brand-50 to-white p-5">
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
                    {group.links.map((item) => {
                      const body = (
                        <>
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                              item.disabled ? "bg-ink-100 text-ink-400" : "bg-brand-50 text-brand-600"
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="flex items-center gap-2">
                              <span className={`block text-sm font-semibold ${item.disabled ? "text-ink-400" : "text-ink-900"}`}>
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                                  {item.badge}
                                </span>
                              )}
                            </span>
                            {item.desc && (
                              <span className={`block text-xs ${item.disabled ? "text-ink-300" : "text-ink-500"}`}>
                                {item.desc}
                              </span>
                            )}
                          </span>
                        </>
                      );

                      if (item.disabled) {
                        return (
                          <div
                            key={item.label}
                            aria-disabled="true"
                            className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-2.5 opacity-70"
                          >
                            {body}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-brand-50"
                        >
                          {body}
                        </Link>
                      );
                    })}
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
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
