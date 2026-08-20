import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Seo from "@/components/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to the SharkCluster homepage to explore our managed cloud hosting platform."
        path="/404"
      />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
        </div>

        <div className="container-px text-center">
          <p className="font-display text-[8rem] font-extrabold leading-none gradient-text sm:text-[12rem]">404</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Page not found</h1>
          <p className="mx-auto mt-3 max-w-md text-body-sm">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
