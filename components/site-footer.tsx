import { Rabbit } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span aria-hidden className="grid size-7 place-items-center rounded-md bg-brand/15 text-brand-ink">
            <Rabbit className="size-4" />
          </span>
          <p>
            A community tutorial based on Keploy&apos;s{" "}
            <a className="link" href={siteConfig.quickstart} target="_blank" rel="noreferrer">
              Gin + MongoDB quickstart
            </a>
            .
          </p>
        </div>
        <p>
          Built with Next.js, MDX, Tailwind &amp; shadcn/ui ·{" "}
          <a className="link" href={siteConfig.repo} target="_blank" rel="noreferrer">
            Source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
