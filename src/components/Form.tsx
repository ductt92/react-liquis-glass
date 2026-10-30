import * as React from 'react';
import { cx, useId } from '../utils';

type Layout = 'vertical' | 'horizontal' | 'inline';
const FormContext = React.createContext<{ layout: Layout; labelWidth?: number | string }>({ layout: 'vertical' });

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  layout?: Layout;
  /** Label column width for horizontal layout. */
  labelWidth?: number | string;
}

/** Layout-only form wrapper. Bring your own state / validation library (react-hook-form, formik…). */
export const Form: React.FC<FormProps> & { Item: typeof FormItem } = ({ layout = 'vertical', labelWidth = 120, className, ...rest }) => (
  <FormContext.Provider value={{ layout, labelWidth }}>
    <form className={cx('lg-form', `lg-form-${layout}`, className)} {...rest} />
  </FormContext.Provider>
);

export interface FormItemProps {
  label?: React.ReactNode;
  required?: boolean;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  status?: 'error' | 'warning' | 'success';
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const FormItem: React.FC<FormItemProps> = ({ label, required, help, extra, status, htmlFor, className, style, children }) => {
  const { layout, labelWidth } = React.useContext(FormContext);
  const autoId = useId('lg-field');
  const id = htmlFor ?? autoId;
  const helpId = help ? `${id}-help` : undefined;
  let child = children;
  if (React.isValidElement(children) && !htmlFor) {
    const p = children.props as Record<string, unknown>;
    child = React.cloneElement(children as React.ReactElement<any>, {
      id: p.id ?? id,
      'aria-describedby': helpId,
      status: p.status ?? (status === 'error' || status === 'warning' ? status : undefined),
    });
  }
  return (
    <div className={cx('lg-form-item', status && `lg-form-item-${status}`, className)} style={style}>
      {label != null && (
        <label className="lg-form-label" htmlFor={id} style={layout === 'horizontal' ? { width: labelWidth } : undefined}>
          {required && <span className="lg-form-required" aria-hidden>*</span>}
          {label}
        </label>
      )}
      <div className="lg-form-control">
        {child}
        {help && (
          <div id={helpId} className="lg-form-help" role={status === 'error' ? 'alert' : undefined}>
            {help}
          </div>
        )}
        {extra && <div className="lg-form-extra">{extra}</div>}
      </div>
    </div>
  );
};

Form.Item = FormItem;
