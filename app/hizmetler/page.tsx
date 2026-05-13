"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import { InView } from "@/components/motion/in-view";
import { BrandCTA } from "@/components/layout/brand-cta";
import { FilterPills } from "@/components/ui/filter-pills";
import { ServiceCard } from "@/components/ui/service-card";
import { getCatalog } from "@/lib/catalog";
import { siteContent } from "@/lib/site";
import { buildBookingHref } from "@/lib/utils";

export default function ServicesPage() {
  const catalog = useMemo(() => getCatalog(), []);

  const filterOptions = useMemo(
    () => [
      { id: "all", label: "Tümü" },
      ...catalog.categories.map((cat) => ({ id: cat.id, label: cat.name })),
    ],
    [catalog.categories],
  );

  const [activeId, setActiveId] = useState("all");

  const visibleServices = useMemo(() => {
    if (activeId === "all") return catalog.services;
    return catalog.services.filter((s) => s.categoryId === activeId);
  }, [activeId, catalog.services]);

  return (
    <div>
      {/* Breadcrumb */}
      <section className="">
        <div className="shell pt-6 lg:pt-8">
          <nav className="flex items-center gap-2 text-[12px] text-ink-500" aria-label="Breadcrumb">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-brand-600">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="m3 11 9-8 9 8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Anasayfa
            </Link>
            <span aria-hidden className="text-ink-300">›</span>
            <span className="text-brand-600">Hizmetlerimiz</span>
          </nav>
        </div>
      </section>

      {/* Hero card */}
      <section className="">
        <div className="shell py-8 lg:py-10">
          <InView>
            <div className="relative overflow-hidden rounded-[28px] bg-brand-gradient px-7 py-16 lg:px-14 lg:py-20">
              <span
                className="brand-blob h-72 w-72 animate-pulse-slow"
                style={{ background: "rgba(255,255,255,0.20)", top: "-40%", right: "-10%" }}
              />
              <div className="relative max-w-2xl">
                <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
                  Hizmetlerimiz
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/85">
                  Uzman kadromuz ve son teknoloji cihazlarımızla güzelliğinizi ortaya çıkarın.
                </p>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* Filter */}
      <section className="">
        <div className="shell pb-6">
          <FilterPills options={filterOptions} activeId={activeId} onChange={setActiveId} layoutId="services-active-pill" />
        </div>
      </section>

      {/* Service cards grid */}
      <section className="">
        <div className="shell pb-16 lg:pb-24">
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleServices.map((service, i) => {
                const cat = catalog.categories.find((c) => c.id === service.categoryId);
                const image =
                  siteContent.serviceCategoryMedia[
                    service.categoryId as keyof typeof siteContent.serviceCategoryMedia
                  ] ?? siteContent.media.editorial[0].src;
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, delay: Math.min(i * 0.04, 0.2) }}
                  >
                    <ServiceCard
                      href="/randevu"
                      image={image}
                      imageAlt={service.name}
                      category={cat?.name}
                      title={service.name}
                      description={service.description}
                      price={service.price}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {visibleServices.length === 0 ? (
            <p className="mt-12 text-center text-ink-500">Bu kategoride henüz hizmet yok.</p>
          ) : null}
        </div>
      </section>

      <BrandCTA
        title="Kendinizi Şımartmaya Hazır Mısınız?"
        copy="Uzmanlarımızla tanışalım ve sizin için en uygun bakımı planlayalım. İlk randevunuza özel %10 indirim fırsatını kaçırmayın."
        primaryCta={{ label: "Hemen Randevu Al", href: "/randevu" }}
        align="split"
      />
    </div>
  );
}
