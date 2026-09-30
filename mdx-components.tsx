import type { MDXComponents } from "mdx/types";
import { AuthorCard } from "@/components/mdx/author-card";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock, CodeFigure } from "@/components/mdx/code-block";
import { Heading } from "@/components/mdx/heading";
import { Hero } from "@/components/mdx/hero";
import { KeployFlow } from "@/components/mdx/keploy-flow";
import { QuickLoop } from "@/components/mdx/quick-loop";
import { Screenshot } from "@/components/mdx/screenshot";
import { Step, Steps } from "@/components/mdx/steps";
import { Term } from "@/components/mdx/term";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// The vocabulary available inside every .mdx file, without import lines.
const components = {
  // Markdown element overrides
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  h4: (props) => <Heading as="h4" {...props} />,
  pre: CodeBlock,
  figure: CodeFigure,
  // The frame scrolls sideways on small screens; the table fills its width.
  table: (props) => (
    <div className="table-frame my-6 overflow-x-auto rounded-xl border">
      <table {...props} />
    </div>
  ),
  a: ({ href = "", ...props }) => {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noreferrer" })}
        {...props}
      />
    );
  },

  // Tutorial components
  Hero,
  QuickLoop,
  Callout,
  Steps,
  Step,
  Screenshot,
  KeployFlow,
  Term,
  AuthorCard,

  // shadcn/ui primitives
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
