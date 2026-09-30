import { slug } from "github-slugger";

// Same algorithm rehype-slug uses, so ids generated from JSX props
// (e.g. <Step title="...">) and from the outline match real heading ids.
export function slugify(text: string) {
  return slug(text);
}
