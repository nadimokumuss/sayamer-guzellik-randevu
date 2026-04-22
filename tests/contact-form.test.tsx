import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { ContactForm } from "@/components/contact/contact-form";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks submit and shows error on invalid phone", () => {
    const openMock = vi.fn();
    vi.stubGlobal("open", openMock);

    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText("Ad Soyad"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByPlaceholderText("05XX XXX XX XX"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Soru veya notunuz..."), {
      target: { value: "Test mesajı" },
    });
    fireEvent.click(screen.getByRole("button", { name: /WhatsApp ile Gönder/i }));

    expect(screen.getByText(/Telefon numarası 05XX/i)).toBeInTheDocument();
    expect(openMock).not.toHaveBeenCalled();
  });

  it("opens WhatsApp URL with pre-filled message on valid submit", async () => {
    const openMock = vi.fn();
    vi.stubGlobal("open", openMock);

    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText("Ad Soyad"), { target: { value: "Ada Kara" } });
    fireEvent.change(screen.getByPlaceholderText("05XX XXX XX XX"), {
      target: { value: "0532 123 45 67" },
    });
    fireEvent.change(screen.getByPlaceholderText("Soru veya notunuz..."), {
      target: { value: "Merhaba, paket bilgisi almak istiyorum." },
    });
    fireEvent.click(screen.getByRole("button", { name: /WhatsApp ile Gönder/i }));

    await waitFor(() => expect(openMock).toHaveBeenCalledTimes(1));
    const [url] = openMock.mock.calls[0];
    expect(url).toContain("wa.me");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Ada Kara");
    expect(decoded).toContain("05321234567");
    expect(decoded).toContain("paket bilgisi");
  });
});
