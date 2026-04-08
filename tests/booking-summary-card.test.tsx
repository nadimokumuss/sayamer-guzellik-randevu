import React from "react";
import { render, screen } from "@testing-library/react";

import { BookingSummaryCard } from "@/components/booking/booking-summary-card";

describe("BookingSummaryCard", () => {
  it("renders package details and included services", () => {
    render(
      <BookingSummaryCard
        title="Cilt Işıltı Seremonisi"
        description="Hydra Glow ve kolajen bakımı."
        durationMinutes={135}
        price={2850}
        bookingTypeLabel="Paket"
        staffName="Nazlı Duran"
        date="2026-04-08"
        timeLabel="10:00 - 12:15"
        includedServices={["Hydra Glow Cilt Bakımı", "Kolajen Reset Protokolü"]}
      />,
    );

    expect(screen.getByText("Cilt Işıltı Seremonisi")).toBeInTheDocument();
    expect(screen.getByText("Paket İçeriği")).toBeInTheDocument();
    expect(screen.getByText("Hydra Glow Cilt Bakımı")).toBeInTheDocument();
    expect(screen.getByText("Nazlı Duran")).toBeInTheDocument();
  });
});
