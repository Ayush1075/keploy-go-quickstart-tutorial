"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, className }: { text?: string; className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    // Inside a code block, the highlighted <pre> is server-rendered; read its
    // text from the DOM rather than shipping the raw code again as a prop.
    const value =
      text ??
      buttonRef.current?.closest("[data-code-block]")?.querySelector("pre")?.textContent;
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value.replace(/\n$/, ""));
      setCopied(true);
    } catch {
      // Clipboard needs a secure context (HTTPS or localhost); fail quietly.
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      title={copied ? "Copied" : "Copy code"}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md border bg-background/80 text-muted-foreground backdrop-blur transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
        className,
      )}
    >
      {copied ? (
        <Check className="size-4 text-green-600 dark:text-green-400" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
