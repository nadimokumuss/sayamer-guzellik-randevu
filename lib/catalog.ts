import { catalog } from "@/lib/seed";
import { BookingType, Package, Service, StaffMember } from "@/lib/types";

export function getCatalog() {
  return catalog;
}

export function getCategoryById(categoryId: string) {
  return catalog.categories.find((category) => category.id === categoryId);
}

export function getServiceById(serviceId: string) {
  return catalog.services.find((service) => service.id === serviceId);
}

export function getPackageById(packageId: string) {
  return catalog.packages.find((item) => item.id === packageId);
}

export function getStaffById(staffId: string) {
  return catalog.staff.find((member) => member.id === staffId);
}

export function getItemByType(bookingType: BookingType, itemId: string) {
  return bookingType === "package" ? getPackageById(itemId) : getServiceById(itemId);
}

export function getItemSummary(bookingType: BookingType, itemId: string) {
  const item = getItemByType(bookingType, itemId);
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    bookingType,
    name: item.name,
    description: item.description,
    durationMinutes: item.durationMinutes,
    price: item.price,
    staffIds: item.staffIds,
    includedServices:
      bookingType === "package"
        ? (item as Package).includedServiceIds
            .map((serviceId) => getServiceById(serviceId))
            .filter((service): service is Service => Boolean(service))
        : [],
  };
}

export function getStaffForItem(bookingType: BookingType, itemId: string) {
  const item = getItemSummary(bookingType, itemId);
  if (!item) {
    return [];
  }
  return item.staffIds
    .map((staffId) => getStaffById(staffId))
    .filter((staff): staff is StaffMember => Boolean(staff));
}
