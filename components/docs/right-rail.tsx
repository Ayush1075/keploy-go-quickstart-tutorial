"use client";

import { BadgeCheck, ListTree, SquareTerminal } from "lucide-react";
import { useDocs } from "@/components/docs/docs-provider";
import { CopyButton } from "@/components/mdx/copy-button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const cheatSheet = [
  { label: "Record", command: 'sudo -E env PATH="$PATH" keploy record -c "go run main.go handler.go"' },
  { label: "Replay", command: 'sudo -E env PATH="$PATH" keploy test -c "go run main.go handler.go" --delay 10' },
];

function SectionToc() {
  const { outline, activeId, activeSectionId } = useDocs();
  const section = outline.find((s) => s.id === activeSectionId) ?? outline[0];
  if (!section) return null;

  return (
    <nav aria-label="In this section">
      <p className="mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        <ListTree className="size-3.5" aria-hidden />
        In this section
      </p>
      <a
        href={`#${section.id}`}
        className={cn(
          "block border-l-2 py-1 pl-3 text-sm leading-snug transition-colors",
          activeId === section.id
            ? "border-brand font-medium text-foreground"
            : "border-border text-muted-foreground hover:text-foreground",
        )}
      >
        {section.title}
      </a>
      {section.items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block border-l-2 py-1 pr-1 pl-6 text-[13px] leading-snug transition-colors",
            activeId === item.id
              ? "border-brand font-medium text-foreground"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}

export function RightRail() {
  const { verified } = siteConfig;

  return (
    <div className="space-y-6">
      <SectionToc />

      <section aria-labelledby="cheatsheet-title" className="rounded-xl border bg-card p-3.5 shadow-xs">
        <p id="cheatsheet-title" className="mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          <SquareTerminal className="size-3.5" aria-hidden />
          Cheat sheet
        </p>
        <div className="space-y-2.5">
          {cheatSheet.map(({ label, command }) => (
            <div key={label}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium">{label}</span>
                <CopyButton text={command} className="size-6 border-transparent bg-transparent" />
              </div>
              <code className="block rounded-md bg-muted px-2 py-1.5 font-mono text-[11px] leading-relaxed break-words text-muted-foreground">
                {command}
              </code>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="verified-title" className="rounded-xl border border-green-600/25 bg-green-600/[0.04] p-3.5">
        <p id="verified-title" className="mb-2 flex items-center gap-2 text-xs font-semibold text-green-700 dark:text-green-400">
          <BadgeCheck className="size-4" aria-hidden />
          Verified on {verified.date}
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
          <dt className="text-muted-foreground">Keploy</dt>
          <dd>{verified.keploy}</dd>
          <dt className="text-muted-foreground">Go</dt>
          <dd>{verified.go}</dd>
          <dt className="text-muted-foreground">Docker</dt>
          <dd>{verified.docker}</dd>
          <dt className="text-muted-foreground">OS</dt>
          <dd>{verified.os}</dd>
        </dl>
      </section>
    </div>
  );
}
