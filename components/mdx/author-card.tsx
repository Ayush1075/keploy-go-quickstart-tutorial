import { BadgeCheck, Bug, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function AuthorCard() {
  return (
    <aside className="not-prose mt-16 overflow-hidden rounded-2xl border bg-card shadow-xs">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
        <div
          aria-hidden
          className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-orange-600 text-xl font-bold text-white"
        >
          {siteConfig.author.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Written by</p>
          <p className="mt-0.5 text-lg font-semibold">{siteConfig.author}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <BadgeCheck className="size-4 text-green-600 dark:text-green-400" aria-hidden />
            Every command on this page was run end-to-end on {siteConfig.verified.date}.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t bg-muted/30 px-6 py-3">
        <Button variant="ghost" size="sm" asChild>
          <a href={`${siteConfig.repo}/blob/main/app/page.mdx`} target="_blank" rel="noreferrer">
            <Pencil className="size-3.5" aria-hidden />
            Edit this page
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={`${siteConfig.repo}/issues/new`} target="_blank" rel="noreferrer">
            <Bug className="size-3.5" aria-hidden />
            Report an issue
          </a>
        </Button>
      </div>
    </aside>
  );
}
