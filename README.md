# Aplicación de Encuesta de Bienestar - UNAD (Vite)

Esta es una aplicación de encuesta de bienestar construida con React, TypeScript y Vite, y conectada a Firebase para la gestión de datos.

## Primeros Pasos

Para ejecutar este proyecto en tu entorno local, sigue estos pasos.

### Prerrequisitos

-   Node.js (v18 o superior)
-   npm (o tu gestor de paquetes preferido)

### Configuración

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_CARPETA_PROYECTO>
    ```

2.  **Instala las dependencias:**
    Este comando instalará todas las librerías necesarias para el proyecto.
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo llamado `.env.local` en la raíz del proyecto. Este archivo contendrá tus claves secretas y no debe ser subido a GitHub. Copia y pega el siguiente contenido y reemplaza los placeholders con tus credenciales reales.

    ```env
    # Credenciales de tu proyecto de Firebase
    # Reemplaza los valores con tus propias credenciales
    VITE_FIREBASE_API_KEY="AIzaSy...TU_API_KEY"
    VITE_FIREBASE_PROJECT_ID="tu-project-id"
    VITE_FIREBASE_SENDER_ID="tu-sender-id"
    VITE_FIREBASE_APP_ID="1:tu-sender-id:web:tu-app-id"

    # Clave para el Asistente de IA (Google Gemini)
    VITE_GEMINI_API_KEY="AIza...TU_GEMINI_API_KEY"
    ```

4.  **Ejecuta el servidor de desarrollo:**
    Este comando iniciará la aplicación en modo de desarrollo con recarga en caliente.
    ```bash
    npm run dev
    ```
    Abre tu navegador y ve a `http://localhost:5173` (o la URL que indique la terminal).

## Despliegue en GitHub Pages

Para desplegar tu aplicación en GitHub Pages, sigue estos pasos.

1.  **Configura tu repositorio:**
    *   En `package.json`, actualiza el campo `homepage` con tu nombre de usuario de GitHub y el nombre de tu repositorio.
        ```json
        "homepage": "https://<TU_USUARIO_GITHUB>/<NOMBRE_REPO>",
        ```
    *   En `vite.config.ts`, actualiza el campo `base` con el nombre de tu repositorio.
        ```typescript
        export default defineConfig({
          base: '/<NOMBRE_REPO>/',
          // ... resto de la configuración
        });
        ```

2.  **Despliega la aplicación:**
    Este comando compilará tu aplicación y la publicará en la rama `gh-pages` de tu repositorio.
    ```bash
    npm run deploy
    ```

3.  **Habilita GitHub Pages:**
    *   Ve a la configuración de tu repositorio en GitHub (`Settings` > `Pages`).
    *   En la sección "Build and deployment", selecciona `gh-pages` como la rama de origen (`Source`).
    *   ¡Guarda los cambios y tu sitio estará disponible en la URL especificada en el campo `homepage` en unos minutos!
