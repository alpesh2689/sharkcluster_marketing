import LegalPage from "@/pages/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The terms and conditions for using SharkCluster's managed cloud hosting platform and services."
      path="/legal/terms"
      sections={[
        { heading: "Acceptance of Terms", body: "By creating a SharkCluster account and using our services, you agree to these Terms of Service. If you do not agree, you may not use the platform." },
        { heading: "Service Description", body: "SharkCluster provides a managed cloud hosting platform that allows you to deploy, manage, and monitor servers and applications on cloud providers of your choice. Your data lives on the VPS you select — we do not store your application data." },
        { heading: "Account Responsibilities", body: "You are responsible for maintaining the security of your account credentials, SSH keys, and server configurations. You are responsible for all activity under your account and for complying with all applicable laws." },
        { heading: "Acceptable Use", body: "You may not use SharkCluster to host illegal content, send unsolicited email, launch attacks against other systems, or violate intellectual property rights. We reserve the right to suspend or terminate accounts that violate these terms." },
        { heading: "Billing & Payment", body: "Servers are billed at the catalogue rate shown when you create them, on a monthly cycle. Optional add-ons, such as offsite backup storage and Cloudflare, are billed by usage and appear as separate invoice lines. Refunds are governed by our Refund Policy.", link: { to: "/legal/refund", label: "Read the Refund Policy" } },
        { heading: "Service Availability", body: "We strive for TODO_CONFIRM% uptime but do not guarantee uninterrupted service. Scheduled maintenance, provider outages, and factors outside our control may cause downtime. We are not liable for data loss — you are responsible for maintaining your own backups." },
        { heading: "Limitation of Liability", body: "SharkCluster is not liable for indirect, incidental, or consequential damages, including lost profits, data loss, or business interruption. Our total liability is limited to the amount you paid us in the preceding TODO_CONFIRM days." },
        { heading: "Termination", body: "You may close your account at any time. We may suspend or terminate your account for violation of these terms, non-payment, or activity that harms the platform or other users." },
      ]}
    />
  );
}
