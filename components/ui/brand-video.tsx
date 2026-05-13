"use client";

import { useRef, useState } from "react";

import { InView } from "@/components/motion/in-view";
import { RevealText } from "@/components/motion/reveal-text";
import { Botanical } from "@/components/ui/botanical";
import { siteContent } from "@/lib/site";

// Replace with the salon's actual brand intro video & poster.
// Placeholder uses a free Mixkit stock clip (hotlink-allowed).
const VIDEO_URL = "https://assets.mixkit.co/videos/4825/4825-720.mp4";
const POSTER_URL = siteContent.media.editorial[0].src;

export function BrandVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  function play() {
    setStarted(true);
    // Defer .play() until after the <video> element mounts.
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (!v) return;
      v.play().catch(() => setFailed(true));
    });
  }

  return (
    <section className="relative overflow-hidden bg-brand-50">
      <Botanical className="pointer-events-none absolute -left-8 top-14 h-40 w-40 text-brand-300 opacity-60" />
      <Botanical
        flip
        className="pointer-events-none absolute -right-8 bottom-14 h-40 w-40 text-brand-300 opacity-60"
      />

      <div className="shell relative py-20 lg:py-28">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <InView>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
              Marka Tanıtımı
            </p>
          </InView>
          <RevealText
            as="h2"
            className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] italic leading-[1.05] tracking-tight text-ink-900"
          >
            Sayamer&apos;ı Yakından Tanıyın
          </RevealText>
          <InView delay={0.15}>
            <p className="mt-5 text-[15px] leading-7 text-ink-600">
              Salonumuzun atmosferini, ekibimizi ve hizmet anlayışımızı kısa bir tanıtım
              filminde keşfedin.
            </p>
          </InView>
        </div>

        <InView y={28}>
          <div className="relative mx-auto max-w-5xl">
            <div className="relative aspect-video overflow-hidden rounded-[40px] shadow-elevated">
              {/* Poster is the default visible state — no <video> mounts until Play is clicked. */}
              {!started || failed ? (
                <>
                  <img
                    src={POSTER_URL}
                    alt="Marka filmi kapağı"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={play}
                    aria-label="Tanıtım videosunu oynat"
                    className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-brand-900/55 via-brand-900/15 to-transparent transition"
                  >
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-brand-700 shadow-elevated transition duration-300 group-hover:scale-110 lg:h-24 lg:w-24">
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-1 h-8 w-8 lg:h-10 lg:w-10"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>

                    <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700 shadow-card lg:bottom-7 lg:left-7">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      {failed ? "Video Yakında" : "Marka Filmi"}
                    </span>
                  </button>
                </>
              ) : (
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  poster={POSTER_URL}
                  className="absolute inset-0 h-full w-full bg-black object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  onError={() => setFailed(true)}
                  onEnded={() => setStarted(false)}
                />
              )}
            </div>

            <span
              className="pointer-events-none absolute -inset-3 -z-10 rounded-[44px] border border-brand-200/70"
              aria-hidden
            />
          </div>
        </InView>
      </div>
    </section>
  );
}
