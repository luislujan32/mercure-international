export function isRealWhatsAppNumber(number: string): boolean {
  const normalized = number.replace(/\D/g, "");

  return normalized.length >= 10 && !/x/i.test(number);
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const normalized = number.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${normalized}?text=${encodedMessage}`;
}
