/**
 * Beneficios que se muestran como tarjetas flotantes en la sección de contacto.
 * ⚠️ Revisa que cada promesa sea algo que puedas cumplir siempre.
 */
export interface Benefit {
  icon: "speed" | "consult" | "shield";
  title: string;
  text: string;
}

export const benefits: Benefit[] = [
  {
    icon: "speed",
    title: "Respuesta rápida",
    text: "Atendemos tu solicitud dentro de nuestro horario, sin largas esperas.",
  },
  {
    icon: "consult",
    title: "Consultoría gratis",
    text: "Una primera sesión sin costo para entender tu empresa y definir el alcance.",
  },
  {
    icon: "shield",
    title: "Garantía",
    text: "Ajustamos tu proyecto hasta que cumpla con lo acordado en la propuesta.",
  },
];
