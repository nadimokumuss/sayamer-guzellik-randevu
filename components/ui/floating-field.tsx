"use client";

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

import { classNames } from "@/lib/utils";

type CommonProps = {
  label: string;
  hint?: string;
  error?: boolean;
  className?: string;
};

type InputProps = CommonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder" | "className"> & {
    multiline?: false;
  };

type TextareaProps = CommonProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder" | "className"> & {
    multiline: true;
  };

type Props = InputProps | TextareaProps;

const baseField =
  "peer block w-full appearance-none border-0 border-b border-hairline bg-transparent px-0 pt-7 pb-2 text-graphite caret-graphite transition-colors placeholder:text-transparent focus:border-graphite focus:outline-none focus:ring-0";

const labelBase =
  "pointer-events-none absolute left-0 top-7 origin-left text-base text-ash transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] " +
  // Floats up on focus or when value is present
  "peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-graphite " +
  "peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.22em]";

const underlineBase =
  "pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 bg-graphite transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] peer-focus:scale-x-100";

export function FloatingField(props: Props) {
  const { label, hint, error, className, ...rest } = props;
  const generatedId = useId();
  const fieldId = (rest as { id?: string }).id ?? generatedId;

  if (props.multiline) {
    const { multiline: _multiline, ...textareaProps } = rest as TextareaProps;
    return (
      <div className={classNames("relative", className ?? "")}>
        <textarea
          {...(textareaProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={fieldId}
          placeholder=" "
          className={classNames(baseField, "min-h-[120px] resize-none", error ? "border-rose-500" : "")}
        />
        <label htmlFor={fieldId} className={labelBase}>
          {label}
        </label>
        <span className={underlineBase} />
        {hint ? (
          <span className="mt-2 block text-[11px] uppercase tracking-[0.18em] text-ash">{hint}</span>
        ) : null}
      </div>
    );
  }

  const { multiline: _m, ...inputProps } = rest as InputProps & { multiline?: false };

  return (
    <div className={classNames("relative", className ?? "")}>
      <input
        {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
        id={fieldId}
        placeholder=" "
        className={classNames(baseField, error ? "border-rose-500" : "")}
      />
      <label htmlFor={fieldId} className={labelBase}>
        {label}
      </label>
      <span className={underlineBase} />
      {hint ? (
        <span className="mt-2 block text-[11px] uppercase tracking-[0.18em] text-ash">{hint}</span>
      ) : null}
    </div>
  );
}
