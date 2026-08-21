import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, ArrowRight, Search, Folder, Sparkles, X } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "react-router-dom";
import { fetchPublicFaqs, FaqCategoryData, FaqItemData } from "@/services/faqService";

// Static fallback FAQs in case API is loading or offline
const fallbackFaqs = [
  {
    q: "What exactly is included for free?",
    a: "Free local backups, free SSL certificates, unlimited free migrations, unlimited applications per server, free self-hosted business apps (ERP, helpdesk, ticketing, invoicing), and a dedicated DevOps manager on Business and Enterprise plans.",
    categoryName: "General"
  },
  {
    q: "Where does my data actually live?",
    a: "Your data lives entirely on the VPS you choose at server creation. We never store your application data, databases, or files on our own infrastructure.",
    categoryName: "General"
  },
  {
    q: "Which cloud providers can I use?",
    a: "SharkCluster supports multiple cloud providers including DigitalOcean, Contabo, and OVHcloud, with Vultr and Hetzner coming soon.",
    categoryName: "Servers"
  },
  {
    q: "Can I migrate my existing site for free?",
    a: "Yes. Unlimited free migrations are included on every plan. Our team handles the migration of your sites, applications, and databases.",
    categoryName: "General"
  },
  {
    q: "How do backups work?",
    a: "SharkCluster offers seven backup types: auto backups, snapshots, server images, custom path backups, portable backups, full server backups, and cloning.",
    categoryName: "Backups"
  },
  {
    q: "Is there really no credit card required to start?",
    a: "Correct. You can sign up and explore the panel with no credit card required. There are no lock-in contracts.",
    categoryName: "Billing"
  }
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`card overflow-hidden border transition-all duration-200 ${isOpen ? "border-brand-500 shadow-md bg-white" : "border-ink-200 bg-white hover:border-ink-300"}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-semibold text-ink-900 leading-snug">{question}</span>
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
          <div className="border-t border-ink-100/60 mx-5 pt-3 pb-5">
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function loadFaqs() {
      setLoading(true);
      const data = await fetchPublicFaqs();
      setCategories(data);
      setLoading(false);
    }
    loadFaqs();
  }, []);

  // Reset pagination when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryId, searchQuery]);

  // Compute all items flatten
  const allFaqItems = categories.flatMap(cat =>
    (cat.faqs || []).map(faq => ({
      ...faq,
      categoryName: cat.name,
      categoryId: cat.id
    }))
  );

  // If API returns no data, map fallback items
  const displayItems = allFaqItems.length > 0 ? allFaqItems : fallbackFaqs.map((item, idx) => ({
    id: idx,
    category_id: 0,
    question: item.q,
    answer: item.a,
    categoryName: item.categoryName,
    categoryId: 0
  }));

  // Filter items by category & search query
  const filteredFaqs = displayItems.filter(item => {
    const matchesCategory = selectedCategoryId === "all" || item.categoryId === selectedCategoryId;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate paginated FAQs
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Seo
        title="FAQ — Frequently Asked Questions"
        description="Answers to common questions about SharkCluster: pricing, contracts, data security, migrations, backups, self-hosted apps, supported providers, scaling, and dedicated DevOps support."
        path="/faq"
        keywords={["SharkCluster FAQ", "cloud hosting questions", "VPS hosting help", "self-hosted apps FAQ", "server management questions"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]}
      />

      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        description="Search questions, filter by category, or browse answers below to learn everything about SharkCluster."
        icon={HelpCircle}
      />

      <section className="section pt-8 pb-16">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} space-y-8`}>

            {/* Top Easy Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-ink-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions or keywords (e.g. backup, migration, billing)..."
                  className="w-full pl-12 pr-10 py-3.5 bg-white border border-ink-200 rounded-2xl shadow-sm text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
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

            {/* Main Content Layout: Left Category Sidebar + Right Accordion List */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              
              {/* Category Filter Sidebar */}
              <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-ink-200 shadow-sm space-y-2 sticky top-24">
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-ink-400 border-b border-ink-100 mb-2">
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
                  <span>All Categories</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategoryId === "all" ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600"}`}>
                    {displayItems.length}
                  </span>
                </button>

                {categories.map((cat) => {
                  const count = (cat.faqs || []).length;
                  const isSelected = selectedCategoryId === cat.id;
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
                      <span className="truncate max-w-[130px] text-left">{cat.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Accordion Questions List */}
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
                          isOpen={isOpen}
                          onToggle={() => setOpenFaqKey(isOpen ? null : itemKey)}
                        />
                      );
                    })}

                    {/* Pagination Bar */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between pt-6 border-t border-ink-100">
                        <span className="text-xs font-medium text-ink-500">
                          Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredFaqs.length)} of {filteredFaqs.length} FAQs
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

            {/* Separate Full Container Width "Still have questions?" Section */}
            <div className="mt-12 rounded-2xl border border-ink-200 bg-gradient-to-r from-ink-50 via-white to-brand-50/40 p-8 md:p-10 text-center shadow-sm ">
              <h3 className="font-display text-xl md:text-2xl font-bold text-ink-900">Still have questions?</h3>
              <p className="mt-2 text-sm md:text-base text-ink-600 max-w-xl mx-auto">
                Our support team and DevOps experts are here to help you find the answers you need anytime.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary text-sm px-6 py-3">
                  Contact Support
                  <ArrowRight className="h-4 w-4 ml-2" />
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
