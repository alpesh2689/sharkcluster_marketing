import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fetchPublicFaqs, FaqItemData } from "@/services/faqService";

// Fallback FAQs if API is offline
const fallbackFaqs = [
  {
    q: "What exactly is included for free?",
    a: "Free local backups, free SSL certificates, unlimited free migrations, unlimited applications per server, free self-hosted business apps (ERP, helpdesk, ticketing, invoicing), and a dedicated DevOps manager on Business and Enterprise plans.",
  },
  {
    q: "Where does my data actually live?",
    a: "Your data lives entirely on the VPS you choose at server creation. We never store your application data, databases, or files on our own infrastructure.",
  },
  {
    q: "Which cloud providers can I use?",
    a: "SharkCluster supports multiple cloud providers including DigitalOcean, Contabo, and OVHcloud, with Vultr and Hetzner coming soon.",
  },
  {
    q: "Can I migrate my existing site for free?",
    a: "Yes. Unlimited free migrations are included on every plan. Our team handles the migration of your sites, applications, and databases.",
  },
  {
    q: "How do backups work?",
    a: "SharkCluster offers seven backup types: auto backups, snapshots, server images, custom path backups, portable backups, full server backups, and cloning.",
  },
];

function FaqItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string; link?: { href: string; label: string } }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-semibold text-ink-900">{faq.q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen ? "bg-brand-500 text-white rotate-180" : "bg-ink-100 text-ink-500"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{faq.a}</p>
          {faq.link && (
            <a href={faq.link.href} className="ml-5 mb-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
              {faq.link.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqsList, setFaqsList] = useState<{ q: string; a: string }[]>(fallbackFaqs);

  useEffect(() => {
    async function getFaqs() {
      const data = await fetchPublicFaqs();
      if (data && data.length > 0) {
        const dynamicItems = data.flatMap(cat =>
          (cat.faqs || []).map(f => ({ q: f.question, a: f.answer }))
        );
        if (dynamicItems.length > 0) {
          setFaqsList(dynamicItems);
        }
      }
    }
    getFaqs();
  }, []);

  return (
    <section id="faq" className="section relative overflow-hidden">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          {/* Left: heading */}
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
            <span className="eyebrow">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </span>
            <h2 className="mt-5 heading-lg">Questions, answered</h2>
            <p className="mt-4 text-body">
              Everything you need to know about SharkCluster. Can't find what you're looking for?
            </p>
            <a
              href="https://cloud.sharkcluster.com/register"
              className="btn-secondary mt-6"
            >
              Talk to our team
            </a>
          </div>

          {/* Right: accordion */}
          <div className={`reveal ${visible ? "is-visible" : ""} space-y-3`}>
            {faqsList.map((faq, i) => (
              <FaqItem
                key={faq.q + i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

