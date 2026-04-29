import React from "react";
import { render, screen } from "@testing-library/react";

import BookingEntryPage from "@/app/randevu/page";

describe("BookingEntryPage", () => {
  it("shows booking entry actions for services and packages", () => {
    render(<BookingEntryPage />);

    expect(screen.getAllByRole("link", { name: /Hizmetleri aç/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Paketleri aç/i }).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /En çok tercih edilen hizmetler/i }),
    ).toBeInTheDocument();
  });
});
