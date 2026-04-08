import { getCatalog, getCategoryById } from "@/lib/catalog";

export default function AdminStaffPage() {
  const catalog = getCatalog();
  const grouped = catalog.staff.reduce<Record<string, typeof catalog.staff>>((accumulator, member) => {
    accumulator[member.categoryId] = accumulator[member.categoryId] || [];
    accumulator[member.categoryId].push(member);
    return accumulator;
  }, {});

  return (
    <div className="space-y-6">
      <section className="glass-card p-8">
        <span className="eyebrow">Personeller</span>
        <h1 className="mt-5 font-display text-5xl tracking-tight text-espresso">
          Hizmet başına uzman ekibi
        </h1>
      </section>

      <div className="space-y-5">
        {Object.entries(grouped).map(([categoryId, members]) => (
          <section key={categoryId} className="glass-card p-6">
            <h2 className="font-display text-3xl text-espresso">
              {getCategoryById(categoryId)?.name}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {members.map((member) => (
                <article key={member.id} className="rounded-[24px] bg-[#fcf7f3] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">{member.title}</p>
                  <h3 className="mt-3 font-display text-3xl text-espresso">{member.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{member.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full border border-rosewood/10 bg-white/70 px-3 py-2 text-xs text-[#6f5c5e]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
