export enum StressLevel {
  Bajo = 'Bajo estrés',
  Moderado = 'Estrés moderado',
  Alto = 'Estrés alto',
}

export interface Submission {
  id: string;
  sede: string;
  timestamp: string;
  scores: { [key: string]: number };
  totalScore: number;
  stressLevel: StressLevel;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
