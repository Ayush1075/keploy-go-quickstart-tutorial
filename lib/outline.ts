import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import GithubSlugger from "github-slugger";
import { slugify } from "@/lib/slugify";

export type OutlineItem = { id: string; title: string; isStep: boolean };
export type OutlineSection = { id: string; title: string; items: OutlineItem[] };

// Builds the page outline from the MDX source at build time, so navigation is
// part of the static HTML instead of being scraped from the DOM after load.
export function getOutline(): OutlineSection[] {
  const source = readFileSync(join(process.cwd(), "app", "page.mdx"), "utf8");
  const slugger = new GithubSlugger();
  const sections: OutlineSection[] = [];
  let inFence = false;

  for (const line of source.split(/\r?\n/)) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);
    const step = line.match(/^<Step title="([^"]+)">/);

    if (h2) {
      const title = h2[1].trim();
      sections.push({ id: slugger.slug(title), title, items: [] });
    } else if (h3 && sections.length) {
      const title = h3[1].trim();
      sections.at(-1)!.items.push({ id: slugger.slug(title), title, isStep: false });
    } else if (step && sections.length) {
      const title = step[1];
      sections.at(-1)!.items.push({ id: slugify(title), title, isStep: true });
    }
  }

  return sections;
}
