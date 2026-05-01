import { BrandCTA } from "@/components/layout/brand-cta";
import { siteContent } from "@/lib/site";

type Props = {
  number?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
  backgroundImage?: string;
  hideContact?: boolean;
};

export function DarkCTA({
  title,
  copy,
  primaryCta = { label: "Randevu al", href: "/randevu" },
  secondaryCta = {
    label: "WhatsApp",
    href: siteContent.contact.whatsappUrl,
    external: true,
  },
}: Props) {
  return (
    <BrandCTA
      title={title}
      copy={copy}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      variant="filled"
      align="split"
    />
  );
}
