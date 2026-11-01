/*
 * Dummy content is shown while you build, so you can see where real content goes,
 * and hidden automatically in a production build so it can never go live by accident.
 * To see placeholders on a deployed preview, set NEXT_PUBLIC_SHOW_PLACEHOLDERS=true in Vercel.
 */
export const SHOW_PLACEHOLDERS =
  process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === 'true'

export function visible<T extends { placeholder?: boolean }>(items: T[]): T[] {
  return items.filter((i) => !i.placeholder || SHOW_PLACEHOLDERS)
}
