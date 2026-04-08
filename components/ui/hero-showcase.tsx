"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { AppIcon } from "@/components/ui/app-icon";
import { Campaign, Testimonial } from "@/lib/types";

type HeroShowcaseProps = {
  campaigns: Campaign[];
  testimonials: Testimonial[];
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HeroShowcase({ campaigns, testimonials }: HeroShowcaseProps) {
  return (
    <section className="shell grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="glass-card relative overflow-hidden p-8 sm:p-10"
      >
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-br from-[#f6dede]/80 via-transparent to-[#dfe5d8]/35" />
        <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-white/35 blur-2xl" />

        <div className="relative">
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Sayamer deneyimi</span>
            <span className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#8c7376]">
              müşteri + salon aynı akış
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-6 max-w-2xl font-display text-4xl leading-tight tracking-tight text-espresso sm:text-6xl"
          >
            Randevu deneyimini daha az yazı, daha çok yön hissiyle yeniden kurduk.
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-6 max-w-xl text-base leading-8 text-[#6f5c5e]">
            Müşteri tarafında hizmet, uzman, gün ve saat seçimi; salon tarafında takvim,
            uygunluk ve randevu yönetimi aynı görsel sistem içinde akıyor.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
            <Link href="/randevu" className="soft-button">
              Hizmetlerden Başla
            </Link>
            <Link href="/yonetim" className="soft-button-secondary">
              Paneli İncele
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "layers", value: "9", label: "kategori kümesi" },
              { icon: "users", value: "27", label: "uzman profili" },
              { icon: "calendar", value: "4 adım", label: "rezervasyon akışı" },
            ].map((stat) => (
              <div key={stat.label} className="metric-card">
                <span className="icon-badge h-11 w-11 rounded-[18px]">
                  <AppIcon
                    name={stat.icon as "layers" | "users" | "calendar"}
                    className="h-5 w-5"
                  />
                </span>
                <p className="mt-4 font-display text-4xl text-espresso">{stat.value}</p>
                <p className="mt-2 text-sm text-[#7b6668]">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "Hizmeti seç",
              "Uygun uzmanı ayır",
              "Takvimden seansı kapat",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-[22px] border border-white/70 bg-white/70 px-4 py-4 text-sm text-[#5d494b]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">Adım 0{index + 1}</p>
                <p className="mt-3 font-medium text-espresso">{step}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="spotlight-panel"
        >
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg pulse-soft">
              <AppIcon name="compass" className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c7376]">
                Deneyim Haritası
              </p>
              <h2 className="mt-2 font-display text-3xl text-espresso">
                Bilgi yığını yerine net rota
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {campaigns.map((campaign, index) => (
              <div
                key={campaign.id}
                className="rounded-[24px] border border-white/70 bg-white/75 p-4"
              >
                <div className="flex items-start gap-4">
                  <span className="icon-badge h-11 w-11 rounded-[18px]">
                    <AppIcon name={index % 2 === 0 ? "spark" : "leaf"} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">
                      {campaign.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-espresso">
                      {campaign.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#6f5c5e]">{campaign.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name="message" className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c7376]">
                Salon Hissi
              </p>
              <h2 className="mt-2 font-display text-3xl text-espresso">Müşteri notları</h2>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-[24px] bg-[#fcf7f3] p-4">
                <p className="text-sm leading-7 text-[#5d494b]">{testimonial.quote}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#8c7376]">
                  {testimonial.author} • {testimonial.treatment}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
