import { useEffect, useState } from "react";

/**
 * Fade content in once it scrolls into view.
 *
 * The element is tracked in state rather than a RefObject. A RefObject is only
 * populated after render, so a `useEffect([])` that reads it sees `null` for
 * anything rendered behind a loading gate — the observer never attaches and the
 * element stays at `opacity: 0` once it finally mounts. Storing the node in
 * state re-runs the effect when the node appears, whenever that happens.
 *
 * The observer is attached in an effect, not inside the ref callback: ref
 * callbacks run during commit, before the browser has settled layout, and an
 * observer created that early reads the element as not intersecting.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node || visible) return;

    // Without IntersectionObserver, show the content rather than hide it.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, visible]);

  return { ref: setNode, visible };
}
