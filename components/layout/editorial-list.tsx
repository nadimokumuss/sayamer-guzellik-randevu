import Link from "next/link";

import { InView } from "@/components/motion/in-view";

export type EditorialListItem = {
  id: string;
  title: string;
  href: string;
  /** Optional thumbnail (round, ~44px) */
  image?: string;
  /** Optional meta (price, duration, etc.) on right */
  meta?: string;
  /** Optional description below title */
  description?: string;
};

type Props = {
  items: EditorialListItem[];
  variant?: "pill" | "row";
  className?: string;
};

export function EditorialList({ items, variant = "pill", className = "" }: Props) {
  if (variant === "row") {
    return (
      <ul className={`border-t border-hairline ${className}`}>
        {items.map((item, idx) => (
          <InView key={item.id} delay={idx * 0.06} y={16}>
            <li>
              <Link
                href={item.href}
                className="group flex flex-col gap-3 border-b border-hairline py-6 transition-all hover:pl-2 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="font-display text-xs font-medium tabular-nums text-ash" style={{ minWidth: "2rem" }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item.image ? (
                  <span className="hidden h-11 w-11 shrink-0 overflow-hidden rounded-full sm:block">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </span>
                ) : null}
                <div className="flex-1">
                  <p className="font-display text-xl font-semibold tracking-tight text-graphite group-hover:text-mocha">
                    {item.title}
                  </p>
                  {item.description ? (
                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-ash">{item.description}</p>
                  ) : null}
                </div>
                {item.meta ? (
                  <span className="text-sm tabular-nums text-ash">{item.meta}</span>
                ) : null}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                  <span aria-hidden>↗</span>
                </span>
              </Link>
            </li>
          </InView>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, idx) => (
        <InView key={item.id} delay={idx * 0.06} y={16}>
          <li>
            <Link
              href={item.href}
              className="group flex items-center gap-4 rounded-full border border-hairline bg-white px-3 py-2.5 pr-3 transition hover:border-graphite/30 hover:bg-peachLight/40"
            >
              {item.image ? (
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </span>
              ) : (
                <span className="h-11 w-11 shrink-0 rounded-full bg-peach" />
              )}
              <span className="flex-1 font-display text-base font-semibold tracking-tight text-graphite">
                {item.title}
              </span>
              {item.meta ? (
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                  {item.meta}
                </span>
              ) : null}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                <span aria-hidden>↗</span>
              </span>
            </Link>
          </li>
        </InView>
      ))}
    </ul>
  );
}
