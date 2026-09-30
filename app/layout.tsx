import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TableOfContents } from "@/components/toc";
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

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "article",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow"
          >
            Skip to content
          </a>
          <SiteHeader />
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12">
            <main id="content" className="min-w-0 py-10 lg:py-14">
              <article id="top" data-docs-content className="docs mx-auto max-w-3xl">
                {children}
              </article>
            </main>
            <aside className="hidden xl:block">
              <div className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto py-14 pr-2">
                <TableOfContents />
              </div>
            </aside>
          </div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
