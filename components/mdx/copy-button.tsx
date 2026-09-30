"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ className }: { className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    // The highlighted <pre> is server-rendered; read its text from the DOM
    // rather than shipping the raw code a second time as a prop.
    const pre = buttonRef.current
      ?.closest("[data-code-block]")
      ?.querySelector("pre");
    if (!pre?.textContent) return;
    try {
      await navigator.clipboard.writeText(pre.textContent.replace(/\n$/, ""));
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
