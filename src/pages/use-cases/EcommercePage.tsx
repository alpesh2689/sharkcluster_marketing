import UseCasePage from "@/components/UseCasePage";
import { ShoppingCart, Server, Zap, Shield, RefreshCw, Activity, Cloud, Database, Gauge, Layers, Lock, Network } from "lucide-react";

export default function EcommercePage() {
  return (
    <UseCasePage
      seo={{
        title: "Ecommerce Hosting — Fast, Secure Online Stores on Your VPS",
        description: "Host Magento, WooCommerce, and other ecommerce platforms on your own VPS with Redis caching, Varnish edge caching, free SSL, health alerts, and unlimited free migrations.",
        path: "/who-we-serve/ecommerce",
        keywords: ["ecommerce hosting", "Magento hosting", "WooCommerce hosting", "online store hosting", "ecommerce VPS", "fast ecommerce hosting"],
        faqSchema: [
          { q: "Can I host Magento on SharkCluster?", a: "Yes, SharkCluster supports Magento deployment with Apache or Nginx, MySQL database, and Redis caching for optimal performance." },
          { q: "How does SharkCluster handle traffic spikes for ecommerce?", a: "SharkCluster offers two-layer caching (Redis + Varnish), one-click server scaling, and Varnish grace periods that serve slightly-stale content during backend outages instead of showing errors." },
        ],
      }}
      eyebrow="For Ecommerce"
      title="Fast, secure stores"
      highlight="on your own VPS"
      description="Host Magento, WooCommerce, and other ecommerce platforms with Redis caching, Varnish edge caching, free SSL, and health alerts. Handle traffic spikes without downtime."
      icon={ShoppingCart}
      benefits={[
        { icon: Zap, title: "Two-Layer Caching", desc: "Redis for session and query caching, Varnish for full HTTP response caching. Grace periods serve stale content during outages instead of errors." },
        { icon: Server, title: "One-Click Scaling", desc: "Resize your server when traffic spikes. New pricing shown before you commit. Handle Black Friday without breaking a sweat." },
        { icon: Shield, title: "Free SSL & Security", desc: "Free Let's Encrypt certificates, closed-by-default firewall, and security audit logs. See scanning and brute-force attempts in real time." },
        { icon: RefreshCw, title: "Free Store Migrations", desc: "Moving from another host? We migrate your entire store — files, database, configurations — for free, unlimited times." },
        { icon: Cloud, title: "Cloudflare Protection", desc: "WAF rules block malicious traffic before it reaches your server, edge caching absorbs load surges, and origin protection hides your VPS from direct attack. Stronger than Varnish alone when your store is under fire." },
      ]}
      features={[
        { title: "Magento & WooCommerce support", desc: "Deploy with Apache or Nginx" },
        { title: "Redis caching", desc: "Sessions, queries, and computed values" },
        { title: "Varnish edge caching", desc: "Full HTTP response caching with VCL editing" },
        { title: "Free SSL certificates", desc: "Let's Encrypt or Cloudflare" },
        { title: "Health alerts", desc: "CPU, memory, disk, and failed service monitoring" },
        { title: "7 backup types", desc: "Free local backups, optional offsite" },
        { title: "Staging environments", desc: "Test changes before touching production" },
        { title: "Unlimited free migrations", desc: "We move your store for free" },
      ]}
    />
  );
}
