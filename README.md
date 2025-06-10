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

## Implementaciones respecto a la primera entrego

- La pagina ahora permite el inicio y registro de el usuario

- La pagina de consulta gpt esta implementada ocupando la api de chatgpt, pero ahora mismo no esta funcional ya que necesitamos comprar tockens para su funcionamiento.

- La pagina inversiones ahora permite navegar entre las 10 acciones más famosas de la bolsa internacional (aip Twelvedata).
    - Además muestra el precio actual en dolares y el porcentaje que ha variado.
    - Tambíen acompañado de la accion está un gráfico que muestra la variacion de precio en un intervalo de tiempo.

    - A esta pagina se le agregó el boton invertir, donde al presionarlo te redirige a otra pagina, la cual te permite elegir la cantidad y 'compar' acciones (lo de comprar es meramente representativo y no funcional, además al aumentar la cantidad de acciones a comprar el monto total no sube, porque es representativo).

- La pagina de familia:
- Se agregó el sistema de Familia que relaciona usuarios de la base de datos en un mismo grupo familiar.  
- Se agregó las funcionalidades de los botones de agregar y eliminar miembros de la familia del usuario logeado.
- Se agregó un sistema de formularios para agregar usuarios de la familia.
- Se agregó un sistema para mostrar los miembros de la familia del usuario logeado.

- La pagina de gastos:
- Se agrego un sistema para leer las cartolas de BancoEstado en formato excel.
- Se agrego una funcion para mostrar un grafico de estilo torta que muestra los gastos segun el origen del cobro

- se cambio el header de todas las paginas, ya que antes cada pagina tenia un header propio, pero este era el mismo, ahora existe un solo header el cual esta declarado como un componente el cual usan las paginas.

-cuando el usuario inicia sesion, en el header le aparece un icono con la inicial de su nombre el cual es un menu desplegable, cuando le hace click, le aparece su nombre, correo y la opcion de borrar cuenta y cerrar sesion, para borrar la cuenta le pide una confirmacion antes.

- tambien se implemento un menu deslizante el cual aparece despues de iniciar sesion, este le muestra opciones llamadas inversion, familia, gastos, consulta gpt y configuracion, al hacer click en cada una te lleva a la pagina mencionada.

- se implemento una pagina llamada configuracion la cual te permite cambiar los colores del header, botones y fondo de la pagina.

- para el manejo de la base de datos:

## librerias necesarias y archivos necesarios:

- Para el funcionamiento del sistema se tiene que crear un archivo llamado .env dentro del backend y su contenido debe de ser entregador por un canal seguro. Osea aqui:

//Inicio .env
JWT_SECRET="secretoSuperSeguro"
OPENAI_API_KEY=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
DATABASE_URL="postgresql://postgres:okEKQJlRxeaNGLNtgnkTFSVognIskEmK@mainline.proxy.rlwy.net:30684/railway"
//Final .env

estas se instalan de forma global, solo se tiene que abrir la terminal y ejecutar los siguientes comandos

- npm install multer

- npm install ng2-charts@5.0.0 --legacy-peer-deps

- npm install jwt-decode --legacy-peer-deps

 las siguientes se tienen que instalar dentro de la carpeta del backend, primero se ejecuta el comando cd backend en la terminal, luego de esto ejecutar estos comandos:

- npm install

- npx prisma generate

- npm install openai

- npm install multer

## Puesta en marcha de el servidor(Backend) y pagina(Frontend)

- (Backend)para abrir el server: cd backend, luego npm run dev

- (Frontend)para abrir la pagina: ionic serve

- para visualizar la base de datos: cd backend, luego npx prisma studio


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

- **RNF-05: Escalabilidad**
  - Utilizar plataformas en la nube (por ejemplo, Azure o AWS) para ajustar recursos automáticamente según la demanda.
  - Capacidad para agregar servidores adicionales en caso de aumento de usuarios o transacciones, sin necesidad de reestructuración significativa.


---

## Arquitectura de la Información 
[Estructura de Navegación](https://drive.google.com/file/d/12JX6iKR68vtPhD2Qest-U5z9Oqw1jnnR/view?usp=sharing)

---

## Prototipo de diseño 
[Figma - Prototipo de Organizador Financiero con IA](https://www.figma.com/design/bopd0b4wjxBKJ3s1oWh7rZ/Organizador-Financiero-con-IA?node-id=0-1&m=dev)


---

## MR Base de datos

[Base de datos diseñada en draw.io](https://drive.google.com/file/d/1IfvyDlTB2Y5G1iDDLz19qFLkyXItX8qh/view?usp=sharing)
El modelo de datos se centra en las entidades User y Gasto, con una relación de uno a muchos.

---
## Liberías usadas con Angular
- chart.js (Implementación a futuro) 
- Fomrs

## Tecnologías
- **Ionic Framework** (v7+)
- **Angular** (v15+)
- **TypeScript**
- **Angular Router** (para navegación entre vistas)
- Visual Studio Code

## APIs
- [Twelvedata](https://twelvedata.com/)

## Insomnia
- Se adjunto un archivo tipo yaml con las pruebas hechas en Insomnia para el backend