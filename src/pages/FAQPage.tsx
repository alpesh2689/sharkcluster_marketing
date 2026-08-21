import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown, HelpCircle, ArrowRight, Search, Sparkles, X,
  MessageCircle, Zap, Shield, Server, CreditCard, Database,
  RefreshCw, Users, Folder, TrendingUp, Clock, CheckCircle2,
  LifeBuoy, BookOpen,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { fetchPublicFaqs, FaqCategoryData, FaqItemData } from "@/services/faqService";

const fallbackFaqs = [
  { q: "What exactly is included for free?", a: "Free local backups, free SSL certificates, unlimited free migrations, unlimited applications per server, free self-hosted business apps (ERP, helpdesk, ticketing, invoicing), and a dedicated DevOps manager on Business and Enterprise plans.", categoryName: "General" },
  { q: "Where does my data actually live?", a: "Your data lives entirely on the VPS you choose at server creation. We never store your application data, databases, or files on our own infrastructure.", categoryName: "General" },
  { q: "Which cloud providers can I use?", a: "SharkCluster supports multiple cloud providers including DigitalOcean, Contabo, and OVHcloud, with Vultr and Hetzner coming soon.", categoryName: "Servers" },
  { q: "Can I migrate my existing site for free?", a: "Yes. Unlimited free migrations are included on every plan. Our team handles the migration of your sites, applications, and databases.", categoryName: "General" },
  { q: "How do backups work?", a: "SharkCluster offers seven backup types: auto backups, snapshots, server images, custom path backups, portable backups, full server backups, and cloning.", categoryName: "Backups" },
  { q: "Is there really no credit card required to start?", a: "Correct. You can sign up and explore the panel with no credit card required. There are no lock-in contracts.", categoryName: "Billing" },
  { q: "Can I scale my server after creation?", a: "Yes. You can upgrade CPU, RAM, and storage at any time from the panel. The resize takes effect after a scheduled reboot.", categoryName: "Servers" },
  { q: "Do you offer managed databases?", a: "Yes. SharkCluster supports MySQL, PostgreSQL, MongoDB, and SQLite. The panel creates the database, user, and credentials, then wires them into your app automatically.", categoryName: "Databases" },
  { q: "How does team access work?", a: "Team members get role-based permissions. You control who can view, manage, deploy, or configure each server. Permissions are granular per feature.", categoryName: "Teams" },
  { q: "What happens if my server goes down?", a: "Built-in monitoring alerts you via email and in-app notifications. On Business and Enterprise plans, a dedicated DevOps manager is notified and can take action.", categoryName: "General" },
];

const categoryIcons: Record<string, { icon: typeof Server; color: string }> = {
  "General": { icon: HelpCircle, color: "text-brand-600" },
  "Servers": { icon: Server, color: "text-blue-600" },
  "Billing": { icon: CreditCard, color: "text-emerald-600" },
  "Backups": { icon: RefreshCw, color: "text-amber-600" },
  "Databases": { icon: Database, color: "text-purple-600" },
  "Teams": { icon: Users, color: "text-rose-600" },
  "Security": { icon: Shield, color: "text-red-600" },
};

function getCategoryIcon(name: string) {
  return categoryIcons[name] || { icon: Folder, color: "text-ink-500" };
}

const stats = [
  { value: "24/7", label: "Support availability", icon: Clock },
  { value: "10+", label: "FAQ categories", icon: BookOpen },
  { value: "<2m", label: "Avg response time", icon: Zap },
  { value: "100%", label: "No credit card needed", icon: CheckCircle2 },
];

const popularQuestions = [
  "What is included for free?",
  "How do backups work?",
  "Which providers are supported?",
  "Can I migrate for free?",
];

