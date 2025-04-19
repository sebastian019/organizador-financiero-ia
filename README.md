# Presentado por:
- Adolfo Matías Cordero Ponce
- Matias Exequiel Castro Rojas
- Sebastián Felipe Gatica Leiva
- Nehemías Joel Leiva Cataldo
# Organizador Financiero con IA

##  Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Requerimientos](#requerimientos)
3. [Arquitectura de la Información](#arquitectura-de-la-información)
3. [Diseño de prototipos](#prototipo-de-diseño)
4. [Librerías en Angular](#liberías-usadas-con-angular)

## Resumen del Proyecto
Este sistema ayuda a los usuarios a gestionar sus finanzas personales mediante inteligencia artificial, ofreciendo análisis de gastos, predicciones financieras y asesoramiento personalizado. Además, introduce un Plan Familiar, donde un administrador puede gestionar los gastos del grupo, establecer presupuestos compartidos y monitorear metas de ahorro.

---
## Requerimientos

## Roles del Sistema
- **Administrador del Plan**: Tiene control sobre las finanzas familiares y los usuarios del plan.
- **Usuario Normal**: Gestiona sus finanzas personales y contribuye al plan familiar.


## Requerimientos Funcionales por Rol

### Rol-Administrador del Plan

- **RF-ADM-01**: El administrador puede registrar usuarios al plan familiar.
- **RF-ADM-02**: El administrador puede eliminar o modificar a los usuarios existentes en el plan.
- **RF-ADM-03**: El administrador puede establecer presupuestos compartidos para el grupo.
- **RF-ADM-04**: El administrador puede configurar metas de ahorro familiares y hacer seguimiento de estas.
- **RF-ADM-05**: El administrador puede revisar los gastos e ingresos de los miembors del plan familiar.

### Rol-Usuario Normal

- **RF-USR-01**: El Usuario puede registrar sus ingresos y gastos personales.
- **RF-USR-02**: El Usuario puede visualizar gráficos y análisis de sus gastos.
- **RF-USR-03**: El Usuario puede configurar metas de ahorro personales y hacer seguimiento de estas.
- **RF-USR-04**: El Usuario puede recibir recomendaciones personalizadas hechas por IA para optimizar sus finanzas.
- **RF-USR-05**: El Usuario puede gestionar y analizar suscripciones o pagos recurrentes.

---

## Requerimientos No Funcionales

- **RNF-01: Tiempo de respuesta**
  - El sistema debe procesar operaciones clave (registro de transacciones, análisis de datos) en menos de 2 segundos en el 95% de los casos.

- **RNF-02: Seguridad**
  - Todas las transacciones y datos estarán protegidos mediante cifrado.
  - Los usuarios solo podrán acceder a funciones según sus roles (Administrador del plan, Usuario normal).
  - La autenticación se realizará mediante conexiones HTTPS seguras y contraseñas cifradas.

- **RNF-03: Usabilidad**
  - La interfaz debe ser fácil de usar e intuitiva para todas las edades.
  - Debe adaptarse a dispositivos móviles y de escritorio mediante diseño responsive.

- **RNF-04: Compatibilidad**
  - Compatible con los navegadores:
    - Google Chrome
    - Mozilla Firefox
    - Microsoft Edge
    - Safari

- **RNF-05: Escalabilidad**
  - No se que poner acá

---

## Arquitectura de la Información 
[Estructura de Navegación](https://whimsical.com/escuelainf-4qgXnPptro4CqvEugsGNNZ )

---

## Prototipo de diseño 
[Figma - Prototipo de Gestión de Productos](https://www.figma.com/design/bopd0b4wjxBKJ3s1oWh7rZ/Organizador-Financiero-con-IA?node-id=0-1&m=dev)

---
## Liberías usadas con Angular
- Bootstrap

## Tecnologías
- **Ionic Framework** (v7+)
- **Angular** (v15+)
- **TypeScript**
- **Capacitor** (para plugins nativos, si aplica)
- **SASS** (para estilos)
- **RxJS** (para manejo reactivo)
- **Angular Router** (para navegación entre vistas)
