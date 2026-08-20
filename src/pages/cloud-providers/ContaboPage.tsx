import CloudProviderPage from "@/components/CloudProviderPage";
import { Cloud, Server, Shield, RefreshCw, Globe, CreditCard } from "lucide-react";

// Exact datacenter list, plan tiers, and pricing: TODO_CONFIRM against the product.

export default function ContaboPage() {
  return (
    <CloudProviderPage
      seo={{
        title: "Contabo Hosting on SharkCluster — Managed VPS, Generous Specs, Prepaid Billing",
        description: "Host on Contabo through SharkCluster — prepaid billing, generous RAM and storage, and full lifecycle management from the panel. Deploy Contabo VPS without logging into the Contabo console.",
        path: "/cloud-providers/contabo",
        keywords: ["Contabo hosting", "Contabo VPS", "managed Contabo", "Contabo prepaid", "budget VPS hosting", "Contabo datacenters"],
        faqSchema: [
          { q: "Can I use Contabo through SharkCluster?", a: "Yes. SharkCluster provisions and manages Contabo VPS from its own panel — you never log into the Contabo console. Pick a region, choose a plan, and the panel handles the rest." },
          { q: "How is Contabo billed through SharkCluster?", a: "Contabo uses prepaid billing — the server cost is collected before the server is created. SharkCluster reconciles this into a single monthly invoice alongside your plan and add-ons." },
          { q: "Why choose Contabo over other providers?", a: "Contabo offers generous RAM and storage at budget-friendly prices. It is an excellent choice for RAM-heavy workloads, databases, or multi-app servers where spec-per-dollar matters more than per-hour flexibility." },
        ],
      }}
      providerName="Contabo"
      eyebrow="Contabo"
      title="Managed Contabo VPS"
      highlight="generous by default"
      description="Contabo VPS provisioned and managed from the SharkCluster panel — prepaid billing, generous RAM and storage, and global datacenters. Best value for RAM-heavy workloads, without ever logging into the Contabo console."
      icon={Cloud}
      billingModel="Prepaid"
      billingIcon={CreditCard}
      regions="Global — 11 datacenters"
      tagline="Contabo stands out for specs-per-dollar: large RAM allocations and generous storage at prices that make it ideal for RAM-heavy workloads, multi-app servers, and databases. Through SharkCluster, you get those specs with the console removed from the equation."
      strengths={[
        { icon: Server, title: "Generous RAM and Storage", desc: "Contabo plans include more RAM and storage than equivalably priced plans from other providers — ideal for databases, multi-app servers, and memory-hungry workloads." },
        { icon: Globe, title: "Global Datacenter Footprint", desc: "Contabo operates datacenters across Europe, North America, and Asia — pick the region closest to your users from the panel." },
        { icon: Shield, title: "Full Lifecycle Management", desc: "Provision, restart, and manage Contabo VPS from the SharkCluster panel. Backups, firewall rules, and DNS are all managed alongside your other servers." },
        { icon: RefreshCw, title: "Prepaid, Predictable Cost", desc: "Contabo uses prepaid billing — the cost is collected before the server is created. No hourly surprises; the price you see is the price you pay each month." },
      ]}
      datacenters={[
        { region: "Europe", locations: ["Germany (Munich)", "Germany (Nuremberg)", "United Kingdom (London)"] },
        { region: "North America", locations: ["United States (Newark)", "United States (Dallas)", "United States (Los Angeles)"] },
        { region: "Asia Pacific", locations: ["Singapore", "Japan (Tokyo)", "Australia (Sydney)"] },
        { region: "Other", locations: ["India (Mumbai)"] },
      ]}
      planNote="Contabo plans are prepaid — the server cost is collected before creation and reconciled into your monthly invoice. Plans range from entry-level VPS to high-RAM instances suited for databases and multi-app servers. Exact tiers and pricing: TODO_CONFIRM."
    />
  );
}
