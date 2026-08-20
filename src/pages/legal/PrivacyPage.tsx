import LegalPage from "@/pages/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How SharkCluster collects, uses, and protects your personal information. Your data stays on your VPS — we never store your application data."
      path="/legal/privacy"
      sections={[
        { heading: "Our Core Principle", body: "Your data lives on your VPS. SharkCluster never stores your application data, databases, or files on its own infrastructure. The panel communicates with your server over SSH to manage it — that is the extent of our access to your data." },
        { heading: "Information We Collect", body: "We collect your name, email address, and billing information when you create an account. We collect server configuration metadata (server names, plan details, IP addresses) needed to manage your servers. We do not collect or store your application data, database contents, or uploaded files." },
        { heading: "How We Use Your Information", body: "We use your account information to provide and improve our services, process payments, send service notifications, and provide support. We do not sell or rent your personal information to third parties." },
        { heading: "Data Security", body: "All communication between the panel and your servers is encrypted over SSH. Your account credentials are hashed and salted. Payment processing is handled by PCI-compliant third-party providers — we never store your full card details." },
        { heading: "Cookies", body: "We use essential cookies to maintain your session and authentication state. We do not use tracking cookies for advertising. You can disable non-essential cookies in your browser settings." },
        { heading: "Your Rights", body: "You have the right to access, correct, or delete your personal information. You can export your account data or close your account at any time. Contact us at privacy@sharkcluster.com to exercise these rights." },
        { heading: "Data Retention", body: "We retain your account information for as long as your account is active. After account closure, we retain billing records for the period required by law, then securely delete your personal data." },
      ]}
    />
  );
}
