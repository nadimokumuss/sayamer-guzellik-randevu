import { type HTMLAttributes, type ReactNode } from "react";

import { classNames } from "@/lib/utils";

type BadgeVariant = "default" | "soft" | "dark" | "outline";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  leading?: ReactNode;
};

export function Badge({ variant = "default", leading, className, children, ...rest }: BadgeProps) {
  const variantClass =
    variant === "soft"
      ? "badge-soft"
      : variant === "dark"
        ? "badge-dark"
        : variant === "outline"
          ? "badge"
          : "badge";

  return (
    <span className={classNames(variantClass, className)} {...rest}>
      {leading}
      {children}
    </span>
  );
}

export function Eyebrow({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={classNames("eyebrow", className)} {...rest}>
      {children}
    </span>
  );
}
