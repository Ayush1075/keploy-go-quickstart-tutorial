import { PencilLine } from "lucide-react";

// Marks a spot that must be filled with real output from the quickstart run.
// Every <Todo> must be gone before the site is deployed.
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-todo
      className="my-6 flex gap-3 rounded-lg border-2 border-dashed border-fuchsia-500/50 bg-fuchsia-500/[0.05] px-4 py-3 text-sm text-fuchsia-900 dark:text-fuchsia-200"
    >
      <PencilLine className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        <strong>TODO (from your run): </strong>
        {children}
      </div>
    </div>
  );
}
