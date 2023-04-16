# Mapeo de la Economía Popular-Testing

## Integrantes del grupo

- Carolina Combal
- Manuel Milillo

## Tecnologías usadas

- Seleccionamos Framework jest para realizar las pruebas.

## Minuta

Testing

**Backend**

En primer lugar analizamos el código del backend que se encuentra en el repositorio común, y llegamos a las siguientes conclusiones antes de comenzar con los testing. 

• Propuesta para facilitar desarrollo del testing:

Actualmente las entidades se llaman igual que los controller.<br>
Por ejemplo veamos estos casos:<br>
backend/app/controller/categories.js<br> 
backend/app/models/categories.js<br> 
Proponemos hacer un pequeño refactor y dejar estos componentes como:<br>
backend/app/controller/categoriesController.js<br>
backend/app/models/categories.js<br>

• Elección del Framework para la realización de los test:

Actualmente como herramienta de testing está especificada la utilización de chai.<br>
https://www.chaijs.com/plugins/chai-http/<br>
Proponemos cambiar el Framework a utilizar por el jest.<br>
https://jestjs.io/docs/getting-started <br>
Esto se decidió porque uno de los integrantes del equipo de Testing tiene más experiencia con su utilización. Además porque tenemos conocimiento de que se encuentra bien documentado, y es más intuitivo, lo que será beneficioso para el desarrollo de las pruebas en esta etapa y en las futuras.

• Organización de los Test a realizar:

Actualmente vemos que en el código dentro de la carpeta _backend/test_ hoy hay solamente un archivo. Decidimos en su lugar replicar la estructura de carpetas que hay dentro de backend/app. Esto quedaría por ejemplo:<br>
_backend/app/controller/categoriesController.js_<br>
y su correspondiente test<br>
_backend/test/controller/categoriesController.spec.js_<br>
Los test se nombran con ".spec".<br> 
Utilizando esta forma podemos organizar lo que vamos a testear.<br>

• Casos de prueba

1) Creación de nueva entidad:<br>
Crear una entidad cargando los datos correspondientes a la misma (controller/entities.js)<br>
A continuación recuperar los datos de la entidad, comparar campos para ver que es la misma que creamos. (Actualmente no existe un controller que recupere los datos de la entidad, habría que validar contra la tabla en la base de datos)<br>
2) Recuperar datos de Rubros? (controller/businessAreas.js) <br>
Recuperar los datos de los rubros y comparar contra los rubros especificados en la documentación.<br>
3) Recuperar datos de Categorías. (controller/categories.js) <br>
Recuperar los datos de categorías y comparar contra las categorías especificadas en la documentación.<br>
4) Recuperar datos de Subcategorías. (controller/subcategories.js) <br>
Recuperar los datos de Subcategorías y comparar contra las subcategorías especificadas en la documentación. <br>
5) Recuperar datos de Unidades Productivas. (controller/unities.js) <br>
Recuperar los datos de Unidades Productivas y comparar contra las Unidades Productivas especificadas en la documentación. <br>
6) Recuperar datos de Subcategoría de unidad productiva. (controller/subunities.js) <br>
Recuperar los datos de Subcategoría de unidad productiva y comparar contra las Subcategorías especificadas en la documentación.<br>
7) Pruebas de Login<br>
	Probar Login, generación de token.<br>


• Casos de prueba a futuro

Actualmente se encuentran desarrollados controllers que solamente sirven para recuperar datos, además de un controller de creación de entidades. Se podrían armar los controller correspondientes para que hagan las típicas operaciones de alta-baja-modificación de las entidades, para que de esta forma se comporten efectivamente como Apis Rest.<br>
Una vez tengamos la estructura de carpetas y las entidades con varias operaciones (alta/baja/modificación) se podrá avanzar con las pruebas unitarias sobre las mismas.

Ejemplos:<br>
1) Crear una nueva entidad – Borrar la entidad – Comprobar que al intentar recuperarla ya no existe.<br>
2) Crear una nueva entidad – Modificar la entidad – Recuperarla y comparar que haya impactado el cambio.<br>

Al plantear esta posibilidad, se llegó a la decisión de dejar estos cambios para más adelante, y empezar realizando pruebas sobre los endpoints existentes.


**Frontend**

Formulario – Formateo de campos – Integridad de la información <br>

1.Formateo de campos de fecha<br>
2.Campos numéricos<br>
3.Validaciones Generales<br>
4.Validación del Login<br>



## Links de interes
