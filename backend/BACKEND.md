# Historial de cambios y guias para 2C_2022
---
## Refactor DB
Para el refactor de la base de datos se encontraron algunos problemas, por eso se datallan las soluciones y guia que se utilizó para llevar a delante la tearea

### Actualizaciones de la DB
Se debe correr el siguiente comando
```sh
npx sequelize db:migrate
```
> Note: Pero me tiraba un error de sequelize, entonces tuve que instalar dependencias globales

```sh
sudo npm i -g pg
sudo npm i -g sequelize
sudo npm i -g sequelize-cli
```

Luego pude crear archivos de migracion con el comando
```sh
sequelize migration:create --name refactor_db
o
npx sequelize migration:create --name refactor_db
```

Para finaizar las modificaciones se corre el siguiente comando para aplicar los cambios en la DB
```sh
npx sequelize db:migrate
```

Para revertir los cambios aplicados con el migrate se puden utilizar 3 alternativas:
- Actualizacion reciente:
```sh
npx sequelize-cli db:migrate:undo
```

- Actualizacion especifica
```sh
 npx sequelize db:migrate:undo --name 20220506002610-refactor_db.js
```

- Todas los actualizaciones:
```sh
npx sequelize-cli db:migrate:undo:all 
```

### Guia utilizada para realizar la tarea
Pasos para borrar/actualizar/agregar una tabla
- borrar/actualizar/agregar controller
- borrar/actualizar/agregar modelo
- borrar/actualizar/agregar servicio
- borrar/actualizar/agregar rutas
- borrar/actualizar/agregar migration (refactor_db) o scripts SQL
- borrar/actualizar/agregar seed
- actualizar colecion de Postman

> Note: Pendiente de revisar como quedo el SWAGGER
---
