import { Children, cloneElement, isValidElement } from "react";
import { ChevronsRight, FileCode2 } from "lucide-react";
import { CopyButton } from "@/components/mdx/copy-button";
import { cn } from "@/lib/utils";

const languageLabels: Record<string, string> = {
  go: "Go",
  yaml: "YAML",
  yml: "YAML",
  json: "JSON",
};
const terminalLanguages = new Set(["bash", "sh", "shell"]);
const outputLanguages = new Set(["text", "plaintext"]);

type PreProps = React.ComponentProps<"pre"> & { "data-language"?: string; title?: string };

// Replaces MDX's <pre>. It stays a Server Component: the highlighted HTML
// comes from Shiki at build time, and only CopyButton ships JavaScript.
export function CodeBlock({ className, children, title, ...props }: PreProps) {
  const language = props["data-language"] ?? "";
  const isTerminal = terminalLanguages.has(language);
  const isOutput = outputLanguages.has(language);

  return (
    <div
      data-code-block
      data-kind={isTerminal ? "terminal" : isOutput ? "output" : "file"}
      className="group my-5 overflow-hidden rounded-xl border bg-(--code-bg) shadow-xs"
    >
      <div className="flex h-10 items-center gap-2.5 border-b bg-muted/40 pr-1.5 pl-4 text-xs text-muted-foreground">
        {isTerminal ? (
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          </span>
        ) : isOutput ? (
          <ChevronsRight className="size-3.5" aria-hidden />
        ) : (
          <FileCode2 className="size-3.5 text-brand-ink" aria-hidden />
        )}
        <span className={cn("font-mono", title && "text-foreground")}>
          {title ?? (isTerminal ? "Terminal" : isOutput ? "Output" : (languageLabels[language] ?? language))}
        </span>
        {title && languageLabels[language] && (
          <span className="rounded border px-1.5 py-px font-mono text-[10px] uppercase">{languageLabels[language]}</span>
        )}
        <CopyButton className="ml-auto size-7 border-transparent bg-transparent" />
      </div>
      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}

// rehype-pretty-code wraps titled blocks in <figure><figcaption/><pre/></figure>.
// Lift the caption into CodeBlock's header so titles live in one bar.
export function CodeFigure({ children, ...props }: React.ComponentProps<"figure">) {
  if (!("data-rehype-pretty-code-figure" in props)) {
    return <figure {...props}>{children}</figure>;
  }

  let title: string | undefined;
  const rest: React.ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement<{ children?: React.ReactNode }>(child) && child.type === "figcaption") {
      title = Children.toArray(child.props.children).join("");
    } else {
      rest.push(child);
    }
  });

  return (
    <>
      {rest.map((child, i) =>
        isValidElement<PreProps>(child) ? cloneElement(child, { key: i, title }) : child,
      )}
    </>
  );
}
