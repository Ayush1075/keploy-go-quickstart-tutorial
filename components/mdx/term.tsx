import { BookOpen } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Inline glossary: jargon gets a dotted underline and a short definition on
// hover or keyboard focus, so beginners aren't left behind mid-sentence.
export function Term({
  children,
  title,
  tip,
}: {
  children: React.ReactNode;
  title: string;
  tip: string;
}) {
  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <span
          tabIndex={0}
          className="cursor-help rounded-sm underline decoration-brand/60 decoration-dotted decoration-2 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 text-sm">
        <p className="flex items-center gap-1.5 font-semibold">
          <BookOpen className="size-3.5 text-brand-ink" aria-hidden />
          {title}
        </p>
        <p className="mt-1.5 leading-relaxed text-muted-foreground">{tip}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
