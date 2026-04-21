import { randomUUID } from "node:crypto";

import { catalog, getSeedAppointmentsDateOffsets } from "@/lib/seed";
import { siteContent } from "@/lib/site";
import { Appointment, BlockedSlot, Customer } from "@/lib/types";
import { addMinutesToTime } from "@/lib/utils";

type DemoStore = {
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  customers: Customer[];
};

declare global {
  var __sayamerStore: DemoStore | undefined;
}

function buildInitialStore(): DemoStore {
  const { tomorrow, dayAfter } = getSeedAppointmentsDateOffsets();

  const customers: Customer[] = [
    {
      id: "cust-seed-1",
      firstName: "Dila",
      lastName: "Özkan",
      phone: "05321112233",
      email: "dila@example.com",
    },
    {
      id: "cust-seed-2",
      firstName: "Cansu",
      lastName: "Erdem",
      phone: "05335554466",
      email: "cansu@example.com",
    },
  ];

  const appointments: Appointment[] = [
    {
      id: "apt-seed-1",
      bookingType: "service",
      itemId: "hydra-glow",
      itemName: "Hydra Glow Cilt Bakımı",
      staffId: "cilt-bakimi-staff-1",
      date: tomorrow,
      startTime: "11:00",
      endTime: "12:00",
      durationMinutes: 60,
      price: 1700,
      status: "confirmed",
      customer: customers[0],
      source: "web-demo",
      whatsappUrl: "https://wa.me/905555555555",
      createdAt: new Date().toISOString(),
    },
    {
      id: "apt-seed-2",
      bookingType: "package",
      itemId: "nail-elegance-edit",
      itemName: "Elegant Nails Paketi",
      staffId: "tirnak-bakimi-staff-2",
      date: tomorrow,
      startTime: "13:30",
      endTime: "15:30",
      durationMinutes: 120,
      price: 1850,
      status: "checked_in",
      customer: customers[1],
      source: "web-demo",
      whatsappUrl: "https://wa.me/905555555555",
      createdAt: new Date().toISOString(),
    },
    {
      id: "apt-seed-3",
      bookingType: "service",
      itemId: "signature-cut",
      itemName: "Signature Kesim & Fön",
      staffId: "kuafor-staff-1",
      date: dayAfter,
      startTime: "16:00",
      endTime: addMinutesToTime("16:00", 75),
      durationMinutes: 75,
      price: 1500,
      status: "confirmed",
      customer: {
        id: "cust-seed-3",
        firstName: "Seda",
        lastName: "Güler",
        phone: "05329998877",
        email: "seda@example.com",
      },
      source: "web-demo",
      whatsappUrl: "https://wa.me/905555555555",
      createdAt: new Date().toISOString(),
    },
  ];

  const blockedSlots: BlockedSlot[] = [
    {
      id: "block-seed-1",
      staffId: "kuafor-staff-2",
      date: tomorrow,
      startTime: "14:00",
      endTime: "15:30",
      reason: "Renk hazırlık molası",
    },
    {
      id: "block-seed-2",
      staffId: "masaj-staff-1",
      date: dayAfter,
      startTime: "12:00",
      endTime: "13:00",
      reason: "Oda bakım arası",
    },
  ];

  return {
    appointments,
    blockedSlots,
    customers: [...customers, appointments[2].customer],
  };
}

export function getStore() {
  if (!globalThis.__sayamerStore) {
    globalThis.__sayamerStore = buildInitialStore();
  }
  return globalThis.__sayamerStore;
}

export function addCustomer(customer: Omit<Customer, "id">) {
  const store = getStore();
  const newCustomer: Customer = { ...customer, id: randomUUID() };
  store.customers.push(newCustomer);
  return newCustomer;
}

export function addAppointment(appointment: Appointment) {
  const store = getStore();
  store.appointments.unshift(appointment);
  return appointment;
}

export function updateAppointmentStatus(appointmentId: string, status: Appointment["status"]) {
  const store = getStore();
  const appointment = store.appointments.find((entry) => entry.id === appointmentId);
  if (!appointment) {
    return null;
  }
  appointment.status = status;
  return appointment;
}

export function addBlockedSlot(slot: BlockedSlot) {
  const store = getStore();
  store.blockedSlots.unshift(slot);
  return slot;
}

export function removeBlockedSlot(slotId: string) {
  const store = getStore();
  const index = store.blockedSlots.findIndex((entry) => entry.id === slotId);
  if (index === -1) {
    return null;
  }
  const [removed] = store.blockedSlots.splice(index, 1);
  return removed;
}

export function getAppointmentById(appointmentId: string) {
  return getStore().appointments.find((entry) => entry.id === appointmentId);
}

export function getAppointments() {
  return getStore().appointments;
}

export function getBlockedSlots() {
  return getStore().blockedSlots;
}

export function getCustomers() {
  return getStore().customers;
}

export function resetStore() {
  globalThis.__sayamerStore = buildInitialStore();
}

export function getSalonPhone() {
  return siteContent.contact.phoneRaw;
}

export function getCatalogSummary() {
  return {
    categories: catalog.categories.length,
    staff: catalog.staff.length,
    services: catalog.services.length,
    packages: catalog.packages.length,
  };
}
