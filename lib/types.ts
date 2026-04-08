export type BookingType = "service" | "package";

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  accent: string;
  heroLine: string;
};

export type StaffMember = {
  id: string;
  name: string;
  title: string;
  categoryId: string;
  bio: string;
  specialties: string[];
  signature: string;
  gradient: string;
  workingDays: number[];
  startHour: number;
  endHour: number;
};

export type Service = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  featured?: boolean;
  tag?: string;
  staffIds: string[];
};

export type Package = {
  id: string;
  name: string;
  description: string;
  primaryServiceId: string;
  includedServiceIds: string[];
  durationMinutes: number;
  price: number;
  savingsLabel: string;
  staffIds: string[];
};

export type Testimonial = {
  id: string;
  author: string;
  treatment: string;
  quote: string;
};

export type Campaign = {
  id: string;
  title: string;
  body: string;
  kicker: string;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  note?: string;
};

export type AppointmentStatus =
  | "confirmed"
  | "checked_in"
  | "completed"
  | "cancelled";

export type Appointment = {
  id: string;
  bookingType: BookingType;
  itemId: string;
  itemName: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  price: number;
  status: AppointmentStatus;
  customer: Customer;
  source: "web-demo";
  whatsappUrl: string;
  createdAt: string;
};

export type AppointmentRequest = {
  bookingType: BookingType;
  itemId: string;
  staffId: string;
  date: string;
  startTime: string;
  customer: Omit<Customer, "id">;
};

export type BlockedSlot = {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
};

export type TimeSlot = {
  startTime: string;
  endTime: string;
  available: boolean;
  label: string;
};

export type AvailabilityResponse = {
  date: string;
  slots: TimeSlot[];
  nextAvailableDates: string[];
};

export type Catalog = {
  categories: ServiceCategory[];
  services: Service[];
  packages: Package[];
  staff: StaffMember[];
  testimonials: Testimonial[];
  campaigns: Campaign[];
};

export type DashboardStats = {
  todayCount: number;
  upcomingCount: number;
  blockedCount: number;
  confirmedRevenue: number;
};
