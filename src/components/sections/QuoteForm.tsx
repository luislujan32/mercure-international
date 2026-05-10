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
  "Necesito asesoramiento antes de comprar"
];

const initialValues: QuoteFormValues = {
  fullName: "",
  company: "",
  whatsapp: "",
  email: "",
  product: "",
  originCountry: "",
  destination: "",
  weightVolume: "",
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
  if (!values.product.trim()) errors.product = "Contanos qué producto querés importar.";
  if (!values.originCountry.trim()) errors.originCountry = "Ingresá el país de origen.";
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
    "mt-2 min-h-12 w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink shadow-line outline-none transition placeholder:text-steel/70 focus:border-ocean focus:ring-4 focus:ring-ocean/15 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/15";
  const labelClass = "text-sm font-semibold text-graphite";
  const errorClass = "mt-2 text-sm font-semibold text-danger";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-line bg-white p-5 text-left text-ink shadow-premium md:p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
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
          Producto a importar
          <input
            className={inputClass}
            value={values.product}
            onChange={(event) => updateField("product", event.target.value)}
            {...fieldProps("product")}
          />
          {errors.product && <p id="product-error" className={errorClass}>{errors.product}</p>}
        </label>

        <label className={labelClass}>
          País de origen
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
          Ciudad/provincia de destino
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
          Peso o volumen aproximado
          <input
            className={inputClass}
            value={values.weightVolume}
            onChange={(event) => updateField("weightVolume", event.target.value)}
            placeholder="Ej: 80 kg, 2 pallets, 1 m3"
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
          Mensaje adicional
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Sumá cualquier detalle útil sobre proveedor, producto, plazos o documentación."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-marine px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-harbor focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-signal"
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
              : "Consulta preparada. Cuando se configure el WhatsApp de Mercure, este formulario enviará el mensaje automáticamente."}
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
