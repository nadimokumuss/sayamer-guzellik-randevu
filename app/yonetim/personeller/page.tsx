import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getCatalog, getCategoryById } from "@/lib/catalog";
import { getInitials } from "@/lib/utils";

export default function AdminStaffPage() {
  const catalog = getCatalog();
  const grouped = catalog.staff.reduce<Record<string, typeof catalog.staff>>(
    (accumulator, member) => {
      accumulator[member.categoryId] = accumulator[member.categoryId] || [];
      accumulator[member.categoryId].push(member);
      return accumulator;
    },
    {},
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Personeller"
        title="Hizmet başına uzman ekibi"
        copy="Ekip kartları rol, imza alanı ve uzmanlık rozetleriyle daha okunabilir hale getirildi."
        stats={[
          { label: "Toplam uzman", value: String(catalog.staff.length) },
          { label: "Kategori", value: String(catalog.categories.length) },
          { label: "Model", value: "Uzman bazlı" },
          { label: "Görünüm", value: "Profil kartları" },
        ]}
      />

      <div className="space-y-6">
        {Object.entries(grouped).map(([categoryId, members]) => {
          const category = getCategoryById(categoryId);
          return (
            <section key={categoryId} className="rounded-[24px] border border-hairline bg-white p-6">
              <div className="border-b border-hairline pb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                  {category?.name}
                </p>
                <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite">
                  {category?.heroLine}
                </h2>
              </div>

              <ul className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {members.map((member) => (
                  <li
                    key={member.id}
                    className="rounded-2xl border border-hairline p-4 transition hover:border-graphite/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ash">
                          {member.title}
                        </p>
                        <p className="mt-2 font-display text-lg font-extrabold tracking-tight text-graphite">
                          {member.name}
                        </p>
                      </div>
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-base font-extrabold text-white"
                        style={{
                          background:
                            member.gradient || "linear-gradient(135deg, #2b1d1b 0%, #925c61 100%)",
                        }}
                      >
                        {getInitials(member.name)}
                      </span>
                    </div>

                    <div className="mt-4 rounded-xl bg-peachLight/40 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mocha">
                        İmza
                      </p>
                      <p className="mt-1 text-sm italic font-medium text-graphite">
                        &ldquo;{member.signature}&rdquo;
                      </p>
                    </div>

                    <p className="mt-3 line-clamp-3 text-xs leading-5 text-ash">{member.bio}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {member.specialties.slice(0, 4).map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold tracking-tight text-graphite ring-1 ring-hairline"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
