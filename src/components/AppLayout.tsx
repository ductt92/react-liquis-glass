import * as React from 'react';
import { cx, useControlled } from '../utils';
import { ChevronsLeftIcon, ChevronsRightIcon } from '../icons';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Force row direction. Auto-detected when a `Sider` is a direct child. */
  hasSider?: boolean;
}

/** Flex app shell: compose `Header`, `Sider`, `Content` and `Footer`. */
export const Layout: React.FC<LayoutProps> & {
  Header: typeof Header;
  Sider: typeof Sider;
  Content: typeof Content;
  Footer: typeof Footer;
} = ({ hasSider, className, children, ...rest }) => {
  const withSider =
    hasSider ?? React.Children.toArray(children).some((c) => React.isValidElement(c) && c.type === Sider);
  return (
    <section className={cx('lg-layout', withSider && 'lg-layout-has-sider', className)} {...rest}>
      {children}
    </section>
  );
};

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
}
export const Header: React.FC<HeaderProps> = ({ sticky = true, className, ...rest }) => (
  <header className={cx('lg-layout-header lg-glass', sticky && 'lg-layout-header-sticky', className)} {...rest} />
);

export interface SiderProps extends React.HTMLAttributes<HTMLElement> {
  width?: number | string;
  collapsedWidth?: number;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  /** Custom trigger. `null` hides the built-in trigger. */
  trigger?: React.ReactNode | null;
  /** Stick to the viewport while the page scrolls. */
  sticky?: boolean;
}

const SiderContext = React.createContext<{ collapsed: boolean }>({ collapsed: false });
/** Read the collapsed state of the enclosing `Sider` (e.g. to collapse a `Menu`). */
export const useSider = () => React.useContext(SiderContext);

export const Sider: React.FC<SiderProps> = ({
  width = 248,
  collapsedWidth = 76,
  collapsible,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapse,
  trigger,
  sticky = true,
  className,
  style,
  children,
  ...rest
}) => {
  const [collapsed, setCollapsed] = useControlled(collapsedProp, defaultCollapsed, onCollapse);
  const w = collapsed ? collapsedWidth : width;
  return (
    <SiderContext.Provider value={{ collapsed }}>
      <aside
        className={cx('lg-layout-sider lg-glass', collapsed && 'lg-layout-sider-collapsed', sticky && 'lg-layout-sider-sticky', className)}
        style={{ width: w, flex: `0 0 ${typeof w === 'number' ? `${w}px` : w}`, ...style }}
        {...rest}
      >
        <div className="lg-layout-sider-children">{children}</div>
        {collapsible && trigger !== null && (
          <button
            type="button"
            className="lg-layout-sider-trigger"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed(!collapsed)}
          >
            {trigger ?? (collapsed ? <ChevronsRightIcon /> : <ChevronsLeftIcon />)}
          </button>
        )}
      </aside>
    </SiderContext.Provider>
  );
};

export const Content: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => (
  <main className={cx('lg-layout-content', className)} {...rest} />
);

export const Footer: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => (
  <footer className={cx('lg-layout-footer', className)} {...rest} />
);

Layout.Header = Header;
Layout.Sider = Sider;
Layout.Content = Content;
Layout.Footer = Footer;
