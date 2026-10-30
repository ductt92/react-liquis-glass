import * as React from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../utils';

export type ThemeMode = 'light' | 'dark';

export interface ThemeTokens {
  /** Accent / primary color, any CSS color. */
  accent?: string;
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
  /** Base corner radius in px. */
  radius?: number;
  /** Backdrop blur strength in px. */
  blur?: number;
  /** Font family override. */
  fontFamily?: string;
}

export interface ConfigProviderProps extends ThemeTokens {
  theme?: ThemeMode;
  /** Enables the SVG displacement "refraction" on glass surfaces (Chromium only). */
  refraction?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface ConfigContextValue {
  theme: ThemeMode;
  refraction: boolean;
  vars: React.CSSProperties;
}

const ConfigContext = React.createContext<ConfigContextValue>({ theme: 'light', refraction: false, vars: {} });

export const useConfig = () => React.useContext(ConfigContext);

/** Shared theme state so imperative APIs (message, notification) can follow the active provider. */
export const globalConfig: { current: ConfigContextValue } = {
  current: { theme: 'light', refraction: false, vars: {} },
};

function tokensToVars(t: ThemeTokens): React.CSSProperties {
  const v: Record<string, string> = {};
  if (t.accent) v['--lg-accent'] = t.accent;
  if (t.success) v['--lg-success'] = t.success;
  if (t.warning) v['--lg-warning'] = t.warning;
  if (t.danger) v['--lg-danger'] = t.danger;
  if (t.info) v['--lg-info'] = t.info;
  if (t.radius != null) {
    v['--lg-radius'] = `${t.radius}px`;
    v['--lg-radius-sm'] = `${Math.round(t.radius * 0.7)}px`;
    v['--lg-radius-lg'] = `${Math.round(t.radius * 1.6)}px`;
  }
  if (t.blur != null) v['--lg-blur'] = `${t.blur}px`;
  if (t.fontFamily) v['--lg-font'] = t.fontFamily;
  return v as React.CSSProperties;
}

/** SVG filter used for the optional liquid refraction effect. Rendered once by the provider. */
export const LiquidGlassFilter: React.FC = () => (
  <svg aria-hidden width="0" height="0" style={{ position: 'absolute', width: 0, height: 0 }}>
    <filter id="lg-refraction" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
      <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
      <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

/**
 * Root provider. Sets theme (light/dark), design tokens and makes them available to
 * portalled layers (Modal, Drawer, Tooltip, Select…).
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  theme = 'light',
  refraction = false,
  className,
  style,
  children,
  ...tokens
}) => {
  const vars = React.useMemo(
    () => tokensToVars(tokens),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokens.accent, tokens.success, tokens.warning, tokens.danger, tokens.info, tokens.radius, tokens.blur, tokens.fontFamily],
  );
  const value = React.useMemo(() => ({ theme, refraction, vars }), [theme, refraction, vars]);
  React.useEffect(() => {
    globalConfig.current = value;
  }, [value]);
  return (
    <ConfigContext.Provider value={value}>
      <div
        className={cx('lg-root', refraction && 'lg-refraction', className)}
        data-lg-theme={theme}
        style={{ ...vars, ...style }}
      >
        {refraction && <LiquidGlassFilter />}
        {children}
      </div>
    </ConfigContext.Provider>
  );
};

/** Renders children into document.body while keeping theme tokens. */
export const Portal: React.FC<{ children: React.ReactNode; container?: HTMLElement | null }> = ({ children, container }) => {
  const { theme, refraction, vars } = useConfig();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div className={cx('lg-root lg-portal', refraction && 'lg-refraction')} data-lg-theme={theme} style={vars}>
      {children}
    </div>,
    container ?? document.body,
  );
};
