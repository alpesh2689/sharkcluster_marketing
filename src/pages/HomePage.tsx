import Seo from "@/components/Seo";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import SelfHosted from "@/components/SelfHosted";
import Features from "@/components/Features";
import WhySharkCluster from "@/components/WhySharkCluster";
import MultiProvider from "@/components/MultiProvider";
import Security from "@/components/Security";
import HowItWorks from "@/components/HowItWorks";
import PricingTeaser from "@/components/PricingTeaser";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

// NOTE: answers below restate the trial terms in prose. If src/content/trial.ts
// changes, re-read these — they will not update themselves.
const homeFaqSchema = [
  { q: "What is SharkCluster?", a: "SharkCluster is a managed cloud hosting platform that lets you deploy servers and applications on your own VPS. It includes free self-hosted business apps like ERP, helpdesk, and invoicing systems, with your data staying entirely on your server." },
  { q: "Do you require a credit card to sign up?", a: "No. You can sign up and explore the panel with no credit card required. There are no lock-in contracts — you can cancel anytime." },
  { q: "Where does my data live?", a: "Your data lives entirely on the VPS you choose. SharkCluster never stores your application data on its own infrastructure — the panel communicates with your server over SSH to manage it." },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title="Managed Cloud Hosting with Free Self-Hosted Business Apps"
        description="Deploy servers and applications on your own VPS with SharkCluster. Free self-hosted ERP, helpdesk, ticketing & invoicing. Free backups, unlimited migrations, and a dedicated DevOps manager."
        path="/"
        keywords={["managed cloud hosting", "self-hosted apps", "VPS hosting", "ERP hosting", "helpdesk hosting", "server management panel", "cloud hosting platform"]}
        faqSchema={homeFaqSchema}
      />
      <Hero />
      <TrustBar />
      <SelfHosted />
      <Features />
      <WhySharkCluster />
      <MultiProvider />
      <Security />
      <HowItWorks />
      <PricingTeaser />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
