import React from 'react';
import { StressLevel } from '../types';
import { Feedback } from '../constants';

interface FeedbackModalProps {
    feedback: Feedback | null;
    onClose: () => void;
}

const getBackgroundColor = (level: StressLevel) => {
    switch(level) {
        case StressLevel.Bajo: return 'bg-green-100 border-green-500';
        case StressLevel.Moderado: return 'bg-yellow-100 border-yellow-500';
        case StressLevel.Alto: return 'bg-red-100 border-red-500';
        default: return 'bg-gray-100 border-gray-500';
    }
}

const getTextColor = (level: StressLevel) => {
     switch(level) {
        case StressLevel.Bajo: return 'text-green-800';
        case StressLevel.Moderado: return 'text-yellow-800';
        case StressLevel.Alto: return 'text-red-800';
        default: return 'text-gray-800';
    }
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ feedback, onClose }) => {
  if (!feedback) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className={`relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 ease-out`}>
        <div className={`p-6 border-l-8 ${getBackgroundColor(feedback.level)}`}>
            <div className={` ${getTextColor(feedback.level)}`}>
                <h2 className="text-2xl font-bold mb-2">{feedback.level}</h2>
                <p className="text-lg font-semibold">{feedback.text}</p>
                <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-base">{feedback.recommendation}</p>
                </div>
            </div>
        </div>
        <div className="p-4 bg-gray-50 text-right">
             <button
                onClick={onClose}
                className="px-6 py-2 bg-unad-primary text-white font-semibold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-unad-accent focus:ring-opacity-50 transition-all"
                >
                Cerrar
            </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
