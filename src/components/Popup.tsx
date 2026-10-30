import * as React from 'react';
import { Portal } from './ConfigProvider';
import { cx, useClickOutside, useEscape, useIsoLayoutEffect, usePresence, mergeRefs } from '../utils';

export type Placement =
  | 'top' | 'topLeft' | 'topRight'
  | 'bottom' | 'bottomLeft' | 'bottomRight'
  | 'left' | 'right';

export type Trigger = 'hover' | 'click' | 'focus' | 'manual';

function computePosition(anchor: DOMRect, pop: DOMRect, placement: Placement, offset: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let p = placement;
  // flip vertically when there is no room
  if (p.startsWith('bottom') && anchor.bottom + offset + pop.height > vh && anchor.top - offset - pop.height > 0)
    p = p.replace('bottom', 'top') as Placement;
  else if (p.startsWith('top') && anchor.top - offset - pop.height < 0 && anchor.bottom + offset + pop.height < vh)
    p = p.replace('top', 'bottom') as Placement;
  else if (p === 'left' && anchor.left - offset - pop.width < 0) p = 'right';
  else if (p === 'right' && anchor.right + offset + pop.width > vw) p = 'left';

  let top = 0;
  let left = 0;
  if (p.startsWith('bottom')) top = anchor.bottom + offset;
  if (p.startsWith('top')) top = anchor.top - offset - pop.height;
  if (p === 'top' || p === 'bottom') left = anchor.left + anchor.width / 2 - pop.width / 2;
  if (p === 'topLeft' || p === 'bottomLeft') left = anchor.left;
  if (p === 'topRight' || p === 'bottomRight') left = anchor.right - pop.width;
  if (p === 'left' || p === 'right') {
    top = anchor.top + anchor.height / 2 - pop.height / 2;
    left = p === 'left' ? anchor.left - offset - pop.width : anchor.right + offset;
  }
  left = Math.max(8, Math.min(left, vw - pop.width - 8));
  top = Math.max(8, Math.min(top, vh - pop.height - 8));
  return { top, left, placement: p };
}

export interface PopupProps {
  content: React.ReactNode;
  children: React.ReactElement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: Trigger | Trigger[];
  placement?: Placement;
  offset?: number;
  /** Match the popup width to the trigger width. */
  matchWidth?: boolean;
  disabled?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  arrow?: boolean;
  role?: string;
}

/** Internal floating layer used by Tooltip, Popover, Dropdown, Select, DatePicker… */
export const Popup = React.forwardRef<HTMLDivElement, PopupProps>(function Popup(
  {
    content,
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    trigger = 'hover',
    placement = 'bottom',
    offset = 8,
    matchWidth,
    disabled,
    mouseEnterDelay = 80,
    mouseLeaveDelay = 120,
    className,
    style,
    arrow,
    role,
  },
  ref,
) {
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = !disabled && (isControlled ? !!openProp : innerOpen);
  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!isControlled) setInnerOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );
  const triggers = Array.isArray(trigger) ? trigger : [trigger];
  const anchorRef = React.useRef<HTMLElement>(null);
  const popRef = React.useRef<HTMLDivElement>(null);
  // Portal mounts a tick later, so track the node to re-run positioning once it exists.
  const [popNode, setPopNode] = React.useState<HTMLDivElement | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();
  const { mounted, visible } = usePresence(open, 160);
  const [pos, setPos] = React.useState<{ top: number; left: number; placement: Placement; width?: number }>({
    top: -9999,
    left: -9999,
    placement,
  });

  const update = React.useCallback(() => {
    const a = anchorRef.current;
    const p = popRef.current;
    if (!a || !p) return;
    const ar = a.getBoundingClientRect();
    if (matchWidth) p.style.minWidth = `${ar.width}px`;
    const next = computePosition(ar, p.getBoundingClientRect(), placement, offset);
    setPos({ ...next, width: matchWidth ? ar.width : undefined });
  }, [placement, offset, matchWidth]);

  useIsoLayoutEffect(() => {
    if (!mounted || !popNode) return;
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : undefined;
    ro?.observe(popNode);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      ro?.disconnect();
    };
  }, [mounted, popNode, update]);

  useClickOutside([anchorRef, popRef], () => open && setOpen(false), open && (triggers.includes('click') || triggers.includes('manual')));
  useEscape(() => setOpen(false), open);

  const delayed = (v: boolean, ms: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(v), ms);
  };
  React.useEffect(() => () => clearTimeout(timer.current), []);

  const childProps = children.props as Record<string, any>;
  const handlers: Record<string, any> = {};
  if (triggers.includes('click'))
    handlers.onClick = (e: React.MouseEvent) => {
      childProps.onClick?.(e);
      setOpen(!open);
    };
  if (triggers.includes('hover')) {
    handlers.onMouseEnter = (e: React.MouseEvent) => {
      childProps.onMouseEnter?.(e);
      delayed(true, mouseEnterDelay);
    };
    handlers.onMouseLeave = (e: React.MouseEvent) => {
      childProps.onMouseLeave?.(e);
      delayed(false, mouseLeaveDelay);
    };
  }
  if (triggers.includes('focus')) {
    handlers.onFocus = (e: React.FocusEvent) => {
      childProps.onFocus?.(e);
      setOpen(true);
    };
    handlers.onBlur = (e: React.FocusEvent) => {
      childProps.onBlur?.(e);
      setOpen(false);
    };
  }

  const anchor = React.cloneElement(children, {
    ...handlers,
    ref: mergeRefs(anchorRef, (children as any).ref),
    'aria-expanded': role ? open : undefined,
  });

  const side = pos.placement.startsWith('top') ? 'top' : pos.placement.startsWith('bottom') ? 'bottom' : pos.placement;

  return (
    <>
      {anchor}
      {mounted && content != null && (
        <Portal>
          <div
            ref={mergeRefs<HTMLDivElement>(popRef, ref, setPopNode as React.Ref<HTMLDivElement>)}
            role={role}
            className={cx('lg-popup', `lg-popup-${side}`, visible && 'lg-popup-open', className)}
            style={{ top: pos.top, left: pos.left, ...style }}
            onMouseEnter={triggers.includes('hover') ? () => clearTimeout(timer.current) : undefined}
            onMouseLeave={triggers.includes('hover') ? () => delayed(false, mouseLeaveDelay) : undefined}
          >
            {arrow && <span className="lg-popup-arrow" />}
            {typeof content === 'function' ? (content as any)(() => setOpen(false)) : content}
          </div>
        </Portal>
      )}
    </>
  );
});
