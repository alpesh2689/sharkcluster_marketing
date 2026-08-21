/**
 * The SharkCluster mark.
 *
 * Traced from the panel's brand asset
 * (cloud.sharkcluster.com/assets/shark-logo-*.svg), with the hardcoded #565ADD
 * swapped for `currentColor` so callers set the colour — brand-500 on light
 * surfaces, white inside a filled tile or on the dark footer.
 *
 * The artwork is 51x38, so it is wider than it is tall. Size it with a height
 * and `w-auto`; forcing a square crops or letterboxes it.
 */
export default function SharkLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 51 38"
      className={className}
      fill="none"
      role="img"
      aria-label="SharkCluster"
    >
      <path
        d="M19.031 30.35C22.0148 22.0768 21.3748 14.3172 15.8438 10.1415C28.4997 12.233 34.1553 16.5068 40.1886 32.859C51.7846 31.1637 50.7563 14.3614 38.4255 13.4645C36.2555 -5.59089 11.6792 -3.35055 10.8257 13.4645C2.09117 10.7524 -5.8397 27.0492 5.94314 32.0453C10.5151 30.5118 13.3837 30.1653 19.031 30.35Z"
        fill="currentColor"
      />
      <path
        d="M26.3866 32.859C17.0985 30.7515 12.0397 31.0557 3.26566 34.2692C13.3023 33.3255 18.1735 33.2788 24.1848 34.8934C37.8628 39.4557 42.6762 37.8635 46.8737 34.555C48.2224 33.492 49.2188 32.0186 49.549 30.3334C49.7825 29.1419 49.9608 27.7408 50.2065 25.7279C45.9774 34.3738 41.2766 36.2484 26.3866 32.859Z"
        fill="currentColor"
      />
    </svg>
  );
}
