import { CopyButton } from "@/components/mdx/copy-button";

const loop = [
  {
    title: "Record",
    note: "Keploy starts your app and captures traffic.",
    command: 'sudo -E env PATH="$PATH" keploy record -c "go run main.go handler.go"',
  },
  {
    title: "Use your API",
    note: "Every request becomes a test case.",
    command: `curl -X POST localhost:8080/url -H 'content-type: application/json' -d '{"url": "https://google.com"}'`,
  },
  {
    title: "Replay",
    note: "Keploy re-sends the requests and mocks MongoDB.",
    command: 'sudo -E env PATH="$PATH" keploy test -c "go run main.go handler.go" --delay 10',
  },
];

// A one-glance summary for readers who just want the commands.
export function QuickLoop() {
  return (
    <section id="the-whole-loop" aria-labelledby="the-whole-loop-title" className="not-prose my-10 scroll-mt-24">
      <p className="text-xs font-semibold tracking-wide text-brand-ink uppercase">TL;DR</p>
      <p id="the-whole-loop-title" className="mt-1 text-lg font-semibold tracking-tight">
        The whole loop, in three commands
      </p>
      <p className="mt-1 text-sm text-muted-foreground">The rest of this page explains each one.</p>

      <ol className="mt-4 divide-y overflow-hidden rounded-xl border bg-card shadow-xs">
        {loop.map((item, index) => (
          <li key={item.title} className="flex gap-3 p-4 sm:gap-4 sm:p-5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/15 font-mono text-xs font-semibold text-brand-ink">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {item.title}
                <span className="font-normal text-muted-foreground"> · {item.note}</span>
              </p>
              <div className="mt-2.5 flex items-start gap-2 rounded-lg border bg-muted/50 py-1.5 pr-1.5 pl-3">
                <code className="min-w-0 flex-1 py-1 font-mono text-[12px] leading-relaxed break-words sm:text-[12.5px]">
                  {item.command}
                </code>
                <CopyButton text={item.command} className="size-7 shrink-0 border-transparent bg-transparent" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
