"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// The root layout is a Server Component, and providers rely on React context,
// so this thin client wrapper is the boundary.
export function ThemeProvider(
  props: React.ComponentProps<typeof NextThemesProvider>,
) {
  return <NextThemesProvider {...props} />;
}
