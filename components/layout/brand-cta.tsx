import Link from "next/link";

type Props = {
  title: string;
  copy?: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
  variant?: "filled" | "outlined";
  align?: "split" | "center";
};

export function BrandCTA({
  title,
  copy,
  primaryCta,
  secondaryCta,
  variant = "filled",
  align = "split",
}: Props) {
  const isFilled = variant === "filled";

  return (
    <section className="shell py-12 lg:py-20">
      <div
        className={`relative overflow-hidden rounded-[28px] px-7 py-12 lg:px-14 lg:py-16 ${
          isFilled
            ? "bg-brand-gradient text-white"
            : "border border-line bg-white text-ink-900"
        }`}
      >
        {isFilled ? (
          <>
            <span className="brand-blob h-72 w-72 animate-pulse-slow" style={{ background: "rgba(255,255,255,0.25)", top: "-30%", left: "-10%" }} />
            <span className="brand-blob h-64 w-64 animate-pulse-slow" style={{ background: "rgba(255,255,255,0.18)", bottom: "-30%", right: "-5%", animationDelay: "2s" }} />
          </>
        ) : null}

        <div
          className={`relative grid items-center gap-6 ${
            align === "center" ? "text-center" : "lg:grid-cols-[1.5fr_auto] lg:gap-10"
          }`}
        >
          <div className={align === "center" ? "mx-auto max-w-2xl" : ""}>
            <h2
              className={`font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight ${
                isFilled ? "text-white" : "text-ink-900"
              }`}
            >
              {title}
            </h2>
            {copy ? (
              <p
                className={`mt-4 text-[15px] leading-7 ${
                  isFilled ? "text-white/85" : "text-ink-500"
                }`}
              >
                {copy}
              </p>
            ) : null}
          </div>

          <div className={`flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : "lg:justify-end"}`}>
            {primaryCta.external ? (
              <a
                href={primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={isFilled ? "btn-pill-white" : "btn-pill-brand"}
              >
                {primaryCta.label}
                <span aria-hidden>→</span>
              </a>
            ) : (
              <Link href={primaryCta.href} className={isFilled ? "btn-pill-white" : "btn-pill-brand"}>
                {primaryCta.label}
                <span aria-hidden>→</span>
              </Link>
            )}
            {secondaryCta ? (
              secondaryCta.external ? (
                <a
                  href={secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    isFilled
                      ? "inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-white/10"
                      : "btn-pill-ghost"
                  }
                >
                  {secondaryCta.label}
                </a>
              ) : (
                <Link
                  href={secondaryCta.href}
                  className={
                    isFilled
                      ? "inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-white/10"
                      : "btn-pill-ghost"
                  }
                >
                  {secondaryCta.label}
                </Link>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
