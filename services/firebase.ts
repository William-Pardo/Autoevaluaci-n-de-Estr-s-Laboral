// services/firebase.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// -----------------------------------------------------------------------------
//  CONFIGURACIÓN DE FIREBASE CON VALORES DIRECTOS (PARA DESPLIEGUE SENCILLO)
//  Estos valores provienen de Firebase Console -> Configuración del proyecto -> Tus apps -> Web -> Config
// -----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyALa2s_HpSJgC_rKVXpgp7ch397ui6kx3Q", // Tus valores REALES de Firebase
  authDomain: "my-project-1676425145510.firebaseapp.com", // Tus valores REALES de Firebase
  projectId: "my-project-1676425145510", // Tus valores REALES de Firebase
  storageBucket: "my-project-1676425145510.firebasestorage.app", // Tus valores REALES de Firebase
  messagingSenderId: "24341038571", // Tus valores REALES de Firebase
  appId: "1:24341038571:web:359a2c2e2d333c1d5a85ae", // Tus valores REALES de Firebase
  measurementId: "G-T87HQ24LZN" // Tus valores REALES de Firebase (Si no usas Analytics, puedes quitar esta línea, pero no afecta si la dejas)
};

// -----------------------------------------------------------------------------
//  Inicializa Firebase solo una vez
// -----------------------------------------------------------------------------
let db  : firebase.firestore.Firestore | null = null;
let err : Error | null                = null;

try {
  // ✅ IMPORTANTE: Hemos comentado esta validación que buscaba projectId
  // en .env.local para que NO cause el error.
  // Ahora el projectId está definido directamente arriba.
  // if (!firebaseConfig.projectId) {
  //   throw new Error(
  //     "El 'projectId' de Firebase no está definido. Verifica tu archivo .env.local."
  //   );
  // }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  db = firebase.firestore();
} catch (e) {
  err = e instanceof Error ? e : new Error(String(e));
  // Hemos cambiado el mensaje de error de consola para distinguirlo
  console.error("🔴 ERROR AL INICIALIZAR FIREBASE (Catch - Configuración directa):", err.message);
}

// -----------------------------------------------------------------------------
//  Configuración de la API de Gemini (IGNORAR POR AHORA)
//  No estamos tocando esto por el momento, ya lo eliminaremos después.
// -----------------------------------------------------------------------------
// const GEMINI_API_KEY = "TU_CLAVE_DE_API_GEMINI_AQUI";
// export { GEMINI_API_KEY };


// Exporta la instancia de Firestore y cualquier error
export { db, err as firebaseError };