# Foo Talent Team 4 - Testing Project (Versión 2.0.0)

Este proyecto es una aplicación web desarrollada con Next.js que implementa funcionalidades básicas de autenticación y gestión de usuarios como prueba de concepto.

## 🌟 Características Implementadas

### 🔐 Sistema de Autenticación
- **Ruta Privada**: Dashboard
- **Rutas Públicas**: Implementación de rutas públicas para login y registro
- **Formularios Validados**: 
  - Validación de campos mediante Zod
  - Manejo de errores en tiempo real
  - Feedback visual para el usuario
  
[![login.png](https://i.ibb.co/CpNDs38s/imagen.png)](https://ibb.co/cKMVXS3X)

### 📦 Gestión de Productos (CRUD)
- Listado de productos
- Creación de nuevos productos
- Edición de productos existentes
- Eliminación de productos

[![image-dashboard.png](https://i.ibb.co/z0MdZmK/imagen.png)](https://ibb.co/PfLkgrB)

### 🛠️ Arquitectura y Estructura
- **Gestión de Estado**: Implementación de Zustand para el manejo del estado global
- **Manejo de Formularios**: Uso de React Hook Form con validación Zod
- **Componentes UI**: Implementación de componentes reutilizables con Tailwind CSS

### 🚀 Despliegue

- Versión actual (deploy): https://ft-equipo04-testing-app.vercel.app/  
- Versión anterior (referencia): https://ft-equipo04-testing-hr95x8fhx-maidana07-projects.vercel.app/
- **Plataforma**: Vercel

## Usuario Admin para Testing

Usar estas credenciales para probar el sistema y acceder con permisos administrativos:  
Email: front@test.com  
Contraseña: Front#0

## 🌐 Gestión del Repositorio

### Estructura de Ramas
- `main`: Rama principal de producción
- `dev`: Rama de desarrollo
- `client-dev`: Rama específica para desarrollo del cliente

### Convenciones de Commits
Se sigue una estructura clara para los mensajes de commit:
- `feat`: Nuevas características
- `fix`: Correcciones de bugs
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan el significado del código
- `refactor`: Refactorización del código

## 🚀 Comenzando

### Prerrequisitos
- Node.js (versión recomendada: 18.x o superior)
- npm o yarn

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/schweigenderFlugel/foo-talent-team-4-testing.git
```

2. Instalar dependencias:
```bash
cd client
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3030](http://localhost:3030).

## 📁 Estructura del Proyecto

```
src/
├── actions/         # Acciones de servidor y cliente
├── app/            # Rutas y páginas de la aplicación
├── components/     # Componentes reutilizables
├── hooks/         # Custom hooks
├── lib/           # Utilidades y configuraciones
├── store/         # Estado global (Zustand)
└── types/         # Definiciones de tipos TypeScript
```

## 🔄 Estado Actual del Desarrollo

### Completado ✅
- Configuración inicial del proyecto
- Sistema de autenticación básico
- Formularios de login y registro
- Despliegue en Vercel
- Implementación de rutas protegidas
- Implementación de un CRUD de productos.