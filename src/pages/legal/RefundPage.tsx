// TODO_CONFIRM — every figure and condition on this page is a contractual commitment and must be approved by the business before this route ships.
import LegalPage from "@/pages/LegalPage";

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      description="SharkCluster's Refund Policy covers server charges and add-ons billed through the panel."
      path="/legal/refund"
      sections={[
        { heading: "Scope", body: "This policy covers server charges and add-ons billed through the panel. Where a cloud provider has already collected a prepaid period, that provider's own refund rules apply." },
        { heading: "Refund window", body: "TODO_CONFIRM." },
        { heading: "Account credit and credit notes", body: "Refunds may be issued as account credit applied to future invoices, or returned to the original payment method. The conditions for each are TODO_CONFIRM." },
        { heading: "Prepaid provider plans", body: "Contabo and OVHcloud collect server cost up front. What happens to an unused prepaid period is TODO_CONFIRM." },
        { heading: "How to request a refund", body: "To request a refund, open a request with our support team and they will guide you through the process.", link: { to: "/support", label: "Contact support" } },
        { heading: "What is not refundable", body: "TODO_CONFIRM." },
      ]}
    />
  );
}
