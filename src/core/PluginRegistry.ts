import type { DebugToolPlugin } from './types';

/**
 * Merge built-in plugins with custom plugins.
 * Custom plugins with same id override built-in.
 * disableBuiltIn removes those ids from the result.
 * Result is sorted by order (default 100).
 */
export function mergePlugins(
  builtIn: DebugToolPlugin[],
  custom: DebugToolPlugin[] = [],
  disableIds: string[] = []
): DebugToolPlugin[] {
  const filtered = [...builtIn, ...custom].filter(
    (p) => !disableIds.includes(p.id)
  );
  const byId = new Map<string, DebugToolPlugin>();
  for (const p of filtered) {
    byId.set(p.id, p);
  }
  return Array.from(byId.values()).sort(
    (a, b) => (a.order ?? 100) - (b.order ?? 100)
  );
}
