# Gestión de Servicios ALBRU

`Gestión de Servicios ALBRU` es una aplicación web desarrollada con el objetivo de facilitar la gestión de procesos de venta, postventa y El administrador contará con acceso a paneles de datos  que le permitirán visualizar y analizar el rendimiento facilitando la toma de decisiones estratégicas. Este proyecto forma parte del trabajo práctico final de la asignatura **Curso Integrador I** de la **Universidad Tecnológica del Perú**.

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
  - Angular *(o React)*
  - Bootstrap 5
- **Backend:**
  - Java
  - Spring Framework
- **Base de Datos:**
  - MySQL *(u otra según configuración)*

---

## ⚙️ Configuración Inicial

### 1. Clonar el Repositorio
   ```bash
  git clone https://github.com/Erixon1/Gestion-De-Servicios-ALBRU.git
  cd Gestion-De-Servicios-ALBRU
  ```
### 2. Configurar el Backend
> Tener JDK 19+ y un entorno Spring Boot listo.

Configurar tu conexión a base de datos (por defecto, MySQL).

Puedes usar IDEs como IntelliJ, netbeans o VS Code para correr el backend.

## 📄 Estructura General del Proyecto
```bash
C:.
│── backend/
│    └── src/
│         └── main/java/...
├── frontend/
│   └── src/
│       └── app/
├── README.md
├── package.json
└── pom.xml
