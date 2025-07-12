import { saveSurvey } from './firebase.ts';
import { initAdminPanel } from './admin.ts';
import { db } from './services/firebase'; // 👈 Asegúrate que esta ruta sea correcta
import { collection, getDocs } from 'firebase/firestore'; // 🔍 Importa para prueba

const appElement = document.getElementById('app') as HTMLElement;

function renderInitialView() {
  appElement.innerHTML = `
    <div class="text-center">
      <h2 class="text-2xl font-semibold mb-6">Selecciona tu rol para continuar</h2>
      <div class="flex justify-center gap-8">
        <button id="user-btn" class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
          Realizar Encuesta
        </button>
        <button id="admin-btn" class="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105">
          Panel de Administrador
        </button>
      </div>
    </div>
  `;
  document.getElementById('user-btn')?.addEventListener('click', renderSurveyForm);
  document.getElementById('admin-btn')?.addEventListener('click', () => initAdminPanel(appElement));
}

function renderSurveyForm() {
  appElement.innerHTML = `
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-4 text-center">Encuesta de Bienestar</h2>
      <form id="survey-form" class="space-y-6">
        <div>
          <label for="name" class="block font-medium text-gray-700">Nombre (Opcional):</label>
          <input type="text" id="name" name="name" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div>
          <label for="satisfaction" class="block font-medium text-gray-700">Nivel de satisfacción (1-5):</label>
          <input type="range" id="satisfaction" name="satisfaction" min="1" max="5" class="mt-1 block w-full">
        </div>
        <div class="text-center">
          <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all">
            Enviar Encuesta
          </button>
        </div>
      </form>
      <div id="form-feedback" class="mt-4 text-center"></div>
    </div>
  `;

  document.getElementById('survey-form')?.addEventListener('submit', handleSurveySubmit);
}

async function handleSurveySubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const surveyData = Object.fromEntries(formData.entries());

  const feedbackElement = document.getElementById('form-feedback') as HTMLElement;
  feedbackElement.textContent = 'Enviando...';
  feedbackElement.className = 'text-gray-600';

  try {
    await saveSurvey(surveyData);
    feedbackElement.textContent = '¡Gracias! Tu encuesta ha sido enviada con éxito.';
    feedbackElement.className = 'text-green-600 font-semibold';
    form.reset();
    setTimeout(renderInitialView, 3000); // Vuelve al inicio después de 3 segundos
  } catch (error) {
    feedbackElement.textContent = 'Error: No se pudo enviar la encuesta.';
    feedbackElement.className = 'text-red-600 font-semibold';
  }
}

/**
 * Función de inicialización de la aplicación.
 */
export function initApp() {
  if (!appElement) {
    console.error('El elemento principal de la aplicación #app no fue encontrado.');
    return;
  }
  renderInitialView();

  // 🔍 VERIFICACIÓN DE CONEXIÓN A FIREBASE
  (async () => {
    try {
      const testRef = collection(db, 'usuarios'); // Usa una colección real
      const snapshot = await getDocs(testRef);
      console.log(`✅ Firebase conectado: ${snapshot.size} documentos leídos de 'usuarios'.`);
    } catch (error) {
      console.error("❌ Error al conectar con Firebase:", error);
    }
  })();
}

// Inicia la aplicación cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', initApp);
