import { Link } from "react-router-dom";
import { ArrowRight, Twitter, Github, Linkedin } from "lucide-react";

const footerNav = [
  {
    title: "Platform",
    links: [
      { label: "Features", to: "/features" },
      { label: "Server Management", to: "/features/server-management" },
      { label: "Backups & Recovery", to: "/features/backups" },
      { label: "Deployment", to: "/features/deployment" },
      { label: "Caching", to: "/features/caching" },
      { label: "Firewall & Security", to: "/features/firewall" },
      { label: "Monitoring", to: "/features/monitoring" },
      { label: "InfraCaptain", to: "/features/infracaptain" },
      { label: "Databases", to: "/features/databases" },
      { label: "Cloud Providers", to: "/cloud-providers" },
      { label: "Supported Apps", to: "/supported-apps" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "India", to: "/who-we-serve/india" },
      { label: "Agencies", to: "/who-we-serve/agencies" },
      { label: "Global", to: "/who-we-serve/global" },
      { label: "Developers", to: "/who-we-serve/developers" },
      { label: "SMBs", to: "/who-we-serve/smb" },
      { label: "Ecommerce", to: "/who-we-serve/ecommerce" },
      { label: "Self-Hosted Apps", to: "/self-hosted-apps" },
      { label: "Partners", to: "/partners" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/docs" },
      { label: "API Reference", to: "/docs/api" },
      { label: "Product Updates", to: "/product-updates" },
      { label: "Blog", to: "/blog" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Video Library", to: "/video-library" },
      { label: "Compare", to: "/compare" },
      { label: "Community", to: "/community" },
      { label: "Reviews", to: "/reviews" },
      { label: "Demo", to: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Pricing", to: "/pricing" },
      { label: "FAQ", to: "/faq" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "Privacy Policy", to: "/legal/privacy" },
      { label: "Terms of Service", to: "/legal/terms" },
      { label: "Refund Policy", to: "/legal/refund" },
      { label: "SLA", to: "/legal/sla" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-200 bg-ink-50">
      <div className="container-px py-16">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_3fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/30">
                <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
                  <path
                    d="M9 10.5c0-1.1.9-2 2-2h6.5c2.5 0 4.5 1.8 4.5 4.2 0 1.7-1 2.8-2.3 3.4 1.6.5 2.8 1.7 2.8 3.6 0 2.5-2 4.3-4.8 4.3H11c-1.1 0-2-.9-2-2V10.5z"
                    fill="white"
                  />
                  <circle cx="14" cy="13" r="1.3" fill="#565ADD" />
                  <circle cx="14" cy="18.5" r="1.3" fill="#565ADD" />
                </svg>
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-ink-900">SharkCluster</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              Managed cloud hosting with free self-hosted business apps. Your data stays on your VPS — secure,
              private, and fully under your control.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-ink-800">Stay updated</p>
              <form className="mt-2 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                />
                <button type="submit" className="btn-primary px-4 py-2.5 text-sm">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-bold text-ink-900">{section.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-ink-500 transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-8 sm:flex-row">
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} SharkCluster. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-ink-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
