// Importa las funciones que necesitas del SDK de Firebase v9
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// --- INSTRUCCIONES DE CONFIGURACIÓN ---
// 1. Crea un archivo llamado `.env.local` en la raíz de tu proyecto.
// 2. Copia y pega el siguiente contenido en ese archivo, reemplazando
//    los valores con tus propias credenciales de Firebase.

/* .env.local
VITE_FIREBASE_API_KEY="AIzaSy...YOUR_KEY"
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="1:your-sender-id:web:your-app-id"
*/

// Objeto de configuración de Firebase que lee las variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa Firebase y exporta los servicios
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const Timestamp = firebase.firestore.Timestamp;

const SURVEYS_COLLECTION = 'surveys';
const ADMIN_PASSWORD = 'UNAD-2025';

/**
 * Guarda una nueva respuesta de encuesta en Firestore.
 * @param surveyData - Un objeto con los datos de la encuesta.
 * @returns Una promesa que se resuelve cuando los datos se han guardado.
 */
export async function saveSurvey(surveyData: { [key: string]: any }): Promise<void> {
  try {
    const dataWithTimestamp = {
      ...surveyData,
      timestamp: Timestamp.now()
    };
    await db.collection(SURVEYS_COLLECTION).add(dataWithTimestamp);
  } catch (e) {
    console.error("Error al guardar la encuesta: ", e);
    throw new Error("No se pudo guardar la encuesta. Inténtalo de nuevo más tarde.");
  }
}

/**
 * Obtiene todas las respuestas de las encuestas de Firestore, ordenadas por fecha.
 * @returns Una promesa que se resuelve con un array de los datos de las encuestas.
 */
export async function getStats(): Promise<any[]> {
  try {
    const surveysCollection = db.collection(SURVEYS_COLLECTION);
    const q = surveysCollection.orderBy("timestamp", "desc");
    const querySnapshot = await q.get();
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error al obtener estadísticas: ", e);
    throw new Error("No se pudieron obtener las estadísticas.");
  }
}

/**
 * Autentica al administrador comparando la contraseña.
 * @param password - La contraseña introducida por el usuario.
 * @returns `true` si la contraseña es correcta, `false` en caso contrario.
 */
export function authAdmin(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
