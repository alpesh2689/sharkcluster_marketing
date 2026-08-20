/**
 * Static Introduction section for /docs/api.
 *
 * The reference sections themselves come from the backend (GET /get_api_docs),
 * which is admin-editable. Only this preamble lives in the repo, and it is
 * rendered ahead of whatever the backend returns.
 *
 * Ported from the old site with the invented parts removed: that version
 * documented Basic auth with production/sandbox key pairs generated under
 * "Settings > API Keys", and no such screen or key model exists in the product.
 * It also published `http://localhost:8001/` as the base URL. Both are now
 * TODO_CONFIRM rather than restated.
 */

import { API_ORIGIN } from "@/lib/api";

export interface IntroStep {
  title: string;
  text: string;
}

export interface ApiDocsIntro {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Falls back to a placeholder when no backend is configured for the build. */
  baseUrl: string;
  authentication: string;
  gettingStarted: IntroStep[];
  coreConcepts: IntroStep[];
}

export const API_DOCS_INTRO: ApiDocsIntro = {
  id: "introduction",
  slug: "introduction",
  title: "Introduction",
  description:
    "The SharkCluster API lets you drive the platform programmatically — the same servers, applications, databases and registries you manage in the panel, reachable from your own tooling.",

  // Read from the backend this build points at, so the documented origin can
  // never drift from the one the site actually calls. The old site hardcoded
  // `http://localhost:8001/` here; do not restore that.
  baseUrl: API_ORIGIN || "TODO_CONFIRM",

  // TODO_CONFIRM — owner: platform. There is no API key screen in the product
  // today. Confirm the real scheme (token issuance, where it lives, rotation)
  // before this paragraph goes live.
  authentication:
    "Authentication details are being finalised. Treat any credential you are issued the way you would an SSH key: keep it out of source control, out of client-side code, and rotate it if it is ever exposed.",

  gettingStarted: [
    {
      title: "Create an account",
      text: "Sign up at cloud.sharkcluster.com and provision at least one server, so there is something for the API to act on.",
    },
    {
      title: "Get your credentials",
      text: "TODO_CONFIRM — where API credentials are issued and managed.",
    },
    {
      title: "Make your first request",
      text: "Pick a read-only endpoint from the reference in the sidebar and confirm you get a 200 back before writing anything.",
    },
  ],

  // Drawn from the actual product model, not the old site's invented
  // "Shark Nodes" / "Auto-Scaling" vocabulary.
  coreConcepts: [
    {
      title: "Servers",
      text: "A VPS on one of the connected cloud providers, or on SharkCluster's own infrastructure. Everything else hangs off a server.",
    },
    {
      title: "Applications",
      text: "A deployed app on a server, with its own domains, database, services, cronjobs and backups.",
    },
    {
      title: "Managed databases",
      text: "Database clusters managed separately from any one server, with parameter groups and their own backup schedule.",
    },
    {
      title: "Container registries",
      text: "Private image registries with repositories, tags, robot accounts and storage quotas.",
    },
  ],
};
