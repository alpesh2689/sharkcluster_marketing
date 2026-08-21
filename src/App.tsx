import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import FeaturesPage from "@/pages/FeaturesPage";
import SelfHostedAppsPage from "@/pages/SelfHostedAppsPage";
import PricingPage from "@/pages/PricingPage";
import SecurityPage from "@/pages/SecurityPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import FAQPage from "@/pages/FAQPage";
import DocsPage from "@/pages/DocsPage";
import ApiDocsPage from "@/pages/docs/ApiDocsPage";
import DocGuidePage from "@/pages/docs/DocGuidePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import CloudProvidersPage from "@/pages/CloudProvidersPage";
import SupportedAppsPage from "@/pages/SupportedAppsPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ComparePage from "@/pages/ComparePage";
import DemoPage from "@/pages/DemoPage";
import CaseStudiesPage from "@/pages/CaseStudiesPage";
import VideoLibraryPage from "@/pages/VideoLibraryPage";
import ProductUpdatesPage from "@/pages/ProductUpdatesPage";

// Feature detail pages
import ServerManagementPage from "@/pages/features/ServerManagementPage";
import BackupsPage from "@/pages/features/BackupsPage";
import DeploymentPage from "@/pages/features/DeploymentPage";
import CachingPage from "@/pages/features/CachingPage";
import FirewallPage from "@/pages/features/FirewallPage";
import MonitoringPage from "@/pages/features/MonitoringPage";
import DomainsSslPage from "@/pages/features/DomainsSslPage";
import DatabasesPage from "@/pages/features/DatabasesPage";
import CronjobsPage from "@/pages/features/CronjobsPage";
import OtherServicesPage from "@/pages/features/OtherServicesPage";
import ContainerRegistryPage from "@/pages/features/ContainerRegistryPage";
import ManagedDatabasesPage from "@/pages/features/ManagedDatabasesPage";
import TeamsPage from "@/pages/features/TeamsPage";
import BillingPage from "@/pages/features/BillingPage";
import SelfHostedSupabasePage from "@/pages/features/SelfHostedSupabasePage";
import InfraCaptainPage from "@/pages/features/InfraCaptainPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import DigitalOceanPage from "@/pages/cloud-providers/DigitalOceanPage";
import ContaboPage from "@/pages/cloud-providers/ContaboPage";
import OVHcloudPage from "@/pages/cloud-providers/OVHcloudPage";

// Use case pages
import AgenciesPage from "@/pages/use-cases/AgenciesPage";
import DevelopersPage from "@/pages/use-cases/DevelopersPage";
import SMBsPage from "@/pages/use-cases/SMBsPage";
import EcommercePage from "@/pages/use-cases/EcommercePage";
import IndiaPage from "@/pages/use-cases/IndiaPage";
import GlobalPage from "@/pages/use-cases/GlobalPage";

