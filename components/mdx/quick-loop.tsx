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
    <section id="the-whole-loop" aria-label="The whole loop in three commands" className="not-prose my-10 scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-brand-ink uppercase">TL;DR</p>
          <p className="mt-1 text-lg font-semibold tracking-tight">The whole loop, in three commands</p>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">The rest of this page explains each one.</p>
      </div>
      <ol className="grid gap-3 md:grid-cols-3">
        {loop.map((item, index) => (
          <li
            key={item.title}
            className="group relative flex flex-col rounded-xl border bg-card p-4 shadow-xs transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-7 place-items-center rounded-full bg-brand/15 font-mono text-xs font-semibold text-brand-ink">
                {index + 1}
              </span>
              <CopyButton text={item.command} className="size-7" />
            </div>
            <p className="mt-3 font-semibold">{item.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
            <code className="mt-3 block rounded-md bg-muted px-2.5 py-2 font-mono text-[11.5px] leading-relaxed break-all">
              {item.command}
            </code>
          </li>
        ))}
      </ol>
    </section>
  );
}
