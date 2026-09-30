import { CopyButton } from "@/components/mdx/copy-button";
import { cn } from "@/lib/utils";

const languageLabels: Record<string, string> = {
  bash: "Terminal",
  sh: "Terminal",
  shell: "Terminal",
  text: "Output",
  plaintext: "Output",
  go: "Go",
  yaml: "YAML",
  yml: "YAML",
  json: "JSON",
};

// Replaces MDX's <pre>. It stays a Server Component: the highlighted HTML
// comes from Shiki at build time, and only CopyButton ships JavaScript.
export function CodeBlock({
  className,
  children,
  ...props
}: React.ComponentProps<"pre"> & { "data-language"?: string }) {
  const language = props["data-language"];
  const label = language ? (languageLabels[language] ?? language) : undefined;

  return (
    <div data-code-block className="group relative">
      {label && (
        <span className="pointer-events-none absolute top-2.5 left-4 font-mono text-[11px] font-medium tracking-wide text-muted-foreground uppercase select-none">
          {label}
        </span>
      )}
      <pre className={cn(label && "pt-9", className)} {...props}>
        {children}
      </pre>
      <CopyButton className="absolute top-1.5 right-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100" />
    </div>
  );
}
