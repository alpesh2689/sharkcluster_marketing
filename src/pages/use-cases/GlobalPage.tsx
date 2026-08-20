import UseCasePage from "@/components/UseCasePage";
import { Globe, Server, Shield, RefreshCw, Cloud, Database, Lock, UserCog, Activity, Boxes } from "lucide-react";

export default function GlobalPage() {
  return (
    <UseCasePage
      seo={{
        title: "Global Cloud Hosting — Worldwide Infrastructure, One Panel",
        description: "Deploy servers across dozens of global datacenters with SharkCluster. Compare providers side-by-side, run self-hosted apps, and keep your data on your VPS — anywhere in the world.",
        path: "/who-we-serve/global",
        keywords: ["global cloud hosting", "worldwide VPS hosting", "international hosting", "multi-region hosting", "global server management"],
        faqSchema: [
          { q: "Can I deploy servers in multiple regions with SharkCluster?", a: "Yes, SharkCluster supports cloud providers with datacenters across dozens of global locations. You can deploy servers in different regions and manage them all from one panel." },
          { q: "Does SharkCluster work for international teams?", a: "Yes, SharkCluster is designed for global teams with multi-region deployment, timezone-aware monitoring, and support across business hours worldwide." },
        ],
      }}
      eyebrow="For Global"
      title="Worldwide infrastructure,"
      highlight="one panel"
      description="Deploy servers across dozens of global datacenters. Compare providers side-by-side, run self-hosted apps, and keep your data on your VPS — anywhere in the world."
      icon={Globe}
      benefits={[
        { icon: Cloud, title: "Dozens of Global Datacenters", desc: "DigitalOcean, OVHcloud, and Contabo — compare and deploy across regions from one panel. Vultr and Hetzner coming soon." },
        { icon: Server, title: "Multi-Region Management", desc: "Manage servers in different regions from a single dashboard. Each server gets its own monitoring, backups, and firewall." },
        { icon: Lock, title: "Data Sovereignty", desc: "Choose where your data lives. Deploy in specific regions for GDPR, data residency, or latency optimization." },
        { icon: UserCog, title: "Dedicated DevOps Manager", desc: "A real engineer who knows your global setup and helps with cross-region architecture and scaling." },
      ]}
      features={[
        { title: "Dozens of datacenter locations", desc: "Across 3 live cloud providers, more coming" },
        { title: "Multi-region server management", desc: "One panel for all your servers" },
        { title: "Side-by-side provider comparison", desc: "Price, specs, and location in one view" },
        { title: "Portable backups", desc: "Move between providers easily" },
        { title: "No vendor lock-in", desc: "Switch providers without rewriting your stack" },
        { title: "Timezone-aware monitoring", desc: "Health alerts that respect your hours" },
        { title: "Free SSL certificates", desc: "Let's Encrypt or Cloudflare globally" },
        { title: "Dedicated DevOps manager", desc: "Global architecture expertise" },
      ]}
    />
  );
}
