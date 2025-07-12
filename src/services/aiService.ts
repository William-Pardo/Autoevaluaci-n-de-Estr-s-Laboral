import { GoogleGenAI, Chat } from "@google/genai";

let chat: Chat | null = null;
let aiError: Error | null = null;

try {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "TU_API_KEY_DE_GEMINI_AQUI") {
    throw new Error("La API_KEY de Google Gemini no está configurada. Asegúrate de que VITE_GEMINI_API_KEY esté en tu archivo .env.local.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Actúa como un consejero de bienestar laboral y salud mental para la UNAD (Universidad Nacional Abierta y a Distancia). Eres empático, profesional y ofreces consejos prácticos y accionables basados en la psicología positiva y el coaching.
- Tu objetivo es ayudar al colaborador a entender su nivel de estrés y darle herramientas para manejarlo.
- No debes dar diagnósticos médicos. Si la situación parece grave, recomienda contactar a un profesional de la salud o al área de Talento Humano de la UNAD.
- Usa un lenguaje claro, cercano y de apoyo.
- Estructura tus respuestas con listas, negritas y párrafos cortos para facilitar la lectura.
- Siempre responde en español.`
    },
  });

} catch (e) {
  aiError = e instanceof Error ? e : new Error("Ocurrió un error desconocido al inicializar el servicio de IA.");
  console.error("ERROR AL INICIALIZAR EL SERVICIO DE IA:", aiError.message);
}

export const sendMessageToAi = async (message: string) => {
  if (aiError) {
      throw aiError;
  }
  if (!chat) {
      throw new Error("El chat con la IA no se ha inicializado correctamente.");
  }

  try {
    const responseStream = await chat.sendMessageStream({ message });
    return responseStream;
  } catch (error) {
    console.error("Error al enviar mensaje a la IA:", error);
    throw new Error("No se pudo conectar con el asistente de IA. Por favor, inténtalo de nuevo más tarde.");
  }
};
