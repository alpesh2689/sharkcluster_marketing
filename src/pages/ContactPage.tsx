import { useState } from "react";
import { Mail, MessageSquare, Phone, MapPin, Send, Check } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";

const contactMethods = [
  { icon: Mail, label: "Email", value: "hello@sharkcluster.com", href: "mailto:hello@sharkcluster.com" },
  { icon: MessageSquare, label: "Support", value: "support@sharkcluster.com", href: "mailto:support@sharkcluster.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
];

export default function ContactPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Seo
        title="Contact Us — Get in Touch with SharkCluster"
        description="Have questions about SharkCluster? Contact our team for pricing, support, partnerships, or any inquiry. We're here to help you find the right hosting solution."
        path="/contact"
        keywords={["contact SharkCluster", "cloud hosting support", "hosting contact", "VPS hosting inquiry"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      />
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk"
        description="Questions about pricing, features, or migration? Our team is ready to help. Reach out and we'll get back to you within one business day."
        icon={Mail}
      />

      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} grid gap-8 lg:grid-cols-[1fr_1.5fr]`}>
            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="card-hover group flex items-center gap-4 p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <method.icon className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{method.label}</p>
                    <p className="text-sm text-ink-500">{method.value}</p>
                  </div>
                </a>
              ))}

              <div className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-500">
                    <MapPin className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">Office</p>
                    <p className="text-sm text-ink-500">Remote-first, globally distributed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="card p-7">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900">Message sent!</h3>
                  <p className="mt-2 text-body-sm">Thanks for reaching out. We'll get back to you within one business day.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary mt-6">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-900">Send us a message</h3>
                    <p className="mt-1 text-sm text-ink-500">Fill out the form below and we'll be in touch shortly.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-ink-800">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-ink-800">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink-800">Company (optional)</label>
                    <input
                      type="text"
                      placeholder="Your company"
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink-800">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us what you need..."
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Message
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
