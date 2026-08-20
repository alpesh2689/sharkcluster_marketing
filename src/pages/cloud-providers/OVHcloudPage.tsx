import CloudProviderPage from "@/components/CloudProviderPage";
import { Cloud, Shield, Server, RefreshCw, Globe, CreditCard } from "lucide-react";

// Exact datacenter list, plan tiers, and pricing: TODO_CONFIRM against the product.

export default function OVHcloudPage() {
  return (
    <CloudProviderPage
      seo={{
        title: "OVHcloud Hosting on SharkCluster — Managed VPS, European Data Sovereignty, Prepaid",
        description: "Host on OVHcloud through SharkCluster — prepaid billing, strong European data sovereignty, and full lifecycle management from the panel. Deploy OVHcloud VPS without logging into the OVH console.",
        path: "/cloud-providers/ovhcloud",
        keywords: ["OVHcloud hosting", "OVH VPS", "managed OVHcloud", "OVH prepaid", "European VPS hosting", "data sovereignty hosting", "OVH datacenters"],
        faqSchema: [
          { q: "Can I use OVHcloud through SharkCluster?", a: "Yes. SharkCluster provisions and manages OVHcloud VPS from its own panel — you never log into the OVH console. Pick a region, choose a plan, and the panel handles the rest." },
          { q: "How is OVHcloud billed through SharkCluster?", a: "OVHcloud uses prepaid billing — the server cost is collected before the server is created. SharkCluster reconciles this into a single monthly invoice alongside your plan and add-ons." },
          { q: "Why choose OVHcloud over other providers?", a: "OVHcloud offers strong European data sovereignty — your data stays in European datacenters under EU law. It is a good choice for compliance-sensitive workloads and European audiences." },
        ],
      }}
      providerName="OVHcloud"
      eyebrow="OVHcloud"
      title="Managed OVHcloud VPS"
      highlight="sovereign by design"
      description="OVHcloud VPS provisioned and managed from the SharkCluster panel — prepaid billing, European data sovereignty, and competitive pricing. The right choice for compliance-sensitive workloads and European audiences."
      icon={Cloud}
      billingModel="Prepaid"
      billingIcon={CreditCard}
      regions="Europe & beyond"
      tagline="OVHcloud is the choice when data sovereignty matters. Its datacenters are predominantly in Europe, under EU data protection law, making it a strong fit for compliance-sensitive workloads and European audiences. Through SharkCluster, you get that sovereignty with the console removed from the equation."
      strengths={[
        { icon: Shield, title: "European Data Sovereignty", desc: "OVHcloud datacenters are primarily in Europe, under EU data protection law. A strong fit for compliance-sensitive workloads and European audiences." },
        { icon: Server, title: "Competitive Pricing", desc: "OVHcloud offers competitive VPS pricing with predictable prepaid billing — the cost is collected before the server is created, with no hourly surprises." },
        { icon: Globe, title: "European and Global Footprint", desc: "Datacenters across France, Germany, Poland, the UK, and beyond — pick the region closest to your users from the panel." },
        { icon: RefreshCw, title: "Full Lifecycle Management", desc: "Provision, restart, and manage OVHcloud VPS from the SharkCluster panel. Backups, firewall rules, and DNS are all managed alongside your other servers." },
      ]}
      datacenters={[
        { region: "France", locations: ["Gravelines (GRA)", "Roubaix (RBX)", "Strasbourg (SBG)"] },
        { region: "Germany", locations: ["Frankfurt (FRA)"] },
        { region: "Poland", locations: ["Warsaw (WAW)"] },
        { region: "United Kingdom", locations: ["London (LON)"] },
        { region: "North America", locations: ["Canada (Beauharnois)", "United States (Vint Hill)", "United States (Hillsboro)"] },
        { region: "Asia Pacific", locations: ["Singapore (SGP)", "Australia (Sydney)"] },
      ]}
      planNote="OVHcloud plans are prepaid — the server cost is collected before creation and reconciled into your monthly invoice. Plans range from entry-level VPS to high-performance instances. Exact tiers and pricing: TODO_CONFIRM."
    />
  );
}
