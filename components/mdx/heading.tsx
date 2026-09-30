import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type HeadingProps = React.ComponentProps<"h2"> & { as: "h2" | "h3" | "h4" };

// rehype-slug has already put an `id` on the heading; this adds a hover
// anchor so readers can share a link to any section.
export function Heading({ as: Tag, id, children, className, ...props }: HeadingProps) {
  return (
    <Tag id={id} className={cn("group scroll-mt-24", className)} {...props}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 inline-flex translate-y-[-1px] align-middle text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Link2 className="size-4" aria-hidden />
        </a>
      )}
    </Tag>
  );
}
