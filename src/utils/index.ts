import * as React from 'react';

export type ClassValue = string | number | false | null | undefined | Record<string, unknown> | ClassValue[];

/** Tiny `classnames` clone. */
export function cx(...args: ClassValue[]): string {
  const out: string[] = [];
  for (const a of args) {
    if (!a) continue;
    if (typeof a === 'string' || typeof a === 'number') out.push(String(a));
    else if (Array.isArray(a)) {
      const inner = cx(...a);
      if (inner) out.push(inner);
    } else for (const k in a) if (a[k]) out.push(k);
  }
  return out.join(' ');
}

export const PREFIX = 'lg';

/** Controlled / uncontrolled state helper. */
export function useControlled<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [inner, setInner] = React.useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? (value as T) : inner;
  const set = React.useCallback(
    (next: T) => {
      if (!isControlled) setInner(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );
  return [current, set] as const;
}

export const useIsoLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

let idCounter = 0;
export function useId(prefix = 'lg'): string {
  const reactId = (React as unknown as { useId?: () => string }).useId?.();
  const [id] = React.useState(() => reactId ?? `${prefix}-${++idCounter}`);
  return id;
}

export function useClickOutside(refs: React.RefObject<HTMLElement>[], handler: (e: MouseEvent | TouchEvent) => void, enabled = true) {
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;
  React.useEffect(() => {
    if (!enabled) return;
    const listener = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (refs.some((r) => r.current && r.current.contains(target))) return;
      handlerRef.current(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

export function useEscape(handler: () => void, enabled = true) {
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;
  React.useEffect(() => {
    if (!enabled) return;
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && handlerRef.current();
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [enabled]);
}

/** Keeps an element mounted during its exit animation. */
export function usePresence(open: boolean, duration = 220) {
  const [mounted, setMounted] = React.useState(open);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const t = setTimeout(() => setMounted(false), duration);
    return () => clearTimeout(t);
  }, [open, duration]);
  return { mounted, visible };
}

/** Locks body scroll while `locked` is true (ref-counted). */
let lockCount = 0;
let prevOverflow = '';
export function useScrollLock(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;
    if (lockCount++ === 0) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (--lockCount === 0) document.body.style.overflow = prevOverflow;
    };
  }, [locked]);
}

export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    for (const r of refs) {
      if (typeof r === 'function') r(node);
      else if (r) (r as React.MutableRefObject<T>).current = node;
    }
  };
}

export type Size = 'sm' | 'md' | 'lg';
export type Status = 'success' | 'warning' | 'error' | 'info';
export type ColorName = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

/**
 * Lower-cases and strips diacritics so search matches "ha noi" ⇄ "Hà Nội".
 * Keeps one output char per input char for precomposed (NFC) text, so indexes line up for highlighting.
 */
export function normalizeText(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase();
}
