# VeloCV - AI Resume Optimizer

VeloCV es una plataforma SaaS de vanguardia diseñada para optimizar CVs utilizando Inteligencia Artificial, ayudando a los buscadores de empleo a superar los filtros ATS con facilidad.

## Features
- Análisis impulsado por IA (Groq/Gemini).
- Comparación en tiempo real entre CV y descripción del puesto.
- Visualización de puntuación ATS con diseño premium.
- Reporte detallado descargable en PDF.
- Interfaz moderna con *glass-morphism* y animaciones suaves.

## Stack Tecnológico
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **Componentes**: shadcn/ui
- **IA**: Groq (Llama 3.3)
- **PDF Export**: jspdf, html2canvas

## Instalación
1. Clonar el repositorio: `git clone <tu-repo-url>`
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno (copia `.env.example` a `.env`):
   - `GROQ_API_KEY=tu_api_key_aqui`
4. Ejecutar modo desarrollo: `npm run dev`

## Deployment
Para desplegar en Hostinger (Node.js):
1. Ejecutar `npm run build`.
2. Subir los archivos generados.
3. Asegurar que las variables de entorno están configuradas en el panel de control de Hostinger.

## Arquitectura
- `/app`: Rutas de la aplicación y API.
- `/components`: Componentes reutilizables de UI.
- `/lib`: Servicios de integración con IA y utilidades PDF.
