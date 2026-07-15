import "./keystatic-theme.css";
import { SuppressHrefWarning } from "@/components/keystatic/SuppressHrefWarning";

/**
 * Wraps the Keystatic admin so the on-brand accent theme
 * (keystatic-theme.css) applies only here — never to the public site.
 */
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="luxvoy-keystatic" style={{ minHeight: "100vh" }}>
      <SuppressHrefWarning />
      {children}
    </div>
  );
}
