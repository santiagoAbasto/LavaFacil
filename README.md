
<p align="center">
  <img src="public/images/logo-lavafacil.png" alt="LavaFácil Logo" width="200"/>
</p>

# 🧼 LavaFácil - Sistema de Gestión de Lavandería

---

## 📚 Tabla de Contenidos

1. Descripción General
2. ¿Qué Problema Resuelve LavaFácil?
3. Tecnologías y Herramientas Utilizadas
4. Arquitectura del Proyecto
5. Instalación Completa Paso a Paso
6. Configuración de Entorno .env
7. Orquestación Docker Detallada
8. Errores Comunes Documentados
9. Funcionalidades por tipo de usuario
10. Diseño UX/UI
11. Implementación de Modo Oscuro
12. Seguridad Aplicada
13. Comandos Útiles para Desarrollo
14. Mejoras Futuras Propuestas
15. Glosario de Términos Técnicos
16. Créditos y Agradecimientos

---

# 🧼 1. Descripción General

LavaFácil es un sistema integral para la administración de lavanderías. Permite gestionar clientes, pedidos, pagos, servicios y roles de usuario de forma rápida, moderna y segura a través de una aplicación web.

---

# 🔥 2. ¿Qué Problema Resuelve LavaFácil?

- Agiliza la toma de pedidos y control de pagos.
- Permite al dueño ver el estado de pedidos de cada cliente.
- Centraliza toda la información, eliminando registros manuales en papel.
- Automatiza la administración de precios, servicios y clientes.
- Mejora la experiencia del cliente al permitirle consultar el avance de su pedido.

---

# 🚀 3. Tecnologías y Herramientas Utilizadas

| Herramienta                 | Uso Principal                                       |
|------------------------------|-----------------------------------------------------|
| Laravel 12                   | Backend robusto en PHP                             |
| React 18 + Inertia.js         | Frontend SPA sin necesidad de API REST             |
| TailwindCSS                  | Estilos modernos, adaptativos y modo oscuro        |
| PostgreSQL 15                | Base de datos relacional                           |
| Docker + Docker Compose      | Contenerización y despliegue                       |
| Fortify                      | Seguridad y autenticación                         |
| Vite                         | Compilador de assets súper rápido                  |

---

# 🏗️ 4. Arquitectura del Proyecto

```plaintext
lavafacil/
├── app/                # Lógica de servidor (Controllers, Models, Middleware)
├── database/           # Migraciones y Seeders
├── resources/js/       # Código Frontend en React
│   ├── Pages/          # Vistas principales
│   ├── Components/     # Componentes reutilizables
├── public/             # Recursos públicos (logo, favicon)
├── docker/             # Configuración Nginx personalizada
├── docker-compose.yml  # Orquestador de contenedores
├── tailwind.config.js  # Configuración Tailwind
└── vite.config.js      # Configuración Vite
```

---

# 🛠️ 5. Instalación Completa Paso a Paso

```bash
git clone https://github.com/santiagoabasto/lavafacil.git
cd lavafacil
docker-compose up -d --build
docker exec -it lavafacil_app bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
npm install
npm run dev
```

---

# ⚙️ 6. Configuración de Entorno .env

| Variable            | Descripción                        |
|---------------------|------------------------------------|
| DB_CONNECTION=pgsql | Tipo de base de datos              |
| DB_HOST=db          | Nombre del servicio en Docker      |
| DB_PORT=5432        | Puerto de conexión PostgreSQL      |
| DB_DATABASE=lavafacil | Nombre de la base de datos       |
| DB_USERNAME=postgres | Usuario de la base de datos       |
| DB_PASSWORD=secret  | Contraseña de base de datos         |

---

# 🐳 7. Orquestación Docker Detallada

- **App**: Laravel 12 en PHP-FPM 8.2 (`lavafacil_app`)
- **DB**: PostgreSQL 15 (`lavafacil_db`)
- **Web server**: Nginx Alpine (`lavafacil_web`)

**Comunicación:**

| Servicio | Accede a                     |
|----------|-------------------------------|
| App      | Base de datos mediante host `db` |
| Web      | Sirve contenido estático de `/public` |

**Puertos Expuestos:**

| Puerto Local | Servicio        |
|--------------|-----------------|
| 8000         | Nginx (Laravel)  |
| 5432         | PostgreSQL DB    |

---

# 🐞 8. Errores Comunes Documentados

| Error | Causa | Solución |
|------|-------|----------|
| mv: cannot stat 'composer.phar' | Composer no descargado | Instalar composer manualmente |
| could not translate host name "db" | Servicio DB no levantado a tiempo | Reiniciar docker-compose |
| could not find driver (Connection: pgsql) | Falta extensión PHP PDO_PGSQL | Habilitar y reconstruir imagen |
| relation "sessions" does not exist | Migraciones no ejecutadas | php artisan migrate:fresh |
| Target class [PedidoController] does not exist | Error en rutas/controladores | Revisar imports y namespaces |

---

# ✨ 9. Funcionalidades por Tipo de Usuario

### Cliente
- Registro y login
- Selección de servicios
- Generación de pedidos
- Consulta de pedidos

### Administrador
- Gestión de pedidos
- Cambio de estado de pedidos
- Confirmación de pagos
- Visualización de reportes de ventas

---

# 🎨 10. Diseño UX/UI

- Interfaz limpia y minimalista
- Enfoque Mobile-First
- Animaciones suaves de carga
- Modo oscuro automático
- Inputs y botones accesibles

---

# 🌗 11. Implementación de Modo Oscuro

- Detecta preferencias del sistema
- Alternancia manual tipo "Switch iOS"
- Persistencia del modo en `localStorage`
- Implementado con clases `dark:` en TailwindCSS

---

# 🔐 12. Seguridad Aplicada

- CSRF Tokens automáticos
- Middleware de autenticación y rol
- Validaciones en frontend y backend
- Contraseñas protegidas con Bcrypt
- Separación de accesos según rol (Cliente/Admin)

---

# 🧪 13. Comandos Útiles para Desarrollo

```bash
docker-compose up -d
docker-compose down
docker exec -it lavafacil_app bash
php artisan migrate:fresh --seed
composer install
npm install
npm run dev
npm run build
```

---

# 🎯 14. Mejoras Futuras Propuestas

- Implementar notificaciones toast
- Subida de imágenes asociadas a pedidos
- Convertir la app en PWA para modo offline
- Soporte multilenguaje (Español/Inglés)
- Dashboard analítico de ventas
- Integración de pasarelas de pago online

---

# 📚 15. Glosario de Términos Técnicos

| Término         | Definición |
|-----------------|------------|
| SPA             | Aplicación de Página Única |
| Inertia.js      | Librería que conecta Laravel + React |
| Middleware      | Filtros entre solicitudes y respuestas HTTP |
| TailwindCSS     | Framework CSS basado en utilidades |
| Docker Compose  | Orquestador de múltiples contenedores |
| Vite            | Compilador rápido de frontend |

---

# 🙌 16. Créditos y Agradecimientos

Proyecto desarrollado por **Santiago Abasto**  
Última actualización: **29/04/2025**  
Gracias a la comunidad de **Laravel, React y Docker** por las herramientas que hacen posible proyectos como este. 🚀
