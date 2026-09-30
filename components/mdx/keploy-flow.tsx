import { ArrowDown, ArrowRight, Database, FileCode2, Server, Terminal, Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Node = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  tone?: "default" | "keploy" | "muted";
};

type Edge = { label: string; artifact?: string };

function FlowNode({ icon: Icon, title, subtitle, tone = "default" }: Node) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-3 rounded-lg border bg-card px-3 py-3 md:flex-col md:px-4 md:py-4 md:text-center",
        tone === "keploy" && "border-brand/50 bg-brand/[0.07]",
        tone === "muted" && "border-dashed opacity-60",
      )}
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-md border bg-background",
          tone === "keploy" && "border-brand/40 text-brand",
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm leading-tight font-semibold">{title}</p>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function FlowEdge({ label, artifact }: Edge) {
  return (
    <div className="flex shrink-0 items-center gap-3 py-1 pl-7 md:w-28 md:flex-col md:justify-center md:gap-1.5 md:px-0 md:py-0 md:text-center">
      <ArrowDown className="size-4 text-muted-foreground md:hidden" aria-hidden />
      <ArrowRight className="hidden size-4 text-muted-foreground md:block" aria-hidden />
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        {artifact && (
          <span className="inline-flex items-center gap-1 rounded-full border border-brand/40 bg-brand/[0.08] px-2 py-0.5 font-mono text-[10.5px] font-medium text-brand">
            <FileCode2 className="size-3" aria-hidden />
            {artifact}
          </span>
        )}
      </div>
    </div>
  );
}

function Flow({ nodes, edges }: { nodes: [Node, Node, Node]; edges: [Edge, Edge] }) {
  return (
    <div className="flex flex-col md:flex-row md:items-stretch">
      <FlowNode {...nodes[0]} />
      <FlowEdge {...edges[0]} />
      <FlowNode {...nodes[1]} />
      <FlowEdge {...edges[1]} />
      <FlowNode {...nodes[2]} />
    </div>
  );
}

function Notes({ items }: { items: string[] }) {
  return (
    <ol className="mt-5 grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
      {items.map((item, i) => (
        <li key={item} className="flex gap-2.5 rounded-md bg-muted/50 px-3 py-2.5">
          <span className="font-mono text-xs font-semibold text-brand">{i + 1}</span>
          <span className="leading-snug">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function KeployFlow() {
  return (
    <figure className="not-prose my-8 rounded-xl border bg-muted/20 p-4 sm:p-5">
      <Tabs defaultValue="record">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <figcaption className="text-sm font-semibold">How Keploy fits around your app</figcaption>
          <TabsList>
            <TabsTrigger value="record">1 · Record</TabsTrigger>
            <TabsTrigger value="test">2 · Test</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="record" className="mt-5">
          <Flow
            nodes={[
              { icon: Terminal, title: "You (curl)", subtitle: "send real requests" },
              { icon: Server, title: "Gin app", subtitle: "runs normally on :8080" },
              { icon: Database, title: "MongoDB", subtitle: "the real database" },
            ]}
            edges={[
              { label: "request + response captured", artifact: "test case" },
              { label: "DB queries captured", artifact: "mock" },
            ]}
          />
          <Notes
            items={[
              "Keploy starts your app for you and watches its network traffic. No code changes, no SDK.",
              "Every API call you make becomes a test case: the request plus the response your app sent back.",
              "Every call your app makes to MongoDB is saved as a mock, so the test won't need the database later.",
            ]}
          />
        </TabsContent>

        <TabsContent value="test" className="mt-5">
          <Flow
            nodes={[
              { icon: Bot, title: "Keploy", subtitle: "replays recorded requests", tone: "keploy" },
              { icon: Server, title: "Gin app", subtitle: "your current code" },
              { icon: Bot, title: "Keploy", subtitle: "answers as MongoDB", tone: "keploy" },
            ]}
            edges={[
              { label: "new response compared to recorded" },
              { label: "queries served from mocks" },
            ]}
          />
          <Notes
            items={[
              "Keploy sends each recorded request to your app again, so you don't write any test code.",
              "When the app queries MongoDB, Keploy answers with the recorded mock, not the real database.",
              "If the new response differs from the recorded one, the test fails and Keploy shows you the diff.",
            ]}
          />
        </TabsContent>
      </Tabs>
    </figure>
  );
}
