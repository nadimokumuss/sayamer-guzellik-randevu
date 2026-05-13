import {
  BigBeigeBranch,
  MonsteraLeaf,
  OrchidBranch,
  PinkBlossom,
  TinyDaisy,
} from "@/components/ui/floral-decor";

// Global decorative layer rendered behind every page's content.
// Mirrors the hero's botanical concept but at a much lower intensity
// so it doesn't fight with page content.
export function PageBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Warm gradient base — replaces the flat cream body color */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAEEDC] via-[#FAF6F1] to-[#FCF8F3]" />

      {/* Large pale botanical sprays in opposite corners */}
      <BigBeigeBranch className="absolute -left-24 -top-16 h-[460px] w-[460px] opacity-[0.18]" />
      <BigBeigeBranch
        flip
        className="absolute -right-24 bottom-[-60px] h-[420px] w-[420px] opacity-[0.14]"
      />

      {/* Mid-page accents — visible on tall pages as you scroll */}
      <MonsteraLeaf
        flip
        className="absolute left-[3%] top-[55%] h-44 w-44 opacity-[0.10] animate-float"
      />
      <MonsteraLeaf className="absolute right-[4%] top-[35%] h-32 w-32 opacity-[0.10] animate-float" style={{ animationDelay: "1.4s" }} />
      <OrchidBranch
        className="absolute right-[2%] top-[68%] h-40 w-32 opacity-30 animate-float"
        style={{ animationDelay: "2.2s" }}
      />

      {/* Scattered floating florals */}
      <PinkBlossom
        className="absolute left-[8%] top-[18%] h-10 w-10 opacity-40 animate-float"
        style={{ animationDelay: "0.4s" }}
      />
      <PinkBlossom
        className="absolute right-[12%] top-[88%] h-9 w-9 opacity-35 animate-float"
        style={{ animationDelay: "2.6s" }}
      />
      <TinyDaisy
        className="absolute left-[14%] top-[42%] h-7 w-7 opacity-50 animate-float"
        style={{ animationDelay: "1.0s" }}
      />
      <TinyDaisy
        className="absolute right-[18%] top-[14%] h-6 w-6 opacity-45 animate-float"
        style={{ animationDelay: "1.8s" }}
      />
      <TinyDaisy
        className="absolute left-[48%] top-[78%] h-7 w-7 opacity-45 animate-float"
        style={{ animationDelay: "0.7s" }}
      />
    </div>
  );
}
