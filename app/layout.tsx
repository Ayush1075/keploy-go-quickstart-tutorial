import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DocsProvider } from "@/components/docs/docs-provider";
import { RightRail } from "@/components/docs/right-rail";
import { ProgressCard, SidebarNav } from "@/components/docs/sidebar-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { getOutline } from "@/lib/outline";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Absolute base for the share image; Vercel provides the production domain.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const outline = getOutline();

  return (
    // next-themes sets the `dark` class before paint, so the server HTML and
    // the first client render can legitimately differ on <html>.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DocsProvider outline={outline}>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow"
            >
              Skip to content
            </a>
            <SiteHeader />

            <div className="relative flex-1">
              {/* Decorative backdrop behind the hero. */}
              <div aria-hidden className="hero-backdrop pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px]" />

              <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:px-8 xl:grid-cols-[15rem_minmax(0,1fr)_15rem]">
                <aside className="hidden lg:block">
                  <div className="sticky top-16 max-h-[calc(100dvh-4rem)] space-y-5 overflow-y-auto py-10 pr-1">
                    <ProgressCard />
                    <SidebarNav />
                  </div>
                </aside>

                <main id="content" className="min-w-0 py-10 lg:py-14">
                  <article id="top" data-docs-content className="docs mx-auto max-w-3xl">
                    {children}
                  </article>
                </main>

                <aside className="hidden xl:block">
                  <div className="sticky top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto py-10">
                    <RightRail />
                  </div>
                </aside>
              </div>
            </div>

            <SiteFooter />
          </DocsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
