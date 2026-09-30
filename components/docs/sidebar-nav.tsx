"use client";

import { Check, RotateCcw } from "lucide-react";
import { useDocs } from "@/components/docs/docs-provider";
import { Progress } from "@/components/ui/progress";
import { resetSteps, useDoneSteps } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

export function ProgressCard() {
  const { stepIds } = useDocs();
  const done = useDoneSteps();
  const count = stepIds.filter((id) => done.has(id)).length;
  const percent = stepIds.length ? Math.round((count / stepIds.length) * 100) : 0;

  return (
    <div className="rounded-xl border bg-card p-4 shadow-xs">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold">Your progress</p>
        <p className="font-mono text-xs text-muted-foreground tabular-nums">
          {count}/{stepIds.length} steps
        </p>
      </div>
      <Progress
        value={percent}
        aria-label={`${count} of ${stepIds.length} steps complete`}
        className="mt-3 h-1.5 bg-muted [&>[data-slot=progress-indicator]]:bg-brand"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{count === stepIds.length && count > 0 ? "All done. Nice work!" : "Tick steps as you go"}</span>
        {count > 0 && (
          <button
            type="button"
            onClick={resetSteps}
            className="inline-flex items-center gap-1 rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <RotateCcw className="size-3" aria-hidden />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { outline, activeId, activeSectionId } = useDocs();
  const done = useDoneSteps();

  return (
    <nav aria-label="Tutorial sections">
      <ol className="space-y-0.5">
        {outline.map((section, index) => {
          const steps = section.items.filter((item) => item.isStep);
          const complete = steps.length > 0 && steps.every((step) => done.has(step.id));
          const active = section.id === activeSectionId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={onNavigate}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-brand/10 font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md border font-mono text-[11px] tabular-nums transition-colors",
                    active && "border-brand/60 bg-brand text-brand-foreground",
                    complete && !active && "border-green-600/40 bg-green-600/10 text-green-700 dark:text-green-400",
                  )}
                >
                  {complete ? <Check className="size-3.5" aria-label="complete" /> : String(index + 1).padStart(2, "0")}
                </span>
                <span className="leading-snug">{section.title}</span>
              </a>

              {active && section.items.length > 0 && (
                <ul className="mt-0.5 mb-2 ml-[1.35rem] space-y-0.5 border-l pl-4">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center gap-2 rounded-md py-1 text-[13px] leading-snug transition-colors hover:text-foreground",
                          item.id === activeId ? "font-medium text-brand-ink" : "text-muted-foreground",
                        )}
                      >
                        {item.isStep && (
                          <span
                            aria-hidden
                            className={cn(
                              "size-1.5 shrink-0 rounded-full",
                              done.has(item.id) ? "bg-green-600 dark:bg-green-400" : "bg-border",
                            )}
                          />
                        )}
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
