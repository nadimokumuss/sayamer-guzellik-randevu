type PageIntroStat = {
  label: string;
  value: string;
};

type PageIntroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  stats?: PageIntroStat[];
};

export function PageIntro({ eyebrow, title, copy, stats = [] }: PageIntroProps) {
  return (
    <section className="shell pt-20 pb-16 lg:pt-32 lg:pb-20">
      <p className="eyebrow-tag">{eyebrow}</p>
      <h1 className="mt-8 max-w-3xl font-display text-display-xl text-graphite">
        {title}
      </h1>
      <p className="mt-8 max-w-2xl text-base leading-8 text-ash">{copy}</p>

      {stats.length ? (
        <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-hairline pt-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={`${stat.label}-${stat.value}`}>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">
                {stat.label}
              </dt>
              <dd className="mt-3 font-display text-2xl text-graphite">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
