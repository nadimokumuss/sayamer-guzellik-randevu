import { AppIcon } from "@/components/ui/app-icon";
import { PageIntro } from "@/components/ui/page-intro";
import { getCatalog, getCategoryById } from "@/lib/catalog";
import { getInitials } from "@/lib/utils";

export default function AdminStaffPage() {
  const catalog = getCatalog();
  const grouped = catalog.staff.reduce<Record<string, typeof catalog.staff>>((accumulator, member) => {
    accumulator[member.categoryId] = accumulator[member.categoryId] || [];
    accumulator[member.categoryId].push(member);
    return accumulator;
  }, {});

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Personeller"
        title="Hizmet başına uzman ekibi"
        copy="Ekip kartları biyografi duvarı gibi akmak yerine rol, imza alanı ve uzmanlık rozetleriyle daha okunabilir hale getirildi."
        icon="users"
        asideTitle="Profil odaklı ekip görünümü"
        asideCopy="Kategori başlıkları ekipleri ayırır; her kartta önce isim ve imza alanı, sonra detaylar görünür."
        stats={[
          { label: "Toplam uzman", value: String(catalog.staff.length) },
          { label: "Kategori", value: String(catalog.categories.length) },
          { label: "Çalışma modeli", value: "Uzman bazlı" },
          { label: "Görünüm", value: "Profil kartları" },
        ]}
      />

      <div className="space-y-5">
        {Object.entries(grouped).map(([categoryId, members]) => (
          <section key={categoryId} className="glass-card p-6">
            <div className="flex items-center gap-4">
              <span className="icon-badge icon-badge-lg">
                <AppIcon name="users" className="h-7 w-7" />
              </span>
              <div>
                <span className="eyebrow">{getCategoryById(categoryId)?.name}</span>
                <h2 className="mt-4 font-display text-3xl text-espresso">
                  {getCategoryById(categoryId)?.heroLine}
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {members.map((member) => (
                <article key={member.id} className="rounded-[28px] bg-[#fcf7f3] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">{member.title}</p>
                      <h3 className="mt-3 font-display text-3xl text-espresso">{member.name}</h3>
                    </div>
                    <span className="icon-badge h-14 w-14 rounded-[20px] bg-white/80 font-display text-xl text-rosewood">
                      {getInitials(member.name)}
                    </span>
                  </div>

                  <div className="mt-4 rounded-[22px] bg-white/75 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#8c7376]">İmza alanı</p>
                    <p className="mt-2 font-medium text-espresso">{member.signature}</p>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#6f5c5e]">{member.bio}</p>
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
