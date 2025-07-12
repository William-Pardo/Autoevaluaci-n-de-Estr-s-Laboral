import React, { useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData.js';
import { SURVEY_QUESTIONS, LIKERT_OPTIONS, SEDES_UNAD, getFeedbackForScore } from '../constants.js';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEDE':
      return { ...state, sede: action.payload };
    case 'SET_SCORE':
      return {
        ...state,
        scores: { ...state.scores, [action.payload.questionId]: action.payload.value },
      };
    default:
      return state;
  }
};

const UserFormPage = () => {
  const initialState = {
    sede: '',
    scores: SURVEY_QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: -1 }), {}),
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const { addSubmission } = useData();
  const [error, setError] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.sede) {
      setError('Por favor, selecciona una sede.');
      return;
    }
    const unansweredQuestions = Object.values(state.scores).some(score => score === -1);
    if (unansweredQuestions) {
      setError('Por favor, responde todas las preguntas.');
      return;
    }
    setError('');

    const totalScore = Object.values(state.scores).reduce((sum, score) => sum + score, 0);
    const feedbackData = getFeedbackForScore(totalScore);

    const submission = {
      id: '', // Firestore will generate the ID
      sede: state.sede,
      timestamp: new Date().toISOString(),
      scores: state.scores,
      totalScore,
      stressLevel: feedbackData.level,
    };

    try {
      await addSubmission(submission);
      setSubmissionResult({ submission, feedback: feedbackData });
    } catch (err) {
      setError("No se pudieron enviar tus respuestas. Por favor, intenta de nuevo más tarde.");
      console.error("Failed to submit survey:", err);
    }
  };

  if (submissionResult) {
    const { submission, feedback } = submissionResult;
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg text-center flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
        <div className="bg-green-100 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-4a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 className="text-3xl font-bold text-unad-primary mt-6 mb-2">¡Gracias por tu participación!</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">Tus respuestas han sido registradas de forma anónima.</p>
        
        <div className="w-full max-w-lg bg-unad-light-gray p-6 rounded-lg shadow-inner mb-8 text-left">
            <h3 className="text-lg font-semibold text-unad-dark-gray text-center">Tu resultado:</h3>
            <p className="text-3xl font-bold text-unad-primary mt-1 text-center">{submission.stressLevel}</p>
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="font-semibold text-unad-dark-gray">{feedback.text}</p>
              <p className="text-gray-700 mt-2">{feedback.recommendation}</p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="px-8 py-3 bg-unad-dark-gray text-white text-lg font-semibold rounded-lg shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-4 focus:ring-unad-dark-gray focus:ring-opacity-50 transition-all duration-300"
          >
            Finalizar y Salir
          </Link>
          <Link
            to="/ayuda-ia"
            state={{ submission }}
            className="px-8 py-3 bg-unad-primary text-white text-lg font-bold rounded-lg shadow-md hover:bg-unad-primary/80 focus:outline-none focus:ring-4 focus:ring-unad-primary focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
          >
            Hablar con Asistente de IA
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600">
          Responde 10 preguntas (3 min). Tus respuestas son anónimas; solo se usará la sede para mejorar los programas de bienestar.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-unad-light-gray p-6 rounded-lg shadow-inner">
          <label htmlFor="sede" className="block text-xl font-semibold text-unad-primary mb-2">
            Nombre de la sede <span className="text-red-500">*</span>
          </label>
          <select
            id="sede"
            value={state.sede}
            onChange={(e) => dispatch({ type: 'SET_SEDE', payload: e.target.value })}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-unad-accent focus:border-unad-accent transition bg-unad-dark-gray text-white"
          >
            <option value="" disabled className="text-gray-400">-- Selecciona tu sede --</option>
            {SEDES_UNAD.map((sede) => (
              <option key={sede} value={sede} className="bg-unad-dark-gray text-white">{sede}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {SURVEY_QUESTIONS.map((question, index) => (
            <fieldset key={question.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <legend className="text-lg font-medium text-unad-dark-gray mb-4">
                {index + 1}. {question.text}
              </legend>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {LIKERT_OPTIONS.map((option) => (
                  <label key={option.value} className="flex flex-col items-center space-y-2 cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={state.scores[question.id] === option.value}
                      onChange={() => dispatch({ type: 'SET_SCORE', payload: { questionId: question.id, value: option.value } })}
                      className="sr-only"
                    />
                    <span className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${state.scores[question.id] === option.value ? 'bg-unad-primary text-white border-unad-primary' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}`}>
                      {option.value}
                    </span>
                    <span className="text-sm text-gray-600">{option.text}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

        <div className="text-center pt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-12 py-4 bg-unad-primary text-white text-lg font-bold rounded-lg shadow-md hover:bg-unad-accent focus:outline-none focus:ring-4 focus:ring-unad-accent focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
          >
            Enviar Respuestas
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFormPage;