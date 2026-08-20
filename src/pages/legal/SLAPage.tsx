// TODO_CONFIRM — every figure on this page is a contractual commitment and must be approved by the business before this route ships.
import LegalPage from "@/pages/LegalPage";

export default function SLAPage() {
  return (
    <LegalPage
      title="Service Level Agreement"
      description="SharkCluster's Service Level Agreement defines our uptime commitment and the service credits available for downtime."
      path="/legal/sla"
      sections={[
        { heading: "Uptime Commitment", body: "SharkCluster commits to TODO_CONFIRM% monthly uptime for the management panel (cloud.sharkcluster.com). This excludes scheduled maintenance, cloud provider outages, and issues caused by customer configuration." },
        { heading: "Service Credits", body: "If monthly uptime falls below TODO_CONFIRM%, eligible Enterprise plan customers receive service credits: TODO_CONFIRM-TODO_CONFIRM% = TODO_CONFIRM% credit, TODO_CONFIRM-TODO_CONFIRM% = TODO_CONFIRM% credit, below TODO_CONFIRM% = TODO_CONFIRM% credit. Credits are applied to your next invoice and must be requested within TODO_CONFIRM days." },
        { heading: "What Counts as Downtime", body: "Downtime is measured as the total minutes the management panel is unavailable in a calendar month, excluding scheduled maintenance windows (announced at least TODO_CONFIRM hours in advance) and force majeure events." },
        { heading: "What Does Not Count", body: "Cloud provider outages, DNS issues, network problems between your location and the panel, issues caused by your server configuration, and force majeure events do not count toward the uptime calculation." },
        { heading: "Support Response Times", body: "Enterprise plan includes priority support with response times of: Critical (site down) — TODO_CONFIRM hour, High (degraded) — TODO_CONFIRM hours, Normal — TODO_CONFIRM hours. Business plan includes standard support with TODO_CONFIRM-hour response times." },
      ]}
    />
  );
}
