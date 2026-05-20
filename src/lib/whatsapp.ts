export type QuoteFormValues = {
  inquiryType: string;
  fullName: string;
  company: string;
  whatsapp: string;
  email: string;
  product: string;
  productLink: string;
  originCountry: string;
  destination: string;
  quantity: string;
  weightVolume: string;
  storageRequired: string;
  unloadingRequired: string;
  borderInvolved: string;
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
  const optionalProductLink = values.productLink.trim() || "No especificado.";
  const optionalQuantity = values.quantity.trim() || "No especificado.";
  const optionalBorder = values.borderInvolved.trim() || "No especificado.";

  return normalizeWhatsAppMessage(`
Hola Mercure, quiero cotizar una operación con Mercure Global.

Datos de la consulta:
- Tipo de consulta: ${values.inquiryType}
- Nombre: ${values.fullName}
- Empresa: ${values.company}
- WhatsApp: ${values.whatsapp}
- Email: ${values.email}
- Producto o tipo de carga: ${values.product}
- Link del producto: ${optionalProductLink}
- Origen: ${values.originCountry}
- Destino: ${values.destination}
- Cantidad: ${optionalQuantity}
- Peso/volumen aproximado: ${optionalWeightVolume}
- Requiere almacenamiento: ${values.storageRequired}
- Requiere descarga: ${values.unloadingRequired}
- Frontera involucrada: ${optionalBorder}
- Urgencia: ${values.urgency}
- Detalle adicional: ${optionalMessage}
`);
}
