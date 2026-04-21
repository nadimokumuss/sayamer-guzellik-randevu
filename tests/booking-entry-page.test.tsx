import React from "react";
import { render, screen } from "@testing-library/react";

import BookingEntryPage from "@/app/randevu/page";

describe("BookingEntryPage", () => {
  it("shows booking entry actions for services and packages", () => {
    render(<BookingEntryPage />);

    expect(screen.getByText("Bakım yolculuğunu şimdi başlatın")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hizmetleri Aç" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Paketleri Aç" })).toBeInTheDocument();
    expect(screen.getByText("En çok tercih edilen hizmetler")).toBeInTheDocument();
  });
});
