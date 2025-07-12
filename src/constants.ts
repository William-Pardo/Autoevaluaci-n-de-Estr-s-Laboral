import { StressLevel, Submission } from './types';

export const ADMIN_PASSWORD = 'UNAD-2025';

export const SEDES_UNAD = [
  'CEAD Acacías', 'CEAD Amazonia', 'CEAD Barrancabermeja', 'CEAD Bucaramanga', 'CEAD Cali', 
  'CEAD Cartagena', 'CEAD Corozal', 'CEAD Cúcuta', 'CEAD Duitama', 'CEAD Florencia', 
  'CEAD Gachetá', 'CEAD Girardot', 'CEAD Ibagué', 'CEAD La Dorada', 'CEAD La Guajira', 
  'CEAD Leticia', 'CEAD Málaga', 'CEAD Medellín', 'CEAD Neiva', 'CEAD Ocaña', 'CEAD Palmira', 
  'CEAD Pamplona', 'CEAD Pasto', 'CEAD Popayán', 'CEAD Quibdó', 'CEAD Sahagún', 
  'CEAD Santa Marta', 'CEAD Sogamoso', 'CEAD Tunja', 'CEAD Turbo', 'CEAD Valledupar', 
  'CEAD Vélez', 'CEAD Yopal', 'CCAV Bogotá', 'CCAV Zipaquirá'
] as const;

export const SURVEY_QUESTIONS = [
  { id: 'carga_trabajo', text: 'Siento que mi carga de trabajo es manejable.' },
  { id: 'descansos', text: 'Dispongo de suficientes descansos durante mi jornada.' },
  { id: 'claridad_funciones', text: 'Tengo claridad sobre mis funciones y responsabilidades.' },
  { id: 'apoyo_social', text: 'Cuento con el apoyo de mi equipo y superiores.' },
  { id: 'equilibrio', text: 'Puedo equilibrar mi vida laboral y personal.' },
  { id: 'recursos', text: 'Dispongo de recursos adecuados para realizar mi trabajo.' },
  { id: 'ambiente', text: 'Me siento satisfecho/a con mi ambiente laboral.' },
  { id: 'reconocimiento', text: 'Recibo reconocimiento por mi desempeño.' },
  { id: 'sueño', text: 'Duermo lo suficiente para recuperar energías.' },
  { id: 'relajacion', text: 'Practico técnicas de relajación o actividad física regularmente.' },
] as const;

export const LIKERT_OPTIONS = [
  { text: 'Nunca', value: 0 },
  { text: 'Casi nunca', value: 1 },
  { text: 'A veces', value: 2 },
  { text: 'Casi siempre', value: 3 },
  { text: 'Siempre', value: 4 },
] as const;

export interface Feedback {
    level: StressLevel;
    text: string;
    recommendation: string;
}

export const FEEDBACK_THRESHOLDS: Feedback[] = [
    {
        level: StressLevel.Bajo,
        text: "¡Excelente! Tu nivel de estrés es bajo.",
        recommendation: "Continúa con tus hábitos actuales de bienestar y autocuidado. ¡Sigue así!"
    },
    {
        level: StressLevel.Moderado,
        text: "Tu nivel de estrés es moderado.",
        recommendation: "Te sugerimos 3 acciones rápidas: ① Realiza micro-pausas activas cada hora. ② Practica la técnica de respiración 4-7-8 dos veces al día. ③ Dedica 10 minutos a planificar tu jornada la noche anterior."
    },
    {
        level: StressLevel.Alto,
        text: "Tu nivel de estrés es alto.",
        recommendation: "Es importante tomar acción. Te recomendamos agendar una cita con el área de talento humano para explorar apoyos y probar la rutina guiada de mindfulness de 5 minutos disponible en nuestro canal interno."
    }
];

export const getFeedbackForScore = (score: number): Feedback => {
    if (score <= 13) return FEEDBACK_THRESHOLDS[0];
    if (score <= 26) return FEEDBACK_THRESHOLDS[1];
    return FEEDBACK_THRESHOLDS[2];
};
