import React from "react";
import { render, screen } from "@testing-library/react";

import { SiteFooter } from "@/components/ui/site-footer";

describe("SiteFooter", () => {
  it("renders public contact information from the shared site content", () => {
    render(<SiteFooter />);

    expect(screen.getByText("Şehir ritmini yavaşlatan bakım deneyimi")).toBeInTheDocument();
    expect(screen.getAllByText("+90 538 888 77 66").length).toBeGreaterThan(0);
    expect(screen.getByText("hello@sayamer.com")).toBeInTheDocument();
    expect(screen.getByText("Bağdat Caddesi çevresi")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Online Randevu" }).length).toBeGreaterThan(0);
  });
});
