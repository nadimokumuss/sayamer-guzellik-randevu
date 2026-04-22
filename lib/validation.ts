const TR_PHONE_PATTERN = /^05\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhone(raw: string): string | null {
  if (!raw) return null;
  let cleaned = raw.replace(/[\s\-().]/g, "");
  if (cleaned.startsWith("+90")) cleaned = "0" + cleaned.slice(3);
  else if (cleaned.startsWith("90") && cleaned.length === 12) cleaned = "0" + cleaned.slice(2);
  return TR_PHONE_PATTERN.test(cleaned) ? cleaned : null;
}

export function isValidEmail(raw: string): boolean {
  if (!raw) return true;
  return EMAIL_PATTERN.test(raw);
}

export const PHONE_FORMAT_MESSAGE =
  "Telefon numarası 05XX XXX XX XX biçiminde olmalı.";
export const EMAIL_FORMAT_MESSAGE =
  "Geçerli bir e-posta adresi giriniz.";
