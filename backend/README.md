# Trabajo Social Comunitario 5 

En esta sección se plantean todos los detalles técnicos, como así también los pasos de instalación y detalles a tener en cuenta para el escalado horizontal y vertical a futuro. Plantearemos los cuestionantes que tuvimos a lo largo de este trayecto y las decisiones por las cuales optamos y los por qué.

## **Despliegue local**

El proyecto en su totalidad es JavaScript (NodeJS).
<https://nodejs.org/en/>

También se configuro un Docker para levantar el ambiente de manera mas sencilla si se prefiere, previamente, también, deberá descargarse Docker:

<https://docs.docker.com/compose/install/>


## **Configuraciones**

A la hora de desplegar hay ciertas cosas a tener en cuenta, el proyecto cuenta con un archivo de variables de entorno, nombrado como .env. En el mismo están todas las configuraciones por ambiente, en este caso tener en cuenta que vamos a trabajar siempre sobre development, pero esta preparado para un circuito CICD para futuras integraciones.

Si se va a levantar el server por npm primero se debe correr la siguiente línea para levantar la base de datos que va a utilizar el proyecto:
```Instancia de base de datos
sudo docker run -it --rm --name postgres -p 5432:5432     -e POSTGRES_DB=db_tsc5 -e POSTGRES_USER=postgres     -e POSTGRES_PASSWORD=docker debezium/example-postgres:1.2
```

Las configuraciones del .env deben ser las siguientes:
```bash
PORT=3000
DB_HOST=0.0.0.0
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=docker
DB_NAME=db_tsc5
DB_NAME_DEV=db_tsc5_dev
DB_NAME_TEST=db_tsc5_test
API_DATE=X-API-Date
PACKAGE_VERSION=X-Package-Version
NODE_VERSION=X-Node-Version
NODE_ENV = development
SECRET = dasa33-c2ae-4b9de-b638-2b2aa3366
```

Es importante aclarar que este archivo jamás debe estar en repositorio, en este caso se hizo ya que no esta productivo.

Como se puede ver, cuenta con configuraciones de todo tipo, pero tener en cuenta que tiene una secret y credenciales, es recomendable que, a futuro, al salir a producción, se configure un Vault de credenciales para ser inyectadas.

Prestar principal atención a las variables que comienzan con DB_, ESTAS SON LAS PRINCIPALES QUE SE DEBEN CAMBIAR EN FUNCION DE LA CADENA DE CONEXIÓN DE LA BASE DE DATOS QUE TIENEN LEVANTADA LOCALMENTE.

```bash
Server={db};Database={db_tsc5};Port={5432};UID={postgres};Password={docker}
```

El servidor de backend Node se va a valer de todo esto para trabajar, aportando estas configuraciones no va a ser necesario modificar mas nada, solo correr los comandos siguientes:

**# Instala todas las dependencias necesarias, las lee del package.json**

El script entrypoint prepara el contenedor, instala las dependencias, crea y migra la base de datos e inicia el servidor. 

```bash
# entrypoint.sh
npm install
npx sequelize db:create
npx sequelize db:migrate
npm run migrations
npm start
```
# Para correr con docker-compose:
El siguiente comando levanta el backend y la base de datos.  

```bash
docker-compose up
```
Después de iniciar el contenedor esta listo y tiene expuesto el puerto 3000(Consultar la documentación en el Swagger).

## **Swagger de documentación**

El proyecto cuenta con swagger para obtener mas información de los endpoints de la API, de esta manera se pueden hacer pruebas preparadas para conocer un poco mejor y tomar confianza con los recursos expuestos.

Este documento se expone en <http://localhost:3000/docs/> una vez corriendo el servidor.


## **Endpoints**
BASE URL: <http://localhost:3000/>


|Methods|Endpoints|
|--|--|
|GET|/api/v2/business-area|
|GET|/api/v2/categories'|
|GET|/api/v2/categories/:id/subcategories|
|GET|/api/v2/unities|
|GET|/api/v2/unities/:id/subunities|
|POST|/api/v2/entities|
|POST|/api/v2/signup|
|POST|/api/v2/login|