// Legal pages
import PrivacyPage from "@/pages/legal/PrivacyPage";
import TermsPage from "@/pages/legal/TermsPage";
import RefundPage from "@/pages/legal/RefundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/features/server-management" element={<ServerManagementPage />} />
          <Route path="/features/backups" element={<BackupsPage />} />
          <Route path="/features/deployment" element={<DeploymentPage />} />
          <Route path="/features/caching" element={<CachingPage />} />
          <Route path="/features/firewall" element={<FirewallPage />} />
          <Route path="/features/monitoring" element={<MonitoringPage />} />
          <Route path="/features/domains-ssl" element={<DomainsSslPage />} />
          <Route path="/features/databases" element={<DatabasesPage />} />
          <Route path="/features/cronjobs" element={<CronjobsPage />} />
          <Route path="/features/other-services" element={<OtherServicesPage />} />
          <Route path="/features/container-registry" element={<ContainerRegistryPage />} />
          <Route path="/features/managed-databases" element={<ManagedDatabasesPage />} />
          <Route path="/features/teams" element={<TeamsPage />} />
          <Route path="/features/billing" element={<BillingPage />} />
          <Route path="/features/self-hosted-supabase" element={<SelfHostedSupabasePage />} />
          <Route path="/features/infracaptain" element={<InfraCaptainPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/self-hosted-apps" element={<SelfHostedAppsPage />} />
          <Route path="/who-we-serve/india" element={<IndiaPage />} />
          <Route path="/who-we-serve/agencies" element={<AgenciesPage />} />
          <Route path="/who-we-serve/global" element={<GlobalPage />} />
          <Route path="/who-we-serve/developers" element={<DevelopersPage />} />
          <Route path="/who-we-serve/smb" element={<SMBsPage />} />
          <Route path="/who-we-serve/ecommerce" element={<EcommercePage />} />
          <Route path="/cloud-providers" element={<CloudProvidersPage />} />
          <Route path="/cloud-providers/digitalocean" element={<DigitalOceanPage />} />
          <Route path="/cloud-providers/contabo" element={<ContaboPage />} />
          <Route path="/cloud-providers/ovhcloud" element={<OVHcloudPage />} />
          <Route path="/supported-apps" element={<SupportedAppsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          {/* Not open yet. The built pages remain at @/pages/PartnersPage,
              CommunityPage and ReviewsPage — point the route back at one to
              restore it, and flip sitemap:true in src/routes.ts. */}
          <Route
            path="/partners"
            element={
              <ComingSoonPage
                eyebrow="Partners"
                title="Partner programmes,"
                highlight="opening soon"
                description="Referral and agency partner programmes are not open yet. We are finalising commission terms and payout schedules before we invite anyone in."
                path="/partners"
                alternatives={[
                  { label: "For agencies", to: "/who-we-serve/agencies" },
                  { label: "Talk to us", to: "/contact" },
                ]}
              />
            }
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route
            path="/community"
            element={
              <ComingSoonPage
                eyebrow="Community"
                title="Our community"
                highlight="is being built"
                description="We are setting up the places where SharkCluster users can compare notes. Nothing to join just yet."
                path="/community"
                alternatives={[
                  { label: "Documentation", to: "/docs" },
                  { label: "Ask support", to: "/contact" },
                ]}
              />
            }
          />
          <Route
            path="/reviews"
            element={
              <ComingSoonPage
                eyebrow="Reviews"
                title="Customer reviews,"
                highlight="coming soon"
                description="We would rather publish real reviews from real customers than fill this page with copy we wrote ourselves. It goes live when we have them."
                path="/reviews"
                alternatives={[
                  { label: "Compare platforms", to: "/compare" },
                  { label: "See the features", to: "/features" },
                ]}
              />
            }
          />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/video-library" element={<VideoLibraryPage />} />
          <Route path="/product-updates" element={<ProductUpdatesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/api" element={<ApiDocsPage />} />
          <Route path="/docs/api/:slug" element={<ApiDocsPage />} />
          {/* Must come after /docs/api so it does not shadow the API reference. */}
          <Route path="/docs/:category/:slug" element={<DocGuidePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal/privacy" element={<PrivacyPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
          {/* Hidden for now. Every figure on the SLA is a contractual commitment
              and none are approved yet — see the TODO_CONFIRM at the top of
              @/pages/legal/SLAPage. Point this route back at <SLAPage /> once
              the numbers are signed off. robots.txt also disallows the path. */}
          <Route
            path="/legal/sla"
            element={
              <ComingSoonPage
                eyebrow="Service Level Agreement"
                title="Our SLA is"
                highlight="being finalised"
                description="Uptime commitments and service credits are contractual promises, so we are not publishing ours until the numbers are agreed and signed off. If you need SLA terms for a contract or procurement review right now, ask us and we will put them in writing."
                path="/legal/sla"
                alternatives={[
                  { label: "Terms of Service", to: "/legal/terms" },
                  { label: "Request SLA terms", to: "/contact" },
                ]}
              />
            }
          />
          <Route path="/legal/refund" element={<RefundPage />} />
          <Route path="/refund-policy" element={<Navigate to="/legal/refund" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
