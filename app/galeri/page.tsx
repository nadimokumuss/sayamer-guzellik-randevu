"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import { InView } from "@/components/motion/in-view";
import { RevealText } from "@/components/motion/reveal-text";
import { FilterPills } from "@/components/ui/filter-pills";

type GalleryItem = {
  id: string;
  category: "hair" | "skin" | "interior" | "clients";
  src: string;
  alt: string;
  span?: "tall" | "wide" | "default";
};

const galleryItems: ReadonlyArray<GalleryItem> = [
  {
    id: "1",
    category: "hair",
    src: "https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Saç tasarımı çalışması",
    span: "tall",
  },
  {
    id: "2",
    category: "skin",
    src: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Cilt bakımı uygulaması",
  },
  {
    id: "3",
    category: "interior",
    src: "https://images.pexels.com/photos/3997393/pexels-photo-3997393.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Salon iç mekan",
  },
  {
    id: "4",
    category: "interior",
    src: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Bakım kabini",
    span: "wide",
  },
  {
    id: "5",
    category: "skin",
    src: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Tırnak detayı",
  },
  {
    id: "6",
    category: "clients",
    src: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Mutlu müşteri portresi",
  },
  {
    id: "7",
    category: "hair",
    src: "https://images.pexels.com/photos/3993421/pexels-photo-3993421.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Renk uygulaması",
    span: "tall",
  },
  {
    id: "8",
    category: "clients",
    src: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Doğal makyaj sonrası",
  },
  {
    id: "9",
    category: "skin",
    src: "https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Cilt bakımı yakın plan",
  },
  {
    id: "10",
    category: "interior",
    src: "https://images.pexels.com/photos/3997988/pexels-photo-3997988.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Spa atmosferi",
  },
  {
    id: "11",
    category: "hair",
    src: "https://images.pexels.com/photos/7755513/pexels-photo-7755513.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Saç şekillendirme",
  },
  {
    id: "12",
    category: "clients",
    src: "https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Modern saç tasarımı sonrası portre",
    span: "tall",
  },
];

const filters = [
  { id: "all", label: "Tümü" },
  { id: "hair", label: "Saç Tasarım" },
  { id: "skin", label: "Cilt Bakımı" },
  { id: "interior", label: "İç Mekan" },
  { id: "clients", label: "Mutlu Müşteriler" },
];

export default function GalleryPage() {
  const [activeId, setActiveId] = useState("all");

  const visibleItems = useMemo(() => {
    if (activeId === "all") return galleryItems;
    return galleryItems.filter((g) => g.category === activeId);
  }, [activeId]);

  return (
    <div className="bg-surface">
      <section>
        <div className="shell pt-12 pb-8 lg:pt-16">
          <InView>
            <RevealText
              as="h1"
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900"
            >
              Galeri
            </RevealText>
          </InView>
          <InView delay={0.15}>
            <p className="mt-3 text-[14px] font-bold uppercase tracking-[0.16em] text-brand-600">
              Sanatımız ve Atmosferimiz
            </p>
          </InView>
          <InView delay={0.25}>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink-500">
              Uygulama örneklerimizi, modern mekanımızı ve mutlu müşterilerimizin gülümsemelerini
              keşfedin. Her karede mükemmellik tutkumuzu göreceksiniz.
            </p>
          </InView>
        </div>
      </section>

      <section>
        <div className="shell pb-8">
          <FilterPills options={filters} activeId={activeId} onChange={setActiveId} layoutId="gallery-active-pill" />
        </div>
      </section>

      <section>
        <div className="shell pb-16 lg:pb-24">
          <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, i) => {
                const aspectClass =
                  item.span === "tall"
                    ? "aspect-[3/4]"
                    : item.span === "wide"
                    ? "aspect-[4/3]"
                    : "aspect-square";
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.32, delay: Math.min(i * 0.04, 0.25) }}
                    className={`group relative overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-cardHover ${aspectClass}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="shell py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <RevealText
              as="h2"
              className="font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900"
            >
              Bu ışıltıya sahip olmak ister misiniz?
            </RevealText>
            <InView delay={0.15}>
              <p className="mt-5 text-[15px] leading-7 text-ink-500">
                Uzman ekibimizle tanışmak ve size özel bakım ritüellerimizi deneyimlemek için
                hemen randevunuzu oluşturun.
              </p>
            </InView>
            <InView delay={0.25}>
              <Link href="/randevu" className="btn-pill-brand mt-8">
                Randevu Al <span aria-hidden>→</span>
              </Link>
            </InView>
          </div>
        </div>
      </section>
    </div>
  );
}
