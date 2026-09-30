import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { Heading } from "@/components/mdx/heading";
import { KeployFlow } from "@/components/mdx/keploy-flow";
import { Screenshot } from "@/components/mdx/screenshot";
import { Step, Steps } from "@/components/mdx/steps";
import { Todo } from "@/components/mdx/todo";
import { MobileTableOfContents } from "@/components/toc";
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
  Callout,
  Steps,
  Step,
  Screenshot,
  KeployFlow,
  Todo,
  OnThisPage: MobileTableOfContents,

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
