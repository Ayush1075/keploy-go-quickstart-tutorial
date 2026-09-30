import { ChevronRight, Rabbit } from "lucide-react";
import { CommandMenu } from "@/components/docs/command-menu";
import { MobileNav } from "@/components/docs/mobile-nav";
import { ReadingProgress } from "@/components/docs/reading-progress";
import { GitHubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileNav />

        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-orange-600 text-white shadow-sm ring-1 ring-black/5"
          >
            <Rabbit className="size-[18px]" strokeWidth={2.25} />
          </span>
          <span className="font-semibold tracking-tight">
            Keploy <span className="font-normal text-muted-foreground">×</span> Go
          </span>
        </a>

        <nav aria-label="Breadcrumb" className="hidden items-center text-sm text-muted-foreground lg:flex">
          <ChevronRight className="mx-1.5 size-3.5 opacity-50" aria-hidden />
          <span>Quickstarts</span>
          <ChevronRight className="mx-1.5 size-3.5 opacity-50" aria-hidden />
          <span className="font-medium text-foreground">Gin + MongoDB</span>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <CommandMenu />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
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
              <GitHubIcon className="size-[18px]" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <ReadingProgress />
    </header>
  );
}
