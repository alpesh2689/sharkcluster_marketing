import UseCasePage from "@/components/UseCasePage";
import { Building2, Server, Shield, RefreshCw, Database, Lock, UserCog, Activity, Boxes, Receipt, Ticket, FileSpreadsheet } from "lucide-react";

export default function SMBsPage() {
  return (
    <UseCasePage
      seo={{
        title: "Hosting for Small & Medium Businesses — Secure Self-Hosted Apps",
        description: "Run ERP, helpdesk, ticketing, and invoicing systems on your own VPS. Your business data stays on your server — secure, private, and fully under your control. No per-seat SaaS fees.",
        path: "/who-we-serve/smb",
        keywords: ["SMB hosting", "small business hosting", "self-hosted ERP", "self-hosted business apps", "VPS for business", "secure business hosting"],
        faqSchema: [
          { q: "Can I run ERP and business apps on SharkCluster?", a: "Yes, SharkCluster supports self-hosted ERP systems like ERPNext and Odoo, helpdesk tools like Zammad and osTicket, and invoicing apps like Invoice Ninja — all on your own VPS." },
          { q: "Is self-hosting business apps cheaper than SaaS?", a: "Yes. Open-source self-hosted apps have no per-seat or per-agent licensing fees. You pay only for your server, regardless of how many users or agents you have." },
        ],
      }}
      eyebrow="For SMBs"
      title="Run your business"
      highlight="on your own server"
      description="ERP, helpdesk, ticketing, invoicing — run the tools your business depends on, on infrastructure you control. No third-party SaaS holding your data. No per-seat licensing. Everything private."
      icon={Building2}
      benefits={[
        { icon: Lock, title: "Your Data Stays Private", desc: "Every app, database, and file lives on your VPS. Your business data never touches a third-party server. Only you have access." },
        { icon: Receipt, title: "No Per-Seat Fees", desc: "Open-source apps mean unlimited users, agents, and clients. No SaaS per-seat pricing model that scales with your headcount." },
        { icon: UserCog, title: "Dedicated DevOps Manager", desc: "A real human engineer who knows your setup and helps with architecture, scaling, and troubleshooting — not a tier-1 agent reading a script." },
        { icon: Shield, title: "Security by Default", desc: "Closed-by-default firewall, scoped deploy keys, localhost-bound services. Security guidance baked into every setting." },
      ]}
      features={[
        { title: "Free self-hosted ERP", desc: "ERPNext, Odoo, Frappe, Dolibarr" },
        { title: "Free self-hosted helpdesk", desc: "Zammad, osTicket, FreeScout, UVDesk" },
        { title: "Free self-hosted invoicing", desc: "Invoice Ninja, Crater, InvoicePlane, Akaunting" },
        { title: "Free local backups", desc: "7 backup types included" },
        { title: "Unlimited free migrations", desc: "We move your data, as many times as needed" },
        { title: "Free SSL certificates", desc: "Let's Encrypt or Cloudflare" },
        { title: "Health alerts & monitoring", desc: "Know before things break" },
        { title: "Dedicated DevOps manager", desc: "A real engineer on your side" },
      ]}
    />
  );
}