function HeroMock() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <HelpCircle className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Help Center</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
      </div>
      <div className="space-y-2.5">
        {[
          { q: "What is included for free?", open: true, a: "Free backups, SSL, migrations, and self-hosted business apps..." },
          { q: "Which cloud providers can I use?", open: false, a: "" },
          { q: "How do backups work?", open: false, a: "" },
        ].map((item, i) => (
          <div key={i} className={`rounded-lg border px-3 py-2.5 transition-all ${item.open ? "border-brand-300 bg-brand-50/40" : "border-ink-100 bg-ink-50/50"}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-900">{item.q}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-ink-400 transition-transform ${item.open ? "rotate-180" : ""}`} />
            </div>
            {item.open && (
              <p className="mt-2 text-[10px] leading-relaxed text-ink-500">{item.a}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-brand-600" />
        <span className="text-[10px] font-medium text-brand-700">Search all FAQs...</span>
      </div>
    </div>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  categoryName,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  categoryName?: string;
}) {
  const catIcon = categoryName ? getCategoryIcon(categoryName) : null;
  return (
    <div className={`overflow-hidden rounded-2xl border transition-all duration-200 ${isOpen ? "border-brand-300 bg-white shadow-md" : "border-ink-200 bg-white hover:border-ink-300"}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {catIcon && (
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-50 ${catIcon.color}`}>
              <catIcon.icon className="h-4 w-4" />
            </span>
          )}
          <span className="font-display text-base font-semibold leading-snug text-ink-900">{question}</span>
        </div>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
            isOpen ? "bg-brand-500 text-white rotate-180" : "bg-ink-100 text-ink-500"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="border-t border-ink-100/60 mx-5 pt-3 pb-5 pl-11">
            <p className="text-sm leading-relaxed text-ink-600 whitespace-pre-line">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [categories, setCategories] = useState<FaqCategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "all">("all");
  const [openFaqKey, setOpenFaqKey] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function loadFaqs() {
      setLoading(true);
      const data = await fetchPublicFaqs();
      setCategories(data);
      setLoading(false);
    }
    loadFaqs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryId, searchQuery]);

  const allFaqItems = useMemo(() =>
    categories.flatMap(cat =>
      (cat.faqs || []).map(faq => ({
        ...faq,
        categoryName: cat.name,
        categoryId: cat.id,
      }))
    ), [categories]);

  const displayItems = useMemo(() => {
    if (allFaqItems.length > 0) return allFaqItems;
    return fallbackFaqs.map((item, idx) => ({
      id: idx,
      category_id: 0,
      question: item.q,
      answer: item.a,
      categoryName: item.categoryName,
      categoryId: 0,
    }));
  }, [allFaqItems]);

  const filteredFaqs = useMemo(() =>
    displayItems.filter(item => {
      const matchesCategory = selectedCategoryId === "all" || item.categoryId === selectedCategoryId;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }), [displayItems, selectedCategoryId, searchQuery]);

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Seo
        title="FAQ — Frequently Asked Questions"
        description="Search and filter answers to common questions about SharkCluster: pricing, contracts, data security, migrations, backups, self-hosted apps, supported providers, scaling, and dedicated DevOps support."
        path="/faq"
        keywords={["SharkCluster FAQ", "cloud hosting questions", "VPS hosting help", "self-hosted apps FAQ", "server management questions", "hosting billing FAQ"]}
        faqSchema={fallbackFaqs.map(f => ({ q: f.q, a: f.a }))}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]}
      />

      {/* Split hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl" />
          <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-blue-300/10 blur-3xl" />
        </div>
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
                <HelpCircle className="h-4 w-4" />
                Help Center
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Frequently asked <br />
                <span className="gradient-text">questions</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Search questions, filter by category, or browse answers below to learn everything about
                SharkCluster — from free backups and migrations to cloud providers, billing, and team access.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/contact" className="btn-secondary btn-lg w-full sm:w-auto">
                  Contact Support
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <HeroMock />
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-ink-200 bg-ink-50/50">
        <div className="container-px py-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-xl font-extrabold text-ink-900 sm:text-2xl">{stat.value}</p>
                  <p className="text-xs font-medium text-ink-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular questions quick-access */}
      <section className="section pb-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} text-center`}>
            <span className="eyebrow">
              <TrendingUp className="h-4 w-4" />
              Popular Questions
            </span>
            <h2 className="mt-5 heading-lg">Start here</h2>
            <p className="mt-4 text-body mx-auto max-w-xl">
              The most common questions people ask before getting started.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {popularQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setSearchQuery(q);
                  setOpenFaqKey(null);
                  document.getElementById("faq-search")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/50 hover:text-brand-700 hover:shadow-md"
              >
                <Search className="h-3.5 w-3.5 text-ink-400 transition-colors group-hover:text-brand-500" />
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ section */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} space-y-8`}>
            {/* Search bar */}
            <div id="faq-search" className="relative max-w-2xl mx-auto scroll-mt-24">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-ink-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions or keywords (e.g. backup, migration, billing)..."
                  className="w-full pl-12 pr-10 py-4 bg-white border border-ink-200 rounded-2xl shadow-sm text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 p-1 rounded-full text-ink-400 hover:text-ink-700 hover:bg-ink-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Main layout: sidebar + accordion */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              {/* Category sidebar */}
              <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-ink-200 shadow-sm space-y-1.5 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 px-2 py-2 text-xs font-bold uppercase tracking-wider text-ink-400 border-b border-ink-100 mb-2">
                  <Folder className="h-3.5 w-3.5" />
                  Categories
                </div>
                <button
                  onClick={() => setSelectedCategoryId("all")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategoryId === "all"
                      ? "bg-brand-500 text-white font-semibold shadow-sm"
                      : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    All Categories
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategoryId === "all" ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600"}`}>
                    {displayItems.length}
                  </span>
                </button>
                {categories.map((cat) => {
                  const count = (cat.faqs || []).length;
                  const isSelected = selectedCategoryId === cat.id;
                  const catInfo = getCategoryIcon(cat.name);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-brand-500 text-white font-semibold shadow-sm"
                          : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <catInfo.icon className={`h-4 w-4 ${isSelected ? "text-white" : catInfo.color}`} />
                        <span className="truncate max-w-[120px] text-left">{cat.name}</span>
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
                {/* Fallback categories when API is empty */}
                {categories.length === 0 && !loading && (
                  <>
                    {["General", "Servers", "Backups", "Billing"].map((name, idx) => {
                      const catInfo = getCategoryIcon(name);
                      return (
                        <button
                          key={name}
                          onClick={() => setSelectedCategoryId(idx)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            selectedCategoryId === idx
                              ? "bg-brand-500 text-white font-semibold shadow-sm"
                              : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <catInfo.icon className={`h-4 w-4 ${selectedCategoryId === idx ? "text-white" : catInfo.color}`} />
                            {name}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategoryId === idx ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600"}`}>
                            {fallbackFaqs.filter(f => f.categoryName === name).length}
                          </span>
                        </button>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Accordion list */}
              <div className="lg:col-span-3 space-y-3">
                {loading ? (
                  <div className="bg-white p-12 text-center rounded-2xl border border-ink-200 shadow-sm">
                    <Sparkles className="h-8 w-8 text-brand-500 animate-spin mx-auto mb-3" />
                    <p className="text-sm font-medium text-ink-600">Loading FAQs...</p>
                  </div>
                ) : filteredFaqs.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-2xl border border-ink-200 shadow-sm space-y-3">
                    <HelpCircle className="h-10 w-10 text-ink-300 mx-auto" />
                    <h4 className="text-base font-bold text-ink-800">No matching questions found</h4>
                    <p className="text-sm text-ink-500 max-w-sm mx-auto">
                      Try searching with different keywords or switch to another category.
                    </p>
                    <button
                      onClick={() => { setSearchQuery(""); setSelectedCategoryId("all"); }}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <>
                    {paginatedFaqs.map((faq, index) => {
                      const itemKey = `${faq.id}-${index}`;
                      const isOpen = openFaqKey === itemKey;
                      return (
                        <FaqItem
                          key={itemKey}
                          question={faq.question}
                          answer={faq.answer}
                          categoryName={faq.categoryName}
                          isOpen={isOpen}
                          onToggle={() => setOpenFaqKey(isOpen ? null : itemKey)}
                        />
                      );
                    })}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between pt-6 border-t border-ink-100">
                        <span className="text-xs font-medium text-ink-500">
                          Showing {startIndex + 1} – {Math.min(startIndex + itemsPerPage, filteredFaqs.length)} of {filteredFaqs.length} FAQs
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-ink-200 bg-white text-ink-700 hover:bg-ink-50 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          <span className="text-xs font-semibold text-ink-700 px-2">
                            {currentPage} / {totalPages}
                          </span>
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-ink-200 bg-white text-ink-700 hover:bg-ink-50 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Still have questions */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-8 md:p-10 text-center shadow-sm">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                <LifeBuoy className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl md:text-2xl font-bold text-ink-900">Still have questions?</h3>
              <p className="mt-2 text-sm md:text-base text-ink-600 max-w-xl mx-auto">
                Our support team and DevOps experts are here to help you find the answers you need, anytime.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary text-sm px-6 py-3">
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://cloud.sharkcluster.com/register" className="btn-secondary text-sm px-6 py-3">
                  Get Started Free
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
