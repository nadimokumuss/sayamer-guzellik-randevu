import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";

import { classNames } from "@/lib/utils";

type FieldShellProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  id?: string;
};

export function FieldShell({ label, hint, error, required, id, children }: FieldShellProps) {
  return (
    <div className="flex flex-col">
      {label ? (
        <label htmlFor={id} className="field-label">
          {label}
          {required ? <span className="ml-1 text-rosewood">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-[#b74c4c]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, id, className, ...rest },
  ref,
) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} id={id}>
      <input
        ref={ref}
        id={id}
        required={required}
        className={classNames("field", error && "field-error", className)}
        {...rest}
      />
    </FieldShell>
  );
});

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, required, id, className, rows = 4, ...rest },
  ref,
) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} id={id}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        className={classNames("field", error && "field-error", className)}
        {...rest}
      />
    </FieldShell>
  );
});

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, required, id, className, children, ...rest },
  ref,
) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} id={id}>
      <select
        ref={ref}
        id={id}
        required={required}
        className={classNames("field appearance-none", error && "field-error", className)}
        {...rest}
      >
        {children}
      </select>
    </FieldShell>
  );
});
