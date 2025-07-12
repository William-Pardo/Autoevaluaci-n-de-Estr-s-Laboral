import { getStats, authAdmin } from './firebase';

let appContainer: HTMLElement;

export function initAdminPanel(element: HTMLElement) {
  appContainer = element;
  renderLoginView();
}

function renderLoginView() {
  appContainer.innerHTML = `
    <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-4 text-center">Acceso de Administrador</h2>
      <form id="admin-login-form" class="space-y-4">
        <div>
          <label for="password" class="block font-medium text-gray-700">Contraseña:</label>
          <input type="password" id="password" name="password" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div class="text-center">
          <button type="submit" class="w-full bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all">
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div id="login-feedback" class="mt-4 text-center"></div>
    </div>
  `;

  document.getElementById('admin-login-form')?.addEventListener('submit', handleAdminLogin);
}

function handleAdminLogin(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const password = (form.elements.namedItem('password') as HTMLInputElement).value;
  const feedbackElement = document.getElementById('login-feedback') as HTMLElement;

  if (authAdmin(password)) {
    renderStatsDashboard();
  } else {
    feedbackElement.textContent = 'Contraseña incorrecta.';
    feedbackElement.className = 'text-red-600 font-semibold';
  }
}

async function renderStatsDashboard() {
  appContainer.innerHTML = `
    <div class="bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Panel de Estadísticas</h2>
      <div id="stats-content">Cargando datos...</div>
    </div>
  `;

  const statsContent = document.getElementById('stats-content') as HTMLElement;
  try {
    const stats = await getStats();
    if (stats.length === 0) {
      statsContent.innerHTML = '<p>Aún no hay encuestas para mostrar.</p>';
      return;
    }

    // Generar una tabla simple para mostrar los datos
    const tableRows = stats.map(stat => `
      <tr class="border-b">
        <td class="p-2">${stat.id}</td>
        <td class="p-2">${new Date(stat.timestamp.seconds * 1000).toLocaleString()}</td>
        <td class="p-2">${stat.name || 'Anónimo'}</td>
        <td class="p-2 text-center">${stat.satisfaction}</td>
      </tr>
    `).join('');

    statsContent.innerHTML = `
      <p class="mb-4">Total de encuestas: <strong>${stats.length}</strong></p>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-2 text-left">ID</th>
              <th class="p-2 text-left">Fecha</th>
              <th class="p-2 text-left">Nombre</th>
              <th class="p-2 text-center">Satisfacción</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    `;
  } catch (error) {
    statsContent.innerHTML = `<p class="text-red-600">Error al cargar los datos.</p>`;
  }
}
