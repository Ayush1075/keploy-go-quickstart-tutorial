import { slugify } from "@/lib/slugify";

// Numbering comes from a CSS counter on the container (see `.steps` in
// globals.css), so steps can be reordered without renumbering anything.
export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="steps my-8">{children}</div>;
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = slugify(title);

  return (
    <section className="step" aria-labelledby={id}>
      <h3 id={id} data-toc-title={title} className="step-title scroll-mt-24">
        {title}
      </h3>
      <div className="step-body">{children}</div>
    </section>
  );
}
