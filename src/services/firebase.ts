import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let db: firebase.firestore.Firestore | null = null;
let firebaseError: Error | null = null;

try {
  if (!import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID === "TU_PROJECT_ID_AQUI") {
    throw new Error("El 'projectId' de Firebase no ha sido configurado en el archivo .env.local");
  }
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  db = firebase.firestore();

} catch (e) {
  const error = e instanceof Error ? e : new Error(String(e));
  console.error("ERROR AL INICIALIZAR FIREBASE:", error);
  firebaseError = new Error(`Fallo en la inicialización de Firebase. ${error.message}`);
}

export { db, firebaseError };
