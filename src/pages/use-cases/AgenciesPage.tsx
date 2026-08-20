import UseCasePage from "@/components/UseCasePage";
import { Users, Server, Shield, RefreshCw, UserCog } from "lucide-react";

export default function AgenciesPage() {
  return (
    <UseCasePage
      seo={{
        title: "Hosting for Agencies — Manage Client Sites with Full Control",
        description: "Host unlimited client sites on your own VPS with team permissions, staging environments, free migrations, and a dedicated DevOps manager. White-label control without per-seat fees.",
        path: "/who-we-serve/agencies",
        keywords: ["agency hosting", "managed hosting for agencies", "client site hosting", "white label hosting", "multi-client hosting", "agency cloud hosting"],
        faqSchema: [
          { q: "Can I host multiple client sites on SharkCluster?", a: "Yes, SharkCluster supports unlimited applications per server. Each app gets its own domain, SSL, database, and staging environment. Team permissions let you control who can access what." },
          { q: "Does SharkCluster offer free migrations for agencies?", a: "Yes, unlimited free migrations are included on every plan. We migrate your clients' sites and applications from any host, as many times as you need." },
          { q: "Can my team access servers without sharing my login?", a: "Yes. SharkCluster supports organizations, teams, and per-server and per-app permissions, so each teammate gets their own login with access scoped to exactly what they need — no shared credentials." },
        ],
      }}
      eyebrow="For Agencies"
      title="Host client sites"
      highlight="with full control"
      description="Unlimited client sites per server, team permissions, staging environments, free migrations, and a dedicated DevOps manager. Give your clients white-label hosting without per-seat fees."
      icon={Users}
      benefits={[
        { icon: Server, title: "Unlimited Sites Per Server", desc: "Host as many client sites as your server can handle. Each gets its own domain, SSL, database, and staging environment." },
        {
          icon: UserCog,
          title: "Team Permissions & Roles",
          desc: "Give every teammate their own login with access scoped to exactly what they need — no shared credentials, every action attributable.",
          points: [
            "Organizations as the top-level account",
            "Teams with members invited by email",
            "Per-server access control",
            "Per-application access control",
            "Sub-user accounts for each teammate",
            "Role-based access: admin, developer, read-only",
          ],
          link: { href: "/features/teams", label: "Learn more about Teams & Permissions" },
        },
        { icon: RefreshCw, title: "Free Client Migrations", desc: "Move client sites from any host, unlimited times. Our team handles the migration — you focus on the work that matters." },
        { icon: Shield, title: "White-Label Security", desc: "Your data on your VPS. Your clients' data on your VPS. No third-party SaaS holding sensitive information." },
      ]}
      features={[
        { title: "Unlimited applications per server", desc: "No per-app or per-site fees" },
        { title: "Staging environments", desc: "One-click staging for every client site" },
        { title: "Team permissions & roles", desc: "Control who can access what per server and per app" },
        { title: "Dedicated DevOps manager", desc: "A real engineer who knows your setup" },
        { title: "Free SSL certificates", desc: "Let's Encrypt or Cloudflare for every domain" },
        { title: "7 backup types", desc: "Free local backups, optional offsite storage" },
        { title: "Multi-provider support", desc: "Compare plans across providers side-by-side" },
        { title: "Expert support", desc: "Real engineers, not tier-1 agents" },
      ]}
    />
  );
}
