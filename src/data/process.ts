import type { ProcessStep } from "@/types/site";

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Recibimos la consulta",
    description:
      "Relevamos si necesitás importar un producto o coordinar un proyecto logístico, con origen, destino, urgencia y alcance esperado."
  },
  {
    step: 2,
    title: "Analizamos carga y contexto",
    description:
      "Revisamos producto o tipo de carga, peso, volumen, frontera involucrada, documentación disponible, almacenamiento y descarga si aplica."
  },
  {
    step: 3,
    title: "Coordinamos la red operativa",
    description:
      "Articulamos proveedores y actores logísticos coordinados para evaluar alternativas internacionales, regionales o locales según la operación."
  },
  {
    step: 4,
    title: "Presentamos una propuesta",
    description:
      "Ordenamos alcance, modalidad, tiempos estimados y próximos pasos para que puedas decidir con un solo punto de contacto."
  },
  {
    step: 5,
    title: "Acompañamos el seguimiento",
    description:
      "Centralizamos comunicación, avances e hitos relevantes durante la coordinación para reducir fricción entre participantes."
  },
  {
    step: 6,
    title: "Coordinamos cierre operativo",
    description:
      "Gestionamos entrega, almacenamiento, descarga o derivación local cuando forma parte del alcance acordado para la operación."
  }
];
