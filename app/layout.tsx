import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import Shell from "@/components/layout/Shell";

export const metadata: Metadata = {
  title: "AIdentityHaus | Ideas with a point of view",
  description: "An independent creative studio for strategy, brand, content and digital.",
};
export const viewport: Viewport = { themeColor: "#F6F0E7", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Production: self-host via next/font. Linked here so builds work offline. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gabarito:wght@500;600;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript><style>{".preloader{display:none!important}html.js .nav,html.js .sticky-cta{transform:none!important}"}</style></noscript>
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