Se adjunta postman collection, file: "TSC5.postman_collection.json"


Para mejor apreciación, observar con Swagger docs

## **Consideraciones para escalabilidad**

El proyecto intentamos hacerlo lo mas reutilizable y desacoplado posible, siempre esta abierto a mejoras, pero vamos a indicar cuales son los archivos a editar en el eventual caso de querer agregar servicios:

En caso de querer agregar mas modelos de datos a la base de datos, tener en cuenta que se esta usando un ORM (Object Relational Mapping), con lo cual, no se están ejecutando querys sql desde el código, sino que se abstrae esa lógica al framework de Sequelize ORM. Va a ser necesario que cree un modelo:

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

Esto nos va a crear una nueva migración, y debemos correrla para que impacte:

```bash
npx sequelize-cli db:migrate
```

Esto va a crear todos los archivos y tablas necesarias en postgres para poder mapear objetos desde el backend.

En caso de agregar más endpoints, se deberá colocar lógica en archivos independientes en las siguientes carpetas:

App/controller -> capa de validaciones, llama al servicio para lógica de datos

App/Services -> lógica de datos, íntima relación con ORM

App/routes.js -> se agregan las rutas con middlewares

## **Consideraciones de seguridad**

Se construyo toda una capa de servicio para autenticación, actúa como middleware en cada endpoint a ser ejecutado. De manera que valida previamente y permite o deniega.


También se diseñaron los endpoints para autenticación y autorización, la implementación de seguridad esta corriendo con Json Web Token, pero se plantea como posible mejora:

- El algoritmo de firma digital actual es HMAC + SHA256, es conveniente generar claves RSA y configurarlo con algoritmo de firma asimétrica RSASSA-PKCS1-v1_5 + SHA256, actualmente la verificación es simétrica y segura, pero esto le daría valor agregado.
- Hacer una gestión mas compleja de los tokens, actualmente tienen tiempo de caducidad fijos, no hay lógica para perfiles
- La autorización por admin esta basada en un campo booleano en base de datos de users, es necesario armar un modelo de usuario, roles y permisos, la lógica de backend llevaría bajo impacto, es solo diseñar los modelos de base de datos.
- El logging de auditoria se esta guardando en un archivo local ("audit.log"), se agrego en el middleware de logger un objeto de configuración para Logstash, esta funcionando, pero se deberá desplegar instancias ELK en el ecosistema, luego basta con descomentar el codigo y reemplazar datos de 
conexion.

```javascript
const winston = require('winston-logstash-transport')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp()
    ),
    transports: [
        new winston.transports.Console(),
        new LogstashTransport({host: '<IP_HOST_LOGSTASH>', port: <PUERTO_LOGSTASH>})
    ]
})
```

- La encripcion de credenciales en la base de datos de usuario no tiene lógica de semilla, por cuestiones de tiempo se opto por encriptar con AES pero es altamente recomendable agregar lógica de semilla, lamentablemente no pudimos llegar.
- Credenciales de ambiente, recomendable colocar un Vault de credenciales en el ecosistema productivo.
- Hacer una gestión mas compleja de los payloads de JWT, si bien cumple, se pueden agregar muchas más validaciones.
- Adicionarle al servidor productivo TLS.
- Hacer una gestión mas compleja de los headers http.
- Debera establecerse la logica junto con el equipo frontend para la implementacion de tokens csrf en los formularios.


## **Gestion de middlewares**

Todas las rutas tienen logica de middleware, con lo cual, por cada request, antes de dar ejecucion de la funcion principal, se valida, autentica y loggea la operacion. Se pueden injectar los middlewares a necesidad, ejemplo:

```javascript
const auth = require('./middlewares/auth')
const logger = require('./logger/audit_logger')

app.post('/api/v2/entities', 
            (req, res, next) => logger.loggerTransactions(req, res, next), //middleware logger
            auth.isAuthenticated, //middleware de autenticacion
            auth.isAuthorized,  //middleware de autorizacion, checkea admin
            entitiesController.createOne // core function
        );
```

De esta forma, por ejemplo, si se necesita solo autenticacion, se pueden ritarar los demas middlewares sin afectar la logica general.
