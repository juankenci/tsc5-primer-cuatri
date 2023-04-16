# Título 
Proyecto Mapeo Economia Popular, grupo de FrontEnd

## Integrantes del grupo
- José Talerman
- Sabrina Iorgi
 

## Tecnologías usadas (librerías agregadas, nuevos frameworks y cualquier otra tecnología que sea necesario especificar)
- Docker
- Git
- React: hooks, template
- Boostrap: componente Modals
- Componente Axios


## Minuta

TAREAS/ACCIONES

El siguiente listado de tareas se encuentran en estado REALIZADO 

1)	Instalación de los ambientes de trabajo aplicando Docker y Git
2)	Creación de un Modals llamado MENSAJE, el cuál es utilizado para varias situaciones, como, por ejemplo: Control de Logueo, errores varios, etc.)

3)	Login: se investigó conceptos de 
•	React: Hooks, templates, características del lenguaje.
•	Boostrap: aunque estaba implementado, se investigó y agregó sobre el Framework y finalmente y se diseñó e implemento el formulario de Login mediante un componente Modals.
•	Se estudio e integro el Componente Axios, el cual es un navegador ligero que permite ejecutar el Endpoints del Backend para luego procesar la respuesta del mismo. Se pudo implementar con éxito, la modalidad utilizada es enviar los parámetros Usuario y Contraseña y como respuesta recibe el Token que se guarda en la sesión para futuros usos (llamadas a otros Endpoints). En el caso que la respuesta sea negativa, es decir que no existe el usuario o la contraseña incorrecta, se visualiza el mensaje de error el cual se programó utilizando el Modals MENSAJE
•	Se investigó sobre el vencimiento del Token y como conclusiones surgieron que:
	Hay 2 lapsos de tiempo:
	1) el vencimiento de base (lo tenemos seteado a 15 minutos)
	2) el lapso de autorrenovación (10 min)
	Entonces 
	•	Si la petición se hace después de la suma de los dos tiempos (25 min) se redirige al usuario al formulario de Login
	•	Si la petición se hace entre el vencimiento de base y el vencimiento de autorrenovación (entre 15 y 25 min) Backend envía el token nuevo  
	•	Si la petición se hace antes del vencimiento de base (<= 15 min) no se renueva el token
	
4)	Registración del usuario:
•	Se implementó y diseñó el Formulario de Registro mediante un componente Modals.
•	Se incorporó el componente Axios para este formulario
•	Los parámetros de entrada utilizados son: Usuario – Mail – Contraseña. Una vez ingresados se graba en la base de usuario dichas entradas y devuelve una respuesta, mediante el Modals MENSAJE, sí que exitosa o no la registración


Como tarea a para su futura realización podemos plantear los siguientes temas:
•	Probar otros Endpoints para el formulario de ingreso principal de las organizaciones
•	Especificar en el login si es necesario que la aplicación este en la zona segura


PUNTOS DE DEBATES/REVISIONES A FUTURO:

•	Definir cuestiones en el diseño y usabilidad de los módulos: Login y Registro
•	Definir diseño del Framework, en cuanto a la organización de carpetas, archivos y clases
•	Definir el consumo del servicio de búsquedas de georeferencias por domicilio (calle, nro_puerta)
•	Cuestiones para Backend: 
	o	Normalización de calles y domicilios (calle, nro_puerta) para que reutilicen las georeferencias
	o	Definir uso de Nominatim, la cual es de Openstreet Map (gratuita) o el de Google Maps
•	Cuestiones para Frontend:
	o	Implementación del mapa para cargar la georeferencia manualmente, ya sea por revisión de la georeferencia, domicilio de un administrador o la carga del usuario de la organización


