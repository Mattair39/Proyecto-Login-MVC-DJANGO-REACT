# MVC Login (React - Django)

Aplicación de autenticación segura y gestión de recursos (notas) desarrollada bajo el patrón **MVC** con **Django** en el backend y **React** en el frontend.

La autenticación se basa en **JWT** (JSON Web Tokens) almacenados en **cookies _httponly_** para maximizar la seguridad, y el frontend aprovecha rutas privadas que sólo permiten el acceso una vez validado el token.

---

## Descripción del Proyecto

Este proyecto demuestra el desarrollo de una aplicacion web para inicio de sesiones y control de acceso:

1. **Backend en Django + Django REST Framework**  
   - Endpoints RESTful que emiten y refrescan tokens _access_ y _refresh_ mediante **SimpleJWT**.  
   - Los tokens se devuelven al cliente y se guardan en _cookies_ seguras (`httponly`, `samesite=None`), evitando el acceso por JavaScript y mitigando XSS.  
   - Un endpoint que valida la autenticación leyendo el token desde la cookie, devolviendo 200 OK si el usuario está logueado.

2. **Frontend en React + Chakra UI + Axios**  
   - Formularios de **Registro** y **Login** que llaman a la API y, tras éxito, redirigen según el flujo (registro → login, login → menú).  
   - Gestión de estado de autenticación vía un `AuthContext` que encapsula:
     - Llamadas a `/token/`, `/token/refresh/` y `/authenticated/` con `withCredentials: true`.  
     - Lógica para refrescar el token automáticamente al expirar.  
     - Funciones `login_user`, `register_user` y `logout` que navegan entre rutas (`/login`, `/register`, `/`) usando **React Router v6**.

3. **Rutas Privadas**  
   - Componente `PrivateRoute` que bloquea el acceso al menú principal si no hay un JWT válido.  
   - Muestra un spinner o mensaje de “Loading…” mientras determina el estado de autenticación.

4. **CRUD de Recursos**  
   - Ejemplo de manejo de datos: un listado de “notas” (o libros), obtenidas con `axios.get('/api/notes/')`.  
   - El usuario puede ver sus notas, y en versiones posteriores podría ampliarse a crear, editar y eliminar (model `Book`) sin tocar la lógica de autenticación.

Gracias a este enfoque, la aplicación logra:

- Un flujo de **autenticación completamente desacoplado**: el backend sólo se preocupa de emitir y validar tokens, y el frontend de almacenarlos y enviarlos en cada petición.  
- **Mayor seguridad** al no exponer el token a JavaScript (cookie `httponly`).  
- **Escalabilidad**: cualquier otro recurso (p. ej. `Book`) puede integrarse reutilizando el mismo middleware de autenticación y el `AuthContext`.
---

## Tabla de Contenidos

1. [Instalación](#instalación)  
2. [Uso del Proyecto](#uso-del-proyecto)  
3. [Características](#características)  
4. [Contribución](#contribución)  
5. [Créditos](#créditos)  
6. [Licencia](#licencia)

---

## Instalación

### Requisitos previos

- **Node.js** y **yarn** (o **npm**) instalados para el frontend (Versión utilizada - **Node: v22.14.0**) (Versión utilizada - **yarn: 1.22.22**).
- **Python 3.8 o superior** instalado para el backend  (Versión utilizada: **3.13.0**).
- **Django**, **Django REST Framework**, **django-cors-headers** y  **SimpleJWT** instalados en el backend.
- **Chakra UI** y **Axios** en el frontend.

La base de datos SQLite se utiliza por defecto y no requiere de configuraciones adicionales por parte del usuario.

### Pasos para instalar y ejecutar el proyecto

#### Configuración del Backend

1. Clonar el siguiente repositorio:
   ```bash
   git clone https://github.com/Mattair39/Proyecto-Login-MVC-DJANGO-REACT.git
   ```
2. Ubicarse en la carpeta principal del proyecto:
   ```bash
   cd ../login
   ```
3. Ir a la carpeta backend:
   ```bash
   cd backend
   ```
4. Instalar Django:
   ```bash
   pip install django
   ```
5. Instalar Django REST Framework:
   ```bash
   pip install djangorestframework
   ```
6. Instalar django-cors-headers:
   ```bash
   pip install django-cors-headers
   ```
7. Instalar SimpleJWT
    ```bash
   pip install djangorestframework-simplejwt
   ```
8. Entrar a la carpeta base (donde se encuentra **manage.py**):
   ```bash
   cd base
   ```
9. Aplicar las migraciones:
   ```bash
   python manage.py migrate
   ```
10. Iniciar el servidor del backend:
   ```bash
   python manage.py runserver
   ```
El servidor estará disponible en **http://127.0.0.1:8000/**

---
#### Configuración del Frontend

1. Regresar a la carpeta raíz del proyecto y ubícarse en **frontend**:
   ```bash
   cd ../../../frontend
   ```
2. Instalar yarn:
   ```bash
   npm install 
   ```
3. Entrar a la carpeta **base**:
   ```bash
   cd base
   ```
4. Instalar el cliente HTTP **(Axios)**:
   ```bash
   npm install axios
   ```
---
### Ejecución
#### Iniciar el Backend (Django)

1. Desde la carpeta backend/base (donde se encuentra manage.py):
   ```bash
   python manage.py runserver
   ```
2. El servidor de Django estará disponible en **http://127.0.0.1:8000/**

#### Iniciar el Frontend (React)

1. Ir a la carpeta frontend y ejecutar:
   ```bash
   npm start
   ```
2. La aplicación de React estará disponible en **http://localhost:3000**

---

## Uso del Proyecto

**1. Registro:**

Genera una nueva cuenta mediante el ingreso de un **usuario**, **correo**, **contraseña** y **confirmación**.

**2. Login:**

Ingresa a la aplicación mediante el ingreso de tu **usuario** y **contraseña**.

**3. Visualización de Notas:**

Visualiza las notas y el contenido generado en la aplicación desde la interfaz protegida.

---

## Características

- 🛡️ **JWT Authentication** con cookies _httponly_  
- 🔒 **Rutas privadas** en React que bloquean contenido sin login  
- ⚛️ **Frontend** con React + Chakra UI  
- 🌐 **Backend** con Django REST Framework + SimpleJWT  
- 📦 **Refresco automático** de token cuando expira  
- 📋 **Visualización Básica de Notas** asociadas al usuario
    
---

## Contribución

Para contribuir a este proyecto, se deben seguir estos:

1. Realizar un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/new-feature`).
3. Realiza tus cambios y haz un commit (`git commit -m "Add New Feature"`).
4. Haz un push a la rama (`git push origin feature/new-feature`).
5. Abrir un Pull Request.

---

## Créditos

Este proyecto fue desarrollado por:

- **Gabriel Arguello (Universidad de las Américas)**  
  - [GitHub](https://github.com/Mattair39)  

---

## Licencia

Este proyecto está licenciado bajo la [MIT License](https://choosealicense.com/licenses/mit/). Puedes usar, modificar y distribuir este proyecto libremente.

--- 
