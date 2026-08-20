import UseCasePage from "@/components/UseCasePage";
import { Globe, Server, Shield, RefreshCw, Database, Lock, UserCog, Activity, Boxes, Zap, Receipt } from "lucide-react";

export default function IndiaPage() {
  return (
    <UseCasePage
      seo={{
        title: "Cloud Hosting for India — Local Data, Local Support",
        description: "SharkCluster for India: host on your own VPS with local data residency, local support hours, and self-hosted business apps. Free migrations, dedicated DevOps manager, and no per-seat fees.",
        path: "/who-we-serve/india",
        keywords: ["India cloud hosting", "VPS hosting India", "local data hosting India", "Indian hosting provider", "self-hosted apps India"],
        faqSchema: [
          { q: "Does SharkCluster offer local data hosting for India?", a: "Yes, SharkCluster supports cloud providers with datacenters in India, allowing you to keep your data within the country for data residency compliance." },
          { q: "Is there local support for Indian customers?", a: "Yes, our support team operates across time zones including IST business hours. Your dedicated DevOps manager is available during your working hours." },
        ],
      }}
      eyebrow="For India"
      title="Cloud hosting built"
      highlight="for India"
      description="Host on your own VPS with local data residency, support during IST business hours, and self-hosted business apps. Free migrations, dedicated DevOps manager, and no per-seat fees."
      icon={Globe}
      benefits={[
        { icon: Lock, title: "Data Residency", desc: "Choose providers with India datacenters to keep your data within the country for compliance and performance." },
        { icon: UserCog, title: "Local Support Hours", desc: "Our support team and dedicated DevOps managers are available during IST business hours — not just US time zones." },
        { icon: Server, title: "Self-Hosted Business Apps", desc: "Run ERP, helpdesk, and invoicing on your own VPS — no SaaS per-seat fees, no data leaving your server." },
        { icon: RefreshCw, title: "Free Migrations", desc: "Moving from an Indian host? We migrate your sites and applications for free, unlimited times." },
        { icon: Receipt, title: "GST-Compliant Invoicing", desc: "Invoices issued with correct CGST, SGST and IGST treatment, and TDS handling with section and rate recorded — so your CA gets what they need without a spreadsheet in between." },
      ]}
      features={[
        // TODO_CONFIRM: which other live provider offers an India region?
        { title: "India datacenter options", desc: "DigitalOcean Bangalore" },
        { title: "IST business hours support", desc: "Real engineers, not tier-1 agents" },
        { title: "Dedicated DevOps manager", desc: "Knows your setup, helps with scaling" },
        { title: "Free self-hosted ERP", desc: "ERPNext, Odoo on your VPS" },
        { title: "Free local backups", desc: "7 backup types included" },
        { title: "Free SSL certificates", desc: "Let's Encrypt or Cloudflare" },
        { title: "Unlimited free migrations", desc: "From any host, as many times as needed" },
        { title: "Multi-provider support", desc: "Compare plans side-by-side" },
        { title: "GST-compliant invoices", desc: "CGST, SGST and IGST treatment" },
        { title: "TDS deduction support", desc: "Section and rate recorded" },
        // TODO_CONFIRM: Confirm which payment methods are accepted (UPI, card, etc.)
        { title: "Pay by UPI or card", desc: "TODO_CONFIRM accepted methods" },
      ]}
    />
  );
}
