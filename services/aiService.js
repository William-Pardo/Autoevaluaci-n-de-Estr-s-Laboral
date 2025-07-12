import { GoogleGenAI } from "@google/genai";

let chat = null;
let aiError = null;

try {
  // This logic is a stub for environments where process.env is not defined,
  // like a simple static server. A real build tool would replace process.env.API_KEY.
  // For this setup, we assume the API key is not available and gracefully handle it.
  if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
    let errorMessage = "La API_KEY de Google Gemini no está configurada.";
    if (typeof process === 'undefined') {
        errorMessage += " El entorno de ejecución actual (por ejemplo, Live Server) no es compatible con 'process.env'. Para usar la IA, necesitas un entorno con variables de entorno.";
    } else {
        errorMessage += " Asegúrate de que esté configurada en tus variables de entorno.";
    }
    throw new Error(errorMessage);
  }

  const apiKey = process.env.API_KEY;
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


export const sendMessageToAi = async (message) => {
  if (aiError) {
      throw aiError;
  }
  if (!chat) {
      // This is an additional safeguard.
      throw new Error("El chat con la IA no se ha inicializado correctamente.");
  }

  try {
    const responseStream = await chat.sendMessageStream({ message });
    return responseStream;
  } catch (error) {
    console.error("Error al enviar mensaje a la IA:", error);
    // Return a more generic error to the end user.
    throw new Error("No se pudo conectar con el asistente de IA. Por favor, inténtalo de nuevo más tarde.");
  }
};