// services/firebase.ts
// Importa las funciones modulares de Firebase v9+
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore'; // Importa Firestore para el tipo

// -----------------------------------------------------------------------------
//  CONFIGURACIÓN DE FIREBASE CON VALORES DIRECTOS
//  Estos valores provienen de Firebase Console -> Configuración del proyecto -> Tus apps -> Web -> Config
// -----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyALa2s_HpSJgC_rKVXpgp7ch397ui6kx3Q", // Tus valores REALES de Firebase
  authDomain: "my-project-1676425145510.firebaseapp.com", // Tus valores REALES de Firebase
  projectId: "my-project-1676425145510", // Tus valores REALES de Firebase
  storageBucket: "my-project-1676425145510.firebasestorage.app", // Tus valores REALES de Firebase
  messagingSenderId: "24341038571", // Tus valores REALES de Firebase
  appId: "1:24341038571:web:359a2c2e2d333c1d5a85ae", // Tus valores REALES de Firebase
  measurementId: "G-T87HQ24LZN" // Tus valores REALES de Firebase (Si no usas Analytics, puedes quitar esta línea)
};

// -----------------------------------------------------------------------------
//  Inicializa Firebase y Firestore
// -----------------------------------------------------------------------------
let db: Firestore | null = null; // Usamos el tipo Firestore de la v9
let firebaseError: Error | null = null;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  // --- PRUEBA DE CONEXIÓN CON LA NUEVA FORMA ---
  // Esta parte se ejecutará UNA VEZ cuando se cargue el servicio.
  // Es útil para depurar la conexión.
  (async () => {
    try {
      const testCollectionRef = collection(db, 'usuarios'); // Usamos la función collection de la v9
      await getDocs(testCollectionRef); // Intentamos leer para confirmar conexión
      console.log('✅ Firebase Firestore conectado correctamente.');
    } catch (e) {
      console.error('❌ Error al verificar la conexión de Firebase Firestore:', e);
      // No asignamos a firebaseError aquí para no bloquear la app si es solo un problema de permisos
      // o colección no existente en el momento de la prueba. El error principal ya se captura arriba.
    }
  })();
  // ---------------------------------------------

} catch (e) {
  firebaseError = e instanceof Error ? e : new Error(String(e));
  console.error("🔴 ERROR AL INICIALIZAR FIREBASE (Catch principal - Nueva configuración):", firebaseError.message);
}

// Exporta la instancia de Firestore y el error
export { db, firebaseError };