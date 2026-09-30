// Matches rehype-slug closely enough for ids generated from JSX props
// (e.g. <Step title="...">), which rehype-slug never sees.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
