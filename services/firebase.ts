// services/firebase.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// -----------------------------------------------------------------------------
//  CONFIGURACIÓN CON VALORES DIRECTOS (PARA DESPLIEGUE SENCILLO)
//  Estos valores provienen de Firebase Console -> Configuración del proyecto -> Tus apps -> Web -> Config
// -----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyALa2s_HpSJgC_rKVXpgp7ch397ui6kx3Q",
  authDomain: "my-project-1676425145510.firebaseapp.com",
  projectId: "my-project-1676425145510",
  storageBucket: "my-project-1676425145510.firebasestorage.app",
  messagingSenderId: "24341038571",
  appId: "1:24341038571:web:359a2c2e2d333c1d5a85ae",
  measurementId: "G-T87HQ24LZN" // Este valor es el que me proporcionaste.
};

// -----------------------------------------------------------------------------
//  Inicializa Firebase solo una vez
// -----------------------------------------------------------------------------
let db  : firebase.firestore.Firestore | null = null;
let err : Error | null                = null;

try {
  // Esta validación ya no es estrictamente necesaria porque los valores están directos,
  // pero no interfiere si se deja. La he comentado para simplificar el flujo.
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
  console.error("🔴 ERROR AL INICIALIZAR FIREBASE:", err.message);
}

// Exporta la instancia de Firestore y cualquier error
export { db, err as firebaseError };