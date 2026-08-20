import CloudProviderPage from "@/components/CloudProviderPage";
import { Cloud, Zap, Shield, RefreshCw, Globe, CreditCard } from "lucide-react";

// Exact datacenter list, plan tiers, and pricing: TODO_CONFIRM against the product.

export default function DigitalOceanPage() {
  return (
    <CloudProviderPage
      seo={{
        title: "DigitalOcean Hosting on SharkCluster — Managed Droplets, 12 Datacenters",
        description: "Host on DigitalOcean through SharkCluster — hourly billing, 12 datacenters, and full lifecycle management from the panel. Deploy Droplets without logging into the DigitalOcean console.",
        path: "/cloud-providers/digitalocean",
        keywords: ["DigitalOcean hosting", "DigitalOcean droplets", "managed DigitalOcean", "DigitalOcean VPS", "DigitalOcean datacenters", "DO hosting"],
        faqSchema: [
          { q: "Can I use DigitalOcean through SharkCluster?", a: "Yes. SharkCluster provisions and manages DigitalOcean Droplets from its own panel — you never log into the DigitalOcean console. Pick a region, choose a plan, and the panel handles the rest." },
          { q: "How is DigitalOcean billed through SharkCluster?", a: "DigitalOcean bills hourly. SharkCluster reconciles those hourly charges into a single monthly invoice alongside your plan and add-ons — no separate DigitalOcean bill." },
          { q: "Which DigitalOcean regions are available?", a: "SharkCluster supports DigitalOcean datacenters across North America, Europe, and Asia — 12 regions in total. Pick the one closest to your users." },
        ],
      }}
      providerName="DigitalOcean"
      eyebrow="DigitalOcean"
      title="Managed DigitalOcean"
      highlight="without the console"
      description="DigitalOcean Droplets provisioned and managed from the SharkCluster panel — hourly billing, 12 datacenters, and full lifecycle control. Deploy, scale, and back up without ever logging into the DigitalOcean console."
      icon={Cloud}
      billingModel="Hourly + monthly invoice"
      billingIcon={Zap}
      regions="12 datacenters"
      tagline="DigitalOcean is the default cloud provider for most SharkCluster users — reliable SSD servers, a simple hourly billing model, and datacenters on three continents. Through SharkCluster, you get all of that with the console removed from the equation."
      strengths={[
        { icon: Zap, title: "Hourly Billing, One Invoice", desc: "DigitalOcean charges by the hour. SharkCluster reconciles those charges into a single monthly invoice alongside your plan and add-ons — no separate DigitalOcean bill to chase." },
        { icon: Globe, title: "12 Datacenter Regions", desc: "New York, San Francisco, Toronto, London, Amsterdam, Frankfurt, Bangalore, Singapore, and Sydney — pick the region closest to your users from the panel." },
        { icon: Shield, title: "Full Lifecycle Management", desc: "Provision, resize, rebuild, snapshot, and destroy Droplets from the SharkCluster panel. Backups, firewall rules, and DNS are all managed alongside your other servers." },
        { icon: RefreshCw, title: "Backups and Snapshots", desc: "DigitalOcean backups and snapshots are available alongside SharkCluster's own 7 backup types. Restore a Droplet from a snapshot without leaving the panel." },
      ]}
      datacenters={[
        { region: "North America", locations: ["New York (NYC1, NYC2, NYC3)", "San Francisco (SFO2, SFO3)", "Toronto (TOR1)"] },
        { region: "Europe", locations: ["London (LON1)", "Amsterdam (AMS2, AMS3)", "Frankfurt (FRA1)"] },
        { region: "Asia Pacific", locations: ["Bangalore (BLR1)", "Singapore (SGP1)", "Sydney (SYD1)"] },
      ]}
      planNote="DigitalOcean plans start from small shared-CPU Droplets up to dedicated-CPU and GPU instances. SharkCluster surfaces the plans available in your chosen region so you can compare specs and price before you commit. Exact tiers and pricing: TODO_CONFIRM."
    />
  );
}
