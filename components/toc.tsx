"use client";

import { useEffect, useMemo, useState } from "react";
import { ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; text: string; level: 2 | 3 };

// Headings come from compiled MDX, so the list is read from the DOM after
// mount instead of being maintained by hand.
function useHeadings() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLHeadingElement>(
      "[data-docs-content] :is(h2, h3)[id]",
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- headings only exist in the DOM after mount
    setItems(
      Array.from(nodes).map((node) => ({
        id: node.id,
        text: node.dataset.tocTitle ?? node.textContent?.trim() ?? "",
        level: node.tagName === "H2" ? 2 : 3,
      })),
    );
  }, []);

  return items;
}

function useActiveId(ids: string[]) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    if (ids.length === 0) return;
    const visible = new Set<string>();

    // IntersectionObserver runs off the main scroll path, unlike a scroll
    // listener. The band sits just below the sticky header.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = ids.find((id) => visible.has(id));
        if (first) setActiveId(first);
      },
      { rootMargin: "-72px 0px -65% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function TocList({ items, activeId }: { items: TocItem[]; activeId?: string }) {
  return (
    <ul className="space-y-1 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={item.id === activeId ? "location" : undefined}
            className={cn(
              "block rounded-sm border-l-2 border-transparent py-1 leading-snug text-muted-foreground transition-colors hover:text-foreground",
              item.level === 2 ? "pl-3" : "pl-6 text-[13px]",
              item.id === activeId && "border-brand font-medium text-foreground",
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents() {
  const items = useHeadings();
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveId(ids);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <ListTree className="size-4" aria-hidden />
        On this page
      </p>
      <div className="border-l">
        <TocList items={items} activeId={activeId} />
      </div>
    </nav>
  );
}

export function MobileTableOfContents() {
  const items = useHeadings();

  // The shell renders on the server so the page doesn't shift when the list
  // fills in; native <details> keeps it accessible and JS-free to toggle.
  return (
    <details className="group mb-8 rounded-lg border bg-muted/40 xl:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium">
        <span className="flex items-center gap-2">
          <ListTree className="size-4" aria-hidden />
          On this page
        </span>
        <span className="text-muted-foreground transition-transform group-open:rotate-90" aria-hidden>
          ›
        </span>
      </summary>
      <div className="border-t px-2 py-3">
        <TocList items={items} />
      </div>
    </details>
  );
}
