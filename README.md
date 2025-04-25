# Gestión de Servicios ALBRU

`Gestión de Servicios ALBRU` es una aplicación web desarrollada con el objetivo de facilitar la gestión de procesos de venta, postventa y El administrador contará con acceso a paneles de datos que le permitirán visualizar y analizar el rendimiento facilitando la toma de decisiones estratégicas. Este proyecto forma parte del trabajo práctico final de la asignatura **Curso Integrador I** de la **Universidad Tecnológica del Perú**.

---

## 📌 Descripción General

La plataforma está diseñada para optimizar el proceso de captación, seguimiento y atención a clientes en empresas que ofrecen servicios, permite realizar tareas como:

- Registro de clientes.
- Seguimiento postventa.
- Gestión administrativa.

---

## 👥 Perfiles de Usuario

La aplicación contempla los siguientes tipos de usuarios, cada uno con permisos y funcionalidades específicas:

- **Administrador:** Gestión global de la plataforma y usuarios.
- **GTR (Gestor de Relaciones):** Supervisión de asesoramiento y rendimiento.
- **Asesor:** Atención directa a clientes, registro y seguimiento de casos.
- **Cliente:**

---

## 🛠️ Tecnologías Utilizadas

El proyecto fue desarrollado utilizando tecnologías modernas del entorno web y backend:

- **Frontend:**
  - React
  - Bootstrap 5
- **Backend:**
  - Java
  - Spring Framework
- **Base de Datos:**
  - MySQL
- **Herramientas para el ordenamiento:**
  - Husky: Asegura que todo el código subido pase verificaciones.
  - ESLint y Prettier: Ayudan a mantener un estilo y estructura de código consistentes.
  - Commitlint: Commitlint asegura que todos los mensajes de commit sigan el formato establecido.

## ⚙️ Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Erixon1/Proyecto-Albru.git
cd Proyecto-Albru
```

### 2. Instalar dependencias

```bash
npm install
```

Este comando instalará las dependencias del proyecto, incluyendo Husky, ESLint, Prettier,
Lint-Staged, Commitlint y otros paquetes de desarrollo.

### 3.📄 Estructura General del Proyecto

```plaintext
proyecto-Albru/
├── .husky/                     # Configuración de Husky para hooks de Git
├── node_modules/               # Dependencias del proyecto
├── public/                     # Archivos públicos (favicon, index.html, etc.)
├── src/                        # Código fuente de la aplicación (componentes, servicios, rutas)
│
├── .babelrc                    # Configuración de Babel
├── .eslintrc.json              # Configuración de ESLint para verificación de código
├── .gitignore                  # Archivos y carpetas que Git debe ignorar
├── .prettierrc                 # Reglas de formato con Prettier
├── commitlint.config.js        # Reglas de convenciones para mensajes de commit
├── package.json                # Información del proyecto y scripts de npm
├── package-lock.json           # Registro exacto de dependencias
└── README.md                   # Documentación del proyecto
```

## Commitlint

#### Ejemplo de Mensaje de Commit

Los mensajes de commit deben seguir el siguiente formato

```plaintext
<tipo>(<alcance>): <descripción corta>
```

#### Tipos de commit disponibles:

# 🧾 Guía de Commits por Tipo y Alcance

| Tipo (`type`) | Alcance (`scope`)   | Ejemplo de mensaje de commit                                     |
| ------------- | ------------------- | ---------------------------------------------------------------- |
| `feat`        | `leads`             | `feat(leads): agregar lógica para reasignación de leads por GTR` |
| `feat`        | `admin`             | `feat(admin): permitir exportación de reportes en Excel`         |
| `fix`         | `ui`                | `fix(ui): corregir desbordamiento en tabla de clientes`          |
| `fix`         | `api`               | `fix(api): corregir error al actualizar estado de lead`          |
| `docs`        | `docs`              | `docs(docs): actualizar guía de instalación en README`           |
| `style`       | `ui`                | `style(ui): ajustar padding en tarjeta de lead`                  |
| `refactor`    | `auth`              | `refactor(auth): simplificar lógica de validación de tokens`     |
| `perf`        | `dashboard`         | `perf(dashboard): mejorar carga de métricas usando lazy loading` |
| `test`        | `api`               | `test(api): añadir pruebas unitarias al endpoint de seguimiento` |
| `build`       | `config`            | `build(config): actualizar dependencias de producción`           |
| `ci`          | `config`            | `ci(config): configurar workflow para despliegue automático`     |
| `chore`       | `db`                | `chore(db): renombrar columna en tabla de seguimiento`           |
| `revert`      | `ui`                | `revert(ui): revertir cambios en layout del login`               |
| `security`    | `auth` / `security` | `feat(security): implementar validación de tokens expuestos`     |

## ✅ Tip

Asegúrate de que tus commits siempre sigan este formato:

```
<type>(<scope>): descripción corta en minúscula y en presente
```

Ejemplos:

```
feat(leads): permitir edición múltiple de leads asignados
fix(auth): solucionar bug en autenticación por roles
```

> [!NOTE]  
> Si no sigues estas reglas, **no se permitirá realizar el commit.**

## 🚀 Flujo de Trabajo

1. **Crear una rama para el cambio:** Crea una nueva rama para cada tarea o tu nombre.

```bash
git checkout -b nombre-de-la-rama
```

2. **Desarrollar funcionalidad:** Realiza los cambios en el código siguiendo las convenciones establecidas. Ejecuta los comandos de linting y pruebas localmente.

3. **Validar código:** Antes de hacer commit, asegúrate de que el código pase las verificaciones de ESLint y Prettier:

```bash
npm run format
npm run lint
```

4. **Hacer commit:** Escribe un mensaje de commit claro y conciso, siguiendo las convenciones establecidas. Al hacer commit, `Husky` y `Lint-Staged` ejecutarán automáticamente los linters configurados.

```bash
git add .
git commit -m "feat(ui): agregar formulario de contacto"
```

5. **Enviar los cambios:** Cuando todo esté en orden, sube la rama al repositorio remoto y abre un Pull Request (PR) para revisión.

```bash
git push origin nombre-de-la-rama
```

> [!IMPORTANT]
> Cuando abras un Pull Request, recuerda asignarme para la revisión.

## 🛠️ Comandos Útiles

- **Iniciar servidor:** `npm start`
- **Ejecutar ESLint:** `npm run lint`
- **Formatear con Prettier:** `npm run format`

### 4. Configurar el Backend (En proceso)

> Tener JDK 19+ y un entorno Spring Boot listo.

Configurar tu conexión a base de datos (por defecto, MySQL).

Puedes usar IDEs como IntelliJ, netbeans o VS Code para correr el backend.
