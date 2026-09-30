"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { OutlineSection } from "@/lib/outline";

type DocsContextValue = {
  outline: OutlineSection[];
  activeId?: string;
  activeSectionId?: string;
  stepIds: string[];
};

const DocsContext = createContext<DocsContextValue>({ outline: [], stepIds: [] });

export function useDocs() {
  return useContext(DocsContext);
}

export function DocsProvider({
  outline,
  children,
}: {
  outline: OutlineSection[];
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = useState<string>();

  const { ids, sectionOf, stepIds } = useMemo(() => {
    const ids: string[] = [];
    const sectionOf = new Map<string, string>();
    const stepIds: string[] = [];
    for (const section of outline) {
      ids.push(section.id);
      sectionOf.set(section.id, section.id);
      for (const item of section.items) {
        ids.push(item.id);
        sectionOf.set(item.id, section.id);
        if (item.isStep) stepIds.push(item.id);
      }
    }
    return { ids, sectionOf, stepIds };
  }, [outline]);

  useEffect(() => {
    const visible = new Set<string>();
    // A band just under the sticky header: whichever heading is inside it
    // is the one being read. Runs off the scroll path, unlike scroll events.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = ids.find((id) => visible.has(id));
        if (first) setActiveId(first);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  const value = useMemo(
    () => ({
      outline,
      activeId,
      activeSectionId: activeId ? sectionOf.get(activeId) : undefined,
      stepIds,
    }),
    [outline, activeId, sectionOf, stepIds],
  );

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}
