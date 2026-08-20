/**
 * The documentation guides linked from /docs.
 *
 * Every entry's source already exists as markdown in the repo (see `source`) —
 * filling `sections` is transcription, not authoring. Until a guide has
 * sections it renders an honest "not published yet" state and is excluded from
 * indexing, rather than 404ing or soft-404ing to the docs hub.
 *
 * See the implementation plan §5.2 (shell) and §6.2 (content).
 */

export interface GuideSection {
  heading: string;
  body: string;
}

export interface DocGuide {
  /** URL is /docs/<category>/<slug>. */
  category: string;
  slug: string;
  title: string;
  description: string;
  /** Repo path of the markdown this guide is transcribed from. */
  source: string;
  sections: GuideSection[];
}

export const DOC_GUIDES: DocGuide[] = [
  // --- Server management -----------------------------------------------
  { category: "server-management", slug: "creating-a-server", title: "Creating a server",
    description: "Provision a new server on any connected cloud provider, from choosing a region to first boot.",
    source: "2026/docs/server/CREATE-SERVER.md", sections: [] },
  { category: "server-management", slug: "server-detail-sections", title: "Server detail sections",
    description: "A tour of every section on the server detail page and what each one controls.",
    source: "2026/docs/server/SERVER-DETAIL-SECTIONS.md", sections: [] },
  { category: "server-management", slug: "access-and-ssh", title: "Access & SSH",
    description: "SSH key management, the in-browser terminal, and how access permissions are scoped.",
    source: "2026/docs/server/ACCESS.md", sections: [] },
  { category: "server-management", slug: "server-user-guide", title: "Server user guide",
    description: "The full reference for operating a SharkCluster server day to day.",
    source: "2026/docs/server/SERVER-USER-GUIDE.md", sections: [] },

  // --- Backup, caching & cronjob ----------------------------------------
  { category: "backup-caching-cronjob", slug: "backups", title: "Backups",
    description: "The seven backup types, when to use each, and how retention and scheduling work.",
    source: "2026/docs/server/BACKUP.md", sections: [] },
  { category: "backup-caching-cronjob", slug: "caching", title: "Caching (Redis & Varnish)",
    description: "Configuring Redis and Varnish, eviction policies, VCL editing, and drift detection.",
    source: "2026/docs/server/CACHING.md", sections: [] },
  { category: "backup-caching-cronjob", slug: "cronjobs", title: "Cronjobs",
    description: "Scheduled tasks at server and application scope, and how silent failures are surfaced.",
    source: "2026/docs/server/CRONJOB.md", sections: [] },

  // --- Firewall, health alerts & other services -------------------------
  { category: "firewall-health-other", slug: "firewall", title: "Firewall",
    description: "Closed-by-default UFW rules, Sync Rules, country rules and the audit log.",
    source: "2026/docs/server/FIREWALL.md", sections: [] },
  { category: "firewall-health-other", slug: "health-alerts", title: "Health alerts",
    description: "Metric thresholds, alert routing, and choosing levels that avoid alert fatigue.",
    source: "2026/docs/server/HEALTH-ALERTS.md", sections: [] },
  { category: "firewall-health-other", slug: "other-services", title: "Other services",
    description: "The supporting software catalogue — search, queues, mail, security tools and utilities.",
    source: "2026/docs/server/OTHER-SERVICES.md", sections: [] },
  { category: "firewall-health-other", slug: "discount-rules", title: "Discount rules",
    description: "Creating and testing a discount rule or promotional code, end to end.",
    source: "2026/docs/feature/DISCOUNT-RULES-SETUP-AND-TESTING.md", sections: [] },

  // --- Applications ------------------------------------------------------
  { category: "applications", slug: "creating-an-application", title: "Creating an application",
    description: "Deploy an application onto a server, with its database created and wired in.",
    source: "2026/docs/application/CREATE-APPLICATION.md", sections: [] },
  { category: "applications", slug: "access", title: "Access",
    description: "SFTP and SSH credentials for an application, and how they are scoped.",
    source: "2026/docs/application/ACCESS-TAB.md", sections: [] },
  { category: "applications", slug: "services", title: "Services",
    description: "Per-application services and their installation settings.",
    source: "2026/docs/application/SERVICES-TAB.md", sections: [] },
  { category: "applications", slug: "settings", title: "Settings",
    description: "Application configuration, including per-app runtime versions.",
    source: "2026/docs/application/SETTINGS-TAB.md", sections: [] },
  { category: "applications", slug: "domains", title: "Domains",
    description: "Adding domains, DNS verification, SSL, and virtual host configuration.",
    source: "2026/docs/application/DOMAIN-TAB.md", sections: [] },
  { category: "applications", slug: "file-manager", title: "File manager",
    description: "Browsing and editing application files from the panel, and its sandbox boundaries.",
    source: "2026/docs/application/FILE-MANAGER-TAB.md", sections: [] },
  { category: "applications", slug: "logs", title: "Logs",
    description: "Reading application and service logs without opening an SSH session.",
    source: "2026/docs/application/LOGS-TAB.md", sections: [] },
  { category: "applications", slug: "security", title: "Security",
    description: "Application-level security settings and what each one protects against.",
    source: "2026/docs/application/SECURITY-TAB.md", sections: [] },
  { category: "applications", slug: "backup-and-restore", title: "Backup & restore",
    description: "Creating application backups and restoring from one, including the pre-restore safety copy.",
    source: "2026/docs/application/BACKUP-RESTORE-TAB.md", sections: [] },
];

export function findGuide(category?: string, slug?: string): DocGuide | undefined {
  if (!category || !slug) return undefined;
  return DOC_GUIDES.find((g) => g.category === category && g.slug === slug);
}

export const isPublished = (guide: DocGuide) => guide.sections.length > 0;
