import Link from "next/link";

import { InView } from "@/components/motion/in-view";
import type { StaffMember } from "@/lib/types";

type Props = {
  staff: StaffMember;
  /** When provided, card becomes a link (used in booking flow) */
  href?: string;
  /** Animation reveal delay */
  delay?: number;
  /** Optional category label badge */
  category?: string;
};

export function StaffBentoCard({ staff, href, delay = 0, category }: Props) {
  const initials = staff.name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  const inner = (
    <div className="group relative flex h-full flex-col rounded-[28px] border border-hairline bg-white p-6 transition hover:-translate-y-1 hover:border-graphite/25 hover:shadow-[0_30px_70px_-30px_rgba(43,29,27,0.4)]">
      {/* Top: avatar + arrow */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="grid h-20 w-20 place-items-center rounded-full font-display text-2xl font-extrabold text-white shadow-inner"
          style={{ background: staff.gradient || "linear-gradient(135deg, #2b1d1b 0%, #925c61 100%)" }}
          aria-hidden
        >
          {initials}
        </div>
        {href ? (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
            <span aria-hidden>↗</span>
          </span>
        ) : null}
      </div>

      {/* Name + title */}
      <div className="mt-5">
        {category ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rosewood">
            {category}
          </p>
        ) : null}
        <p className={`${category ? "mt-2" : ""} font-display text-xl font-extrabold tracking-tight text-graphite`}>
          {staff.name}
        </p>
        <p className="mt-1 text-sm text-ash">{staff.title}</p>
      </div>

      {/* Signature quote */}
      {staff.signature ? (
        <p className="mt-5 font-display text-sm italic leading-6 text-graphite/80">
          &ldquo;{staff.signature}&rdquo;
        </p>
      ) : null}

      {/* Bio (small) */}
      {staff.bio ? (
        <p className="mt-3 line-clamp-3 text-xs leading-5 text-ash">{staff.bio}</p>
      ) : null}

      {/* Specialty pills */}
      {staff.specialties.length > 0 ? (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {staff.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="inline-flex items-center rounded-full bg-peachLight px-2.5 py-1 text-[10px] font-semibold tracking-tight text-mocha"
            >
              {spec}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <InView delay={delay} y={32}>
      {href ? <Link href={href}>{inner}</Link> : inner}
    </InView>
  );
}
