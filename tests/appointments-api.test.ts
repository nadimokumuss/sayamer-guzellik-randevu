import { POST } from "@/app/api/appointments/route";
import { getSeedAppointmentsDateOffsets } from "@/lib/seed";
import { resetStore } from "@/lib/store";

function buildRequest(body: unknown) {
  return new Request("http://localhost/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as Parameters<typeof POST>[0];
}

describe("POST /api/appointments validation", () => {
  beforeEach(() => {
    resetStore();
  });

  it("returns 400 when required fields are missing", async () => {
    const response = await POST(
      buildRequest({
        bookingType: "service",
        itemId: "hydra-glow",
        staffId: "cilt-bakimi-staff-2",
        date: "2099-01-01",
        startTime: "10:00",
        customer: { firstName: "", lastName: "", phone: "" },
      }),
    );
    expect(response.status).toBe(400);
    const json = (await response.json()) as { error: string };
    expect(json.error).toMatch(/zorunlu/i);
  });

  it("returns 400 for invalid phone format", async () => {
    const response = await POST(
      buildRequest({
        bookingType: "service",
        itemId: "hydra-glow",
        staffId: "cilt-bakimi-staff-2",
        date: "2099-01-01",
        startTime: "10:00",
        customer: { firstName: "Ada", lastName: "Kara", phone: "12345" },
      }),
    );
    expect(response.status).toBe(400);
    const json = (await response.json()) as { error: string };
    expect(json.error).toMatch(/05XX/i);
  });

  it("returns 400 for invalid email format", async () => {
    const response = await POST(
      buildRequest({
        bookingType: "service",
        itemId: "hydra-glow",
        staffId: "cilt-bakimi-staff-2",
        date: "2099-01-01",
        startTime: "10:00",
        customer: {
          firstName: "Ada",
          lastName: "Kara",
          phone: "05321234567",
          email: "bozuk",
        },
      }),
    );
    expect(response.status).toBe(400);
  });

  it("creates an appointment on valid input", async () => {
    const { tomorrow } = getSeedAppointmentsDateOffsets();
    const response = await POST(
      buildRequest({
        bookingType: "service",
        itemId: "hydra-glow",
        staffId: "cilt-bakimi-staff-2",
        date: tomorrow,
        startTime: "10:00",
        customer: {
          firstName: "Ada",
          lastName: "Kara",
          phone: "0532 123 45 67",
          email: "ada@example.com",
          note: "",
        },
      }),
    );
    expect(response.status).toBe(201);
    const json = (await response.json()) as {
      appointment: { customer: { phone: string } };
    };
    expect(json.appointment.customer.phone).toBe("05321234567");
  });
});
