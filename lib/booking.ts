import { randomUUID } from "node:crypto";

import { getItemSummary, getStaffById } from "@/lib/catalog";
import { addAppointment, addCustomer, getAppointments, getBlockedSlots, getSalonPhone } from "@/lib/store";
import {
  Appointment,
  AppointmentRequest,
  AvailabilityResponse,
  BlockedSlot,
  BookingType,
  DashboardStats,
  TimeSlot,
} from "@/lib/types";
import {
  addMinutesToTime,
  formatLongDate,
  formatCurrency,
  minutesToTime,
  timeToMinutes,
  toIsoDate,
} from "@/lib/utils";

function overlaps(
  leftStart: string,
  leftEnd: string,
  rightStart: string,
  rightEnd: string,
) {
  return timeToMinutes(leftStart) < timeToMinutes(rightEnd) &&
    timeToMinutes(rightStart) < timeToMinutes(leftEnd);
}

function isBlocked(blockedSlots: BlockedSlot[], staffId: string, date: string, start: string, end: string) {
  return blockedSlots.some(
    (slot) =>
      slot.staffId === staffId &&
      slot.date === date &&
      overlaps(start, end, slot.startTime, slot.endTime),
  );
}

function isAppointmentCollision(staffId: string, date: string, start: string, end: string) {
  return getAppointments().some(
    (appointment) =>
      appointment.staffId === staffId &&
      appointment.date === date &&
      appointment.status !== "cancelled" &&
      overlaps(start, end, appointment.startTime, appointment.endTime),
  );
}

function buildMessage(appointment: Appointment) {
  return [
    "Merhaba Sayamer Güzellik,",
    `${appointment.customer.firstName} ${appointment.customer.lastName} adına oluşturulan randevu özeti:`,
    `${appointment.itemName}`,
    `${formatLongDate(appointment.date)} ${appointment.startTime}-${appointment.endTime}`,
    `Uzman: ${getStaffById(appointment.staffId)?.name ?? "-"}`,
    `Tutar: ${formatCurrency(appointment.price)}`,
  ].join("\n");
}

export function getAvailability(
  bookingType: BookingType,
  itemId: string,
  staffId: string,
  date: string,
): AvailabilityResponse {
  const item = getItemSummary(bookingType, itemId);
  const staff = getStaffById(staffId);

  if (!item || !staff) {
    return {
      date,
      slots: [],
      nextAvailableDates: [],
    };
  }

  const requestedDate = new Date(`${date}T12:00:00`);
  const weekday = requestedDate.getDay();
  if (!staff.workingDays.includes(weekday)) {
    return {
      date,
      slots: [],
      nextAvailableDates: getNextAvailableDates(bookingType, itemId, staffId, requestedDate, 3),
    };
  }

  const openingMinutes = staff.startHour * 60;
  const closingMinutes = staff.endHour * 60;
  const slots: TimeSlot[] = [];

  for (let current = openingMinutes; current + item.durationMinutes <= closingMinutes; current += 30) {
    const startTime = minutesToTime(current);
    const endTime = minutesToTime(current + item.durationMinutes);
    const available =
      !isBlocked(getBlockedSlots(), staff.id, date, startTime, endTime) &&
      !isAppointmentCollision(staff.id, date, startTime, endTime);
    slots.push({
      startTime,
      endTime,
      available,
      label: `${startTime} - ${endTime}`,
    });
  }

  return {
    date,
    slots,
    nextAvailableDates: slots.some((slot) => slot.available)
      ? []
      : getNextAvailableDates(bookingType, itemId, staffId, requestedDate, 3),
  };
}

function getNextAvailableDates(
  bookingType: BookingType,
  itemId: string,
  staffId: string,
  fromDate: Date,
  count: number,
) {
  const dates: string[] = [];
  const cursor = new Date(fromDate);
  let safety = 0;

  while (dates.length < count && safety < 21) {
    cursor.setDate(cursor.getDate() + 1);
    const isoDate = toIsoDate(cursor);
    const availability = getAvailabilityInternal(bookingType, itemId, staffId, isoDate);
    if (availability.some((slot) => slot.available)) {
      dates.push(isoDate);
    }
    safety += 1;
  }

  return dates;
}

function getAvailabilityInternal(
  bookingType: BookingType,
  itemId: string,
  staffId: string,
  date: string,
) {
  const item = getItemSummary(bookingType, itemId);
  const staff = getStaffById(staffId);

  if (!item || !staff) {
    return [];
  }

  const requestedDate = new Date(`${date}T12:00:00`);
  const weekday = requestedDate.getDay();
  if (!staff.workingDays.includes(weekday)) {
    return [];
  }

  const openingMinutes = staff.startHour * 60;
  const closingMinutes = staff.endHour * 60;
  const slots: TimeSlot[] = [];
  for (let current = openingMinutes; current + item.durationMinutes <= closingMinutes; current += 30) {
    const startTime = minutesToTime(current);
    const endTime = minutesToTime(current + item.durationMinutes);
    const available =
      !isBlocked(getBlockedSlots(), staff.id, date, startTime, endTime) &&
      !isAppointmentCollision(staff.id, date, startTime, endTime);
    slots.push({
      startTime,
      endTime,
      available,
      label: `${startTime} - ${endTime}`,
    });
  }
  return slots;
}

export function createAppointment(request: AppointmentRequest) {
  const item = getItemSummary(request.bookingType, request.itemId);
  const staff = getStaffById(request.staffId);

  if (!item || !staff) {
    throw new Error("Seçilen hizmet veya uzman bulunamadı.");
  }

  if (!item.staffIds.includes(staff.id)) {
    throw new Error("Seçilen uzman bu hizmet için uygun değil.");
  }

  const endTime = addMinutesToTime(request.startTime, item.durationMinutes);

  if (
    isBlocked(getBlockedSlots(), staff.id, request.date, request.startTime, endTime) ||
    isAppointmentCollision(staff.id, request.date, request.startTime, endTime)
  ) {
    throw new Error("Seçilen saat artık uygun değil.");
  }

  const customer = addCustomer(request.customer);
  const appointment: Appointment = {
    id: randomUUID(),
    bookingType: request.bookingType,
    itemId: request.itemId,
    itemName: item.name,
    staffId: request.staffId,
    date: request.date,
    startTime: request.startTime,
    endTime,
    durationMinutes: item.durationMinutes,
    price: item.price,
    status: "confirmed",
    customer,
    source: "web-demo",
    whatsappUrl: "",
    createdAt: new Date().toISOString(),
  };

  appointment.whatsappUrl = `https://wa.me/${getSalonPhone()}?text=${encodeURIComponent(
    buildMessage(appointment),
  )}`;

  return addAppointment(appointment);
}

export function getDashboardStats(today = toIsoDate(new Date())): DashboardStats {
  const appointments = getAppointments();
  const blockedSlots = getBlockedSlots();
  const todayCount = appointments.filter(
    (appointment) => appointment.date === today && appointment.status !== "cancelled",
  ).length;
  const upcomingCount = appointments.filter(
    (appointment) => appointment.date >= today && appointment.status !== "cancelled",
  ).length;
  const confirmedRevenue = appointments
    .filter((appointment) => appointment.status !== "cancelled")
    .reduce((sum, appointment) => sum + appointment.price, 0);

  return {
    todayCount,
    upcomingCount,
    blockedCount: blockedSlots.length,
    confirmedRevenue,
  };
}
