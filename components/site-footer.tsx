import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          Based on Keploy&apos;s official{" "}
          <a className="link" href={siteConfig.quickstart} target="_blank" rel="noreferrer">
            Gin + MongoDB quickstart
          </a>
          , rewritten with my own notes.
        </p>
        <p>
          Built with Next.js, MDX &amp; shadcn/ui ·{" "}
          <a className="link" href={siteConfig.repo} target="_blank" rel="noreferrer">
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
