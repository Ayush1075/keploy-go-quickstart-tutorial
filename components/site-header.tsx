import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-brand font-mono text-xs font-bold text-brand-foreground"
          >
            K
          </span>
          <span className="text-sm sm:text-base">
            Keploy <span className="text-muted-foreground">×</span> Go
          </span>
          <span className="hidden rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground sm:inline">
            Tutorial
          </span>
        </a>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <a href={siteConfig.keployDocs} target="_blank" rel="noreferrer">
              Keploy docs
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href={siteConfig.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="Source code on GitHub"
              title="Source code on GitHub"
            >
              <GitHubIcon className="size-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
