import { useMemo, useState } from "react";
import {
  buildQuoteWhatsAppMessage,
  buildWhatsAppUrl,
  isRealWhatsAppNumber,
  type QuoteFormValues
} from "@lib/whatsapp";

type QuoteFormProps = {
  whatsappNumber: string;
};

type FormErrors = Partial<Record<keyof QuoteFormValues, string>>;

const urgencyOptions = [
  "Estoy evaluando opciones",
  "Lo necesito pronto",
  "Ya compré el producto",
  "Necesito asesoramiento antes de avanzar"
];

const inquiryTypeOptions = ["Importar un producto", "Consultar por un proyecto logístico"];
const yesNoOptions = ["No sé todavía", "Sí", "No"];

const initialValues: QuoteFormValues = {
  inquiryType: inquiryTypeOptions[0],
  fullName: "",
  company: "",
  whatsapp: "",
  email: "",
  product: "",
  productLink: "",
  originCountry: "",
  destination: "",
  quantity: "",
  weightVolume: "",
  storageRequired: yesNoOptions[0],
  unloadingRequired: yesNoOptions[0],
  borderInvolved: "",
  urgency: urgencyOptions[0],
  message: ""
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(values: QuoteFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Ingresá tu nombre y apellido.";
  if (!values.company.trim()) errors.company = "Ingresá el nombre de tu empresa.";
  if (!values.whatsapp.trim()) errors.whatsapp = "Ingresá un WhatsApp de contacto.";
  if (!values.email.trim()) {
    errors.email = "Ingresá tu email.";
  } else if (!validateEmail(values.email)) {
    errors.email = "Ingresá un email válido.";
  }
  if (!values.inquiryType.trim()) errors.inquiryType = "Seleccioná el tipo de consulta.";
  if (!values.product.trim()) errors.product = "Contanos el producto o tipo de carga.";
  if (!values.originCountry.trim()) errors.originCountry = "Ingresá el origen de la operación.";
  if (!values.destination.trim()) errors.destination = "Ingresá ciudad o provincia de destino.";

  return errors;
}

export default function QuoteForm({ whatsappNumber }: QuoteFormProps) {
  const [values, setValues] = useState<QuoteFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [generatedMessage, setGeneratedMessage] = useState("");

  const hasRealWhatsApp = useMemo(() => isRealWhatsAppNumber(whatsappNumber), [whatsappNumber]);

  function updateField<K extends keyof QuoteFormValues>(field: K, value: QuoteFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function fieldProps(field: keyof QuoteFormValues) {
    const errorId = `${field}-error`;

    return {
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? errorId : undefined
    };
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    const message = buildQuoteWhatsAppMessage(values);
    setGeneratedMessage(message);
    setStatus("success");

    if (hasRealWhatsApp) {
      window.open(buildWhatsAppUrl(whatsappNumber, message), "_blank", "noopener,noreferrer");
      window.location.assign("/gracias/");
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink shadow-line outline-none transition placeholder:text-steel/70 focus:border-cyan focus:ring-4 focus:ring-cyan/20 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/15";
  const labelClass = "text-sm font-semibold text-graphite";
  const errorClass = "mt-2 text-sm font-semibold text-danger";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-line bg-white p-5 text-left text-ink shadow-premium md:p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className={`${labelClass} md:col-span-2`}>
          ¿Qué necesitás cotizar?
          <select
            className={inputClass}
            value={values.inquiryType}
            onChange={(event) => updateField("inquiryType", event.target.value)}
            {...fieldProps("inquiryType")}
          >
            {inquiryTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.inquiryType && (
            <p id="inquiryType-error" className={errorClass}>{errors.inquiryType}</p>
          )}
        </label>

        <label className={labelClass}>
          Nombre y apellido
          <input
            className={inputClass}
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            {...fieldProps("fullName")}
          />
          {errors.fullName && <p id="fullName-error" className={errorClass}>{errors.fullName}</p>}
        </label>

        <label className={labelClass}>
          Empresa
          <input
            className={inputClass}
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
            autoComplete="organization"
            {...fieldProps("company")}
          />
          {errors.company && <p id="company-error" className={errorClass}>{errors.company}</p>}
        </label>

        <label className={labelClass}>
          WhatsApp
          <input
            className={inputClass}
            value={values.whatsapp}
            onChange={(event) => updateField("whatsapp", event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            {...fieldProps("whatsapp")}
          />
          {errors.whatsapp && <p id="whatsapp-error" className={errorClass}>{errors.whatsapp}</p>}
        </label>

        <label className={labelClass}>
          Email
          <input
            className={inputClass}
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            inputMode="email"
            type="email"
            {...fieldProps("email")}
          />
          {errors.email && <p id="email-error" className={errorClass}>{errors.email}</p>}
        </label>

        <label className={labelClass}>
          Producto o tipo de carga
          <input
            className={inputClass}
            value={values.product}
            onChange={(event) => updateField("product", event.target.value)}
            {...fieldProps("product")}
          />
          {errors.product && <p id="product-error" className={errorClass}>{errors.product}</p>}
        </label>

        <label className={labelClass}>
          Link del producto, si tenés
          <input
            className={inputClass}
            value={values.productLink}
            onChange={(event) => updateField("productLink", event.target.value)}
            inputMode="url"
            placeholder="URL del proveedor o marketplace"
          />
        </label>

        <label className={labelClass}>
          Origen
          <input
            className={inputClass}
            value={values.originCountry}
            onChange={(event) => updateField("originCountry", event.target.value)}
            autoComplete="country-name"
            {...fieldProps("originCountry")}
          />
          {errors.originCountry && (
            <p id="originCountry-error" className={errorClass}>{errors.originCountry}</p>
          )}
        </label>

        <label className={labelClass}>
          Destino
          <input
            className={inputClass}
            value={values.destination}
            onChange={(event) => updateField("destination", event.target.value)}
            autoComplete="address-level2"
            {...fieldProps("destination")}
          />
          {errors.destination && (
            <p id="destination-error" className={errorClass}>{errors.destination}</p>
          )}
        </label>

        <label className={labelClass}>
          Cantidad
          <input
            className={inputClass}
            value={values.quantity}
            onChange={(event) => updateField("quantity", event.target.value)}
            placeholder="Ej: 500 unidades, 1 contenedor"
          />
        </label>

        <label className={labelClass}>
          Peso o volumen aproximado
          <input
            className={inputClass}
            value={values.weightVolume}
            onChange={(event) => updateField("weightVolume", event.target.value)}
            placeholder="Ej: 80 kg, 2 pallets, 1 m3"
          />
        </label>

        <label className={labelClass}>
          ¿Requiere almacenamiento?
          <select
            className={inputClass}
            value={values.storageRequired}
            onChange={(event) => updateField("storageRequired", event.target.value)}
          >
            {yesNoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          ¿Requiere descarga?
          <select
            className={inputClass}
            value={values.unloadingRequired}
            onChange={(event) => updateField("unloadingRequired", event.target.value)}
          >
            {yesNoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          Frontera involucrada, si aplica
          <input
            className={inputClass}
            value={values.borderInvolved}
            onChange={(event) => updateField("borderInvolved", event.target.value)}
            placeholder="Ej: Chile, Bolivia, Brasil"
          />
        </label>

        <label className={`${labelClass} md:col-span-2`}>
          Urgencia
          <select
            className={inputClass}
            value={values.urgency}
            onChange={(event) => updateField("urgency", event.target.value)}
          >
            {urgencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={`${labelClass} md:col-span-2`}>
          Detalle del proyecto o mensaje adicional
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Sumá cualquier detalle útil sobre proveedor, carga, plazos, documentación, almacenamiento o entrega."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-cyan px-6 py-3 text-sm font-semibold text-marine shadow-soft transition hover:bg-aqua focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-cyan"
        >
          Preparar consulta
        </button>
        <p className="text-sm leading-6 text-steel">
          No necesitás tener todo resuelto: con estos datos podemos empezar a analizar la operación.
        </p>
      </div>

      <div aria-live="polite" className="mt-5">
        {status === "success" && (
          <div className="rounded-lg border border-success/30 bg-success/10 p-4 text-sm leading-7 text-success">
            {hasRealWhatsApp
              ? "Consulta preparada. Se abrirá WhatsApp con el mensaje listo para enviar."
              : "Consulta preparada. Cuando se configure el WhatsApp de Mercure Global, este formulario enviará el mensaje automáticamente."}
          </div>
        )}
      </div>

      {generatedMessage && !hasRealWhatsApp && (
        <div className="mt-5 rounded-lg border border-line bg-smoke p-4">
          <p className="text-sm font-bold text-graphite">Vista previa del mensaje</p>
          <pre className="mt-3 whitespace-pre-wrap text-sm leading-7 text-steel">{generatedMessage}</pre>
        </div>
      )}
    </form>
  );
}
