import { createAppointment, getAvailability, getDashboardStats } from "@/lib/booking";
import { getSeedAppointmentsDateOffsets } from "@/lib/seed";
import { getAppointmentById, resetStore } from "@/lib/store";

describe("booking engine", () => {
  beforeEach(() => {
    resetStore();
  });

  it("marks seeded appointments as unavailable in availability", () => {
    const { tomorrow } = getSeedAppointmentsDateOffsets();
    const availability = getAvailability("service", "hydra-glow", "cilt-bakimi-staff-1", tomorrow);
    const slot = availability.slots.find((entry) => entry.startTime === "11:00");

    expect(slot?.available).toBe(false);
  });

  it("creates a confirmed appointment and stores it", () => {
    const { tomorrow } = getSeedAppointmentsDateOffsets();
    const appointment = createAppointment({
      bookingType: "service",
      itemId: "hydra-glow",
      staffId: "cilt-bakimi-staff-2",
      date: tomorrow,
      startTime: "10:00",
      customer: {
        firstName: "Ada",
        lastName: "Kara",
        phone: "05320000000",
        email: "ada@example.com",
        note: "Sessiz oda tercih ederim",
      },
    });

    expect(appointment.status).toBe("confirmed");
    expect(getAppointmentById(appointment.id)?.customer.firstName).toBe("Ada");
    expect(appointment.whatsappUrl).toContain("wa.me");
  });

  it("tracks dashboard revenue after a new booking", () => {
    const baseline = getDashboardStats();
    const { tomorrow } = getSeedAppointmentsDateOffsets();

    createAppointment({
      bookingType: "package",
      itemId: "skin-luster-session",
      staffId: "cilt-bakimi-staff-1",
      date: tomorrow,
      startTime: "15:00",
      customer: {
        firstName: "Lara",
        lastName: "Bulut",
        phone: "05327777777",
        email: "lara@example.com",
        note: "",
      },
    });

    const next = getDashboardStats();
    expect(next.confirmedRevenue).toBeGreaterThan(baseline.confirmedRevenue);
  });
});
