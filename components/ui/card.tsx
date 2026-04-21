import { type HTMLAttributes, type ReactNode } from "react";

import { classNames } from "@/lib/utils";

type CardVariant = "default" | "editorial" | "muted" | "ghost";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padded?: boolean;
};

export function Card({ variant = "default", padded = true, className, children, ...rest }: CardProps) {
  const variantClass =
    variant === "editorial"
      ? "card-editorial"
      : variant === "muted"
        ? "card-muted"
        : variant === "ghost"
          ? "card-ghost"
          : "card";

  const padding = padded && variant !== "muted" && variant !== "ghost" ? "p-6 sm:p-8" : undefined;

  return (
    <div className={classNames(variantClass, padding, className)} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames("flex flex-col gap-2", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={classNames("font-display text-2xl text-espresso", className)} {...rest}>
      {children}
    </h3>
  );
}

export function CardBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames("text-sm leading-7 text-ink-500", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames("mt-6 flex flex-wrap items-center gap-3", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardDivider({ className }: { className?: string }) {
  return <div className={classNames("my-4 h-px w-full bg-line", className)} />;
}

export function CardMedia({
  children,
  className,
  aspect = "4/3",
}: {
  children: ReactNode;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={classNames("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: aspect }}
    >
      {children}
    </div>
  );
}
