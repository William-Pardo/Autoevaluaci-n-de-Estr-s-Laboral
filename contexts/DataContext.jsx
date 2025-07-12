import React, { createContext, useReducer, useEffect } from 'react';
import { db, firebaseError } from '../services/firebase.js';
import firebase from 'firebase/compat/app';

export const DataContext = createContext(undefined);

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUBMISSIONS':
      return action.payload;
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [submissions, dispatch] = useReducer(dataReducer, []);

  useEffect(() => {
    if (firebaseError || !db) {
      console.warn("La conexión con Firebase falló. La aplicación funcionará sin conexión a la base de datos.", firebaseError);
      return;
    }
      
    try {
      const q = db.collection("submissions").orderBy("timestamp", "desc");
      const unsubscribe = q.onSnapshot((querySnapshot) => {
        const submissionsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          submissionsData.push({
            ...data,
            id: doc.id,
            timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : new Date().toISOString(),
          });
        });
        dispatch({ type: 'SET_SUBMISSIONS', payload: submissionsData });
      }, (error) => {
          console.error("Error al obtener datos de Firestore:", error);
      });
      return () => unsubscribe();
    } catch (error) {
       console.error("Error al inicializar la escucha de Firestore. Verifica la configuración de Firebase.", error);
    }
  }, []);

  const addSubmission = async (submission) => {
    if (firebaseError || !db) {
      console.error("Firebase no está configurado, no se puede guardar el envío.", firebaseError);
      throw firebaseError || new Error("La configuración de Firebase es incorrecta. No se pueden guardar las respuestas.");
    }
    try {
      const { id, ...dataToSave } = submission;
      const submissionData = {
          ...dataToSave,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date(submission.timestamp)),
      };
      await db.collection("submissions").add(submissionData);
    } catch (error) {
      console.error("Error al añadir documento: ", error);
      alert("Error al guardar los datos. Revisa la consola para más detalles.");
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{ submissions, addSubmission, firebaseError }}>
      {children}
    </DataContext.Provider>
  );
};