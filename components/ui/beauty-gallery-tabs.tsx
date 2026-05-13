"use client";

import { useMemo, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryTab = {
  id: string;
  label: string;
  images: GalleryImage[];
};

type Props = {
  tabs: GalleryTab[];
  allLabel?: string;
};

export function BeautyGalleryTabs({ tabs, allLabel = "Tümü" }: Props) {
  const allImages = useMemo(() => {
    const seen = new Set<string>();
    const out: GalleryImage[] = [];
    for (const t of tabs) {
      for (const img of t.images) {
        if (!seen.has(img.src)) {
          seen.add(img.src);
          out.push(img);
        }
      }
    }
    return out;
  }, [tabs]);

  const fullTabs: GalleryTab[] = useMemo(
    () => [{ id: "all", label: allLabel, images: allImages }, ...tabs],
    [allImages, allLabel, tabs]
  );

  const [activeId, setActiveId] = useState(fullTabs[0]?.id ?? "all");
  const active = fullTabs.find((t) => t.id === activeId) ?? fullTabs[0];

  if (!active) return null;

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {fullTabs.map((tab) => {
          const isActive = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              className={isActive ? "chip-filter-active" : "chip-filter"}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {active.images.slice(0, 8).map((img, i) => (
          <div
            key={`${active.id}-${i}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#2E1F12]/55 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
            />
            {/* zoom glyph on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 text-brand-700 shadow-card">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l4 4" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
