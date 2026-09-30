"use client";

import { Check } from "lucide-react";
import { toggleStep, useDoneSteps } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

// The numbered circle on each step. Clicking it marks the step done; the
// number itself comes from a CSS counter (see `.step-marker` in globals.css).
export function StepMarker({ id, title }: { id: string; title: string }) {
  const done = useDoneSteps().has(id);

  return (
    <button
      type="button"
      onClick={() => toggleStep(id)}
      aria-pressed={done}
      aria-label={`Mark "${title}" as ${done ? "not done" : "done"}`}
      title={done ? "Completed. Click to undo" : "Mark as done"}
      className={cn(
        "step-marker absolute top-0 -left-[calc(2rem+1rem+0.5px)] grid size-8 place-items-center rounded-full border-4 border-background font-mono text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        done ? "bg-green-600 text-white dark:bg-green-500" : "bg-muted text-foreground hover:bg-brand/20",
      )}
    >
      {done ? <Check className="size-4" strokeWidth={3} aria-hidden /> : <span className="step-number" aria-hidden />}
    </button>
  );
}

export function StepDoneButton({ id }: { id: string }) {
  const done = useDoneSteps().has(id);

  return (
    <button
      type="button"
      onClick={() => toggleStep(id)}
      aria-pressed={done}
      className={cn(
        "mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
        done
          ? "border-green-600/30 bg-green-600/10 text-green-700 dark:text-green-400"
          : "text-muted-foreground hover:border-brand/40 hover:text-foreground",
      )}
    >
      <Check className="size-3.5" aria-hidden />
      {done ? "Done" : "Mark step as done"}
    </button>
  );
}
