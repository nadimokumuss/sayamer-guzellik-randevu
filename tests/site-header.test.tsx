import React from "react";
import { render, screen } from "@testing-library/react";

import { SiteHeader } from "@/components/ui/site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("SiteHeader", () => {
  it("renders main navigation and CTA without legacy demo/admin entries", () => {
    render(<SiteHeader />);

    expect(screen.getAllByRole("link", { name: "Hizmetler" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Paketler" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Uzmanlar" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /İletişim/ }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Randevu al/ }).length).toBeGreaterThan(0);

    expect(screen.queryByRole("link", { name: "Yönetim Paneli" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Demo Girişi" })).not.toBeInTheDocument();
  });
});
