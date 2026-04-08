"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
    <section className="shell grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="glass-card overflow-hidden p-8 sm:p-10"
      >
        <motion.span variants={fadeInUp} className="eyebrow">
          Sayamer deneyimi
        </motion.span>
        <motion.h1
          variants={fadeInUp}
          className="mt-6 max-w-2xl font-display text-4xl leading-tight tracking-tight text-espresso sm:text-6xl"
        >
          Güzellik randevusunu yumuşak, seçkin ve net bir akışa dönüştüren demo.
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-6 max-w-xl text-base leading-8 text-[#6f5c5e]">
          Müşteri tarafında hizmet, uzman, gün ve saat seçimi; salon tarafında takvim,
          uygunluk ve randevu yönetimi tek bir tasarım dili içinde kurgulandı.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
          <Link href="/randevu" className="soft-button">
            Hizmetlerden Başla
          </Link>
          <Link href="/paketler" className="soft-button-secondary">
            Paketleri İncele
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { value: "9", label: "hizmet kategorisi" },
            { value: "27", label: "uzman personel" },
            { value: "6", label: "hazır paket" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[22px] border border-white/70 bg-white/65 p-5">
              <p className="font-display text-4xl text-espresso">{stat.value}</p>
              <p className="mt-2 text-sm text-[#7b6668]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="grid gap-6">
        {campaigns.map((campaign, index) => (
          <motion.article
            key={campaign.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 + 0.2 }}
            className="glass-card p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c7376]">
              {campaign.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight">{campaign.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{campaign.body}</p>
          </motion.article>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="glass-card p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c7376]">
            Salon hissi
          </p>
          <div className="mt-4 space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-[22px] bg-[#fcf7f3] p-4">
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
