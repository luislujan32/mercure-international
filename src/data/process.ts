import type { ProcessStep } from "@/types/site";

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Consulta inicial",
    description:
      "Relevamos qué querés importar, desde dónde, hacia qué ciudad y con qué nivel de urgencia para ordenar la información de base."
  },
  {
    step: 2,
    title: "Análisis de la operación",
    description:
      "Evaluamos características del producto, peso, volumen, origen, destino y documentación disponible para detectar necesidades y posibles restricciones."
  },
  {
    step: 3,
    title: "Propuesta logística",
    description:
      "Coordinamos alternativas según urgencia, volumen y presupuesto, explicando el alcance de cada opción antes de avanzar."
  },
  {
    step: 4,
    title: "Coordinación internacional",
    description:
      "Acompañamos la coordinación con origen, transporte internacional y actores involucrados para ordenar la operación de punta a punta."
  },
  {
    step: 5,
    title: "Arribo y gestión en Argentina",
    description:
      "Damos seguimiento al arribo y a las gestiones necesarias en Argentina, manteniendo comunicación clara sobre el estado de la carga."
  },
  {
    step: 6,
    title: "Entrega final",
    description:
      "Coordinamos la entrega nacional hasta la ciudad de destino, según el alcance definido para la operación."
  }
];
