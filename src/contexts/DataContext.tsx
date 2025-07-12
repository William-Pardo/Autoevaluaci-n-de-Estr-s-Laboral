import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { db, firebaseError } from '../services/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Submission } from '../types';

type DataState = Submission[];

type Action = { type: 'SET_SUBMISSIONS'; payload: Submission[] };

interface DataContextType {
  submissions: DataState;
  addSubmission: (submission: Omit<Submission, 'id'>) => Promise<void>;
  firebaseError: Error | null;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

const dataReducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    case 'SET_SUBMISSIONS':
      return action.payload;
    default:
      return state;
  }
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [submissions, dispatch] = useReducer(dataReducer, []);

  useEffect(() => {
    if (firebaseError || !db) {
      console.warn("La conexión con Firebase falló. La aplicación funcionará sin conexión a la base de datos.", firebaseError);
      return;
    }
      
    try {
      const q = db.collection("submissions").orderBy("timestamp", "desc");

      const unsubscribe = q.onSnapshot((querySnapshot) => {
        const submissionsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                timestamp: (data.timestamp as firebase.firestore.Timestamp)?.toDate ? (data.timestamp as firebase.firestore.Timestamp).toDate().toISOString() : new Date().toISOString(),
            } as Submission;
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

  const addSubmission = async (submission: Omit<Submission, 'id'>) => {
    if (firebaseError || !db) {
      throw firebaseError || new Error("La configuración de Firebase es incorrecta.");
    }
    try {
      const submissionData = {
          ...submission,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date(submission.timestamp)),
      };
      await db.collection("submissions").add(submissionData);
    } catch (error) {
      console.error("Error al añadir documento: ", error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{ submissions, addSubmission, firebaseError }}>
      {children}
    </DataContext.Provider>
  );
};
