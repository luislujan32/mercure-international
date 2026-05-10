export type QuoteFormValues = {
  fullName: string;
  company: string;
  whatsapp: string;
  email: string;
  product: string;
  originCountry: string;
  destination: string;
  weightVolume: string;
  urgency: string;
  message: string;
};

export function isRealWhatsAppNumber(number: string): boolean {
  const normalized = number.replace(/\D/g, "");

  return normalized.length >= 10 && !/x/i.test(number);
}

export function normalizeWhatsAppNumber(number: string): string {
  return number.replace(/\D/g, "");
}

export function normalizeWhatsAppMessage(message: string): string {
  return message
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const normalized = normalizeWhatsAppNumber(number);
  const encodedMessage = encodeURIComponent(normalizeWhatsAppMessage(message));

  return `https://wa.me/${normalized}?text=${encodedMessage}`;
}

export function buildQuoteWhatsAppMessage(values: QuoteFormValues): string {
  const optionalMessage = values.message.trim() || "Sin mensaje adicional.";
  const optionalWeightVolume = values.weightVolume.trim() || "No especificado.";

  return normalizeWhatsAppMessage(`
Hola Mercure, quiero recibir asesoramiento para una operación de logística internacional.

Datos de la consulta:
- Nombre: ${values.fullName}
- Empresa: ${values.company}
- WhatsApp: ${values.whatsapp}
- Email: ${values.email}
- Producto a importar: ${values.product}
- País de origen: ${values.originCountry}
- Destino: ${values.destination}
- Peso/volumen aproximado: ${optionalWeightVolume}
- Urgencia: ${values.urgency}
- Mensaje adicional: ${optionalMessage}
`);
}
