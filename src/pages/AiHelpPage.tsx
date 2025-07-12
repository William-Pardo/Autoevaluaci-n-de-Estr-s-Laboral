import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { sendMessageToAi } from '../services/aiService';
import { Submission, ChatMessage } from '../types';

const AiHelpPage: React.FC = () => {
  const location = useLocation();
  const submission = location.state?.submission as Submission | undefined;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);
  
  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return;

    setIsLoading(true);
    setError(null);
    setUserInput(''); // Clear input immediately
    
    setMessages(prev => [...prev, 
        { role: 'user', content: messageText },
        { role: 'model', content: '' } // Placeholder for model response
    ]);

    let fullModelResponse = '';
    try {
      const stream = await sendMessageToAi(messageText);

      for await (const chunk of stream) {
        fullModelResponse += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            if(newMessages.length > 0) {
               newMessages[newMessages.length - 1].content = fullModelResponse;
            }
            return newMessages;
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
      setError(errorMessage);
       setMessages(prev => {
            const newMessages = [...prev];
            if(newMessages.length > 0) {
                newMessages[newMessages.length - 1].content = `Lo siento, no pude procesar tu solicitud. ${errorMessage}`;
            }
            return newMessages;
        });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (submission && messages.length === 0) {
      const initialUserMessage = `Hola, he completado la encuesta de estrés y mi resultado ha sido '${submission.stressLevel}'. Mi puntuación total fue de ${submission.totalScore} sobre 40. ¿Puedes darme un análisis inicial y algunas recomendaciones prácticas?`;
      handleSendMessage(initialUserMessage);
    }
  }, [submission, messages.length, handleSendMessage]);

  if (!submission) {
    return <Navigate to="/formulario" replace />;
  }
  
  const AiAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-unad-primary flex items-center justify-center text-white font-bold flex-shrink-0">
        IA
    </div>
  );

  const UserAvatar = () => (
     <div className="w-10 h-10 rounded-full bg-unad-accent flex items-center justify-center text-white font-bold flex-shrink-0">
        TÚ
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg flex flex-col h-[calc(100vh-150px)]">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-unad-primary text-center">Asistente de Bienestar UNAD</h2>
        <p className="text-center text-sm text-gray-500">Recibe consejos personalizados de nuestra IA</p>
      </div>
      
      <div ref={chatContainerRef} className="flex-1 p-6 space-y-6 overflow-y-auto bg-unad-light-gray">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && <AiAvatar />}
            <div className={`max-w-prose p-4 rounded-xl prose ${msg.role === 'user' ? 'bg-unad-accent text-white' : 'bg-gray-200 text-unad-dark-gray'}`}>
                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
                {msg.role === 'model' && isLoading && index === messages.length - 1 && <span className="blinking-cursor"></span>}
            </div>
            {msg.role === 'user' && <UserAvatar />}
          </div>
        ))}
         {isLoading && messages[messages.length - 1]?.role !== 'model' && (
             <div className="flex items-start gap-4">
                <AiAvatar />
                <div className="max-w-prose p-4 rounded-xl bg-gray-200 text-unad-dark-gray">
                    <span className="blinking-cursor"></span>
                </div>
            </div>
         )}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); handleSendMessage(userInput); }} className="flex items-center gap-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            disabled={isLoading}
            className="flex-1 w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-unad-accent focus:border-unad-accent transition disabled:bg-gray-200"
            aria-label="Escribe tu mensaje"
          />
          <button type="submit" disabled={isLoading || !userInput.trim()} className="px-6 py-3 bg-unad-primary text-white font-semibold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-unad-accent focus:ring-opacity-50 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                </span>
            ) : 'Enviar'}
          </button>
        </form>
      </div>
       <style>{`.blinking-cursor::after { content: '▋'; animation: blink 1s step-end infinite; } @keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
};

export default AiHelpPage;
