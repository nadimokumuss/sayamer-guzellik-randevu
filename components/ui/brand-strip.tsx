type Props = {
  brands?: string[];
};

const DEFAULT_BRANDS = [
  "L'Oréal Professionnel",
  "Wella",
  "Schwarzkopf",
  "Babor",
  "Davines",
  "GHD",
];

export function BrandStrip({ brands = DEFAULT_BRANDS }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
      {brands.map((name, i) => (
        <span
          key={name}
          className="flex items-center gap-10 sm:gap-14"
        >
          <span className="font-display text-[14px] font-bold uppercase tracking-[0.22em] text-ink-400 transition hover:text-brand-700 sm:text-[15px]">
            {name}
          </span>
          {i < brands.length - 1 ? (
            <span
              aria-hidden
              className="hidden h-3 w-px bg-brand-200 sm:inline-block"
            />
          ) : null}
        </span>
      ))}
    </div>
  );
}
