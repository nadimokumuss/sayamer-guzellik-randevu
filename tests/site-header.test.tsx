import React from "react";
import { render, screen } from "@testing-library/react";

import { SiteHeader } from "@/components/ui/site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("SiteHeader", () => {
  it("renders public navigation and hides demo/admin entry points", () => {
    render(<SiteHeader />);

    expect(screen.getAllByRole("link", { name: "Anasayfa" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Kurumsal" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hizmetler" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Medya" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "İletişim" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Online Randevu" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "WhatsApp" }).length).toBeGreaterThan(0);

    expect(screen.queryByRole("link", { name: "Yönetim Paneli" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Demo Girişi" })).not.toBeInTheDocument();
  });
});
