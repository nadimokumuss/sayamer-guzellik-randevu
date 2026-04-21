import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

import { classNames } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

function buildClassName(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra?: string) {
  return classNames(
    "btn",
    size === "sm" && "btn-sm",
    size === "md" && "btn-md",
    size === "lg" && "btn-lg",
    variant === "primary" && "btn-primary",
    variant === "outline" && "btn-outline",
    variant === "ghost" && "btn-ghost",
    variant === "link" && "btn-link",
    extra,
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, leadingIcon, trailingIcon, className, children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={buildClassName(variant, size, className)} {...props}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});

export type LinkButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  CommonProps & {
    href: string;
    external?: boolean;
  };

export function LinkButton({
  href,
  external,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const classes = buildClassName(variant, size, className);

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} {...props}>
        {leadingIcon}
        {children}
        {trailingIcon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  );
}
