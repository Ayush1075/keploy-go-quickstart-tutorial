"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CircleCheck, CornerDownRight, Hash, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useDocs } from "@/components/docs/docs-provider";
import { GitHubIcon } from "@/components/icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { siteConfig } from "@/lib/site";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { outline } = useDocs();
  const { resolvedTheme, setTheme } = useTheme();
  // Server HTML assumes "Ctrl"; the client swaps in ⌘ on Macs without a mismatch.
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => false,
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !isTyping(event))) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function run(action: () => void) {
    setOpen(false);
    action();
  }

  function goTo(id: string) {
    run(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded-lg border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring md:w-60"
      >
        <Search className="size-4" aria-hidden />
        <span className="hidden md:inline">Jump to a section…</span>
        <span className="sr-only md:hidden">Search sections</span>
        <kbd className="ml-auto hidden rounded border bg-background px-1.5 font-mono text-[10px] font-medium md:inline">
          {isMac ? "⌘ K" : "Ctrl K"}
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Jump to a section" description="Search the tutorial's sections and steps">
        <CommandInput placeholder="Search sections and steps…" />
        <CommandList>
          <CommandEmpty>No matching section.</CommandEmpty>
          {outline.map((section) => (
            <CommandGroup key={section.id} heading={section.title}>
              <CommandItem value={section.title} onSelect={() => goTo(section.id)}>
                <Hash aria-hidden />
                {section.title}
              </CommandItem>
              {section.items.map((item) => (
                <CommandItem key={item.id} value={`${section.title} ${item.title}`} onSelect={() => goTo(item.id)}>
                  {item.isStep ? <CircleCheck aria-hidden /> : <CornerDownRight aria-hidden />}
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}>
              {resolvedTheme === "dark" ? <Sun aria-hidden /> : <Moon aria-hidden />}
              Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode
            </CommandItem>
            <CommandItem onSelect={() => run(() => window.open(siteConfig.repo, "_blank", "noopener"))}>
              <GitHubIcon />
              View source on GitHub
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function noopSubscribe() {
  return () => {};
}

function isTyping(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null;
  return !!target?.closest("input, textarea, [contenteditable=true]");
}
