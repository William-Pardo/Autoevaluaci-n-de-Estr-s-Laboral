import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// ===================================================
// ✅ CONFIGURACIÓN DE FIREBASE
// Puedes obtener estos datos desde:
// Firebase Console → Configuración del proyecto → Tus apps
// ===================================================

const firebaseConfig = {
  apiKey: "AIzaSyA2Ls_Hp53gC_rVKpgp7ch397ui6kx3Q", // ✅ Reemplaza si es diferente
  authDomain: "tu-proyecto.firebaseapp.com",        // ✅ Reemplaza con tu dominio real
  projectId: "tu-proyecto",                         // ✅ Reemplaza con tu projectId real
  storageBucket: "tu-proyecto.appspot.com",         // ✅ Reemplaza con el mismo projectId
  messagingSenderId: "24341038571",                 // ✅ Reemplaza si aplica
  appId: "1:24341038571:web:359a2c2e2d333c1d5a85ae"  // ✅ Reemplaza si aplica
};

let db = null;
let firebaseError = null;

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  db = firebase.firestore();
} catch (e) {
  firebaseError = e;
  console.error("Error al inicializar Firebase:", e.message);
}

export { db, firebaseError };
