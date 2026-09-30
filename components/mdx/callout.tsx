import {
  CircleCheck,
  Info,
  Lightbulb,
  OctagonAlert,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "tip" | "warning" | "danger" | "success";

// Full class strings are written out so Tailwind's scanner can see them.
const variants: Record<
  CalloutType,
  { icon: LucideIcon; label: string; className: string; iconClassName: string }
> = {
  info: {
    icon: Info,
    label: "Note",
    className: "border-sky-500/30 bg-sky-500/[0.06]",
    iconClassName: "text-sky-600 dark:text-sky-400",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    className: "border-emerald-500/30 bg-emerald-500/[0.06]",
    iconClassName: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: TriangleAlert,
    label: "Heads up",
    className: "border-amber-500/35 bg-amber-500/[0.07]",
    iconClassName: "text-amber-600 dark:text-amber-400",
  },
  danger: {
    icon: OctagonAlert,
    label: "Careful",
    className: "border-red-500/30 bg-red-500/[0.06]",
    iconClassName: "text-red-600 dark:text-red-400",
  },
  success: {
    icon: CircleCheck,
    label: "Checkpoint",
    className: "border-green-500/30 bg-green-500/[0.06]",
    iconClassName: "text-green-600 dark:text-green-400",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, label, className, iconClassName } = variants[type];

  return (
    <aside
      role="note"
      aria-label={title ?? label}
      className={cn("callout my-6 flex gap-3 rounded-lg border px-4 py-3.5", className)}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", iconClassName)} aria-hidden />
      <div className="min-w-0 flex-1 text-[15px] leading-relaxed">
        <p className="!mt-0 !mb-1 font-semibold">{title ?? label}</p>
        <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2">
          {children}
        </div>
      </div>
    </aside>
  );
}
