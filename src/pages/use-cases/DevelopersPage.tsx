import UseCasePage from "@/components/UseCasePage";
import { Code, GitBranch, Terminal, Server, Database, Shield, Layers, Activity, Zap, Boxes, RefreshCw, Gauge, Package, Users } from "lucide-react";

export default function DevelopersPage() {
  return (
    <UseCasePage
      seo={{
        title: "Hosting for Developers — Deploy Code with Git, Docker & Full SSH Access",
        description: "Deploy from Git with scoped deploy keys, run Docker containers, edit VCL files, manage SSH keys, and get a real terminal in your browser. Full control for developers who know what they're doing.",
        path: "/who-we-serve/developers",
        keywords: ["developer hosting", "git deployment", "Docker hosting", "SSH access", "VPS for developers", "Laravel hosting", "Node.js hosting"],
        faqSchema: [
          { q: "Can I deploy from Git on SharkCluster?", a: "Yes, SharkCluster supports deploying from GitHub, GitLab, and Bitbucket using scoped deploy keys that are safer than full-account access tokens." },
          { q: "Does SharkCluster provide SSH access?", a: "Yes, SharkCluster provides full SSH key management and an in-browser SSH terminal. You can generate keypairs, upload existing public keys, and manage granular permissions per server." },
          { q: "Can I run Docker containers on SharkCluster?", a: "Yes, SharkCluster supports Docker host deployment with configurable images, tags, ports, CPU limits, memory limits, and private registry credentials." },
        ],
      }}
      eyebrow="For Developers"
      title="Deploy code"
      highlight="your way"
      description="Git deploy with scoped keys, Docker containers, in-browser SSH terminal, VCL editing, and full root access when you need it. Built for developers who want control without the overhead."
      icon={Code}
      benefits={[
        { icon: GitBranch, title: "Git Deploy with Scoped Keys", desc: "Panel-generated deploy keys scoped to a single repo — safer than a full-account token. Supports GitHub, GitLab, and Bitbucket." },
        { icon: Terminal, title: "In-Browser SSH Terminal", desc: "A sandboxed shell in your browser — no local client needed. Session-scoped with expiring tokens, not a permanently-open connection." },
        { icon: Layers, title: "Docker Host Support", desc: "Run containers with configurable CPU, memory, ports, and private registry credentials. Your choice of image and tag." },
        { icon: Gauge, title: "Config Drift Detection", desc: "Live Configuration reads actual running state from the machine, surfacing drift from saved panel config before it causes an outage." },
        { icon: Package, title: "Private Container Registry", desc: "Push private Docker images from CI with robot accounts, then deploy them to your servers — all from one panel, no third-party registry.", points: ["Robot accounts for CI pipelines", "Scoped tokens with storage quotas", "Deploy private images to any server", "Managed entirely in-panel"], link: { href: "/features/container-registry", label: "Learn more about Container Registry" } },
        { icon: Users, title: "Teams & Permissions", desc: "Give every teammate their own login with access scoped per server and per application. Grant deploy rights without database access, or SFTP without panel control — no shared credentials.", points: ["Per-server and per-app permissions", "Sub-user accounts for restricted access", "Audit trail for every action", "Revoke access instantly"], link: { href: "/features/teams", label: "Learn more about Teams & Permissions" } },
      ]}
      features={[
        { title: "5 deployment methods", desc: "Fresh, Git, ZIP, migration, or Docker" },
        { title: "Per-app deployment scripts", desc: "Build, migration, and cache steps per deploy" },
        { title: "Staging environments", desc: "One-click staging for every application" },
        { title: "Full SSH key management", desc: "Generate, upload, delete with masked public keys" },
        { title: "Multi-engine databases", desc: "MySQL, PostgreSQL, MongoDB, SQLite" },
        { title: "Redis & Varnish caching", desc: "Two-layer caching with VCL editing" },
        { title: "Cronjob scheduling", desc: "Server and app-level with custom cron expressions" },
        { title: "Other services catalogue", desc: "RabbitMQ, OpenSearch, SMTP, and more" },
      ]}
      testimonial={{
        quote: "The config drift detection caught a manual Redis edit that would have caused session loss in production. The panel reads the actual running config and tells you when it doesn't match. That's next-level.",
        author: "Priya Nair",
        role: "Senior DevOps Engineer, DataForge",
      }}
    />
  );
}
