import { AppIcon, type AppIconName } from "@/components/ui/app-icon";

type PageIntroStat = {
  label: string;
  value: string;
};

type PageIntroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  icon: AppIconName;
  asideTitle: string;
  asideCopy: string;
  stats?: PageIntroStat[];
};

export function PageIntro({
  eyebrow,
  title,
  copy,
  icon,
  asideTitle,
  asideCopy,
  stats = [],
}: PageIntroProps) {
  return (
    <section className="glass-card page-intro relative overflow-hidden p-8 sm:p-10">
      <div className="page-intro-glow absolute inset-x-0 top-0 h-52" />
      <div className="page-intro-blur absolute -right-10 top-10 h-40 w-40 rounded-full" />

      <div className="relative grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight tracking-tight text-espresso sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#6f5c5e] sm:text-base">
            {copy}
          </p>
        </div>

        <div className="spotlight-panel">
          <div className="flex items-start gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name={icon} className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c7376]">
                Hızlı Özet
              </p>
              <h2 className="mt-2 font-display text-2xl text-espresso">{asideTitle}</h2>
              <p className="mt-2 text-sm leading-7 text-[#6f5c5e]">{asideCopy}</p>
            </div>
          </div>

          {stats.length ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={`${stat.label}-${stat.value}`} className="metric-card">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">
                    {stat.label}
                  </p>
                  <p className="mt-3 font-display text-3xl text-espresso">{stat.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
