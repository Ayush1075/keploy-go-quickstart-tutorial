"use client";

import { useSyncExternalStore } from "react";

// Completed tutorial steps, persisted per browser. There's no backend, so
// localStorage is the store; useSyncExternalStore keeps every subscriber
// (step markers, sidebar progress) in sync without a context provider.
const KEY = "keploy-go-tutorial:done-steps";
const listeners = new Set<() => void>();
const EMPTY: ReadonlySet<string> = new Set();
let cache: ReadonlySet<string> | null = null;

function read(): ReadonlySet<string> {
  if (cache) return cache;
  try {
    cache = new Set(JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[]);
  } catch {
    cache = new Set();
  }
  return cache;
}

function write(next: Set<string>) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify([...next]));
  } catch {
    // Private mode or blocked storage: progress just won't persist.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useDoneSteps() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function toggleStep(id: string) {
  const next = new Set(read());
  if (next.has(id)) next.delete(id);
  else next.add(id);
  write(next);
}

export function resetSteps() {
  write(new Set());
}
