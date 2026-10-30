import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { globalConfig, ConfigProvider } from './ConfigProvider';
import { Modal, statusIcon } from './Feedback';
import { QuestionCircleIcon } from '../icons';

type Kind = 'confirm' | 'info' | 'success' | 'warning' | 'error';

export interface ConfirmOptions {
  title: React.ReactNode;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okDanger?: boolean;
  /** Return a promise to show a loading OK button until it settles. */
  onOk?: () => void | Promise<unknown>;
  onCancel?: () => void;
  width?: number | string;
  maskClosable?: boolean;
}

export interface ConfirmHandle {
  close: () => void;
  update: (options: Partial<ConfirmOptions>) => void;
}

const kindColor: Record<Kind, string> = {
  confirm: 'var(--lg-warning)',
  info: 'var(--lg-info)',
  success: 'var(--lg-success)',
  warning: 'var(--lg-warning)',
  error: 'var(--lg-danger)',
};

const ConfirmDialog: React.FC<{ kind: Kind; options: ConfirmOptions; closing: boolean; onDone: () => void }> = ({ kind, options, closing, onDone }) => {
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const close = () => {
    setOpen(false);
    setTimeout(onDone, 300);
  };
  React.useEffect(() => {
    if (closing) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing]);
  const cancel = () => {
    options.onCancel?.();
    close();
  };
  const ok = async () => {
    const r = options.onOk?.();
    if (r && typeof (r as Promise<unknown>).then === 'function') {
      setLoading(true);
      try {
        await r;
      } catch {
        setLoading(false);
        return;
      }
    }
    close();
  };
  const isConfirm = kind === 'confirm';
  const icon = options.icon ?? (isConfirm ? <QuestionCircleIcon /> : statusIcon[kind]);
  return (
    <Modal
      open={open}
      onClose={cancel}
      closable={false}
      maskClosable={options.maskClosable ?? false}
      width={options.width ?? 416}
      onOk={ok}
      okText={options.okText ?? 'OK'}
      cancelText={options.cancelText ?? 'Cancel'}
      okLoading={loading}
      okDanger={options.okDanger}
      className="lg-confirm"
      footer={isConfirm ? undefined : null}
    >
      <div className="lg-confirm-body">
        <span className="lg-confirm-icon" style={{ color: kindColor[kind] }}>{icon}</span>
        <div className="lg-confirm-main">
          <div className="lg-confirm-title">{options.title}</div>
          {options.content && <div className="lg-confirm-content">{options.content}</div>}
        </div>
      </div>
      {!isConfirm && (
        <div className="lg-modal-footer lg-confirm-footer">
          <button type="button" className="lg-btn lg-btn-filled lg-btn-primary lg-btn-md lg-glass" onClick={ok} data-autofocus>
            <span className="lg-btn-label">{options.okText ?? 'OK'}</span>
          </button>
        </div>
      )}
    </Modal>
  );
};

function show(kind: Kind, initial: ConfirmOptions): ConfirmHandle {
  if (typeof document === 'undefined') return { close: () => {}, update: () => {} };
  const el = document.createElement('div');
  document.body.appendChild(el);
  const root = createRoot(el);
  let options = initial;
  let closing = false;
  let destroyed = false;
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    setTimeout(() => {
      root.unmount();
      el.remove();
    });
  };
  const render = () => {
    if (destroyed) return;
    const { theme, refraction, vars } = globalConfig.current;
    root.render(
      <ConfigProvider theme={theme} refraction={refraction} style={{ ...vars, display: 'contents' }}>
        <ConfirmDialog kind={kind} options={options} closing={closing} onDone={destroy} />
      </ConfigProvider>,
    );
  };
  render();
  return {
    close: () => {
      closing = true;
      render();
    },
    update: (next) => {
      options = { ...options, ...next };
      render();
    },
  };
}

type ConfirmFn = ((options: ConfirmOptions) => ConfirmHandle) & {
  info: (options: ConfirmOptions) => ConfirmHandle;
  success: (options: ConfirmOptions) => ConfirmHandle;
  warning: (options: ConfirmOptions) => ConfirmHandle;
  error: (options: ConfirmOptions) => ConfirmHandle;
};

/** Imperative dialog: `confirm({ title, onOk })`, `confirm.success({ title })`… */
export const confirm: ConfirmFn = Object.assign((o: ConfirmOptions) => show('confirm', o), {
  info: (o: ConfirmOptions) => show('info', o),
  success: (o: ConfirmOptions) => show('success', o),
  warning: (o: ConfirmOptions) => show('warning', o),
  error: (o: ConfirmOptions) => show('error', o),
});
