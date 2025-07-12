// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔴 REEMPLAZA estos valores por los tuyos reales desde Firebase Console
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// ✅ Inicializa Firebase
const app = initializeApp(firebaseConfig);

// ✅ Exporta la instancia de Firestore
const db = getFirestore(app);

export { db };
