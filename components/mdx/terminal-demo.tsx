"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Line = { kind: "cmd" | "out" | "ok" | "gap"; text: string };

// Real commands and output from the quickstart run (trimmed), not mock data.
const script: Line[] = [
  { kind: "cmd", text: 'sudo -E env PATH="$PATH" keploy record -c "go run main.go handler.go"' },
  { kind: "out", text: "🐰 Keploy: INFO  Keploy agent is ready to record test cases and mocks." },
  { kind: "gap", text: "" },
  { kind: "cmd", text: "curl -X POST localhost:8080/url \\" },
  { kind: "cmd", text: `  -H 'content-type: application/json' -d '{"url": "https://google.com"}'` },
  { kind: "out", text: '{"ts":1790781506903043746,"url":"http://localhost:8080/Lhr4BWAi"}' },
  { kind: "gap", text: "" },
  { kind: "cmd", text: 'sudo -E env PATH="$PATH" keploy test -c "go run main.go handler.go" --delay 10' },
  { kind: "out", text: '🐰 Keploy: INFO  result {"testcase id": "post-url-1", "passed": "true"}' },
  { kind: "out", text: '🐰 Keploy: INFO  result {"testcase id": "post-url-2", "passed": "true"}' },
  { kind: "out", text: '🐰 Keploy: INFO  result {"testcase id": "get-lhr4bwai-1", "passed": "true"}' },
  { kind: "out", text: '🐰 Keploy: INFO  result {"testcase id": "get-doesnotexist-1", "passed": "true"}' },
  { kind: "ok", text: "Total tests:        4" },
  { kind: "ok", text: "Total test passed:  4" },
  { kind: "ok", text: "Total test failed:  0" },
];

type RenderedLine = { line: Line; text: string; typing: boolean };

function Transcript({ lines, prompt }: { lines: RenderedLine[]; prompt: boolean }) {
  return (
    <>
      {lines.map(({ line, text, typing }, i) => {
        if (line.kind === "gap") return <div key={i} className="h-3" />;
        // A command continued with "\" has no prompt on its second line.
        const continued = line.kind === "cmd" && i > 0 && lines[i - 1].line.text.endsWith("\\");
        return (
          <div
            key={i}
            className={cn(
              "break-words whitespace-pre-wrap",
              line.kind === "out" && "text-[#8b949e]",
              line.kind === "ok" && "font-semibold text-[#3fb950]",
              line.kind === "ok" && lines[i - 1]?.line.kind !== "ok" && "mt-1",
            )}
          >
            {line.kind === "cmd" && !continued && <span className="text-[#ff914d] select-none">$ </span>}
            {text}
            {typing && <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-[#c9d1d9] sm:h-4 sm:w-2" />}
          </div>
        );
      })}
      {prompt && (
        <div>
          <span className="text-[#ff914d]">$ </span>
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-[#c9d1d9] sm:h-4 sm:w-2" />
        </div>
      )}
    </>
  );
}

const OUTPUT_COST = 10; // ticks an output line "takes", so output lands with a beat
const cost = (line: Line) => (line.kind === "cmd" ? line.text.length : OUTPUT_COST);
const TOTAL = script.reduce((sum, line) => sum + cost(line), 0);

export function TerminalDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      if (reduced) {
        timer = setTimeout(() => setTick(TOTAL), 0);
        return;
      }
      timer = setInterval(() => {
        setTick((t) => {
          if (t >= TOTAL) clearInterval(timer);
          return Math.min(t + 1, TOTAL);
        });
      }, 18);
    };

    // Only play once the terminal is actually on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        start();
      }
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [run]);

  let budget = tick;
  const rendered: RenderedLine[] = [];
  for (const line of script) {
    if (budget <= 0) break;
    const c = cost(line);
    if (line.kind === "cmd") {
      rendered.push({ line, text: line.text.slice(0, budget), typing: budget < c });
    } else if (budget >= c) {
      rendered.push({ line, text: line.text, typing: false });
    }
    budget -= c;
  }
  const finished = tick >= TOTAL;

  return (
    <div
      ref={rootRef}
      className="not-prose overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] text-[12.5px] shadow-2xl shadow-brand/10 ring-1 ring-black/5 dark:shadow-black/40"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-3 font-mono text-xs text-white/50">~/samples-go/gin-mongo</span>
        <span className="ml-auto hidden rounded-full border border-white/10 px-2 py-0.5 text-[10.5px] text-white/50 sm:inline">
          real output · trimmed
        </span>
        <button
          type="button"
          onClick={() => {
            setTick(0);
            setRun((r) => r + 1);
          }}
          disabled={!finished}
          aria-label="Replay terminal animation"
          title="Replay"
          className="rounded-md p-1 text-white/50 transition hover:bg-white/10 hover:text-white disabled:opacity-0"
        >
          <RotateCcw className="size-3.5" aria-hidden />
        </button>
      </div>
      {/* Both layers share one grid cell: the invisible full transcript
          reserves the final height, so typing never pushes the page down. */}
      <div
        className="grid grid-cols-[minmax(0,1fr)] px-3.5 py-3.5 font-mono text-[11px] leading-relaxed text-[#c9d1d9] sm:px-4 sm:text-[12.5px]"
        aria-label="Terminal recording of keploy record and keploy test"
        role="img"
      >
        <div aria-hidden className="invisible [grid-area:1/1]">
          <Transcript lines={script.map((line) => ({ line, text: line.text, typing: false }))} prompt />
        </div>
        <div className="[grid-area:1/1]">
          <Transcript lines={rendered} prompt={finished} />
        </div>
      </div>
    </div>
  );
}
