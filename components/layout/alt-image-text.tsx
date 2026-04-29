import type { ReactNode } from "react";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { InView } from "@/components/motion/in-view";
import { ParallaxImage } from "@/components/motion/parallax-image";

type Props = {
  /** Alternates layout: even index = image-left, odd = image-right */
  index: number;
  image: string;
  imageAlt: string;
  /** Optional badge/eyebrow at top of content side */
  badge?: string;
  /** Section anchor id for in-page nav */
  anchorId?: string;
  /** Number above title (e.g. "01", "02") */
  number?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function AltImageText({
  index,
  image,
  imageAlt,
  badge,
  anchorId,
  number,
  title,
  children,
  className = "",
}: Props) {
  const reverse = index % 2 === 1;
  const order = reverse ? "lg:flex-row-reverse" : "";

  return (
    <section
      id={anchorId}
      className={`border-t border-hairline bg-white ${className}`}
    >
      <div className={`shell flex flex-col gap-10 py-20 lg:flex-row lg:items-center lg:gap-16 lg:py-28 ${order}`}>
        <div className="lg:w-1/2">
          <ClipReveal direction="up" duration={1.3}>
            <div className="relative overflow-hidden rounded-[36px]" style={{ aspectRatio: "4/5" }}>
              <ParallaxImage
                src={image}
                alt={imageAlt}
                className="absolute inset-0"
                amount={50}
                scale={1.12}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mochaDeep/30 via-transparent to-transparent" />
            </div>
          </ClipReveal>
        </div>

        <div className="lg:w-1/2">
          {badge ? (
            <InView>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-peach px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-mocha">
                {badge}
              </span>
            </InView>
          ) : null}

          {number ? (
            <InView delay={0.1}>
              <p className="mt-5 font-display text-[5rem] font-extrabold leading-[0.85] tracking-[-0.04em] text-graphite/15 lg:text-[6rem]">
                {number}
              </p>
            </InView>
          ) : null}

          <InView delay={0.2}>
            <h2 className={`${number ? "mt-3" : "mt-7"} font-display text-[clamp(1.875rem,3.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-graphite`}>
              {title}
            </h2>
          </InView>

          <InView delay={0.3}>
            <div className="mt-6">{children}</div>
          </InView>
        </div>
      </div>
    </section>
  );
}
