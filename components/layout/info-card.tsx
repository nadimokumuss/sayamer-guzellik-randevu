import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  caption?: string;
  value: string;
  href?: string;
};

export function InfoCard({ icon, label, caption, value, href }: Props) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-cardHover"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-600 transition group-hover:bg-brand-200">
        {icon}
      </span>
      <div>
        <p className="font-display text-[18px] font-bold text-ink-900">{label}</p>
        {caption ? <p className="mt-1.5 text-[12px] text-ink-500">{caption}</p> : null}
        <p className="mt-2 text-[15px] font-semibold text-brand-600">{value}</p>
      </div>
    </Wrapper>
  );
}
