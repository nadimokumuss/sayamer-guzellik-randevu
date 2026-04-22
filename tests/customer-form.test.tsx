import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { CustomerForm } from "@/components/booking/customer-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

const baseProps = {
  bookingType: "service" as const,
  itemId: "hydra-glow",
  staffId: "cilt-bakimi-staff-1",
  date: "2099-01-01",
  startTime: "10:00",
};

describe("CustomerForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects invalid phone before calling fetch", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomerForm {...baseProps} />);
    fireEvent.change(screen.getByPlaceholderText("Ad"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByPlaceholderText("Soyad"), { target: { value: "Kara" } });
    fireEvent.change(screen.getByPlaceholderText("05XX XXX XX XX"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Randevuyu Oluştur/i }));

    await waitFor(() => {
      expect(screen.getByText(/Telefon numarası 05XX/i)).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid email before calling fetch", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomerForm {...baseProps} />);
    fireEvent.change(screen.getByPlaceholderText("Ad"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByPlaceholderText("Soyad"), { target: { value: "Kara" } });
    fireEvent.change(screen.getByPlaceholderText("05XX XXX XX XX"), {
      target: { value: "0532 123 45 67" },
    });
    fireEvent.change(screen.getByPlaceholderText("E-posta"), {
      target: { value: "bozuk-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Randevuyu Oluştur/i }));

    await waitFor(() => {
      expect(screen.getByText(/Geçerli bir e-posta/i)).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits normalized phone on valid input", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ appointment: { id: "test-id" } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomerForm {...baseProps} />);
    fireEvent.change(screen.getByPlaceholderText("Ad"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByPlaceholderText("Soyad"), { target: { value: "Kara" } });
    fireEvent.change(screen.getByPlaceholderText("05XX XXX XX XX"), {
      target: { value: "0532 123 45 67" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Randevuyu Oluştur/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.customer.phone).toBe("05321234567");
  });
});
