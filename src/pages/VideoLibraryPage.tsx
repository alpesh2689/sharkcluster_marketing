import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Video, Play, Clock, Monitor, Server, Database, Shield, GitBranch } from "lucide-react";

// PLANNED_TOPICS — editorial backlog, not published videos. Do not render as playable videos.
const PLANNED_TOPICS = [
  { title: "Getting Started with SharkCluster", category: "Getting Started", duration: "4:32", icon: Monitor },
  { title: "Server Creation Walkthrough", category: "Server Management", duration: "8:15", icon: Server },
  { title: "Git Deployment Deep Dive", category: "Deployment", duration: "6:48", icon: GitBranch },
  { title: "Backups: All 7 Types Explained", category: "Backups", duration: "12:20", icon: Database },
  { title: "Redis & Varnish Caching", category: "Caching", duration: "9:33", icon: Shield },
  { title: "Firewall Configuration", category: "Security", duration: "7:12", icon: Shield },
  { title: "Health Alerts & Monitoring", category: "Monitoring", duration: "5:45", icon: Monitor },
  { title: "Self-Hosted ERP in 10 Minutes", category: "Self-Hosting", duration: "10:05", icon: Server },
  { title: "Migrating from Another Host", category: "Migration", duration: "6:30", icon: GitBranch },
];

const videos: typeof PLANNED_TOPICS = [];

export default function VideoLibraryPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Video Library — Watch & Learn SharkCluster"
        description="Watch video tutorials covering server creation, Git deployment, backups, caching, firewall, monitoring, self-hosted apps, and migrations. Learn SharkCluster visually."
        path="/video-library"
        keywords={["SharkCluster videos", "hosting tutorials", "server management videos", "VPS tutorial videos", "deployment guide videos"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Video Library", path: "/video-library" }]}
      />
      <PageHero
        eyebrow="Video Library"
        title="Watch & learn"
        highlight="SharkCluster"
        description="Video tutorials covering everything from server creation to caching, backups to self-hosted apps. Learn visually at your own pace."
        icon={Video}
      />

      <section className="section pt-8">
        <div className="container-px">
          {videos.length > 0 ? (
            <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, i) => (
                <div
                  key={video.title}
                  className={`reveal ${visible ? "is-visible" : ""} card-hover group cursor-pointer overflow-hidden`}
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/30">
                        <Play className="h-6 w-6 fill-white text-white" />
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                      {video.duration}
                    </div>
                    <div className="absolute left-2 top-2 rounded-md bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                      {video.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-16 text-center`}>
              <Video className="mx-auto h-10 w-10 text-ink-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Videos coming soon</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                We're producing tutorials covering server creation, deployment, backups, caching, firewall, monitoring, and self-hosted apps. Check back shortly for the first videos.
              </p>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
