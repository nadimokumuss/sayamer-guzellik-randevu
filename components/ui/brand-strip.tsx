type Brand = {
  name: string;
  /** Optional logo file under /public — falls back to styled text if missing or fails to load */
  logoSrc?: string;
};

type Props = {
  brands?: Brand[];
};

const DEFAULT_BRANDS: Brand[] = [
  { name: "L'Oréal Professionnel" },
  { name: "Wella" },
  { name: "Schwarzkopf" },
  { name: "Babor" },
  { name: "Davines" },
  { name: "GHD" },
];

export function BrandStrip({ brands = DEFAULT_BRANDS }: Props) {
  // Duplicate for seamless marquee loop
  const loop = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

      <div className="flex w-max items-center gap-12 animate-marquee sm:gap-16">
        {loop.map((brand, i) => (
          <BrandItem key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center px-3">
      {brand.logoSrc ? (
        <img
          src={brand.logoSrc}
          alt={brand.name}
          className="h-8 w-auto opacity-65 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-9"
        />
      ) : (
        <span className="font-display text-[15px] font-bold uppercase tracking-[0.22em] text-ink-400 transition hover:text-brand-700 sm:text-[16px]">
          {brand.name}
        </span>
      )}
    </span>
  );
}
