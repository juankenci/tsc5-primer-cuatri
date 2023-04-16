# Mapeo de la Economía Popular-Testing

## Integrantes del grupo

- Pablo Damian Lupo
- Mauro Martin Bonanno
- Francisco A. D’Eramo


## Minuta

Testing

### **Documentación**

Al empezar vimos que el proyecto tenía poca documentación en la parte funcional, por lo que nos propusimos como primer objetivo el poder completar esta documentación. Para esto empezamos a crear los casos de uso de cada pantalla/formulario.

Toda la documentación se va a encontrar en la carpeta del proyecto: *doc-testing* por ahora agregamos el template de casos de usos y el excel de campos y requisitos. Cuando terminemos los documentos de los casos de uso, los iremos subiendo en esta carpeta.

#### ***Casos de Uso***

Para los casos de uso utilizamos un template el cual nos parecio un cuadro de caso de uso completo pero simple para entender. Luego definimos que para cada pantalla/formulario iba a utilizar 1 documento nuevo, principalmente para tener más ordenado estos y poder encontrar más facil los casos de uso de una pantalla. A su vez, al final de cada documento se van a poder encontrar propuestas de funcionalidades.

Una vez que definimos como ibamos a escribir los casos de uso, empezamos a escribir los de la pantalla de Login y Registro, en donde además de documentar como estaba funcionando hoy, pensamos en como debería funcionar, ya sea al tener un error o un proceso exitoso. Pero al pensar en los escenarios de error, por ejemplo que la contraseña no cumpla con los requisitos minimo, nos encontramos que estos requisitos no estaban en ningún lado documentado, entonces nos vimos con la necesidad de generar un documento, excel, en donde cada Hoja es un formulario y agregamos los campos y sus requisitos, como por ejemplo:

	- Es Obligatorio.
	- Longitud Mínima.
	- Longitud Máxima.

Luego le agregos al final si estaba realizado o no.

Todos estos casos de usos y requisitos son propuestas que pueden modificarse si así se ve conveniente. La idea es dejar en algún lado todo lo que tiene el proyecto y lo que le falta o puede llegar a tener, para que los cuatrimestres siguientes tengán una forma más sencilla de saber que hacer.

A su vez, los casos de uso y campos del registro tenemos que actualizarlo dado que el equipo de Frontend estuvo trabajando sobre la pantalla.

### **Levantar el proyecto**

Dado la dificultad que se tuvo a la hora de poder levantar el proyecto decidimos crear una VM en donde se instale esta y ya se pueda levantar el proyecto sin importar el sistema operativo.

### **Frontend**

Empezamos a analizar la forma de crear los tests en el código, esto se nos esta presentando como una dificultad dado la poca experiencia que tenemos en frontend. Seguimos investigando y tratando de crear unos tests de prueba para ir entendiendo como es y así poder empezar a agregar tests en el código del proyecto.